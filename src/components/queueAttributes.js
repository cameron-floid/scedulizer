import React from "react";


// QueueAttributes
const QueueAttributes = ({ index }) => {
    return (
        <>
            <td>Q{index}</td>
            <td>
                <select className="form-select" name={`algorithm_q${index}`}>
                    <option value="" disabled selected>Choose</option>
                    <option value="fcfs">FCFS</option>
                    <option value="sjf">SJF</option>
                    <option value="srjf">SRJF</option>
                    <option value="priority">Priority</option>
                    <option value="rr">RR</option>
                </select>
            </td>
            <td><input type="number" name={`priority_q${index}`} min="0" /></td>
        </>
    );
}


module.exports = QueueAttributes;