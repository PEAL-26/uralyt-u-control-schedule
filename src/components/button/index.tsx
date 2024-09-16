import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
};

export function Button(props: Props) {
  const { text, children, style, textStyle, ...rest } = props;
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.7}
      {...rest}
    >
      {text && <Text style={textStyle}>{text}</Text>}
      {children}
    </TouchableOpacity>
  );
}
