import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions;

let generalStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "#000",
  },
  map: {
    width: width,
    flex: 1
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  actionSheet: {
    padding: 15
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  }
});

export default generalStyles;
