import React, {useState,useEffect} from 'react'

import {
    StyleSheet,
    Alert,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import {SvgFromUri} from 'react-native-svg'
import {useRoute, useNavigation} from '@react-navigation/core'
import DateTimePicker, {Event} from '@react-native-community/datetimepicker'
import {format, isBefore } from 'date-fns'
import { PlantsProps, savePlant } from '../libs/storage'

import WateringDropImg from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


interface Params {
    plant: PlantsProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

    const  route = useRoute()
    const {plant} = route.params as  Params 

    const navigation = useNavigation()

    function handleChangeTime(event: Event, dateTime: Date| undefined){
        if(Platform.OS==='android'){
            setShowDatePicker(oldState => !oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if(dateTime)
            setSelectedDateTime(dateTime)
    }
 
    function handleOpenDateTimerPickerForAndroid(){
        setShowDatePicker(oldState=>!oldState)
    }

    async function handleSave(){
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })
            navigation.navigate('Confirmation',{
                title: 'Tudo certo',
                subTitle: 'Fique calmo, que sempre vamos lembrar você de cuidar  da sua planta com muito cuidado.',
                buttonTitle: 'Muito Obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants'
            })
        } catch (error) {
            Alert.alert('Não possível salvar. 🙁')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri 
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>

                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image 
                            source={WateringDropImg}
                            style={styles.tipImg}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado
                    </Text>

                    { showDatePicker &&(
                        <DateTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display='spinner'
                        onChange={handleChangeTime}
                        />
                    )}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity 
                                style={styles.dateTimePickerButton}
                                onPress={handleOpenDateTimerPickerForAndroid}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {
                                        `Alterar ${format(selectedDateTime, 'HH:mm')}`
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() ||20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize:24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImg: {
        width:56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize:14,
        marginBottom: 5
    },
    dateTimePickerButton:{
        width:'100%',
        alignItems: 'center',
        paddingVertical: 40,
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
    dateTimePickerText: {

    }

})