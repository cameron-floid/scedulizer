import React, { useState } from "react";

const ProcessRow = ({ index, showPriorityCol, showQueueCol, onAllProcessVariablesSet }) => {
    const [process, setProcess] = useState({
        id: index,
        arrivalTime: '',
        burstTime: '',
        priority: '',
        queueNumber: ''
    });

    const [allProcessVariablesSet, setAllProcessVariablesSet] = useState(false);

    const handleInputChange = (field, value) => {
        const updatedProcess = { ...process, [field]: value };
        setProcess(updatedProcess);
        checkCompletion(updatedProcess);
    };

    const checkCompletion = (updatedProcess) => {
        const { arrivalTime, burstTime, priority, queueNumber } = updatedProcess;
        const complete = 
            arrivalTime && burstTime && 
            (!showPriorityCol || priority) && 
            (!showQueueCol || queueNumber);

        setAllProcessVariablesSet(complete);

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
