import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import Home from "./Home/Home";
import Activity from "./Activity/Activity";
import Profile from './Profile/Profile';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
const Tab = createBottomTabNavigator();

// Screens
const homeName = 'Home';
const activityName = 'Activity';
const profileName = 'Profile';

export default function MainNavigator() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;
          if (routeName === homeName) {
            iconName = focused ? 'home' : 'home-outline'
          }
          else if (routeName === activityName) {
            iconName = focused ? 'reader' : 'reader-outline'
          }
          else if (routeName === profileName) {
            iconName = focused ? 'person' : 'person-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        headerShown: false,
      })}
      // Navbar Styling
      tabBarOptions={{
        activeTintColor: '#59D9A8',
        inactiveTintColor: 'grey'
      }}
    >
      {/* Navbar Selections */}
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={activityName} component={Activity}
        options={{
          headerShown: true,
          headerTitleContainerStyle: 
          { 
            
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          }
        }} />
      <Tab.Screen name={profileName} component={Profile} options={{
        headerShown: true,
        headerTitleStyle: {
          fontFamily: 'Montserrat-Medium',
        }
      }} />
    </Tab.Navigator>
  )
}

