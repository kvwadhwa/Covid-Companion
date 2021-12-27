import React from 'react'
import { View, Text, SafeAreaView, StatusBar, TextInput, Image, TouchableOpacity, Modal, Animated, ScrollView, StyleSheet } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import BSSS from "react-native-bootstrap-styles"
const { width, height } = Dimensions.get('window')
import RenderHTML from "react-native-render-html"

const bs4 = new BSSS()

const api = {
    host: "",
    key: ""
}

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

const html1 = "<div style='padding: 15; width: 80%; font-size: 40;'><h3>Provincial and territorial COVID-19 vaccination webpages</h3>\n" +
"        <ul>\n" +
"            <li><a href=\"https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery/covid-19-provincial-support/vaccines?\" rel=\"external\">British Columbia</a></li>\n" +
"            <li><a href=\"https://www.alberta.ca/covid19-vaccine.aspx?\" rel=\"external\">Alberta</a></li>\n" +
"            <li><a href=\"https://www.saskatchewan.ca/government/health-care-administration-and-provider-resources/treatment-procedures-and-guidelines/emerging-public-health-issues/2019-novel-coronavirus/covid-19-vaccine?\" rel=\"external\">Saskatchewan</a></li>\n" +
"            <li><a href=\"https://www.gov.mb.ca/covid19/vaccine/index.html?\" rel=\"external\">Manitoba</a></li>\n" +
"            <li><a href=\"https://covid-19.ontario.ca/covid-19-vaccines-ontario?\" rel=\"external\">Ontario</a></li>\n" +
"            <li><a href=\"https://www.quebec.ca/en/health/health-issues/a-z/2019-coronavirus/progress-of-the-covid-19-vaccination/?\" rel=\"external\">Quebec</a></li>\n" +
"            <li><a href=\"https://www.gov.nl.ca/covid-19/vaccine/?\" rel=\"external\">Newfoundland and Labrador</a></li>\n" +
"            <li><a href=\"https://www2.gnb.ca/content/gnb/en/corporate/promo/covid-19.html\" rel=\"external\">New Brunswick</a></li>\n" +
"            <li><a href=\"https://novascotia.ca/coronavirus/symptoms-and-testing/?%23vaccine=%23vaccine#vaccine\" rel=\"external\">Nova Scotia</a></li>\n" +
"            <li><a href=\"https://www.princeedwardisland.ca/en/topic/covid-19-vaccines\" rel=\"external\">Prince Edward Island</a></li>\n" +
"            <li><a href=\"https://yukon.ca/en/covid-19-vaccine\" rel=\"external\">Yukon</a></li>\n" +
"            <li><a href=\"https://www.gov.nt.ca/covid-19/en\" rel=\"external\">Northwest Territories</a></li>\n" +
"            <li><a href=\"https://www.gov.nu.ca/health/information/covid-19-vaccination\" rel=\"external\">Nunavut</a></li>\n" +
"        </ul></div>"

const VaccinationInfo = () => {

    const { s, c } = bs4
    const navigation = useNavigation()

    const renderNextButton = () => {

        return (
            <View>
                <View style={{ marginTop: 5, fontSize: 20, backgroundColor: COLORS.white, textAlign: 'center', alignContent: "center", alignItems: "center", width: "100%" }}>
                    <RenderHTML contentWidth={width} emSize={15} source={{ html: html1 }} />
                </View>

                <TouchableOpacity
                    onPress={() => navigation.replace('Home')}
                    style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={{}}>
            <SafeAreaView style={{
                flex: 1,
            }}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
                <View style={{
                    flex: 1,
                    paddingVertical: 40,
                    // paddingHorizontal: 16,
                    backgroundColor: COLORS.background,
                    position: 'relative'
                }}>
                    <Text style={{ marginBottom: 5, fontSize: 25, color: COLORS.white, textAlign: 'center' }}>
                        Currently logged in as: {auth.currentUser?.email}
                    </Text>
                    {renderNextButton()}
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}

export default VaccinationInfo