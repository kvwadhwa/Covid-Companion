import React, { useEffect as UF, useState as US } from 'react'
import country from "../country_name.json"
import { View, Text, SafeAreaView, StatusBar, TextInput, Image, TouchableOpacity, Modal, Animated, ScrollView, StyleSheet } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import BSSS from "react-native-bootstrap-styles"
import axios from "axios";
const { width, height } = Dimensions.get('window');
import csvToJson from "csvtojson"

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

const VaccinationTracker = () => {

    const { s, c } = bs4
    const navigation = useNavigation()
    const [pcode, setPCode] = US(null)
    const [vaccData, setVaccData] = US(null)
    const [alert, setAlert] = US(null)
    const [isLoading, setIsLoading] = US(false)
    const [statusData, setStatusData] = US(null)

    const getVaccinationData = () => {
        setIsLoading(true)
        axios.get("https://31c1-108-30-80-117.ngrok.io" + "/track?" + "postal_code=" + pcode)
            .then(response => {
                setIsLoading(false)
                if (response.data.success) {
                    setVaccData(response.data)
                    setAlert(null)
                } else {
                    setAlert("vaccination data fetch failed")
                }
            })
            .catch(error => {
                setIsLoading(false)
                setAlert(error.toString())
            })
    }

    const getVaccinationStatus = async () => {
        try {

            const res = await axios.get("https://health-infobase.canada.ca/src/data/covidLive/vaccination-coverage-overall.csv")

            if (res.status != 200) throw Error("vaccination status fetch failed")

            const csvdata = await csvToJson().fromString(res.data)

            // console.log("============= ", csvdata.splice((csvdata.length - 10)))
            setStatusData(csvdata.splice((csvdata.length - 10)).reverse())
        } catch (error) {
            setStatusData(null)
            setAlert(error.toString())
        }
    }

    UF(() => {
        getVaccinationStatus()
    }, [])

    const renderNextButton = () => {

        return (
            <View>
                {/* alert */}
                {
                    alert &&
                    <View style={{ marginTop: 10, width: '100%', backgroundColor: COLORS.white, padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 17, color: COLORS.error, textAlign: 'center' }}>{alert}</Text>
                    </View>
                }

                {/* postal code input form */}
                <View style={{ marginTop: 5, width: '100%', backgroundColor: COLORS.accent, padding: 10, borderRadius: 5 }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center', marginBottom: 5 }}>Enter your postal code</Text>
                    <TextInput style={{ fontSize: 25, backgroundColor: COLORS.white, color: COLORS.black, textAlign: 'center' }} onChange={(e) => setPCode(e.nativeEvent.text)}></TextInput>
                    <Text style={{ fontSize: 15, color: COLORS.white }}>postal should be of  6 characters</Text>
                    <View style={[s.formGroup]}>
                        <TouchableOpacity
                            onPress={() => {
                                getVaccinationData()
                                setIsLoading(true)
                            }}
                            style={{ marginTop: 10, width: '100%', backgroundColor: COLORS.background, padding: 10, borderRadius: 5 }}
                        >
                            <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Fetch</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* display vaccination data */}
                <View style={{ marginTop: 5, fontSize: 20, textAlign: 'center', alignContent: "center", alignItems: "center", width: "100%" }}>
                    {
                        vaccData &&
                        <View style={{ width: "100%", backgroundColor: COLORS.white, borderRadius: 10 }}>
                            <View style={[s.cardBody]}>
                                <Text style={[s.text, s.h3, s.cardTitle]}>Latest Vaccination Availability</Text>
                                <Text style={[s.text, s.h3, s.cardTitle]}>For Canada</Text>
                                <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>PHU: {vaccData.unit}</Text>
                                <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>{vaccData.texts[0]}</Text>
                                <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>{vaccData.texts[1]} {vaccData.texts[2]}</Text>
                            </View>
                        </View>
                    }
                </View>
                {/* vaccination tracker */}
                <View style={{ marginTop: 10, width: '100%', backgroundColor: COLORS.accent, padding: 10, borderRadius: 5 }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center', marginBottom: 5 }}>Get Latest Vaccination Status</Text>
                    <View style={[s.formGroup]}>
                        <TouchableOpacity
                            onPress={() => {
                                getVaccinationStatus()
                                setIsLoading(true)
                            }}
                            style={{ marginTop: 10, width: '100%', backgroundColor: COLORS.background, padding: 10, borderRadius: 5 }}
                        >
                            <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* display vaccination data */}
                <View style={{ marginTop: 5, fontSize: 20, textAlign: 'center', alignContent: "center", alignItems: "center", width: "100%" }}>
                    {
                        statusData &&
                        statusData.map((itm, idx) => (
                            <View key={idx} style={{ width: "100%", backgroundColor: COLORS.white, borderRadius: 10, margin: 5 }}>
                                <View style={[s.cardBody]}>
                                    <Text style={[s.text, s.h3, s.cardTitle]}>Last updated on {itm.week_end}</Text>
                                    <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>First Dose : {itm.prop_atleast1dose}%</Text>
                                    <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>First Dose Total : {itm.numtotal_atleast1dose}</Text>
                                    <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>Fully Vaccinated : {itm.prop_fully}%</Text>
                                    <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>Fully Vaccinated Total : {itm.numtotal_fully}</Text>
                                </View>
                            </View>
                        ))
                    }
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
                    paddingHorizontal: 16,
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

export default VaccinationTracker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})