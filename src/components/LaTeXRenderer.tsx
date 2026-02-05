import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

interface LaTeXProps {
    latex: string;
    style?: StyleProp<ViewStyle>;
}

export const LaTeXRenderer =
    requireNativeComponent<LaTeXProps>('LaTeXView');
