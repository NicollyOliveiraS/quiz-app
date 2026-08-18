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
const finalImage = require('../assets/img/final.jpg');

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

export default function ResultScreen({
  score,
  totalQuestions,
  onPlayAgain,
}: ResultScreenProps) {
  const percentage =
    totalQuestions > 0
      ? (score / totalQuestions) * 100
      : 0;

  const getResult = () => {
    if (percentage >= 85) {
      return {
        title: 'Fã de verdade',
        message:
          'Ótimo resultado! Você conhece muito bem a série.',
        color: '#E5A93C',
      };
    }

    if (percentage >= 60) {
      return {
        title: 'Mandou bem',
        message:
          'Você acertou boa parte das perguntas e mostrou que acompanha a série.',
        color: '#4CD137',
      };
    }

    if (percentage >= 30) {
      return {
        title: 'Quase lá',
        message:
          'Você conhece alguns detalhes, mas ainda pode melhorar o resultado.',
        color: '#4DA3FF',
      };
    }

    return {
      title: 'Vale tentar novamente',
      message:
        'Dessa vez não foi tão bem. Jogue novamente e tente superar sua pontuação.',
      color: '#FF8A65',
    };
  };

  const result = getResult();

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
            <View style={styles.resultCard}>
              <Image
                source={finalImage}
                style={styles.finalImage}
                resizeMode="cover"
              />

              <Text style={styles.resultLabel}>
                RESULTADO FINAL
              </Text>

              <Text
                style={[
                  styles.resultTitle,
                  { color: result.color },
                ]}
              >
                {result.title}
              </Text>

              <View style={styles.scoreContainer}>
                <Text style={styles.scoreValue}>
                  {score}
                </Text>

                <Text style={styles.scoreTotal}>
                  {' '}
                  / {totalQuestions}
                </Text>
              </View>

              <Text style={styles.scoreMessage}>
                Você acertou {score} de {totalQuestions}{' '}
                perguntas
              </Text>

              <View style={styles.percentageContainer}>
                <View style={styles.percentageTrack}>
                  <View
                    style={[
                      styles.percentageFill,
                      {
                        width: `${percentage}%`,
                        backgroundColor: result.color,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.percentageText}>
                  {Math.round(percentage)}% de acertos
                </Text>
              </View>

              <Text style={styles.resultDescription}>
                {result.message}
              </Text>

              <TouchableOpacity
                style={styles.playAgainButton}
                activeOpacity={0.8}
                onPress={onPlayAgain}
              >
                <Text style={styles.playAgainButtonText}>
                  Jogar novamente
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    paddingVertical: 20,
  },

  resultCard: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',

    // Azul um pouco transparente
    backgroundColor: 'rgba(13, 25, 44, 0.40)',

    borderWidth: 1,
    borderColor: 'rgba(86, 111, 148, 0.7)',
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 22,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
  },

  finalImage: {
    width: '100%',

    // Altura fixa para impedir que fique enorme
    height: 170,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },

  resultLabel: {
    color: '#C1CAD8',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 7,
  },

  resultTitle: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 18,
  },

  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: 'rgba(22, 34, 57, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(86, 111, 148, 0.65)',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginBottom: 14,
  },

  scoreValue: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },

  scoreTotal: {
    color: '#C1CAD8',
    fontSize: 19,
    fontWeight: '600',
  },

  scoreMessage: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 18,
  },

  percentageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },

  percentageTrack: {
    width: '100%',
    height: 9,
    backgroundColor: 'rgba(36, 52, 79, 0.85)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 7,
  },

  percentageFill: {
    height: '100%',
    borderRadius: 5,
  },

  percentageText: {
    color: '#C1CAD8',
    fontSize: 12,
    fontWeight: '600',
  },

  resultDescription: {
    color: '#E1E6EE',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 22,
  },

  playAgainButton: {
    width: '100%',
    maxWidth: 320,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5A93C',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },

  playAgainButtonText: {
    color: '#081225',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});