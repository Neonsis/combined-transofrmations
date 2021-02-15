import React, {useState} from 'react';
import CoordinateInput from "./CoordinateInput";
import {ALPHABET, DEFAULT_INPUTS_NUMBER, MAX_INPUTS_NUMBER} from "../constants";
import {axisEnum} from "../axisEnum";

const coordinatesInitialState = () => {
    return [...Array(DEFAULT_INPUTS_NUMBER)].map((_, i) => ({id: i, name: ALPHABET.charAt(i), xValue: 0, yValue: 0}));
}

const CoordinateInfo = ({setCoordinates, setAxis, setScale, setRotation}) => {

    const [inputNumber, setInputNumber] = useState(DEFAULT_INPUTS_NUMBER);
    const [inputAxis, setInputAxis] = useState(axisEnum.OX);
    const [inputScale, setInputScale] = useState(1);
    const [inputRotation, setInputRotation] = useState(0);
    const [inputCoordinates, setInputCoordinates] = useState(() => coordinatesInitialState());

    const onCoordinateChange = (coordinate) => {
        let newCoordinates = [...inputCoordinates];
        newCoordinates[coordinate.id] = coordinate;
        setInputCoordinates(newCoordinates);
    }

    const incrementInput = () => {
        setInputNumber(inputNumber + 1);
    }

    const decrementInput = () => {
        setInputNumber(inputNumber - 1);
        setInputCoordinates(inputCoordinates.filter(coordinate => coordinate.id !== inputNumber - 1));
    }

    const handleBuild = () => {
        setCoordinates(inputCoordinates);
        setAxis(inputAxis);
        setScale(inputScale);
        setRotation(inputRotation);
    }

    return (
        <div className="coordinate-info">
            <h1>Введите координаты матрицы:</h1>
            <div className="coordinate-input-wrapper">
                {[...Array(inputNumber)].map((_, i) =>
                    <CoordinateInput
                        id={i}
                        name={ALPHABET.charAt(i)}
                        onChange={onCoordinateChange}
                    />
                )}
            </div>
            <div className="button-wrapper">
                <button className="button" onClick={incrementInput} disabled={inputNumber > MAX_INPUTS_NUMBER}>
                    Добавить
                </button>
                <button className="button" onClick={decrementInput} disabled={inputNumber <= DEFAULT_INPUTS_NUMBER}>
                    Удалить
                </button>
            </div>

            <div className="axis-input">
                <h1>Относительно оси:</h1>
                <input name="OX" type="checkbox" checked={inputAxis === "OX"}
                       onClick={() => setInputAxis(axisEnum.OX)}/>
                <label htmlFor="OX">OX</label>
                <input name="OY" type="checkbox" checked={inputAxis === "OY"}
                       onClick={() => setInputAxis(axisEnum.OY)}/>
                <label htmlFor="OY">OY</label>
                <input name="XY" type="checkbox" checked={inputAxis === "XY"}
                       onClick={() => setInputAxis(axisEnum.XY)}/>
                <label htmlFor="XY">XY</label>
            </div>

            <div className="scale-input">
                <h1>Коэффициент масштабирования:</h1>
                <input className="input" type="number" value={inputScale}
                       onChange={e => setInputScale(e.target.value)}/>
            </div>

            <div className="rotation-input">
                <h1>Угол поворота:</h1>
                <input className="input" type="number" value={inputRotation}
                       onChange={e => setInputRotation(e.target.value)}/>
            </div>


            <button className="main-button" onClick={handleBuild}>
                Построить
            </button>
        </div>
    );
};

export default CoordinateInfo;