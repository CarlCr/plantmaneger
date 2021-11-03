import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

import {format} from 'date-fns'

export interface PlantsProps {
    id: string
    name: string
    about: string
    water_tips: string
    photo: string
    environments: [string]
    frequency: {
        times: number
        repeat_every: string
    }
    hour: string,
    dateTimeNotification: Date
}

export interface StoragePlantsProps {
    [id: string] : {
        data: PlantsProps
        notificatioId: string
    }
}

export async function savePlant(plant: PlantsProps): Promise<void>{
    try {
        const nextTime = new Date(plant.dateTimeNotification)
        const now = new Date()
  
        const {times, repeat_every} = plant.frequency
        if(repeat_every === 'week'){
            const interval = Math.trunc( 7 / times)
            nextTime.setDate(now.getDate() + interval)
        } 
        
        // else
        //     nextTime.setDate(nextTime.getDate() + 1)

        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        )
 
        const notificatioId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeey, 🌱',
                body: `Está an hora de cuidar da sua ${plant.name}`, 
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        const data= await AsyncStorage.getItem('@plantmaneger:plants') 
        const oldPlants = data  ? (JSON.parse(data) as  StoragePlantsProps) : {}

        const newPlant = {
            [plant.id] : {
                data: plant,
                notificatioId
            }
        }

        await AsyncStorage.setItem('@plantmaneger:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            })
        )

    }catch(error){
        throw new  Error(error)
    }
}

export async function loadPlant(): Promise<PlantsProps[]>{
    try {
        const data= await AsyncStorage.getItem('@plantmaneger:plants')
        const plants = data  ? (JSON.parse(data) as  StoragePlantsProps) : {}

        const plantsSorted = Object
        .keys(plants)
        .map((plant) => {
            return { 
                ...plants[plant].data,
                hour: format(new Date(plants[plant].data.dateTimeNotification) , 'HH:mm')
            }
        })
        .sort((a,b) => 
            Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 - Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
            )
        )

        return plantsSorted

    }catch(error){ 
        throw new  Error(error)
    }
}

export async function removePlant(id: string): Promise<void>{
    const data = await AsyncStorage.getItem('@plantmaneger:plants')
     
    const plants = data ? (JSON.parse(data) as  StoragePlantsProps) : {}

     await Notifications.cancelScheduledNotificationAsync(plants[id].notificatioId)

    delete plants[id] 

    await AsyncStorage.setItem(
        '@plantmaneger:plants',
        JSON.stringify(plants)
    )
} 