import { ReactNode, useRef } from "react";
import {
  Animated,
  Platform,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type AnimationType = "shake" | "spin";

interface AnimatedIconButtonProps {
  animation: AnimationType;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

// O driver nativo não existe na web
const useNativeDriver = Platform.OS !== "web";

export function AnimatedIconButton({
  animation,
  children,
  style,
  onPress,
}: AnimatedIconButtonProps) {
  const progress = useRef(new Animated.Value(0)).current;

  function playShake() {
    progress.setValue(0);
    Animated.sequence([
      Animated.timing(progress, { toValue: 1, duration: 80, useNativeDriver }),
      Animated.timing(progress, { toValue: -1, duration: 80, useNativeDriver }),
      Animated.timing(progress, { toValue: 1, duration: 80, useNativeDriver }),
      Animated.timing(progress, { toValue: -1, duration: 80, useNativeDriver }),
      Animated.timing(progress, { toValue: 0, duration: 80, useNativeDriver }),
    ]).start();
  }

  function playSpin() {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      useNativeDriver,
    }).start();
  }

  function handlePress() {
    if (animation === "shake") playShake();
    else playSpin();
    onPress?.();
  }

  const rotate =
    animation === "shake"
      ? progress.interpolate({
          inputRange: [-1, 1],
          outputRange: ["-20deg", "20deg"],
        })
      : progress.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        });

  return (
    <TouchableOpacity style={style} onPress={handlePress} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}
