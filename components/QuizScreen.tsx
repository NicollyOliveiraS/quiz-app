import { useRef, useEffect } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Question } from '../app/index';
import { styles } from './QuizScreen.styles';

const backgroundImage = require('../assets/img/fundo.jpg');
const logoImage = require('../assets/img/logo.png');

type QuizScreenProps = {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  selectedAnswerIndex: number | null;
  isOptionsDisabled: boolean;
  onOptionPress: (answerIndex: number) => void;
  onNextQuestion: () => void;
};

export default function QuizScreen({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  score,
  selectedAnswerIndex,
  isOptionsDisabled,
  onOptionPress,
}: QuizScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Run entrance animation when question ID changes
  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    shakeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentQuestion.id, fadeAnim, slideAnim, shakeAnim]);

  // Run shake animation on incorrect answer selection
  useEffect(() => {
    if (selectedAnswerIndex !== null && selectedAnswerIndex !== currentQuestion.answerIndex) {
      shakeAnim.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [selectedAnswerIndex, currentQuestion.answerIndex, shakeAnim]);

  const getOptionStyle = (optionIndex: number) => {
    if (selectedAnswerIndex === null) {
      return null;
    }

    if (optionIndex === currentQuestion.answerIndex) {
      return styles.optionCorrect;
    }

    if (optionIndex === selectedAnswerIndex) {
      return styles.optionIncorrect;
    }

    return styles.optionDimmed;
  };

  const getOptionTextStyle = (optionIndex: number) => {
    if (selectedAnswerIndex === null) {
      return null;
    }

    if (optionIndex === currentQuestion.answerIndex) {
      return styles.optionTextCorrect;
    }

    if (optionIndex === selectedAnswerIndex) {
      return styles.optionTextIncorrect;
    }

    return null;
  };

  const isCorrect =
    selectedAnswerIndex === currentQuestion.answerIndex;

  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.backgroundOverlay}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#081225"
          />

          <View style={styles.gameContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.header}>
              <View>
                <Text style={styles.questionProgress}>
                  Questão {currentQuestionIndex + 1} de{' '}
                  {totalQuestions}
                </Text>

                <Text style={styles.category}>
                  {currentQuestion.category}
                </Text>
              </View>

              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  {score} {score === 1 ? 'ponto' : 'pontos'}
                </Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>

            <ScrollView
              style={styles.quizScroll}
              contentContainerStyle={styles.quizContent}
              showsVerticalScrollIndicator={false}
            >
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { translateX: shakeAnim },
                  ],
                  width: '100%',
                }}
              >
                <View style={styles.questionCard}>
                  <Text style={styles.questionText}>
                    {currentQuestion.question}
                  </Text>
                </View>

                <View style={styles.optionsContainer}>
                  {currentQuestion.options.map(
                    (option, optionIndex) => (
                      <TouchableOpacity
                        key={`${currentQuestion.id}-${optionIndex}`}
                        style={[
                          styles.option,
                          getOptionStyle(optionIndex),
                        ]}
                        activeOpacity={0.75}
                        disabled={isOptionsDisabled}
                        onPress={() =>
                          onOptionPress(optionIndex)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            getOptionTextStyle(optionIndex),
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>

                {selectedAnswerIndex !== null && (
                  <View style={styles.feedbackCard}>
                    <Text
                      style={[
                        styles.feedbackTitle,
                        isCorrect
                          ? styles.correctFeedbackTitle
                          : styles.incorrectFeedbackTitle,
                      ]}
                    >
                      {isCorrect
                        ? 'Resposta correta'
                        : 'Resposta incorreta'}
                    </Text>

                    <Text style={styles.explanationText}>
                      {currentQuestion.explanation}
                    </Text>
                  </View>
                )}
              </Animated.View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}