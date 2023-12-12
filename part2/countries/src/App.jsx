import { useState } from 'react'
import CountryService from './service/country'



const Name = ({ name, setInfo, setInfoView }) => {
  return (
    <p>
      {name} <button onClick={() => showInfo(name, setInfo, setInfoView)}>show</button>
    </p>
    )
}


const Info = ({ name, capital, area, lans, flag }) => {
  console.log(Object.values(lans));
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
    </div>
  )
}


const showInfo = (name, setInfo, setInfoView) => {
  console.log(name);
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
        console.log(names)
        names = names.map((country) => country['name'])
        console.log(names)
        names = names.filter((name) => name['official'].toLowerCase().includes(query.toLowerCase()) || name['common'].includes(query.toLowerCase()))
        names = names.map((name) => name['common'])
        console.log(names)
        setNames(names)
        if (names.length > 1){
          setInfo(null)
          setInfoView(false)
        } else if (names.length === 1) {
          showInfo(names[0], setInfo, setInfoView)
        }
      })
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
          flag={info['flags']['png']}>
        </Info>
      ) : (
        names.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          names.map((name) => <Name name={name} key={name} setInfo={setInfo} setInfoView={setInfoView}></Name>)
        )
      ) 
      }
    </>
  )
}

export default App
