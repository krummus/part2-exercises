import React from 'react'

const Notification = ({ message, errState }) => {
    if (message === null) {
      return (
        <div>
        </div>
      )
    }else{
        if (errState === true) {
            return(
                <div className="error">
                {message}
                </div>
            )
        }else{
            return(
                <div className="good">
                {message}
                </div>
            )
        }
    }
}

export default Notification