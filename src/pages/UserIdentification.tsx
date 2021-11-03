import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Alert,
    TouchableWithoutFeedback
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import {Button} from '../components/Button'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled,setIsFilled] = useState(false)
    const [name,setName] = useState<string>()

    const navigation = useNavigation()

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    async function handleSubmit() {
        if(!name)
            return Alert.alert('Me diz como chamar você 🙁')
        
        try{
            await AsyncStorage.setItem('@plantmaneger:user', name)
            navigation.navigate('Confirmation',{
                title: 'Pronto',
                subTitle: 'Agora vamos começara cuidar das suas  plantas com muito amor.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            })
        }catch{
            Alert.alert('Não foi possível salvar o seu nome 🙁')
        }
    }


    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>

                            </View>
                            <Text style={styles.emoji}>
                                {isFilled ? '😄' : '🙂'}
                            </Text>
                            <Text 
                                style={styles.title}
                            >
                                Como podemos {'\n'}
                                chamar você?
                            </Text>
                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && 
                                    {borderColor: colors.green}
                                ]}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                                placeholder="Digite o nome"
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width:  '100%'
    },
    header:{
        alignItems: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    emoji: {
        fontSize:44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding:10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 32,
        color: colors.heading,
        marginTop: 20,
        fontFamily: fonts.heading
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
})

