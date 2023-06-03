import React from 'react'

const Filter = (props) => {
    return(
        <div>
            filter shown with <input value={props.filterText} onChange={props.onChange} />
            <br />
        </div>
    )
}

export default Filter