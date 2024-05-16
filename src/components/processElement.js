import React from "react";


// ProcessElement
const ProcessElement = ({ id, arrivalTime, burstTime }) => {
    return (
        <div className="process">
            <p className="process-arrival-time">{arrivalTime}</p>
            <p className="process-label">P{id + 1}</p>
            <p className="process-burst-time">{burstTime}</p>
        </div>
    );
}


export default ProcessElement;