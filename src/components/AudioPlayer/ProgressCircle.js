import React from 'react';
import "./ProgressCircle.css"

import vinyl from "../../assets/white_vinyl.png"

const Circle = ({color, percentage, size, strokeWidth}) => {
    const radius = size / 2 - 10;
    const circ = 2*Math.PI * radius - 20;
    // const strokePercent = ((100 - Math.round(percentage)) * circ) / 100;
    const strokePercent = ((100 - percentage) / 100) * circ;


    return (
        <circle 
            r={radius} 
            cx="50%" 
            cy="50%" 
            fill="transparent" 
            // stroke={strokePercent !== circ ? color:""}
            stroke={percentage ? color : ""}
            strokeWidth={strokeWidth}
            strokeDasharray = {circ}
            // strokeDashOffset={percentage ? strokePercent : 0}
            strokeDashoffset={strokePercent}
            strokeLinecap = "round"
        ></circle>
        )
    };

const ProgressCircle = ({percentage, isPlaying, size, color, image}) => {
    console.log("isActive:", isPlaying);
  return (
    <div className='progress-circle flex'>
        <svg width={size} height={size}>
            <g>
                <Circle strokeWidth={"0.4rem"} color="#384f73" size={size} />
                <Circle strokeWidth={"0.6rem"} color={color} percentage={percentage} size={size} />
            </g>
            <defs>
                <clipPath id="myCircle">
                    <circle cx="50%" cy="50%" r={(size/2)-30} fill="#FFFFFF" />
                </clipPath>
                <clipPath id="myInnerCircle">
                    <circle cx="50%" cy="50%" r={(size/2)-100} fill="#FFFFFF" />
                </clipPath>
            </defs>
            <image 
                className={isPlaying ? "active-image" : ""} 
                x={30} 
                y={30} 
                width={2*((size/2) - 30)} 
                height={2*((size/2) - 30)} 
                // href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
                href={vinyl}
                clipPath="url(#myCircle)"
            />
            <image 
                className={isPlaying ? "active-image" : ""} 
                x={100} 
                y={100} 
                width={2*((size/2) - 100)} 
                height={2*((size/2) - 100)} 
                href={image} 
                clipPath="url(#myInnerCircle)"
            />
        </svg>
    </div>
  )
}

export default ProgressCircle