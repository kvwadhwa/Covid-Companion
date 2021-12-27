import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CovidTrackerScreen from './screens/CovidTrackerScreen';
import SurveyMultipleScreen from './screens/SurveyMultipleScreen';
import TestTracker from './screens/TestTracker';
import VaccinationTracker from './screens/VaccinationTracker';
import SurveyScreen from './screens/SurveyScreen';
import CheckHistory from './screens/CheckHistroy';
import ReportHistory from './screens/ReportHistory';
import QuarantineInfo from './screens/QuarantineInfo';
import VaccinationInfo from './screens/VaccinationInfo';
import LgScreen from './screens/LoginScreen';
import HmScreen from './screens/HomeScreen';

const Stk = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stk.Navigator>
        <Stk.Screen options={{ headerShown: false }} name="Login" component={LgScreen} />
        <Stk.Screen name="Home" component={HmScreen} />
        <Stk.Screen
          name="CovidTracker"
          component={CovidTrackerScreen}
          options={{
            headerTitle: "Covid Tracker",
          }}
        />
        <Stk.Screen
          name="Survey"
          component={SurveyScreen}
          options={{
            headerTitle: "Survey",
          }}
        />
        <Stk.Screen
          name="SurveyMultiple"
          component={SurveyMultipleScreen}
          options={{
            headerTitle: "Survey Multiple",
          }}
        />
        <Stk.Screen
          name="TestTracker"
          component={TestTracker}
          options={{
            headerTitle: "Test Tracker",
          }}
        />
        <Stk.Screen
          name="VaccinationTracker"
          component={VaccinationTracker}
          options={{
            headerTitle: "Vaccination Tracker",
          }}
        />
        <Stk.Screen
          name="History"
          component={CheckHistory}
          options={{
            headerTitle: "History Tracker",
          }}
        />
        <Stk.Screen
          name="TestHistory"
          component={ReportHistory}
          options={{
            headerTitle: "Test Report History",
          }}
        />
         <Stk.Screen
          name="QuarantineInfo"
          component={QuarantineInfo}
          options={{
            headerTitle: "General Quarantine Information",
          }}
        />
         <Stk.Screen
          name="VaccInfo"
          component={VaccinationInfo}
          options={{
            headerTitle: "General Vaccination Information",
          }}
        />
      </Stk.Navigator>
    </NavigationContainer>
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


// Features 
// Signup 
// Login / Logout
// COVID tracker 
// COVID tracker chart
// Survey form 
// Survey form for multiple user 
// Test Tracker 
// Vaccination status stracker 

// Firebase backend