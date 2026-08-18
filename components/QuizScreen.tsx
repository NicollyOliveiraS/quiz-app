import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import TW_QUESTIONS_RAW from '../constants/questoes.json';
import { styles } from './QuizScreen.styles';

const { width } = Dimensions.get('window');

interface Question {
  id: string;
  category: 'Geral' | 'Relacionamentos' | 'Esportes' | 'Sobrenatural';
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const TW_QUESTIONS = TW_QUESTIONS_RAW as Question[];

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

type GameState = 'welcome' | 'playing' | 'results';
type CategoryFilter = 'Todos' | 'Geral' | 'Relacionamentos' | 'Esportes' | 'Sobrenatural';

export default function QuizScreen() {
  // Game Configuration State
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todos');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);

  // Active Game Play State - Default to 'welcome' screen
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(() => {
    return shuffleArray(TW_QUESTIONS).slice(0, 10);
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{
    question: Question;
    selectedIdx: number | null;
    isCorrect: boolean;
  }[]>([]);

  // Animation values
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Trigger Haptic feedback safely
  const triggerHaptics = async (type: 'success' | 'error' | 'light' | 'medium') => {
    try {
      if (type === 'success') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (type === 'error') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } else if (type === 'medium') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (e) {
      // Ignore haptic errors on web/simulators
    }
  };

  // Start / Reset Quiz Game helper
  const startNewQuiz = () => {
    let filtered = [...TW_QUESTIONS];
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }
    const shuffled = shuffleArray(filtered);
    const selected = shuffled.slice(0, selectedQuestionCount);

    if (selected.length === 0) {
      setCurrentQuestions(shuffleArray(TW_QUESTIONS).slice(0, selectedQuestionCount));
    } else {
      setCurrentQuestions(selected);
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setGameState('playing');
    progressBarWidth.setValue(0);
  };

  // Handle progress bar animation when question index changes
  useEffect(() => {
    if (gameState === 'playing' && currentQuestions.length > 0) {
      const progress = (currentQuestionIndex) / currentQuestions.length;
      Animated.timing(progressBarWidth, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [currentQuestionIndex, currentQuestions, gameState]);

  // Handle Option Select
  const selectOption = (index: number) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswerIndex(index);

    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = index === currentQuestion.answerIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      triggerHaptics('success');
    } else {
      triggerHaptics('error');
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedIdx: index,
        isCorrect,
      },
    ]);
  };

  // Next Question or Complete
  const nextQuestion = () => {
    triggerHaptics('light');
    if (currentQuestionIndex + 1 < currentQuestions.length) {
      // Fade out current question and load next
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.delay(50),
      ]).start(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswerIndex(null);
        setIsAnswered(false);
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      });
    } else {
      // Transition to results screen
      setGameState('results');
    }
  };

  // Restart Game / Go to Welcome Screen
  const restartGame = () => {
    triggerHaptics('medium');
    setGameState('welcome');
  };

  // Calculate Rank Details based on Score percentage
  const getRankDetails = () => {
    if (currentQuestions.length === 0) return { title: 'Lobo Ômega', msg: '', emoji: '🐺' };
    const pct = (score / currentQuestions.length) * 100;
    if (pct >= 85) {
      return {
        title: 'Alfa Verdadeiro 🐺',
        msg: 'Espetacular! Você é um Alfa Verdadeiro. Scott McCall e sua alcateia têm orgulho de ter você liderando!',
        emoji: '👑',
      };
    } else if (pct >= 60) {
      return {
        title: 'Membro da Alcateia 🐺',
        msg: 'Excelente! Você luta ao lado de Scott e Stiles para proteger Beacon Hills das ameaças sobrenaturais.',
        emoji: '🐺',
      };
    } else if (pct >= 30) {
      return {
        title: 'Humano com Taco de Beisebol ⚾',
        msg: 'Bom trabalho! Como Stiles Stilinski, você não tem poderes, mas usa sua inteligência (e um taco) para sobreviver.',
        emoji: '⚾',
      };
    } else {
      return {
        title: 'Lobo Ômega Perdido 🌲',
        msg: 'Cuidado! Você está vulnerável na floresta de Beacon Hills. Que tal maratonar Teen Wolf para não virar presa?',
        emoji: '🐾',
      };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#081225" />
      <View style={styles.container}>
        
        {/* WELCOME SCREEN */}
        {gameState === 'welcome' && (
          <ScrollView contentContainerStyle={styles.welcomeScroll}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoSub}>DESAFIO TRIVIA</Text>
              <Text style={styles.logoTitle}>Teen Wolf</Text>
              <View style={styles.divider} />
              <Text style={styles.quoteText}>
                "Be your own anchor."
              </Text>
            </View>

            {/* Category Select Card */}
            <View style={styles.card}>
              <Text style={styles.cardHeaderTitle}>🐺 Escolha a Categoria</Text>
              <View style={styles.categoriesGrid}>
                {(['Todos', 'Geral', 'Esportes', 'Sobrenatural', 'Relacionamentos'] as CategoryFilter[]).map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
                      onPress={() => {
                        triggerHaptics('light');
                        setSelectedCategory(cat);
                      }}
                    >
                      <Text style={[styles.categoryBtnText, isActive && styles.categoryBtnTextActive]}>
                        {cat === 'Todos' ? ' Todos' : cat === 'Geral' ? '🎬 Geral' : cat === 'Esportes' ? '🥍 Esportes' : cat === 'Sobrenatural' ? '🐺 Sobrenatural' : '💑 Relacionamentos'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Question Count Card */}
            <View style={styles.card}>
              <Text style={styles.cardHeaderTitle}>🔢 Número de Perguntas</Text>
              <View style={styles.countContainer}>
                {([5, 10, 15] as number[]).map((count) => {
                  const isActive = selectedQuestionCount === count;
                  return (
                    <TouchableOpacity
                      key={count}
                      style={[styles.countButton, isActive && styles.countButtonActive]}
                      onPress={() => {
                        triggerHaptics('light');
                        setSelectedQuestionCount(count);
                      }}
                    >
                      <Text style={[styles.countBtnText, isActive && styles.countBtnTextActive]}>
                        {count} itens
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={startNewQuiz}>
              <Text style={styles.primaryButtonText}>Entrar na Alcateia 🐺</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* PLAYING SCREEN */}
        {gameState === 'playing' && currentQuestions.length > 0 && (
          <View style={styles.gameContainer}>
            {/* Header info */}
            <View style={styles.gameHeader}>
              <View>
                <Text style={styles.questionProgress}>
                  Questão {currentQuestionIndex + 1} de {currentQuestions.length}
                </Text>
                <Text style={styles.categoryBadge}>
                  {currentQuestions[currentQuestionIndex].category}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }
                ]} 
              />
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollQuizContent}
            >
              {/* Question Text Card */}
              <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
                <Text style={styles.questionText}>
                  {currentQuestions[currentQuestionIndex].question}
                </Text>
              </Animated.View>

              {/* Options list */}
              <View style={styles.optionsList}>
                {currentQuestions[currentQuestionIndex].options.map((option, idx) => {
                  const currentQuestion = currentQuestions[currentQuestionIndex];
                  const isCurrentCorrect = idx === currentQuestion.answerIndex;
                  const isCurrentSelected = idx === selectedAnswerIndex;
                  
                  let optionStyle: any = styles.optionItem;
                  let textStyle: any = styles.optionItemText;
                  let iconElement = null;

                  if (isAnswered) {
                    if (isCurrentCorrect) {
                      // Correct option is always green
                      optionStyle = [styles.optionItem, styles.optionCorrect];
                      textStyle = [styles.optionItemText, styles.optionTextCorrect];
                      iconElement = <Ionicons name="checkmark-circle" size={22} color="#4cd137" />;
                    } else if (isCurrentSelected) {
                      // Incorrectly selected option is red
                      optionStyle = [styles.optionItem, styles.optionIncorrect];
                      textStyle = [styles.optionItemText, styles.optionTextIncorrect];
                      iconElement = <Ionicons name="close-circle" size={22} color="#ff5252" />;
                    } else {
                      // Non-selected wrong options are disabled/dimmed
                      optionStyle = [styles.optionItem, styles.optionDimmed];
                    }
                  }

                  return (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.7}
                      style={optionStyle}
                      disabled={isAnswered}
                      onPress={() => selectOption(idx)}
                    >
                      <Text style={textStyle}>{option}</Text>
                      {iconElement}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Explanation section if answered */}
              {isAnswered && (
                <View style={styles.explanationCard}>
                  <View style={styles.explanationHeader}>
                    <Ionicons name="information-circle-outline" size={20} color="#E5A93C" />
                    <Text style={styles.explanationHeaderTitle}>
                      {selectedAnswerIndex === currentQuestions[currentQuestionIndex].answerIndex
                        ? ' Resposta Correta! 🎉'
                        : selectedAnswerIndex === null
                        ? ' Tempo Esgotado! ⏰'
                        : ' Resposta Errada 😢'}
                    </Text>
                  </View>
                  <Text style={styles.explanationText}>
                    {currentQuestions[currentQuestionIndex].explanation}
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Bottom action button */}
            {isAnswered && (
              <TouchableOpacity style={styles.primaryButton} onPress={nextQuestion}>
                <Text style={styles.primaryButtonText}>
                  {currentQuestionIndex + 1 === currentQuestions.length
                    ? 'Ver Resultados 🏆'
                    : 'Próxima Questão 🐺'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* RESULTS SCREEN */}
        {gameState === 'results' && (
          <ScrollView contentContainerStyle={styles.welcomeScroll}>
            {/* Rank Box */}
            <View style={styles.resultsHeader}>
              <Text style={styles.rankEmoji}>{getRankDetails().emoji}</Text>
              <Text style={styles.resultsSubtitle}>SEU RESULTADO</Text>
              <Text style={styles.rankTitle}>{getRankDetails().title}</Text>
              
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreValue}>{score}</Text>
                <Text style={styles.scoreMax}> / {currentQuestions.length}</Text>
              </View>
              
              <Text style={styles.rankDescription}>
                {getRankDetails().msg}
              </Text>
            </View>

            {/* Review Section */}
            <View style={styles.card}>
              <Text style={styles.cardHeaderTitle}>📝 Resumo das Respostas</Text>
              {userAnswers.map((answer, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.reviewItem,
                    answer.isCorrect ? styles.reviewItemCorrect : styles.reviewItemIncorrect
                  ]}
                >
                  <View style={styles.reviewItemHeader}>
                    <Text style={styles.reviewNumber}>P{index + 1}</Text>
                    <Text style={[
                      styles.reviewStatus,
                      answer.isCorrect ? styles.reviewStatusCorrect : styles.reviewStatusIncorrect
                    ]}>
                      {answer.isCorrect ? 'Correta' : 'Incorreta / Sem tempo'}
                    </Text>
                  </View>
                  <Text style={styles.reviewQuestionText}>
                    {answer.question.question}
                  </Text>
                  <Text style={styles.reviewCorrectAnswer}>
                    Resposta: <Text style={{ fontWeight: '600' }}>{answer.question.options[answer.question.answerIndex]}</Text>
                  </Text>
                  {!answer.isCorrect && answer.selectedIdx !== null && (
                    <Text style={styles.reviewYourAnswer}>
                      Sua escolha: {answer.question.options[answer.selectedIdx]}
                    </Text>
                  )}
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={restartGame}>
              <Text style={styles.primaryButtonText}>Jogar Novamente 🔄</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

      </View>
    </SafeAreaView>
  );
}
