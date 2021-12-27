import React from 'react'
import { useEffect as UF, useState as US } from 'react'
import { ScrollView, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/core'
import { auth, store } from '../firebase'
import BSSS from "react-native-bootstrap-styles"
import axios from "axios";
const { width, height } = Dimensions.get('window');

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

const CheckHistory = () => {

    const { s, c } = bs4
    const navigation = useNavigation()
    const [snap, setSnap] = US(null)
    const [alert, setAlert] = US(null)

    const getData = () => {
        store.collection("history").get({}).then(snapShot => {
            setSnap(snapShot)
        })
            .catch(err => setAlert(err.toString()))
    }

    UF(() => {
        getData()
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

                {/* display firestore data */}
                {
                    snap &&
                    <View style={{ marginTop: 5, fontSize: 20, textAlign: 'center', alignContent: "center", alignItems: "center", width: "100%" }}>
                        {
                            snap &&
                            snap.docs.map((doc, key) => (
                                <View key={key} style={{ width: "100%", backgroundColor: COLORS.white, borderRadius: 10, marginVertical: 5 }}>
                                    <View style={[s.cardBody]}>
                                        <Text style={[s.text, s.h5, s.cardTitle]}>For {doc.data().user}</Text>
                                        <Text style={[s.text, s.h5, s.cardSubtitle, s.p1]}>Symptomatic: {`${doc.data().symptomatic}`}</Text>
                                        <Text style={[s.text, s.h5, s.cardSubtitle, s.p1]}>Last Updated: {doc.data().last_updated}</Text>
                                        <Text style={[s.text, s.h5, s.cardSubtitle, s.p1]}>Symptoms recorded:</Text>
                                        <Text style={[s.text, s.h6, s.cardText, s.pX2,]}>
                                            {
                                                doc.data().symptoms.map((sym, idx) => {
                                                    return <Text key={idx} style={{ paddingHorizontal: 1 }}>{sym} { }</Text>
                                                })
                                            }
                                        </Text>
                                    </View>
                                </View>
                            ))

                        }
                    </View>
                }
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

export default CheckHistory