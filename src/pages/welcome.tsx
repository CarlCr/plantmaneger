import React from 'react'
import { 
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    View
} from 'react-native'
import wateringImg from '../assets/watering.png'
import {Feather} from '@expo/vector-icons'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core'
export function Welcome(){

    const navigation = useNavigation()

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie as {'\n'}
                    suas plantas {'\n'}
                    de forma fácil
                </Text>
                <Image 
                    source={wateringImg} 
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.subTitle}>
                    Não esqueça mais de regar as suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleStart}
                >
                        <Feather 
                            name="chevron-right"
                            style={styles.buttonIcon}
                        />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex:1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title :{
        fontSize: 28,
        textAlign: 'center',
        marginTop:38,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal:20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image:{
         height: Dimensions.get('window').width * 0.7,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height:56,
        width: 56,
        marginBottom: 10,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32
    },
})
