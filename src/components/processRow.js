import React from "react";


// ProcessRow
const ProcessRow = ({ index }) => {
    return (
        <>
            <td>P{index}</td>
            <td><input type="number" name={`arrival_time_${index}`} min="0" /></td>
            <td><input type="number" name={`burst_time_${index}`} min="0" /></td>
            <td className="priorityCell" style={{ display: 'none' }}><input type="number" name={`priority_${index}`} min="0" /></td>
            <td className="queueCell" style={{ display: 'none' }}><input type="number" name={`queue_${index}`} min="0" /></td>
        </>
    );
}


module.exports = ProcessRow;