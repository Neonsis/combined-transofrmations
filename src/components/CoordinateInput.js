import React, {useEffect, useState} from 'react';

const CoordinateInput = ({onChange, id, name}) => {

    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);

    useEffect(() => {
        onChange({
            id,
            name,
            xValue,
            yValue
        });
    }, [xValue, yValue])

    return (
        <div className="coordinate-input-item">
            <span className="coordinate-input__text">Координата {name} - x:</span>
            <input className="input" type="number" value={xValue} onChange={e => setXValue(e.target.value)}/>
            <span className="coordinate-input__text">y:</span>
            <input className="input" type="number" value={yValue} onChange={e => setYValue(e.target.value)}/>
        </div>
    );
};

export default CoordinateInput;