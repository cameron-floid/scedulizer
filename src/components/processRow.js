import React, { useState } from "react";

const ProcessRow = ({ index, maxQueue, showPriorityCol, showQueueCol, handleSetMessage, onAllProcessVariablesSet, onProcessUpdate }) => {
    const [process, setProcess] = useState({
        id: index,
        arrivalTime: '',
        burstTime: '',
        priority: '',
        queueNumber: ''
    });

    const [allProcessVariablesSet, setAllProcessVariablesSet] = useState(false);
    const [processComplete, setProcessComplete] = useState(false);

    const handleInputChange = (field, value) => {
        const getFieldName = (field) => {
            switch (field) {
                case 'arrivalTime':
                    return 'Arrival Time';
                case 'burstTime':
                    return 'Burst Time';
                case 'priority':
                    return 'Priority';
                case 'queueNumber':
                    return 'Queue Number';
                default:
                    return field;
            }
        }
    
        if (value < 0) {
            handleSetMessage("warning", `P${process.id} ${getFieldName(field)} cannot be less than 0`);
            return;
        }
    
        if (field === "queueNumber" && value > maxQueue) {
            handleSetMessage("warning", `Q${value} does not exist`);
            return;
        }
    
        const updatedProcess = { ...process, [field]: value };
        setProcess(updatedProcess);
        checkCompletion(updatedProcess);
    
        // Send updated process data to parent component
        if (processComplete) onProcessUpdate(updatedProcess);
    };    

    const checkCompletion = (updatedProcess) => {
        const { arrivalTime, burstTime, priority, queueNumber } = updatedProcess;
        const complete =
            arrivalTime && burstTime &&
            (!showPriorityCol || priority) &&
            (!showQueueCol || queueNumber);

        setAllProcessVariablesSet(complete);
        setProcessComplete(complete);

        if (complete) {
            onAllProcessVariablesSet({
                ...updatedProcess,
                priority: showPriorityCol ? priority : null,
                queueNumber: showQueueCol ? queueNumber : null
            });
        }
    };

    return (
        <tr className={allProcessVariablesSet ? "ready-process" : ""}>
            <td>P{index + 1}</td>
            <td>
                <input
                    type="number"
                    value={process.arrivalTime}
                    onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
                    min="0"
                />
            </td>
            <td>
                <input
                    type="number"
                    value={process.burstTime}
                    onChange={(e) => handleInputChange('burstTime', e.target.value)}
                    min="0"
                />
            </td>
            {showPriorityCol && (
                <td>
                    <input
                        type="number"
                        value={process.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        min="0"
                    />
                </td>
            )}
            {showQueueCol && (
                <td>
                    <input
                        type="number"
                    value={process.queueNumber}
                    onChange={(e) => handleInputChange('queueNumber', e.target.value)}
                    min="0"
                    />
                </td>
            )}
        </tr>
    );
};

export default ProcessRow;