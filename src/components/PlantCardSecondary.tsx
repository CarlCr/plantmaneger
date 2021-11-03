import React from 'react'

import  {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native'

import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {SvgFromUri} from 'react-native-svg'
import { Feather } from '@expo/vector-icons'


import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantProps extends  RectButtonProps{
    data: {
        name: string
        photo: string,
        hour: string
    }
    handleRemove: () => void
}

export const  PlantCardSecondary = ({ data, handleRemove, ...rest} : PlantProps) => {
    return(
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white}/>
                        </RectButton> 
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
            style={styles.container}
            {...rest}>
                <SvgFromUri 
                    height={50}
                    width={50}
                    uri={data.photo}
            />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timelabel}>
                        Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: colors.shape
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end',
    },
    timelabel: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop:5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove:{
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 15,
        right: 20,
    }
})