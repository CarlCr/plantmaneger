import React, {useEffect} from 'react';
import * as Notifications from 'expo-notifications'
import Routes from './src/routes'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    async function notifications() {
     const data =  await Notifications.getAllScheduledNotificationsAsync()
     console.log("Notificações agendas")
     console.log(data)
    }
  
    notifications()

  },[])

  if(!fontsLoaded){
    return (
      <AppLoading/>
    )
  }

  
  return (
    <Routes/>
  );
}

