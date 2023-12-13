import { useState, useEffect } from 'react'
import CountryService from './service/country'
import WeatherService from './service/weather'



const Name = ({ name, setInfo, setInfoView }) => {
  return (
    <p>
      {name} <button onClick={() => showInfo(name, setInfo, setInfoView)}>show</button>
    </p>
    )
}

const Weather = ({temp, wind, icon}) => {
  return (
    <div>
      <p>temperature {temp-273.15} Celcius</p>
      <img src={icon}></img>
      <p>wind {wind} m/s</p>
    </div>
  )
}



const Info = ({ name, capital, area, lans, flag, lat, lon }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    const getWeatherInfo = (lat, lon, setWeather) => {
      WeatherService
        .getWeather(lat, lon)
        .then((weather) => {
          setWeather(weather)
        })
    }
    getWeatherInfo(lat, lon, setWeather)
  }, [lat, lon])
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(lans).map((lan) => <li key={lan}>{lan}</li>)}
      </ul>
      <img src={flag}></img>
      <h2>Weather in {name}</h2>
      {weather ? (
        <Weather
          temp={weather.main.temp}
          wind={weather.wind.speed}
          icon={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
      ) : (
        <p>Loading weather information...</p>
      )}
    </div>
  )
}


const showInfo = (name, setInfo, setInfoView) => {
  setInfoView(true)
  CountryService
    .getInfo(name)
    .then((info) => setInfo(info))
}

const search = (query, setInfo, setInfoView, setNames) => {
  console.log(query)
  if (query && query.length > 0) {
    CountryService
      .getAll()
      .then((names) => {
        names = names.map((country) => country['name'])
        names = names.filter((name) => name['official'].toLowerCase().includes(query.toLowerCase()) || name['common'].includes(query.toLowerCase()))
        names = names.map((name) => name['common'])
        setNames(names)
        if (names.length === 1) {
          showInfo(names[0], setInfo, setInfoView)
        } else {
          setInfo(null)
          setInfoView(false)
        }
      })
  } else {
      setInfo(null)
      setInfoView(false)
      setNames([])
  }
}






function App() {
  const [query, setQuery] = useState('')
  const [infoView, setInfoView] = useState(false)
  const [info, setInfo] = useState(null)
  const [names, setNames] = useState([])
  const changeQuery = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setNames([])
    setInfo(null)
    setInfoView(false)
    search(inputValue, setInfo, setInfoView, setNames);
  }
  

  return (
    <>
      <p>
        find countries <input value={query} onChange={(event) => changeQuery(event)}></input>
      </p>
      { infoView && info ? (
        <Info 
          name={info['name']['common']} 
          capital={info['capital']} 
          area={info['area']} 
          lans={info['languages']} 
          flag={info['flags']['png']}
          lat={info['latlng'][0]}
          lon={info['latlng'][1]}>
        </Info>
      ) : (
        names.length <= 1 ? (<></>) : (
          names.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            names.map((name) => <Name name={name} key={name} setInfo={setInfo} setInfoView={setInfoView}></Name>)
          )
      ) 
      )
      }
    </>
  )
}

export default App
