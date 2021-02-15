import React from 'react';
import Canvas from './Canvas';
import {BLACK, GREEN, GRID_SIZE, LIGHT_GRAY, MARK_LENGTH, RED, X_AXIS_PADDING, Y_AXIS_PADDING} from "../constants";
import _ from "lodash";
import {axisEnum} from "../axisEnum";
import {multiply} from "../util";

function sin(degrees) {
    let radians = (degrees * Math.PI) / 180;
    return Math.sin(radians);
}

const CoordinatePlane = ({options}) => {

        let xAxisDistanceGridLines;
        let yAxisDistanceGridLines;

        const {
            coordinates,
            scale,
            rotation,
            axis,
            xAxisStartingPoint,
            yAxisStartingPoint
        } = options;

        const draw = (ctx) => {
            drawCoordinatePlane(ctx);
            drawCoordinates(coordinates, ctx);
        }

        const drawCoordinates = (coordinates, ctx) => {
            drawFigure(coordinates, ctx, RED); // initial figure
            drawReflectFigure(coordinates, ctx);
            drawRotationFigure(coordinates, ctx);
        }

        const drawRotationFigure = (coordinates, ctx) => {
            console.log("--------")
            const radians = rotation * Math.PI / 180;
            let rotationCoordinates = [];
            console.log(radians);
            if (rotation < 0) {
                const matrix = coordinates.map(coordinate => [coordinate.xValue, coordinate.yValue]);
                const reverseTransformationMatrix = [[Math.cos(radians), -sin(rotation)], [sin(rotation), Math.cos(radians)]];
                rotationCoordinates = multiply(matrix, reverseTransformationMatrix);
                console.log(matrix);
                console.log(reverseTransformationMatrix);
                console.log(rotationCoordinates);
            } else if (rotation > 0) {
                const matrix = coordinates.map(coordinate => [coordinate.xValue, coordinate.yValue]);
                const reverseTransformationMatrix = [[Math.cos(radians), sin(rotation)], [-sin(rotation), Math.cos(radians)]];
                rotationCoordinates = multiply(matrix, reverseTransformationMatrix);
                console.log(matrix);
                console.log(reverseTransformationMatrix);
                console.log(rotationCoordinates);
            }
            const result = rotationCoordinates.map(arr => ({xValue: arr[0], yValue: arr[1]}));
            drawFigure(result, ctx, GREEN);
        }

        const drawReflectFigure = (coordinates, ctx) => {
            let reflectCoordinates = [];
            if (axis === axisEnum.OX) {
                reflectCoordinates = _.cloneDeep(coordinates).map(coordinate => {
                    coordinate.yValue *= -1 * scale;
                    coordinate.xValue *= scale;
                    return coordinate;
                });
            } else if (axis === axisEnum.OY) {
                reflectCoordinates = _.cloneDeep(coordinates).map(coordinate => {
                    coordinate.xValue *= -1 * scale;
                    coordinate.yValue *= scale;
                    return coordinate;
                });
            } else if (axis === axisEnum.XY) {
                reflectCoordinates = _.cloneDeep(coordinates).map(coordinate => {
                    [coordinate.xValue, coordinate.yValue] = [-(coordinate.yValue * scale), -(coordinate.xValue * scale)];
                    return coordinate;
                });
            }

            drawFigure(reflectCoordinates, ctx, RED);
        }

        const drawFigure = (coordinates, ctx, color) => {
            for (let i = 0; i < coordinates.length; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = color;

                ctx.moveTo((GRID_SIZE * coordinates[i].xValue + 0.5) / xAxisStartingPoint, -(GRID_SIZE * coordinates[i].yValue + 0.5) / yAxisStartingPoint);

                if (i !== coordinates.length - 1) {
                    ctx.lineTo((GRID_SIZE * coordinates[i + 1].xValue + 0.5) / xAxisStartingPoint, -(GRID_SIZE * coordinates[i + 1].yValue + 0.5) / yAxisStartingPoint);
                } else {
                    ctx.lineTo((GRID_SIZE * coordinates[0].xValue + 0.5) / xAxisStartingPoint, -(GRID_SIZE * coordinates[0].yValue + 0.5) / yAxisStartingPoint);
                }

                ctx.stroke();
            }
        }


        const drawCoordinatePlane = (ctx) => {
            ctx.canvas.width = window.innerWidth * 0.8;
            ctx.canvas.height = window.innerHeight;

            xAxisDistanceGridLines = Math.round((ctx.canvas.height / GRID_SIZE) / 2);
            yAxisDistanceGridLines = Math.round((ctx.canvas.width / GRID_SIZE) / 2);

            drawXAxis(ctx);
            drawYAxis(ctx);

            ctx.translate(yAxisDistanceGridLines * GRID_SIZE, xAxisDistanceGridLines * GRID_SIZE);

            drawMarks(ctx);
        }

        const drawXAxis = (ctx) => {
            const {height, width} = ctx.canvas;

            const numLinesX = Math.floor(height / GRID_SIZE);

            for (let i = 0; i <= numLinesX; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;

                ctx.strokeStyle = (i === xAxisDistanceGridLines)
                    ? BLACK
                    : LIGHT_GRAY;

                if (i === numLinesX) {
                    ctx.moveTo(0, GRID_SIZE * i);
                    ctx.lineTo(width, GRID_SIZE * i);
                } else {
                    ctx.moveTo(0, GRID_SIZE * i + 0.5);
                    ctx.lineTo(width, GRID_SIZE * i + 0.5);
                }

                ctx.stroke();
            }
        }

        const drawYAxis = (ctx) => {
            const {height, width} = ctx.canvas;

            const numLinesY = Math.floor(width / GRID_SIZE);

            for (let i = 0; i <= numLinesY; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;

                ctx.strokeStyle = (i === yAxisDistanceGridLines)
                    ? BLACK
                    : LIGHT_GRAY;

                if (i === numLinesY) {
                    ctx.moveTo(GRID_SIZE * i, 0);
                    ctx.lineTo(GRID_SIZE * i, height);
                } else {
                    ctx.moveTo(GRID_SIZE * i + 0.5, 0);
                    ctx.lineTo(GRID_SIZE * i + 0.5, height);
                }

                ctx.stroke();
            }
        }

        const drawMarks = (ctx) => {
            drawXPositiveMarks(ctx);
            drawXNegativeMarks(ctx);
            drawYPositiveMarks(ctx);
            drawYNegativeMarks(ctx);
        }

        const drawXPositiveMarks = (ctx) => {
            const numLinesY = Math.floor(ctx.canvas.width / GRID_SIZE);

            for (let i = 1; i < (numLinesY - yAxisDistanceGridLines) + 1; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = BLACK;

                ctx.moveTo(GRID_SIZE * i + 0.5, -MARK_LENGTH);
                ctx.lineTo(GRID_SIZE * i + 0.5, MARK_LENGTH);
                ctx.stroke();

                ctx.font = '9px Arial';
                ctx.textAlign = 'start';
                ctx.fillText(`${xAxisStartingPoint * i}`, GRID_SIZE * i - MARK_LENGTH, X_AXIS_PADDING);
            }
        }

        const drawYPositiveMarks = (ctx) => {
            for (let i = 1; i < xAxisDistanceGridLines; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = BLACK;

                ctx.moveTo(-MARK_LENGTH, -GRID_SIZE * i + 0.5);
                ctx.lineTo(MARK_LENGTH, -GRID_SIZE * i + 0.5);
                ctx.stroke();

                ctx.font = '9px Arial';
                ctx.textAlign = 'start';
                ctx.fillText(`${yAxisStartingPoint * i}`, Y_AXIS_PADDING, -GRID_SIZE * i + MARK_LENGTH);
            }
        }

        const drawXNegativeMarks = (ctx) => {
            for (let i = 1; i < yAxisDistanceGridLines; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = BLACK;

                ctx.moveTo(-GRID_SIZE * i + 0.5, -MARK_LENGTH);
                ctx.lineTo(-GRID_SIZE * i + 0.5, MARK_LENGTH);
                ctx.stroke();

                ctx.font = '9px Arial';
                ctx.textAlign = 'end';
                ctx.fillText(`${-xAxisStartingPoint * i}`, -GRID_SIZE * i + MARK_LENGTH, X_AXIS_PADDING);
            }
        }

        const drawYNegativeMarks = (ctx) => {
            const numLinesX = Math.floor(ctx.canvas.height / GRID_SIZE);

            for (let i = 1; i < (numLinesX - xAxisDistanceGridLines); i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = BLACK;

                ctx.moveTo(-MARK_LENGTH, GRID_SIZE * i + 0.5);
                ctx.lineTo(MARK_LENGTH, GRID_SIZE * i + 0.5);
                ctx.stroke();

                ctx.font = '9px Arial';
                ctx.textAlign = 'start';
                ctx.fillText(`${-yAxisStartingPoint * i}`, Y_AXIS_PADDING, GRID_SIZE * i + MARK_LENGTH);
            }
        }

        return (
            <Canvas draw={draw} style={{width: "80%", height: "100%"}}/>
        );
    }
;

export default CoordinatePlane;