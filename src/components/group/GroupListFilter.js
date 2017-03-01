import React from 'react'

const GroupListFilter = (props) => {
    return (
        <div>
            search:
            <input onChange={props.onChange}/>
        </div>
    )
}

export default GroupListFilter