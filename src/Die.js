import React from 'react'

function Die(props) {
    let styles = {
        backgroundColor: props.held ? '#56F932' : 'white'
    }
    return (
        <div className='die' style={styles} onClick={props.click}>{props.value}</div>
    )
}

export default Die