import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({lat, lon}) => {

 const [weather, setWeather] = useState()
 const [temperature, setTemperature] = useState()
 const [isCelsius, setIsCelsius] = useState(true)
 const [isLoading, setIsLoading] = useState(true)

 //Petición del clima
 useEffect(() => {
    if (lon) {
        const APIKey ='47424450e8fab8eb7941670d1d11d694'
        const URL =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

        axios.get(URL)
            .then(res => {
                setWeather(res.data)
                const temp = {
                    celcius: `${Math.round(res.data.main.temp -273.15)} °C`,
                    farenheit: `${Math.round((res.data.main.temp -273.15) * 9 / 5 + 32)} °F`
                }
                setTemperature(temp)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

 }, [lat, lon])

 console.log(weather)

 const handleClick = () => setIsCelsius (!isCelsius)

 if (isLoading) {
    return <LoadingScreen /> 
 }else {
  return (
    <article className='card'>
    <h1 className='card__title'>Weather App</h1>
    <h2 className='card__subtitle'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
    <section className='card__first-section'>
        <img className='card__icon' src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
    </section>
    <section className='card__second-section'>
        <h3 className='second__title'>"{weather?.weather[0].description}"</h3>
        <ul className='second__list'>
            <li className='second__item'><span className='second_span'>Wind speed </span>{weather?.wind.speed} m/s</li>
            <li className='second__item'><span className='second_span'>Clouds </span>{weather?.clouds.all} %</li>
            <li className='second__item'><span className='second_span'>Pressure </span>{weather?.main.pressure} hPa</li>
        </ul>

    </section>
    <h2 className='card__temperature'>{isCelsius ? temperature?.celcius : temperature?.farenheit}</h2>
    <button className='card__btn' onClick={handleClick}>{isCelsius ? 'Change to °F': 'Change to °C'}</button>
    </article>
  )
  }
}
export default CardWeather