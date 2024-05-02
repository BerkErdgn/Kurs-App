import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllCourses from './screens/AllCourses';
import ManageCourse from './screens/ManageCourse';
import RecontCourses from './screens/RecontCourses';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CoursesContextProvider from './store/CoursesContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CoursesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CourseOverview" component={CourseOverview} options={{ headerShown: false }} />
          <Stack.Screen name="ManageCourse" component={ManageCourse} />
        </Stack.Navigator>
      </NavigationContainer>
    </CoursesContextProvider>
  );
}

function CourseOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={() => { navigation.navigate("ManageCourse") }}>
            <View style={styles.iconContainer}>
              <AntDesign name="plus" size={24} color="white" />
            </View>
          </Pressable>
        ),
        headerStyle: { backgroundColor: "pink" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "pink" },
        tabBarActiveTintColor: "darkblue"
      })}>
      <Tab.Screen name="RecontCourses" component={RecontCourses}
        options={
          {
            title: "Yakın zamanda Kaydolunanlar",
            tabBarLabel: "Yakın zamanda",
            tabBarIcon: ({ color, size }) => (<AntDesign name="hourglass" size={size} color={color} />)
          }
        } />
      <Tab.Screen name="AllCourses" component={AllCourses}
        options={
          {
            title: "Tüm kuslar",
            tabBarIcon: ({ color, size }) => (<Entypo name="list" size={size} color={color} />)
          }
        } />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  pressed: {
    options: 0.5,
  },
  iconContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  }
});
