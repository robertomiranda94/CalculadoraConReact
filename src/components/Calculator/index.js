import React, { useState } from 'react';
import { Container, Screen, Previous, Current, Button } from './Styled/'; /* importo el container(config. estilo de la calculadora) */


export default function Calculator() {

    const [current, setCurrent] = useState('') /* array para en el que se van a ir guardando los valores ingresados */
    const [previous, setPrevious] = useState('')
    const [operation, setOperation] = useState('')

    const appendValue = (el) => {
        const value = el.target.getAttribute('data')

        if (value === '.' && current.includes('.')) return
        setCurrent(current + value) /* concatena los numeros ingresados para que se muestren por pantalla */

    }

    const handleDelete = () => {
        setCurrent(String(current).slice(0, -1)) /* uso del método .slice para que me devuelva una copia de parte del array guardado en current para "borrar" el último numero */
    }

    const handleAllClear = () => {
        /* Ingreso un String vacio para la opcion de "borrar todo" */
        setCurrent('')
        setPrevious('')
        setOperation('')
    }
    const chooseOperation = (el) => {
        if (current === '') return /* no me retorna nada cuando ingreso un simbolo sin antes haber ingresado un numero */
        if (previous !== '') {
            let value = compute()
            setPrevious(value)
        } else {
            setPrevious(current)
        }

        setCurrent('')
        setOperation(el.target.getAttribute('data'))
    }

    const equals = () => {
        let value = compute()
        if (value == undefined || value == null) return

        setCurrent(value)
        setPrevious('')
        setOperation('')

    }

    const compute = () => {

        let result
        let previousNumber = parseFloat(previous) /* uso la funcion de JS parseFloat() para que a la cadena que tengo como argumento me la devuelva como un numero de punto flotante */
        let currentNumber = parseFloat(current)


        if (isNaN(previousNumber) || isNaN(currentNumber)) return /* condicional para que no retorne nada si alguna de las 2 variables no tiene un valor numerico */

        switch (operation) {
            case '÷':
                result = previousNumber / currentNumber;
                break;
            case '×':
                result = previousNumber * currentNumber;
                break;
            case '+':
                result = previousNumber + currentNumber;
                break;
            case '-':
                result = previousNumber - currentNumber;
                break;
            default:
                return
        }
        return result;

    }


    return (
        <Container>
            <Screen>
                <Previous>{previous} {operation}</Previous>
                <Current>{current}</Current>
            </Screen>
            <Button onClick={handleAllClear} gridSpan={2} control>BORRAR TODO</Button>
            <Button onClick={handleDelete} control>⌫</Button>
            <Button data={'÷'} onClick={chooseOperation} operation>÷</Button>
            <Button data={'7'} onClick={appendValue}>7</Button>
            <Button data={'8'} onClick={appendValue}>8</Button>
            <Button data={'9'} onClick={appendValue}>9</Button>
            <Button data={'×'} onClick={chooseOperation} operation>×</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} onClick={chooseOperation} operation>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'-'} onClick={chooseOperation} operation>-</Button>
            <Button data={'.'} onClick={appendValue}>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button gridSpan={2} onClick={equals} equals>=</Button>
        </Container>
    )
}