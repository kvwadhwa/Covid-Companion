import React from 'react' 
import { useEffect as  UF, useState as US } from 'react'
import { Picker } from '@react-native-picker/picker';
import { LineChart } from "react-native-chart-kit"
import country from "../country_name.json"
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import BSSS from "react-native-bootstrap-styles"
const { width, height } = Dimensions.get('window');

const bs4 = new BSSS()

const api = 
    {
        'host': '',
        'key': ''
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

const SIZES = {
    base: 10,
    width,
    height
}

const CovidTrackerScreen = () => {

    const navigation = useNavigation()

    const { s, c } = bs4
    const screenWidth = Dimensions.get("window").width;

    const [countryData, setCountryData] = US(null)
    const [cname, setCName] = US("WORLD")
    const [alert, setAlert] = US(null)

    const getCovidData = () => {
        var axios = require("axios").default;
        var options = {}
        if (cname === "WORLD") {
            options = {
                method: 'GET',
                url: 'https://covid-19-data.p.rapidapi.com/totals',
                params: { format: 'json' },
                headers: {
                    'x-rapidapi-host': api.host,
                    'x-rapidapi-key': api.key
                }
            };
        } else {
            options = {
                method: 'GET',
                url: 'https://covid-19-data.p.rapidapi.com/country/code',
                params: { code: cname },
                headers: {
                    'x-rapidapi-host': api.host,
                    'x-rapidapi-key': api.key
                }
            };
        }
        axios.request(options).then(function (response) {
            if (response.data.length > 0) {
                setCountryData(response.data[0])
                setAlert(null)
            } else {
                setCountryData(null)
                setAlert("Country not found")
            }
        }).catch(function (error) {
            setAlert(error.toString())
            console.error(error);
        });
    }

    const renderNextButton = () => {

        return (
            <View>
                {/* alert */}
                {
                    alert &&
                    <View style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.white, padding: 20, borderRadius: 5 }}>
                        <Text style={{ fontSize: 20, color: COLORS.error, textAlign: 'center' }}>{alert}</Text>
                    </View>
                }
                {/* country name picker */}
                <View style={{ marginTop: 10, width: '100%', backgroundColor: COLORS.accent, padding: 10, borderRadius: 5 }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Select Country</Text>
                    <Picker
                        selectedValue={cname}
                        style={{ marginTop: 10, width: '100%', backgroundColor: COLORS.white, padding: 20, borderRadius: 5 }}
                        onValueChange={(itemValue, itemIndex) => setCName(itemValue)}
                    >
                        {
                            country.map((c, index) => {
                                return <Picker.Item key={index} label={c.name} value={c.code} />
                            })
                        }
                    </Picker>
                </View>
                {/* refresh button */}
                <View>
                    <TouchableOpacity
                        onPress={getCovidData}
                        style={{ marginTop: 10, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5 }}
                    >
                        <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                {/* chart */}
                {
                    countryData &&
                    <View style={{marginTop: 10, fontSize: 20, textAlign: 'center', alignContent: "center", alignItems: "center"}}>
                    <LineChart
                        data={{
                            labels: ['Confirmed', 'Critical', 'Deaths', 'Recovered'],
                            datasets: [
                                {
                                    data: [
                                        countryData.confirmed / 100,
                                        countryData.critical / 100,
                                        countryData.deaths / 100,
                                        countryData.recovered / 100
                                    ],
                                },
                            ],
                        }}
                        width={width - 20} // from react-native
                        height={320}
                        // yAxisLabel={'Rs'}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            padding: 0
                        }}
                    />
                    </View>
                }
                {/* chart data */}
                {
                    countryData &&
                    <View style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.white, padding: 20, borderRadius: 5 }}>
                        <View style={[s.cardBody]}>
                            <Text style={[s.text, s.h3, s.cardTitle]}>COVID 19 Data</Text>
                            <Text style={[s.text, s.h3, s.cardTitle]}>{countryData.country || "World"}</Text>
                            <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>Confirmed: {countryData.confirmed}</Text>
                            <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>Critical: {countryData.critical}</Text>
                            <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>Deaths: {countryData.deaths}</Text>
                            <Text style={[s.text, s.h4, s.cardSubtitle, s.p1]}>Recovered: {countryData.recovered}</Text>
                            <Text style={[s.text, s.h5, s.cardSubtitle, s.textMuted, s.p1]}>Last updated: {(new Date(countryData.lastUpdate)).getDate()} -
                                {(new Date(countryData.lastUpdate)).getMonth()} -
                                {(new Date(countryData.lastUpdate)).getFullYear()}
                            </Text>
                        </View>
                    </View>
                }

                {/* <View style={{
                    marginTop: 0,
                    flex: 1,
                    paddingVertical: 40,
                    paddingHorizontal: 16,
                    backgroundColor: COLORS.background,
                    position: 'relative'
                }}> */}
                    <TouchableOpacity
                        onPress={() => navigation.replace('Home')}
                        style={{
                            marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                        }}>
                        <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Go Back</Text>
                    </TouchableOpacity>
                {/* </View> */}
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

export default CovidTrackerScreen