import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({

  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primary700,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: Colors.primary500,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary600,
    borderRadius: 4,
  },
});
