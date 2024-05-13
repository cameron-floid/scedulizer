import React, { useState, useEffect } from "react";
import QueueRow from "./queueRow";
import ProcessRow from "./processRow";
import Scheduler from "../models/scheduler";
import Queue from "../models/queue";
import Process from "../models/process";
import ProcessElement from "./processElement";



// Constants for algorithm names
const FCFS = 'fcfs';
const SJF = 'sjf';
const SRJF = 'srjf';
const PRIORITY = 'priority';
const RR = 'rr';
const MQ = 'mq';

const ViewPort = () => {
    const [algorithm, setAlgorithm] = useState(FCFS);
    const [nqueues, setNqueues] = useState(0);
    const [nprocesses, setNprocesses] = useState(0);

    const scheduler = new Scheduler();

    useEffect(() => {
        scheduler.addQueue(new Queue("Ready Queue", "", 0));
    }, []);

    const handleAlgorithmChange = (e) => {
        setAlgorithm(e.target.value);
        scheduler.clearQueues();
    };

    const handleNumberOfQueuesChange = (e) => {
        setNqueues(e.target.value);
        scheduler.clearQueues();
    };

    const handleNumberOfProcessesChange = (e) => {
        setNprocesses(e.target.value);
        scheduler.clearQueues();
    };

    const resetStates = () => {
        setAlgorithm(FCFS);
        setNqueues(0);
        setNprocesses(0);
        scheduler.clearQueues();
    };

    const handleAddProcesses = (processData) => {
        const process = new Process(processData.id, processData.arrivalTime, processData.burstTime, processData.priority, processData.queueNumber);
        let queueName;
        let addedProcess = false;

        if (algorithm === MQ) {
            addedProcess = scheduler.queues[processData.queueNumber].enqueue(process);
            queueName = `Q${processData.queueNumber}`;
        } else {
            addedProcess = scheduler.rq.enqueue(process);
            queueName = "Ready Queue";
        }

        if (addedProcess) {
            alert(`Added process ${processData.id} to ${queueName}`);
            console.log("RQ:\n\n");
            console.log(scheduler.rq);
        }
    };



    return (
        <div className="view-port">
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

                        {
                            algorithm === RR ? (
                                <div id="time-quantum-group" className="form-group">
                                    <div className="form-row">
                                        <h3 className="header-text">Time Quantum</h3>
                                    </div>
                                    <div className="form-row">
                                        <input type="number" name="quantum" min="0" />
                                    </div>
                                </div>
                            ) : null
                        }

                        {
                            algorithm === MQ ? (
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
                                                        <th>Priority</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="queue-attributes-body">
                                                    {
                                                        Array.from({ length: nqueues }, (_, i) => (
                                                            <QueueRow key={i} index={i} />
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            ) : null
                        }


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

                                            {
                                                algorithm === PRIORITY ? (
                                                    <th id="priorityHeader">Priority</th>
                                                ) : null
                                            }

                                            {
                                                algorithm === MQ ? (
                                                    <th id="queueHeader">Queue Number</th>
                                                ) : null
                                            }

                                        </tr>
                                    </thead>
                                    <tbody id="process-attributes-body">
                                        {
                                            Array.from({ length: nprocesses }, (_, i) => (
                                                <ProcessRow
                                                    key={i}
                                                    index={i}
                                                    showPriorityCol={algorithm === PRIORITY}
                                                    showQueueCol={algorithm === MQ}
                                                    onAllProcessVariablesSet={handleAddProcesses}
                                                />
                                            ))
                                        }
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
                            <div id="rq-container" className="queue-container">
                                <div className="queue-row header-text-row">
                                    <h3 className="header-text">R.Q</h3>
                                </div>
                                <div id="rq" className="queue-row queue horizontal-scroll">
                                    <ProcessElement
                                        key={0}
                                        id={0}
                                        arrivalTime={0}
                                        burstTime={0}
                                    />
                                    {scheduler.rq.processes.map((process, index) => (
                                        <ProcessElement
                                            key={index}
                                            id={process.id}
                                            arrivalTime={process.arrivalTime}
                                            burstTime={process.burstTime}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div id="ganttchart" className="ganttchart-container">
                    <div className="ganttchart-row header-text-row">
                        <h3 className="header-text">Gantt Chart</h3>
                    </div>
                    <div id="ganttchart" className="ganttchart-row ganttchart horizontal-scroll">
                        {/* Gantt chart content */}
                    </div>
                </div>
                <div className="stats">
                    <h3 className="header-text">CPU Utilisation Metrics</h3>
                    <div className="stat-row">
                        <div className="stat-box">
                            <h3 className="header-text">Time Metrics</h3>
                            <div className="metric clock">
                                <p className="metric-label">Tick</p>
                                <p className="metric-value">2909</p>
                            </div>
                            <div className="metric">
                                <p className="metric-label">Total Ticks</p>
                                <p className="metric-value">2909</p>
                            </div>
                            <div className="metric">
                                <p className="metric-label">First Process Start</p>
                                <p className="metric-value">0</p>
                            </div>
                            <div className="metric">
                                <p className="metric-label">Last Process End</p>
                                <p className="metric-value">2909</p>
                            </div>
                            <div className="metric">
                                <p className="metric-label">Total Used Ticks</p>
                                <p className="metric-value">2909</p>
                            </div>
                            <div className="metric">
                                <p className="metric-label">Total Unused Ticks</p>
                                <p className="metric-value">2909</p>
                            </div>
                        </div>
                        <div className="stat-box"></div>
                        <div className="stat-box"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPort;
