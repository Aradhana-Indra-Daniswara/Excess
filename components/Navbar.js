import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import Home from "./Home/Home";
const Tab = createBottomTabNavigator();

// Screens
const homeName = 'Home';
const activityName = 'Activity';
const profileName = 'Profile';

export default function Navbar() {
  return (
    <NavigationContainer>
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
          }
        })}
        // Navbar Styling
        tabBarOptions={{
          activeTintColor: '#59D9A8',
          inactiveTintColor: 'grey'
        }}
      >
        {/* Navbar Selections */}
        <Tab.Screen name={homeName} component={Home} />


      </Tab.Navigator>
    </NavigationContainer>
  )
}

