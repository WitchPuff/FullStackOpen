import axios from 'axios'


const baseurl = 'https://studies.cs.helsinki.fi/restcountries'


const getInfo = (name) => {
    return axios
      .get(baseurl + '/api/name/' + name)
      .then((response) => response.data)
  }


  const getAll = () => {
    return axios
      .get(baseurl + '/api/all')
      .then((response) => response.data)
  }

  export default {
    getAll, getInfo
  }