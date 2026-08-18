import { useState } from 'react';

import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import StartScreen from '../components/StartScreen';

import QUESTIONS_RAW from '../constants/questoes.json';

export type Question = {
  id: string;
  category:
    | 'Geral'
    | 'Relacionamentos'
    | 'Esportes'
    | 'Sobrenatural';
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

type AppScreen = 'start' | 'quiz' | 'result';

const QUESTIONS = QUESTIONS_RAW as Question[];

const shuffleArray = <T,>(items: T[]): T[] => {
  const shuffled = [...items];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index--
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

export default function HomePage() {
  const [screen, setScreen] =
    useState<AppScreen>('start');

  const [
    selectedQuestionCount,
    setSelectedQuestionCount,
  ] = useState(10);

  const [questions, setQuestions] = useState<Question[]>(
    () => shuffleArray(QUESTIONS).slice(0, 10)
  );

  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [
    selectedAnswerIndex,
    setSelectedAnswerIndex,
  ] = useState<number | null>(null);

  const [
    isOptionsDisabled,
    setIsOptionsDisabled,
  ] = useState(false);

  const [score, setScore] = useState(0);

  const currentQuestion =
    questions[currentQuestionIndex];

  const prepareQuiz = (questionCount: number) => {
    const safeQuestionCount = Math.min(
      questionCount,
      QUESTIONS.length
    );

    const selectedQuestions = shuffleArray(
      QUESTIONS
    ).slice(0, safeQuestionCount);

    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsOptionsDisabled(false);
    setScore(0);
  };

  const handleStart = (questionCount: number) => {
    setSelectedQuestionCount(questionCount);
    prepareQuiz(questionCount);
    setScreen('quiz');
  };

  const handleOptionPress = (
    answerIndex: number
  ) => {
    if (isOptionsDisabled || !currentQuestion) {
      return;
    }

    if (
      answerIndex === currentQuestion.answerIndex
    ) {
      setScore(
        (previousScore) => previousScore + 1
      );
    }

    setSelectedAnswerIndex(answerIndex);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    const hasNextQuestion =
      currentQuestionIndex <
      questions.length - 1;

    if (hasNextQuestion) {
      setCurrentQuestionIndex(
        (previousIndex) => previousIndex + 1
      );

      setSelectedAnswerIndex(null);
      setIsOptionsDisabled(false);
    } else {
      setScreen('result');
    }
  };

  const handlePlayAgain = () => {
    prepareQuiz(selectedQuestionCount);
    setScreen('quiz');
  };

  if (screen === 'start') {
    return (
      <StartScreen
        totalAvailableQuestions={
          QUESTIONS.length
        }
        onStart={handleStart}
      />
    );
  }

  if (screen === 'result') {
    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <QuizScreen
      currentQuestion={currentQuestion}
      currentQuestionIndex={
        currentQuestionIndex
      }
      totalQuestions={questions.length}
      score={score}
      selectedAnswerIndex={
        selectedAnswerIndex
      }
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
    />
  );
}