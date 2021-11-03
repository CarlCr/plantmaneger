import React, { useEffect, useState } from 'react'

import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { EnviromentButton } from '../components/EnviromentButton'

import {Header} from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import {Load} from '../components/Load'
import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core'
import { PlantsProps } from '../libs/storage'
interface EnviromentProps {
    key: string
    title: string
}

export function PlantSelect(){
    const [environments, setEnvironments] = useState<EnviromentProps[]>([])
    const [plants, setPlants] = useState<PlantsProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([])
    const [environmentSelected,setenvironmentSelected] =useState('all')
    const [loading,setLoading]= useState(true)

    const [page,setPage] = useState(1)
    const [loadingMore,setLoadingMore] = useState(false)

    const navigation = useNavigation()

    function handleEnviromentSelected(environment: string){
        setenvironmentSelected(environment)

        if(environment === 'all')
            return setFilteredPlants(plants)
        const filtered = plants.filter(plant=> 
            plant.environments.includes(environment)
        )

        setFilteredPlants(filtered)
    }

    async function fetchPlants() {
        const { data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
        if(!data)
            return setLoading(true)
        if(page > 1){
            setPlants(oldValue =>[...oldValue, ...data])
            setFilteredPlants(oldValue =>[...oldValue, ...data])
        } else {
            setPlants(data)
            setFilteredPlants(data)
        }
        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return
        setLoadingMore(true)
        setPage(oldValue=> oldValue +1)
        fetchPlants()
    }

    function handlePlantSelected(plant: PlantsProps){
        navigation.navigate('PlantSave', {plant})
    }

    useEffect(() => {
        async function fechEnviroment() {
            const { data} = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        }

        fechEnviroment()
    }, [])

    useEffect(() => {
        fetchPlants()
    }, [])

    if(loading)
     return <Load />
     
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    Você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList 
                    data={environments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({item})=>(
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelected(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd}) =>handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore 
                        ? <ActivityIndicator color={colors.green}/> : <></>
                    }                   
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        lineHeight:20,
        marginTop:15,
        fontFamily: fonts.heading
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
})