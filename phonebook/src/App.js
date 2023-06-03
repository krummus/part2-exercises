import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter.js"
import Person from "./components/Person.js"
import PersonForm from "./components/PersonForm.js"
import Notification from "./components/Notification.js"
import personService from "./services/PersonsService.js"

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('a new name...')
  const [ newTele, setNewTele ] = useState('telephone number')
  const [ filterText, setFilterText] = useState('')
  const [ errMessage, setErrMessage] = useState(null)
  const [ errState, setErrState] = useState(false)

  const personsToShow = filterText.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  useEffect(() => {
      console.log('effect')
      personService
        .getAll()
        .then(response => {
          console.log('promise fulfilled - data loaded')
          setPersons(response)
        })
  }, [])
  console.log('render', persons, 'persons')

  const updateContact = (personObject) => {
    const currPerson = (persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase()))
    console.log('person exists @ ', currPerson.id)
    if (window.confirm(persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase()).name + " has already been added to the phone book! Would you like to replace the old number with a new one?")) {
      personService
      .update(currPerson.id, personObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== currPerson.id ? person : response))
        setErrMessage(`'${response.name}' has been updated with number '${response.number}'`)
        setErrState(false)
        console.log(persons)
        setNewName('a new name...')
        setNewTele('telephone number')
        setTimeout(() => {
          setErrMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrState(true)
        setErrMessage(`${error.response.data}`)
        setNewName('a new name...')
        setNewTele('telephone number')
        setPersons(persons.filter(person => person.id !== currPerson.id))
        setTimeout(() => {
          setErrMessage(null)
        }, 3000)
      })
    }
  }

  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked') 
    const personObject = {
      name: newName,
      number: newTele,
    }
    const exists = (persons.filter(person => person.name.toLowerCase() === personObject.name.toLowerCase()).length > 0) ? true : false
    console.log(exists, "exists")
    if (exists) {
      updateContact(personObject)
    }else{
      if (personObject.name === 'a new name...' || personObject.number === 'telephone number') {
        setErrMessage(`Please enter details other than the default!`)
        setErrState(true)
        setTimeout(() => {
          setErrMessage(null)
        }, 3000)
      }else{ 
        personService
          .create(personObject)
          .then(response => {
            personObject.id = response.id
            setPersons(persons.concat(personObject))
            setErrMessage(`'${response.name}' has been added to the phonebook`)
            setErrState(false)
            setNewName('a new name...')
            setNewTele('telephone number')
            setTimeout(() => {
              setErrMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrState(true)
            setErrMessage(`${error.response.data['error']}`)
            setTimeout(() => {
              setErrMessage(null)
            }, 3000)
          })
      }
    }
  }

  const delContact = (id) => {
    const currPerson = persons.find(person => person.id === id)
    if (window.confirm("Delete " + currPerson.name)) {
      console.log('delete button has been pressed for ID', id)
      personService
        .remove(id)
        .then(response => {
          setErrMessage(`'${currPerson.name}' has been deleted`)
          setErrState(false)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setErrMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrMessage(`${error.response.data}`)
          setErrState(true)
          setPersons(persons.filter(person => person.id !== currPerson.id))
          setTimeout(() => {
            setErrMessage(null)
          }, 3000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleTeleChange = (event) => {
    setNewTele(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterText} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm formOnSubmit={addContact} nameInput={newName} nameOnChange={handleNameChange} phoneValue={newTele} phoneOnChange={handleTeleChange} />
      <h2>Numbers</h2>
      <Notification message={errMessage} errState={errState} />
      <ul>
        {personsToShow.map(person => <Person key={person.id} person={person} removeContact={() => delContact(person.id)}/>)}
      </ul>
    </div>
  )
}

export default App
