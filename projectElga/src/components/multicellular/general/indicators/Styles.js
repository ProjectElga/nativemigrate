import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  indicatorsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
    marginTop: 20,
    marginBottom: 20,
    flexDirection:"row",
    zIndex:1,
  },
  inActiveIndicator: {
    backgroundColor: "#1F9980",
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  activeIndicator: {
    backgroundColor: "#C4C4C4",
    width: 8,
    height: 8,
    borderRadius: 50,
  },
});
export default Styles;
