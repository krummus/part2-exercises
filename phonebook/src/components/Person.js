import React from 'react'

const Person = ({person, removeContact}) => {
  return (
    <li>{person.name} {person.number} <button onClick={removeContact}>delete</button></li>
  )
}

export default Person