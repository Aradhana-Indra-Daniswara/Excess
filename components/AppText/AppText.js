import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';
export default function AppText(props) {
  const { children, style, weight, onPress } = props;
  const [fontsLoaded] = useFonts({
    'OpenSauceSans-Regular': require('../../assets/fonts/OpenSauceSans-Regular.ttf'),
    'OpenSauceSans-Medium': require('../../assets/fonts/OpenSauceSans-Medium.ttf'),
    'OpenSauceSans-SemiBold': require('../../assets/fonts/OpenSauceSans-SemiBold.ttf'),
    'OpenSauceSans-Bold': require('../../assets/fonts/OpenSauceSans-Bold.ttf'),
    'OpenSauceSans-ExtraBold': require('../../assets/fonts/OpenSauceSans-ExtraBold.ttf'),
    'OpenSauceSans-Black': require('../../assets/fonts/OpenSauceSans-Black.ttf'),
    'OpenSauceSans-Light': require('../../assets/fonts/OpenSauceSans-Light.ttf'),
  });
  const weightFont = {
    '300': 'OpenSauceSans-Light',
    '400': 'OpenSauceSans-Regular',
    '500': 'OpenSauceSans-Medium',
    '600': 'OpenSauceSans-SemiBold',
    '700': 'OpenSauceSans-Bold',
    '800': 'OpenSauceSans-ExtraBold',
    '900': 'OpenSauceSans-Black',
  }
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text onPress={onPress ?? onPress} style={{
      fontFamily: weight ? weightFont[weight] : weightFont[400],
      ...style
    }}>{children}</Text>
  )
}

AppText.propTypes = {
  weight: PropTypes.string,
  onPress: PropTypes.func
}

