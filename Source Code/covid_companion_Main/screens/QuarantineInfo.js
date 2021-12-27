import React from 'react'
import { View, Text, SafeAreaView, StatusBar, TextInput, Image, TouchableOpacity, Modal, Animated, ScrollView, StyleSheet } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/core'
import { auth, store } from '../firebase'
import BSSS from "react-native-bootstrap-styles"
import axios from "axios";
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

const html1 = "<div style='padding: 15; width: 80%; font-size: 40;'><p>The Government of Canada has put in place emergency measures to slow the introduction and spread of COVID-19 and variants in Canada. You <strong>must quarantine</strong><strong> for 14 days</strong>, provide accurate contact information and a quarantine plan, and monitor yourself for signs and symptoms as required by the <em>Minimizing the Risk of Exposure to COVID-19 in Canada Order (Quarantine, Isolation and Other Obligations)</em>.</p>\n" +
    "    <p>The Public Health Agency of Canada will be calling you to discuss your test results and/or to ensure you are complying with the quarantine measures. Please make sure the information you provide is accurate. Providing false information is an offense under the <em>Quarantine Act</em>.</p>\n" +
    "    <h2>You must</h2>\n" +
    "    <ul>\n" +
    "      <li><strong>quarantine without delay for 14 days</strong> starting on the day of your arrival as directed by a screening officer or quarantine officer.\n" +
    "        <ul>\n" +
    "          <li>If you have evidence of a positive COVID-19 molecular test that was taken 14 to 90 days prior to your arrival in Canada, go directly to your place of quarantine and remain there for the full 14-day quarantine period</li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <h2>Under the authorization of a quarantine officer: </h2>\n" +
    "    <ul>\n" +
    "      <li><strong>take</strong> two COVID-19 molecular tests in Canada.\n" +
    "        <ul>\n" +
    "          <li><strong>take</strong> the first test on arrival at the airport. Follow any specific directions provided by the quarantine officer.</li>\n" +
    "          <li><strong>get</strong> a COVID-19 test kit at the airport to take with you for use on Day 10</li>\n" +
    "          <li><strong>take</strong> the second test on Day 10 of your quarantine period using the self-administered kit provided (Certain travellers who arrive at Calgary International Airport will be required to take the second COVID-19 molecular test at a pharmacy and will be given specific directions about the second test at the airport.)</li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "      <li><strong>go</strong> directly from the airport to your pre-booked government-authorized accommodation (hotel).\n" +
    "        <ul>\n" +
    "          <li>You can use your private vehicle if it is parked in the airport parking lot and is within walking distance, or a designated shuttle for government-authorized hotels <strong></strong></li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "      <li><strong>remain</strong> in your hotel room until you receive your arrival test result.</li>\n" +
    "      <li><strong>if</strong> the on-arrival test result is<strong> negative, check out</strong> of the<strong></strong> hotel and<strong> go directly &nbsp;</strong>to your place of quarantine.</li>\n" +
    "      <li><strong>if</strong> you need to take public transportation (e.g. aircraft, bus, train, subway, taxi or ride-sharing service), wear a mask at all times and sanitize your hands frequently.</li>\n" +
    "      <li><strong>if</strong> your on-arrival test result is <strong>positive, invalid</strong> or <strong>indeterminate</strong>, await further instructions from a quarantine officer.</li>\n" +
    "      <li><strong>report</strong> your arrival at your place of quarantine within 48 hours after you arrive at your government-authorized hotel.\n" +
    "        <ul>\n" +
    "          <li>If you used ArriveCAN to enter Canada, continue to use it to report your arrival</li>\n" +
    "          <li>If you did not use ArriveCAN to enter Canada, or are unable to report through ArriveCAN for any reason, call 1-833-641-0343 to report arrival</li>\n" +
    "          <li>You must also report your daily COVID-19 symptom self-assessment until the end of your quarantine or your first reporting of symptoms</li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <p>Even if you receive a negative on-arrival test result, you must:</p>\n" +
    "    <ul>\n" +
    "      <li><strong>remain</strong> in quarantine. Your quarantine will end after the 14th day <strong>only if</strong> &nbsp;you get a negative test result from your Day 10 test\n" +
    "        <ul>\n" +
    "          <li><strong>remain</strong> in isolation if your<strong> day 10</strong> test result is positive. You must isolate for additional 14 days from the day your <strong>day 10</strong> test was taken if the <strong>day 10</strong> test result is positive.</li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "      <li><strong>respond</strong> to calls or visits from screening officers or law enforcement.</li>\n" +
    "      <li><strong>keep</strong> a copy of all your COVID-19 molecular test results. You may be asked to provide the information to the Government of Canada, the government of a province or territory or to the local public health authority during your quarantine period</li>\n" +
    "    </ul>\n" +
    "    <p>*Certain travellers who arrive at Calgary International Airport will be required to take the second COVID-19 molecular test at a pharmacy and will be given specific directions about the second test at the airport.</p>\n" +
    "    <h2>Public health measures to follow while in transit</h2>\n" +
    "    <ul>\n" +
    "      <li><strong>wear a well-constructed, well-fitting, non-medical mask while in transit</strong>,&nbsp;unless you are alone in a private vehicle or travelling only with the same people you entered Canada with</li>\n" +
    "      <li><strong>practice physical distancing of 2m</strong>&nbsp;whenever possible</li>\n" +
    "      <li><strong>sanitize</strong>&nbsp;your hands often and <strong>avoid</strong> touching surfaces</li>\n" +
    "    </ul>\n" +
    "    <p>If driving:</p>\n" +
    "    <ul>\n" +
    "      <li><strong>remain</strong>&nbsp;in the vehicle as much as possible: pay at the pump for gas and use drive through when you need food</li>\n" +
    "      <li><strong>avoid</strong> stops and contact with others</li>\n" +
    "    </ul></div>"

const QuarantineInfo = () => {

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

export default QuarantineInfo