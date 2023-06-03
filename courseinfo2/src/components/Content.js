import React from 'react'
import Part from './Part.js'

const Content = ({contents}) => {
    return(
        <div>
            {contents.map((content) => <Part key={content.id} name={content.name} exercises={content.exercises} />)}
        </div>
    )
}

export default Content;