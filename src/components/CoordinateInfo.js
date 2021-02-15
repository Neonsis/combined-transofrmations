import React, {useState} from 'react';
import {ALPHABET, DEFAULT_INPUTS_NUMBER, MAX_INPUTS_NUMBER} from "../constants";
import {axisEnum} from "../axisEnum";
import CoordinateInput from "./CoordinateInput";

const coordinatesInitialState = () => {
    return [...Array(DEFAULT_INPUTS_NUMBER)].map((_, i) => ({id: i, name: ALPHABET.charAt(i), xValue: 0, yValue: 0}));
}

const CoordinateInfo = ({setOptions}) => {

    const [isCalculated, setIsCalculated] = useState(false);
    const [gValue, setGValue] = useState(null);
    const [pValue, setPValue] = useState(null);
    const [inputNumber, setInputNumber] = useState(DEFAULT_INPUTS_NUMBER);
    const [inputAxis, setInputAxis] = useState(axisEnum.OX);
    const [inputScale, setInputScale] = useState(1);
    const [inputRotation, setInputRotation] = useState(0);
    const [xInputMarkupStep, setXInputMarkupStep] = useState(1);
    const [yInputMarkupStep, setYInputMarkupStep] = useState(1);
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
        let calculatedCoordinates = [];
        if (isCalculated) {
            calculatedCoordinates = calculateCoordinates();
        }

        setOptions(
            {
                axis: inputAxis,
                scale: inputScale,
                rotation: inputRotation,
                coordinates: calculatedCoordinates.length ? calculatedCoordinates : inputCoordinates,
                xAxisStartingPoint: xInputMarkupStep,
                yAxisStartingPoint: yInputMarkupStep,
            }
        );
    }

    const calculateCoordinates = () => {
        const x1 = pValue;
        const x2 = x1 + 3;
        const x3 = x2 + 4;
        const x4 = x1 + 12;

        const y1 = pValue + 1;
        const y2 = y1 + 5;

        return [
            {xValue: x1, yValue: y1, name: "A"},
            {xValue: x2, yValue: y2, name: "B"},
            {xValue: x3, yValue: y2, name: "C"},
            {xValue: x4, yValue: y1, name: "D"}
        ];
    }

    const handleIsCalculated = (e) => {
        const name = e.target.getAttribute('name');
        setInputCoordinates([]);
        if (name === "calculated") {
            setIsCalculated(true);
        } else {
            setIsCalculated(false);
        }
    }

    const coordinatesParameters = isCalculated ? (
        <React.Fragment>
            <h1>Введите параметры:</h1>
            <span className="input__text">Переменная G:</span>
            <input className="input" type="number" value={gValue} onChange={e => setGValue(parseInt(e.target.value))}/>
            <span className="input__text">Переменная P:</span>
            <input className="input" type="number" value={pValue} onChange={e => setPValue(parseInt(e.target.value))}/>
        </React.Fragment>
    ) : (
        <React.Fragment>
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
        </React.Fragment>
    );

    return (
        <div className="coordinate-info">
            <div className="calculation-wrapper">
                <a className={isCalculated ? "" : "active"} onClick={handleIsCalculated}>Ввод
                    координат</a>
                <a name="calculated" className={isCalculated ? "active" : ""} onClick={handleIsCalculated}>Расчет по
                    формуле</a>
            </div>
            {coordinatesParameters}
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

            <div className="input-wrapper">
                <h1>Коэффициент масштабирования:</h1>
                <input className="input" type="number" value={inputScale}
                       onChange={e => setInputScale(e.target.value)}/>
            </div>

            <div className="input-wrapper">
                <h1>Угол поворота:</h1>
                <input className="rotation-input" type="number" value={inputRotation}
                       onChange={e => setInputRotation(e.target.value)}/>
            </div>

            <div className="input-wrapper">
                <h1>Шаг разметки:</h1>
                <span className="input__text">Для x:</span>
                <input className="input" type="number" value={xInputMarkupStep}
                       onChange={e => setXInputMarkupStep(e.target.value)}/>
                <span className="input__text">Для y:</span>
                <input className="input" type="number" value={yInputMarkupStep}
                       onChange={e => setYInputMarkupStep(e.target.value)}/>
            </div>

            <button className="main-button" onClick={handleBuild}>
                Построить
            </button>
        </div>
    );
};

export default CoordinateInfo;