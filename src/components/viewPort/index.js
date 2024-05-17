import React, { useState, useEffect } from "react";
import QueueRow from "../queueRow";
import ProcessRow from "../processRow";
import Scheduler from "../../models/scheduler";
import Queue from "../../models/queue";
import Process from "../../models/process";
import ProcessElement from "../processElement";
import Stats from "./stats";
import { capitalize } from "../../utils/stringFunctions";
import { FCFS, SJF, SRJF, PRIORITY, RR, MQ } from "../../utils/consts"



const MAX_LIMIT = 50;

const ViewPort = () => {
    const [algorithm, setAlgorithm] = useState(FCFS);
    const [nqueues, setNqueues] = useState('');
    const [nprocesses, setNprocesses] = useState('');
    const [scheduler, setScheduler] = useState(new Scheduler());
    const [message, setMessage] = useState({});
    const [fade, setFade] = useState(false);

    useEffect(() => {
        scheduler.addQueue(new Queue("Ready Queue", "", 0));
    }, [scheduler]);

    useEffect(() => {
        if (message.content) {
            setFade(false); // Ensure the message appears abruptly
            const fadeOutTimeout = setTimeout(() => {
                setFade(true); // Trigger the fade-out after 3 seconds
                const clearMessageTimeout = setTimeout(() => {
                    setMessage({}); // Clear the message after it fades out
                }, 3000); // Duration of the fade-out

                return () => clearTimeout(clearMessageTimeout); // Cleanup the timeout
            }, 3000); // Show the message for 3 seconds before starting fade out

            return () => clearTimeout(fadeOutTimeout); // Cleanup the fade-out timeout
        }
    }, [message]);

    const handleAlgorithmChange = (e) => {
        setAlgorithm(e.target.value);
        scheduler.clearQueues();
    };

    const handleNumberOfQueuesChange = (e) => {
        const value = parseInt(e.target.value, 10);

        if (value > MAX_LIMIT) {
            handleSetMessage("warning", `You can't enter more than ${MAX_LIMIT} queues`);
            return;
        }

        setNqueues(isNaN(value) ? '' : value);

        if (nqueues) {
            scheduler.queues = [];
            for (let i = 0; i < nqueues; i++) {
                scheduler.appendQueue();
            }
        }
    };

    const handleNumberOfProcessesChange = (e) => {
        const value = parseInt(e.target.value, 10);

        if (value > MAX_LIMIT) {
            handleSetMessage("warning", `You can't enter more than ${MAX_LIMIT} processes`);
            return;
        }

        setNprocesses(isNaN(value) ? '' : value);
    };

    const resetStates = () => {
        setAlgorithm(FCFS);
        setNqueues('');
        setNprocesses('');
        scheduler.clearQueues();
    };

    const handleAddProcesses = (processData) => {
        const process = new Process(processData.id, processData.arrivalTime, processData.burstTime, processData.priority, processData.queueNumber);
        let queueName;
        let addedProcess = false;

        if (algorithm === MQ || algorithm === RR) {
            addedProcess = scheduler.queues[processData.queueNumber].enqueue(process);
            queueName = `Q${processData.queueNumber}`;
        } else {
            addedProcess = scheduler.rq.enqueue(process);
            queueName = "Ready Queue";
        }

        if (addedProcess) {
            handleSetMessage("success", `Added P${processData.id} to ${queueName}`);
        }
    };

    const handleSetMessage = (type, content) => {
        setMessage({
            type,
            content
        });
    };

    const handleProcessUpdate = (updatedProcess) => {
        scheduler.updateProcess(algorithm, updatedProcess, handleSetMessage);
    };    

    return (
        <div className="view-port">
            {
                message && Object.keys(message).length > 0 ? (
                    <div className={`message ${message.type} ${fade ? 'fade-out' : ''}`}>
                        <p>{capitalize(message.type)}, {message.content}</p>
                    </div>
                ) : null
            }

            <div className="control-panel scrollable">
                <div className="container">
                    <form action="">
                        <div className="form-group">
                            <div className="form-row">
                                <h3 className="header-text">Algorithm</h3>
                            </div>
                            <div className="form-row">
                                <div className="button-group">
                                    <div className="btn-option">
                                        <input type="radio" id="fcfs" name="algorithm" value={FCFS} checked={algorithm === FCFS} onChange={handleAlgorithmChange} />
                                        <label htmlFor="fcfs">FCFS</label>
                                    </div>
                                    <div className="btn-option">
                                        <input type="radio" id="sjf" name="algorithm" value={SJF} checked={algorithm === SJF} onChange={handleAlgorithmChange} />
                                        <label htmlFor="sjf">SJF</label>
                                    </div>
                                    <div className="btn-option">
                                        <input type="radio" id="srjf" name="algorithm" value={SRJF} checked={algorithm === SRJF} onChange={handleAlgorithmChange} />
                                        <label htmlFor="srjf">SRJF</label>
                                    </div>
                                    <div className="btn-option">
                                        <input type="radio" id="priority" name="algorithm" value={PRIORITY} checked={algorithm === PRIORITY} onChange={handleAlgorithmChange} />
                                        <label htmlFor="priority">Priority</label>
                                    </div>
                                    <div className="btn-option">
                                        <input type="radio" id="rr" name="algorithm" value={RR} checked={algorithm === RR} onChange={handleAlgorithmChange} />
                                        <label htmlFor="rr">RR</label>
                                    </div>
                                    <div className="btn-option">
                                        <input type="radio" id="mq" name="algorithm" value={MQ} checked={algorithm === MQ} onChange={handleAlgorithmChange} />
                                        <label htmlFor="mq">Multi Queue</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {algorithm === RR && (
                            <div id="time-quantum-group" className="form-group">
                                <div className="form-row">
                                    <h3 className="header-text">Time Quantum</h3>
                                </div>
                                <div className="form-row">
                                    <input type="number" name="quantum" min="0" />
                                </div>
                            </div>
                        )}

                        {(algorithm === MQ || algorithm === RR) && (
                            <>
                                <div id="number-of-queues-group" className="form-group">
                                    <div className="form-row">
                                        <h3 className="header-text">Number of Queues</h3>
                                    </div>
                                    <div className="form-row">
                                        <input type="number" value={nqueues} onChange={handleNumberOfQueuesChange} name="nqueues" id="nqueues" min="0" />
                                    </div>
                                </div>

                                <div id="queue-attributes-group" className="form-group">
                                    <div className="form-row">
                                        <h3 className="header-text">Queue Attributes</h3>
                                    </div>
                                    <div className="form-row">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Queue</th>
                                                    <th>Algorithm</th>
                                                    {algorithm === MQ && <th>Priority</th>}
                                                </tr>
                                            </thead>
                                            <tbody id="queue-attributes-body">
                                                {Array.from({ length: nqueues }, (_, i) => (
                                                    <QueueRow key={i} index={i} showPriorityCol={algorithm === MQ}/>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <div className="form-row">
                                <h3 className="header-text">Number of Processes</h3>
                            </div>
                            <div className="form-row">
                                <input type="number" value={nprocesses} onChange={handleNumberOfProcessesChange} name="nprocesses" min="0" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <h3 className="header-text">Process Parameters</h3>
                            </div>
                            <div className="form-row">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Process</th>
                                            <th id="arrivalimeHeader">Arrival Time</th>
                                            <th id="burstTimeHeader">Burst Time</th>

                                            {algorithm === PRIORITY && (
                                                <th id="priorityHeader">Priority</th>
                                            )}

                                            {(algorithm === MQ || algorithm === RR) && (
                                                <th id="queueHeader">Queue Number</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody id="process-attributes-body">
                                        {Array.from({ length: nprocesses }, (_, i) => (
                                            <ProcessRow
                                                key={i}
                                                index={i}
                                                maxQueue={nqueues}
                                                showPriorityCol={algorithm === PRIORITY}
                                                showQueueCol={algorithm === MQ || algorithm === RR}
                                                onAllProcessVariablesSet={handleAddProcesses}
                                                handleSetMessage={handleSetMessage}
                                                onProcessUpdate={handleProcessUpdate}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="form-row footer-btns">
                            <input type="button" className="btn secondary-btn" value="Visualize" />
                            <input type="reset" className="btn secondary-btn" value="Reset" onClick={resetStates} />
                        </div>
                    </form>
                </div>
            </div>
            <div className="visual-panel scrollable">
                <div className="visual-group">
                    <div className="first-row queue-row header-text-row">
                        <h3 className="header-text">Queues</h3>
                    </div>
                    <div id="queues">
                        {algorithm !== MQ && (
                            <div className="queue-container">
                                <div className="queue-row header-text-row">
                                    <h3 className="header-text">R.Q</h3>
                                </div>
                                <div id="rq" className="queue-row queue horizontal-scroll">
                                    {scheduler.rq.processes.map((process) => (
                                        <ProcessElement
                                            key={process.id}
                                            id={process.id}
                                            arrivalTime={process.arrivalTime}
                                            burstTime={process.burstTime}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {algorithm === MQ && (
                            scheduler.queues.map((queue, index) => (
                                <div key={index} className="queue-container">
                                    <div className="queue-row header-text-row">
                                        <h3 className="header-text">Q{index + 1}</h3>
                                    </div>
                                    <div id={queue.name} className="queue-row queue horizontal-scroll">
                                        {queue.processes.map((process) => (
                                            <ProcessElement
                                                key={process.id}
                                                id={process.id}
                                                arrivalTime={process.arrivalTime}
                                                burstTime={process.burstTime}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div id="ganttchart" className="ganttchart-container">
                    <div className="ganttchart-row header-text-row">
                        <h3 className="header-text">Gantt Chart</h3>
                    </div>
                    <div id="ganttchart" className="ganttchart-row ganttchart horizontal-scroll">
                        {/* Gantt chart content (process components) */}
                    </div>
                </div>
                <Stats />
            </div>
        </div>
    );
};

export default ViewPort;