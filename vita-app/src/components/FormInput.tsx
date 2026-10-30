import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function FormInput({
  label,
  labelStyle,
  inputStyle,
  containerStyle,
  secureTextEntry,
  ...textInputProps
}: FormInputProps) {
  // Só campos de senha (secureTextEntry) ganham o olhinho
  const isPassword = !!secureTextEntry;
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <View>
        <TextInput
          // paddingRight evita que o texto fique embaixo do olhinho
          style={[inputStyle, isPassword && styles.passwordInput]}
          secureTextEntry={isPassword && !passwordVisible}
          {...textInputProps}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible((prev) => !prev)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={
              passwordVisible ? "Ocultar senha" : "Mostrar senha"
            }
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B6B6B"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 13,
  },
});