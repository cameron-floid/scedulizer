import React from "react";


// ProcessElement
const ProcessElement = ({ id, arrivalTime, burstTime }) => {
    return (
        <>
            <p className="process-arrival-time">{arrivalTime}</p>
            <p className="process-label">P{id}</p>
            <p className="process-burst-time">{burstTime}</p>
        </>
    );
}


module.exports = ProcessElement;