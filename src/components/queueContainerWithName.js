import React from "react";


// QueueContainerWithName
const QueueContainerWithName = ({ queueName, algorithmInfo, priorityInfo }) => {
    return (
        <>
            <div className="queue-row header-text-row">
                <h3 className="header-text">{queueName} {algorithmInfo} {priorityInfo}</h3>
            </div>
            <div id={queueName.toLowerCase()} className="queue-row queue horizontal-scroll"></div>
        </>
    );
}


module.exports = QueueContainerWithName;