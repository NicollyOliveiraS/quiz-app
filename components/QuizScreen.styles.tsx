import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  backgroundOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },

  gameContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 20,
  },

  logoContainer: {
    width: "100%",
    maxWidth: 850,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  logo: {
    width: 190,
    height: 65,
  },

  header: {
    width: "100%",
    maxWidth: 850,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  questionProgress: {
    color: "#D1D9E6",
    fontSize: 14,
    fontWeight: "600",
  },

  category: {
    color: "#E5A93C",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 3,
  },

  scoreContainer: {
    backgroundColor: "rgba(22, 34, 57, 0.95)",
    borderWidth: 1,
    borderColor: "#E5A93C",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },

  scoreText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  progressTrack: {
    width: "100%",
    maxWidth: 850,
    height: 7,
    backgroundColor: "rgba(36, 52, 79, 0.95)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#E5A93C",
    borderRadius: 4,
  },

  quizScroll: {
    width: "100%",
    maxWidth: 850,
    alignSelf: "center",
  },

  quizContent: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },

  questionCard: {
    width: "100%",
    minHeight: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(22, 34, 57, 0.95)",
    borderWidth: 1,
    borderColor: "#344663",
    borderRadius: 16,
    padding: 24,
    marginBottom: 18,
  },

  questionText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 28,
    textAlign: "center",
  },

  optionsContainer: {
    width: "100%",
    gap: 6,
    marginBottom: 16,
  },

  option: {
    width: "100%",
    minHeight: 58,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(22, 34, 57, 0.95)",
    borderWidth: 1,
    borderColor: "#344663",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  optionText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  optionCorrect: {
    backgroundColor: "rgba(27, 62, 44, 0.96)",
    borderColor: "#4CD137",
    borderWidth: 2,
  },

  optionIncorrect: {
    backgroundColor: "rgba(62, 28, 28, 0.96)",
    borderColor: "#FF5252",
    borderWidth: 2,
  },

  optionDimmed: {
    opacity: 0.5,
  },

  optionTextCorrect: {
    color: "#4CD137",
    fontWeight: "bold",
  },

  optionTextIncorrect: {
    color: "#FF6B6B",
    fontWeight: "bold",
  },

  feedbackCard: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(29, 42, 68, 0.97)",
    borderLeftWidth: 4,
    borderLeftColor: "#E5A93C",
    borderRadius: 12,
    padding: 16,
  },

  feedbackTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 7,
  },

  correctFeedbackTitle: {
    color: "#4CD137",
  },

  incorrectFeedbackTitle: {
    color: "#FF6B6B",
  },

  explanationText: {
    color: "#C4CDDA",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  nextButton: {
    width: "100%",
    maxWidth: 850,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#E5A93C",
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 8,
  },

  nextButtonText: {
    color: "#081225",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
