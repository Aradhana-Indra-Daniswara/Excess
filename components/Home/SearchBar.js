import { View, TextInput } from "react-native";
import { useFonts } from 'expo-font';

import Search_icon from '../../assets/search_icon.svg'

export default function SearchBar({ placeholder }) {
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
    <View style={{
      flexDirection: 'row',
      alignSelf: 'center',
      width: '80%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 8,
      paddingHorizontal: 16,
      shadowColor: '#000',
      borderRadius: 100,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
    }}>
      <Search_icon height={32} width={32} />
      <TextInput style={{
        marginLeft: 8,
        fontFamily: 'Montserrat-Regular',
        width: '100%'
      }} placeholder={placeholder} />
    </View>
  )
}