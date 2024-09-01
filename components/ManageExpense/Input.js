import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export function Input({ label, style ,textInputConfig, invalid }) {

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline);
    }

    if(invalid){
      inputStyles.push(styles.invalidInput)
    }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary500,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary500,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: Colors.primary800,
    // marginHorizontal: 10,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: Colors.errorC1,
  },
  invalidInput: {
    backgroundColor: Colors.errorC2,
  }
});
