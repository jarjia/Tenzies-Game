import React from 'react'
import Die from './Die';
import { nanoid } from 'nanoid'
import './my.css'

function App() {
    const [dice, setDice] = React.useState(newDice())
    const [win, setWin] = React.useState(false)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        let allDice = dice.every(item => item.isHeld)
        let curVal = dice[0].value
        let allVal = dice.every(item => item.value === curVal)
        if(allDice && allVal) {
            setWin(true)
        }else {
            setWin(false)
        }
    }, [dice])

    function generateDice() {
        return {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid()
        }
    }

    function newDice() {
        let newArr = [];
        for(let i = 0; i < 10; i++) {
            newArr.push(generateDice())
        }
        return newArr
    }

    function rollDice() {
        setDice(item => item.map(die => {
            return die.isHeld ? 
            {...die, value: die.value} :
            generateDice()
        }))
        setCount(prev => prev + 1)
    }
    function newGame() {
        setDice(newDice)
        setCount(0)
    }

    function held(val) {
        if(win === false) {
            setDice(item => item.map(oldDice => {
                return oldDice.id === val ?
                {...oldDice, isHeld: !oldDice.isHeld} :
                oldDice
            }))
        }
    }

    let diceElements = dice.map(item => <Die value={item.value} click={() => held(item.id)} held={item.isHeld}/>)

    return (
        <div className='main'>
            <div className='main-container'>
                <h1 className='h1'>Tenzies Game!</h1>
                {win && <p className='win-p'>You Won!</p>}
                <div className='btn-wrapper'>
                    {diceElements}
                </div>
                {
                    win ? <button className='roll' onClick={newGame}>New Game {`(${count})`}</button> : 
                    <button className='roll' onClick={rollDice}>Roll</button>
                }
            </div>
        </div>
  )
}

export default App