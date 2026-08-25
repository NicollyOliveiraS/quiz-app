import { useState } from 'react';

import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const backgroundImage = require('../assets/img/fundo.jpg');
const logoImage = require('../assets/img/logo.png');

type StartScreenProps = {
  totalAvailableQuestions: number;
  onStart: (questionCount: number) => void;
};

const QUESTION_COUNTS = [5, 10, 15, 20];

export default function StartScreen({
  totalAvailableQuestions,
  onStart,
}: StartScreenProps) {
  const [selectedQuestionCount, setSelectedQuestionCount] =
    useState(10);

  const handleStart = () => {
    onStart(selectedQuestionCount);
  };

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

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.startCard}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />

              <Text style={styles.subtitle}>
                DESAFIO DE CONHECIMENTOS
              </Text>

              <Text style={styles.description}>
                Escolha a quantidade de perguntas para começar
                o desafio.
              </Text>

              <View style={styles.selectionSection}>
               

                <View style={styles.optionsContainer}>
                  {QUESTION_COUNTS.map((count) => {
                    const isSelected =
                      selectedQuestionCount === count;

                    const isUnavailable =
                      count > totalAvailableQuestions;

                    return (
                      <TouchableOpacity
                        key={count}
                        style={[
                          styles.selectionButton,
                          isSelected &&
                            styles.selectionButtonActive,
                          isUnavailable &&
                            styles.selectionButtonDisabled,
                        ]}
                        activeOpacity={0.8}
                        disabled={isUnavailable}
                        onPress={() =>
                          setSelectedQuestionCount(count)
                        }
                      >
                        <Text
                          style={[
                            styles.selectionButtonNumber,
                            isSelected &&
                              styles.selectionButtonNumberActive,
                            isUnavailable &&
                              styles.selectionButtonTextDisabled,
                          ]}
                        >
                          {count}
                        </Text>

                        <Text
                          style={[
                            styles.selectionButtonLabel,
                            isSelected &&
                              styles.selectionButtonLabelActive,
                            isUnavailable &&
                              styles.selectionButtonTextDisabled,
                          ]}
                        >
                          perguntas
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

             

              <Text style={styles.instructions}>
                Escolha uma alternativa para cada pergunta. No
                final, você verá sua pontuação total.
              </Text>

              <TouchableOpacity
                style={styles.startButton}
                activeOpacity={0.8}
                onPress={handleStart}
              >
                <Text style={styles.startButtonText}>
                  Começar quiz
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  backgroundOverlay: {
    flex: 1,
    
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  scroll: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  startCard: {
    width: '100%',
    maxWidth: 580,
    alignItems: 'center',
    
    borderWidth: 1,
   
    borderRadius: 24,
    paddingHorizontal: 25,
    paddingVertical: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  logo: {
    width: 220,
    height: 90,
    marginBottom: 10,
  },

  video: {
    width: '100%',
    maxWidth: 360,
    aspectRatio: 16 / 9,
    marginBottom: 18,
  },

  subtitle: {
    color: '#B8C3D4',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 8,
  },

  title: {
    color: '#E5A93C',
    fontSize: 31,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },

  description: {
    maxWidth: 420,
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 25,
  },

  selectionSection: {
    width: '100%',
    marginBottom: 20,
  },

  selectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },

  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  selectionButton: {
    width: '48%',
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 34, 57, 0.82)',
    borderWidth: 1,
    borderColor: '#405473',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 8,
  },

  selectionButtonActive: {
    backgroundColor: 'rgba(229, 169, 60, 0.2)',
    borderColor: '#E5A93C',
    borderWidth: 2,
  },

  selectionButtonDisabled: {
    opacity: 0.35,
  },

  selectionButtonNumber: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  selectionButtonNumberActive: {
    color: '#E5A93C',
  },

  selectionButtonLabel: {
    color: '#AAB5C5',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },

  selectionButtonLabelActive: {
    color: '#E5A93C',
    fontWeight: '600',
  },

  selectionButtonTextDisabled: {
    color: '#7B8799',
  },

  summaryContainer: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: 'rgba(22, 34, 57, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(86, 111, 148, 0.55)',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  summaryLabel: {
    color: '#AAB5C5',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },

  summaryValue: {
    color: '#E5A93C',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  instructions: {
    maxWidth: 420,
    color: '#C4CDDA',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },

  startButton: {
    width: '100%',
    maxWidth: 330,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5A93C',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 25,
    shadowColor: '#E5A93C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  startButtonText: {
    color: '#081225',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});