import React, { useState as US } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native'
import data from './QuestionData'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/core'
import { auth, store } from '../firebase'
const { width, height } = Dimensions.get('window');

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
const SYMPTONS = [
    "headache or muscle ache",
    "fatigue",
    "cough",
    "sore throat",
    "congested nose",
    "fever or chills",
    "nausea or vomiting",
    "difficulty or shortness in breathing",
    "diarrhea"
]

const SurveyScreen = () => {
    const navigation = useNavigation()
    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = US(0)
    const [currentOptionSelected, setCurrentOptionSelected] = US(null);
    const [correctOption, setCorrectOption] = US(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = US(false);
    const [score, setScore] = US(0)
    const [showNextButton, setShowNextButton] = US(false)
    const [showScoreModal, setShowScoreModal] = US(false)
    const [finalSymptoms, setFinalSymptoms] = US([])
    const [symptomatic, setSymptomatic] = US(false)

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            // Set Score
            setScore(score + 1)
        } else {
            // add data
            setFinalSymptoms(finalSymptoms.concat([SYMPTONS[currentQuestionIndex]]))
            setSymptomatic((score < 3) ? false : true)
        }
        // Show Next Button
        setShowNextButton(true)
    }

    const pushToStore = () => {
        const d = new Date()
        store.collection("history").add({
            user: auth.currentUser?.email,
            symptoms: finalSymptoms,
            symptomatic: symptomatic,
            last_updated: `${d.getDate()} - ${d.getMonth()} - ${d.getFullYear()}`
        }).then(res => {
            console.log("data updated successfully - " + res)
        })
            .catch(err => {
                console.log(err)
            })
    }
    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
            pushToStore()
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }



    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2 }}>{currentQuestionIndex + 1}</Text>
                    <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            key={option}
                            style={{
                                borderWidth: 3,
                                borderColor: option == currentOptionSelected
                                    ? COLORS.success
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.secondary + '40',
                                backgroundColor: option == correctOption
                                    ? COLORS.success + '20'
                                    : option == currentOptionSelected
                                        ? COLORS.error + '20'
                                        : COLORS.secondary + '20',
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option == correctOption ? (
                                    <View style={{
                                        // width: 30, height: 30, borderRadius: 30/2,
                                        // backgroundColor: COLORS.success,
                                        // justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    </View>
                                ) : option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Next</Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }


    const [progress, setProgress] = US(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                }, {
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }


    return (
        <ScrollView>
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

                    {/* ProgressBar */}
                    {renderProgressBar()}

                    {/* Question */}
                    {renderQuestion()}

                    {/* Options */}
                    {renderOptions()}

                    {/* Next Button */}
                    {renderNextButton()}

                    {/* Score Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showScoreModal}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                backgroundColor: COLORS.white,
                                width: '90%',
                                borderRadius: 20,
                                padding: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{score > (allQuestions.length - 1) ? 'You do not have any severe symptoms' : 'You seem not healthy, please check in hospital'}</Text>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginVertical: 20
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                                    }}>This information has been recorded in your history</Text>
                                    {/* <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ { allQuestions.length }</Text> */}
                                </View>
                                {/* Retry Quiz button */}
                                <TouchableOpacity
                                    onPress={restartQuiz}
                                    style={{
                                        backgroundColor: COLORS.accent,
                                        padding: 20, width: '100%', borderRadius: 20
                                    }}>
                                    <Text style={{
                                        textAlign: 'center', color: COLORS.white, fontSize: 20
                                    }}>Go Back!</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>



                </View>


            </SafeAreaView>
            <View style={{
                marginTop: 0,
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative'
            }}>
                <TouchableOpacity
                    onPress={() => navigation.replace('Home')}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Go Back</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

    )
}

export default SurveyScreen