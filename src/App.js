import React, {useState} from 'react';
import './App.css';
import CoordinatePlane from "./components/CoordinatePlane";
import CoordinateInfo from "./components/CoordinateInfo";
import {axisEnum} from "./axisEnum";

const defaultValue = [{xValue: 3, yValue: 4}, {xValue: 6, yValue: 9}, {
    xValue: 10,
    yValue: 9
}, {xValue: 15, yValue: 4}];

function App() {
    const [options, setOptions] = useState({
        coordinates: [],
        axis: axisEnum.OX,
        scale: 1,
        rotation: 0,
        xAxisStartingPoint: 1,
        yAxisStartingPoint: 1,
    });

    return (
        <div className="app">
            <CoordinatePlane
                options={options}
            />
            <CoordinateInfo
                setOptions={setOptions}
            />
        </div>
    );
}

export default App;
