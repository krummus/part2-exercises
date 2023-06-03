import React from 'react'

const Total = ({contents}) => {
    return(
        <p>
            <b>
                total of {contents.reduce((total, content) => total + content.exercises, 0)} exercises
            </b>
        </p>
    )
}

export default Total;