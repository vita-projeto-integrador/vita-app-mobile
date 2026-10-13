import {
  Text,
  TextInput,
  TextInputProps,
  View,
  TextStyle,
  ViewStyle,
  StyleProp,
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
  ...textInputProps
}: FormInputProps) {
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput style={inputStyle} {...textInputProps} />
    </View>
  );
}