import axios from 'axios'


const baseurl = 'https://api.openweathermap.org/data/2.5/weather'
const api = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (lat, lon) => {
    console.log(api);
    return axios
            .get(baseurl + `?lat=${lat}&lon=${lon}&appid=${api}`)
            .then((req) => req.data)
}

export default {
    getWeather
}