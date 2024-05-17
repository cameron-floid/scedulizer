import React from "react";


// QueueRow
const QueueRow = ({ index, showPriorityCol }) => {
    return (
        <tr id={`queue_${index}_row`}>
            <td>Q{index + 1}</td>
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
            {showPriorityCol && <td><input type="number" name={`priority_q${index}`} min="0" /></td>}
        </tr>
    );
} 


export default QueueRow;