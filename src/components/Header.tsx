import React, {useState, useEffect} from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

import UserImg from '../assets/JirenSuper.jpeg'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
    const [userName, setUserName] = useState<string>()

    useEffect(() => {
        async function loadStorageUserName() {
            const  user = await AsyncStorage.getItem('@plantmaneger:user')
            setUserName(user || '')
        }

        loadStorageUserName()

    }, [])
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>
                    {userName}
                </Text>
            </View>
            <Image source={UserImg} style={styles.userImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:20,
        marginTop: getStatusBarHeight(),
    },
    userImage :{
        width: 70,
        height: 70,
        borderRadius: 35
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})