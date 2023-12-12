import { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

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


const Persons = ({ persons, query, deletePerson }) => {
  if (query && query.length) {
    persons = persons.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()))
  }
  return persons.map((person) => {
    return (
      <div key={person.name}>
        <p>
          {person.name} {person.number}
          <button type="button" onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </p>
      </div>
    );
  });
}


const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message' style={{color: color}}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
  personService
      .getAll()
      .then(init => {
        setPersons(init)
      })
      .catch(() => {
        console.log('fail')
      })
  }, [persons])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const curPerson = persons.find(person => person.name === newName);
    const updatePerson = (updatedPerson) => {
      personService
        .update(updatedPerson.id, newPerson)
        .then(returnPerson => {
          console.log(returnPerson);
          setPersons(persons.map(person => (person.id === returnPerson.id ? returnPerson : person)));
        })
        .catch(() => {
          console.log('Update failed');
          setMessage(`Information of ${updatedPerson.name} has already been removed from server`)
          setError(true)
          setTimeout(() => {
            setMessage(null)
            setError(false)
            location.reload();
          }, 5000)
        });
    };
  
    const createPerson = () => {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          console.log(returnedPerson);
          setPersons([...persons, returnedPerson]);
          setNewName('');
          setNewNumber('');
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          console.log('Create failed');
        });
    };
  
    if (curPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(curPerson);
      }
    } else {
      createPerson();
    }
  };
  

  const deletePerson = (id) => {
    let name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(error);
          setMessage(`${name} has already been removed from server`)
          setError(true)
          setTimeout(() => {
            setMessage(null)
            setError(false)
            location.reload();
        }, 5000)
        })
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={error? 'red':'green'}></Notification>
      <Filter query={query} setQuery={setQuery}></Filter>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} 
                  newNumber={newNumber} setNewName={setNewName} 
                  setNewNumber={setNewNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App