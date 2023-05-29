import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'
import LoadingScreen from './components/LoadingScreen'


function App() {


  const [coords, setCoords] = useState()

  useEffect(() => {
//Esta función se ejecuta cuando llega la información de nuestra ubicación
    const success = pos => {

    const latlon = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(latlon)
  }
  // Esto hace el llamado a la api del navegador para usar la ubicación actual
    navigator.geolocation.getCurrentPosition(success)

  }, [])


  return (
    <div className="App">
      <CardWeather lon={coords?.lon} lat={coords?.lat} />
    </div>
  )
}

export default App