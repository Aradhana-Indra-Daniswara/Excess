import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function AppText({ children, size, color, fontFamily, style }) {

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Black': require('../../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text style={{
      fontFamily: fontFamily || 'Montserrat-Regular',
      fontSize: size || 16,
      color: color || 'black',
      ...style
    }}>{children}</Text>
  )
}