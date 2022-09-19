import React from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import SearchIcon_Gray from '../../assets/search_icon_gray.svg';
import CrossIcon_Gray from '../../assets/cross_icon_gray.svg';
import { colorStyles } from '../Styling/GlobalStyles';
import { useFonts } from 'expo-font';

export default function SearchVendor() {
  const [fontsLoaded] = useFonts({
    'OpenSauceSans-Regular': require('../../assets/fonts/OpenSauceSans-Regular.ttf'),
  });
  const placeholder = 'Cheap Snack?'
  if(!fontsLoaded){
    return null;
  }
  return (
    <SafeAreaView>
      <View style={{
        height: 40,
        backgroundColor: 'white',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colorStyles[80],
        borderRadius: 5,
        paddingHorizontal: 10
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <SearchIcon_Gray />
          <TextInput style={{
            height: '100%',
            width: '85%',
            fontSize: 16,
            fontFamily: 'OpenSauceSans-Regular',
            marginLeft: 10,
          }}
          placeholder={placeholder} />
        </View>
        <CrossIcon_Gray />
      </View>
    </SafeAreaView>
  );
}
