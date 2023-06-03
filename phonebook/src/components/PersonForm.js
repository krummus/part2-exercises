import React from 'react'

const PersonForm = (props) => {
    return(
        <form onSubmit={props.formOnSubmit}>
        <div>
            name: <input value={props.nameInput} onChange={props.nameOnChange} /><br />
            phone: <input type="tel" id="tel" name="tel" value={props.phoneValue} onChange={props.phoneOnChange} minLength="8" maxLength="10" />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm