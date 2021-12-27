import React, { useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/core'
const { width, height } = Dimensions.get('window');
import { auth } from '../firebase'

const COLORS = {
  primary: "#252c4a",
  secondary: '#1E90FF',
  accent: '#3498db',

  success: '#00C851',
  error: '#ff4444',

  black: "#171717",
  white: "#FFFFFF",
  background: "#252C4A"
}

SIZES = {
  base: 10,
  width,
  height
}

const HmScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  const renderNextButton = () => {

    return (
      <View>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Sign out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('CovidTracker')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Check Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('Survey')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Survey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('SurveyMultiple')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Survey Multiple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('History')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Check History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('TestTracker')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Test Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('TestHistory')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Test Report History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('VaccinationTracker')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Vaccination Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('QuarantineInfo')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Quarantine Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('VaccInfo')}
          style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Vaccination Information</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={{ height: height }}>
      <SafeAreaView style={{
        flex: 1
      }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: 'relative'
        }}>
          <Text style={{ fontSize: 25, color: COLORS.white, textAlign: 'center' }}>
            Currently logged in as: {auth.currentUser?.email}
          </Text>
          {renderNextButton()}
        </View>
      </SafeAreaView>
    </ScrollView>

  )
}

export default HmScreen