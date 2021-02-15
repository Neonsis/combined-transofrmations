import React, {useState} from 'react';
import './App.css';
import CoordinatePlane from "./components/CoordinatePlane";
import CoordinateInfo from "./components/CoordinateInfo";
import {axisEnum} from "./axisEnum";

function App() {
    const [coordinates, setCoordinates] = useState([{xValue: 3, yValue: 4}, {xValue: 6, yValue: 9}, {
        xValue: 10,
        yValue: 9
    }, {xValue: 15, yValue: 4}]);
    const [axis, setAxis] = useState(axisEnum.OX);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);

    return (
        <div className="app">
            <CoordinatePlane
                coordinates={coordinates}
                axis={axis}
                scale={scale}
                rotation={rotation}
            />
            <CoordinateInfo
                setCoordinates={setCoordinates}
                setAxis={setAxis}
                setScale={setScale}
                setRotation={setRotation}
            />
        </div>
    );
}

export default App;
