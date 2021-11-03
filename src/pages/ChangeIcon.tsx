import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView
} from 'react-native'
import colors from '../styles/colors'

export function UserIdentification(){
    const [changeText,setChangeText] = useState('First')
    function handleChangeText (text:string) {
        if(text==='carlos'){
            setChangeText('Alright')
        }
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <Text style={styles.emoji}>
                        😄
                    </Text>
                    <TextInput 
                        // onChangeText={handleChangeText} 
                        style={styles.input}/>
                    <Text style={styles.emoji}>
                        {/* {changeText} */}
                    </Text>
                </View>
            </View>
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
    }
})

