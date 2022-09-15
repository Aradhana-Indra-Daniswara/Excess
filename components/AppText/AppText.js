import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function AppText({ children, size, color, fontFamily, style }) {

  const [fontsLoaded] = useFonts({
    'OpenSauceSans-Regular': require('../../assets/fonts/OpenSauceSans-Regular.ttf'),
    'OpenSauceSans-Medium': require('../../assets/fonts/OpenSauceSans-Medium.ttf'),
    'OpenSauceSans-SemiBold': require('../../assets/fonts/OpenSauceSans-SemiBold.ttf'),
    'OpenSauceSans-Bold': require('../../assets/fonts/OpenSauceSans-Bold.ttf'),
    'OpenSauceSans-ExtraBold': require('../../assets/fonts/OpenSauceSans-ExtraBold.ttf'),
    'OpenSauceSans-Black': require('../../assets/fonts/OpenSauceSans-Black.ttf'),
    'OpenSauceSans-Light': require('../../assets/fonts/OpenSauceSans-Light.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text style={{
      fontFamily: fontFamily || 'OpenSauceSans-Regular',
      fontSize: size || 16,
      color: color || 'black',
      ...style
    }}>{children}</Text>
  )
}