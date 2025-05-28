import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitleContainer: {
    backgroundColor: "#00203F",
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#ADEFD1",
    borderWidth: 1,
  },
  pageTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    color: "#ADEFD1",
  },
});
export default globalStyles;
