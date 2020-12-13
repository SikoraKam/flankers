import { StyleSheet } from 'react-native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

export const theme = {
  ...PaperDefaultTheme,
  colors: {
    primary: '#F4B740',
    secondary: '#FFD789',
    background: {
      lightGray: '#F6F6F6',
      darkGray: '#E8E8E8',
      white: '#FFFFFF',
    },
    error: '#ff0000',
    black: '#000',
    white: '#fff',
  },
  headerOptions: {
    title: '',
    headerStyle: {
      backgroundColor: '#F4B740',
      height: 55,
      elevation: 0,
    },
    headerTintColor: '#FFFFFF',
  },
};

export const TextStyle = StyleSheet.create({
  noteH1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noteH2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noteH3: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
