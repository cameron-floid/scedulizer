import React, { useState } from "react";

const ProcessRow = ({ index, showPriorityCol, showQueueCol, onAllProcessVariablesSet }) => {
    const [id, setId] = useState(index);
    const [arrivalTime, setArrivalTime] = useState(null);
    const [burstTime, setBurstTime] = useState(null);
    const [priority, setPriority] = useState(null);
    const [queueNumber, setQueueNumber] = useState(null);
    const [allProcessVariablesSet, setAllProcessVariablesSet] = useState(false);

    const handleArrivalTimeChange = (event) => {
        event.preventDefault();
        setArrivalTime(event.target.value);
        checkCompletion();
    };

    const handleBurstTimeChange = (event) => {
        event.preventDefault();
        setBurstTime(event.target.value);
        checkCompletion();
    };

    const handlePriorityChange = (event) => {
        event.preventDefault();
        setPriority(event.target.value);
        checkCompletion();
    };

    const handleQueueNumberChange = (event) => {
        event.preventDefault();
        setQueueNumber(event.target.value);
        checkCompletion();
    };

    const checkCompletion = () => {
        if (arrivalTime !== null && burstTime !== null) {
            if (showPriorityCol && priority !== null) {
                setAllProcessVariablesSet(true);
            } else if (!showPriorityCol) {
                setAllProcessVariablesSet(true);
            }
        }

        if (allProcessVariablesSet) {
            const processVariables = {
                id,
                arrivalTime,
                burstTime,
                priority: showPriorityCol ? priority : null,
                queueNumber: showQueueCol ? queueNumber : null,
            };
            onAllProcessVariablesSet(processVariables);
        }
    };

    return (
        <tr className={allProcessVariablesSet ? "ready-process" : ""}>
            <td>P{index + 1}</td>
            <td>
                <input type="number" value={arrivalTime} onChange={handleArrivalTimeChange} min="0" />
            </td>
            <td>
                <input type="number" value={burstTime} onChange={handleBurstTimeChange} min="0" />
            </td>
            {showPriorityCol && (
                <td>
                    <input type="number" value={priority} onChange={handlePriorityChange} min="0" />
                </td>
            )}
            {showQueueCol && (
                <td>
                    <input type="number" value={queueNumber} onChange={handleQueueNumberChange} min="0" />
                </td>
            )}
        </tr>
    );
};

export default ProcessRow;
