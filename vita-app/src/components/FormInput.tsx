import {
  Text,
  TextInput,
  TextInputProps,
  View,
  TextStyle,
  ViewStyle,
} from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle | ViewStyle;
  containerStyle?: ViewStyle;
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
