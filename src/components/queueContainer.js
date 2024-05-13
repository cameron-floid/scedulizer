import React from "react";


// QueueContainer
const QueueContainer = ({ index, algorithmInfo, priorityInfo }) => {
    return (
        <div className="queue-container">
            <div className="queue-row header-text-row">
                <h3 className="header-text">{index} {algorithmInfo} {priorityInfo}</h3>
            </div>
            <div id={`queue_${index}_row`} className="queue-row queue horizontal-scroll"></div>
        </div>
    );
}


export default QueueContainer;