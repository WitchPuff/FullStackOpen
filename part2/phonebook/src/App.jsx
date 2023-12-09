import axios from 'axios'
import { useEffect, useState } from 'react'

const handleChange = (event, setValue) => {
  setValue(event.target.value)
}

const Filter = ({ query, setQuery }) => {
  return (
    <div>
      filter shown with <input value={query} onChange={(event) => handleChange(event, setQuery)}/>
    </div>
  )
}

const PersonForm = ({addPerson, newName, newNumber, setNewName, setNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => handleChange(event, setNewName)}/>
          <br></br>
          number: <input value={newNumber} onChange={(event) => handleChange(event, setNewNumber)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, query }) => {
  console.log(query)
  if (query && query.length) {
    persons = persons.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()))
  }
  console.log(persons)

  return persons.map( (person) => {
    return <p key={person.name}> {person.name} {person.number} </p>
  })
}




const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(item => item.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook!`)
    } else {
      setPersons(prevPersons => [...prevPersons, { name: newName, number: newNumber }])
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} setQuery={setQuery}></Filter>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} 
                  newNumber={newNumber} setNewName={setNewName} 
                  setNewNumber={setNewNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} query={query}></Persons>
    </div>
  )
}

export default App