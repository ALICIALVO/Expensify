// import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
// import { StyleSheet, Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//context: 
import ExpensesContextProvider from "./store/expenses-context";
//colors:
import Colors from "./constants/colors";

//Screen Components:
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpense from "./screens/ManageExpense";

//UI components:
import IconButton from "./components/UI/IconButton";

const ButtomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function ExpensesOverview() {
  return (
    <ButtomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary600 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary600 },
        tabBarActiveTintColor: Colors.primary200,
        tabBarInactiveTintColor: Colors.primary900,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <ButtomTabs.Screen
        name="RecentExpensesScreen"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />
      <ButtomTabs.Screen
        name="AllExpensesScreen"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </ButtomTabs.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep splash screen visible until fonts are loaded
  }

  return (
    <>
      <StatusBar style="light" />
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary600 },
            headerTintColor: 'white',
            
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
            presentation: 'modal',
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}


