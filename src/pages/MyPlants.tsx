import React, {useState,useEffect}from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Alert
} from 'react-native'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale' 

import {Header} from '../components/Header'
import {PlantsProps, loadPlant, removePlant} from '../libs/storage'

import colors from '../styles/colors'
import WateringDropImg from '../assets/waterdrop.png'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantsProps[]>([])
    const [loading,setLoading] = useState(true)
    const [nextWatered,setNextWatered] = useState<string>()

    function handleRemove(plant: PlantsProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
             {
                 text: 'Não 🙏🏽',
                 style: 'cancel'
             },
             { 
                 text: 'Sim  😢',
                 onPress: async () => {
                    try {
                        await removePlant(plant.id)
                        setMyPlants((oldData) => 
                            oldData.filter((item) => item.id !== plant.id)
                        )

                    } catch (error){
                        Alert.alert('Não foi possível remover! 😢')
                    }
                 }
             }
        ])
    }

    useEffect(() => {
        async function loadStorageDate(){
            const plantsStoraged = await loadPlant()

            const nextTime =  formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
            )
            setMyPlants(plantsStoraged)
            setLoading(false)
        }
        loadStorageDate()
    },[])

    if(loading)
     return <Load />

    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.spotLight}>
                <Image 
                    source={WateringDropImg}
                    style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>
                    {nextWatered}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próxima regadas
                </Text>

                <FlatList 
                    data={myPlants}
                    keyExtractor={(item)=>String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardSecondary 
                            data={item}
                            handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex:1}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background 
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotLightImage:{
        width:60,
        height:60
    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingLeft: 10,
        paddingRight:0,
        textAlign: 'left'
    },
    plants: {
        flex: 1,
        width:  '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical:20
    }

})