import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import { Provider } from './context/ToDoContext';
import DetailScreen from './screens/DetailScreen';
import { AntDesign } from "@expo/vector-icons"
import EditScreen from './screens/EditScreen';
import { EvilIcons } from "@expo/vector-icons"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: "To Do App" }}>

          <Stack.Screen name='Home Screen' component={HomeScreen} options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Create Screen")
                }}
              >
                <AntDesign name='plus' size={24} color="black" />
              </TouchableOpacity>
            )
          })} />

          <Stack.Screen name='Create Screen' component={CreateScreen} />

          <Stack.Screen name='Detail Screen' component={DetailScreen} options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity

                onPress={() => {
                  navigation.navigate("Edit Screen", {id: route.params.id})
                }}
              >
                <EvilIcons name='pencil' size={35} color="black" />

              </TouchableOpacity>
            )
          })} />

          <Stack.Screen name='Edit Screen' component={EditScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
