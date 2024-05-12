import React from 'react';

const HomePage = () => {
    return (
        <div>
            <header>
                <div className="header-col logo">
                    <a href="/" aria-label="Homepage">
                        <img className="logo" src="assets/logo/icon.png" alt="Schedulizer Logo" />
                        <p className="logo-text">Schedulizer</p>
                    </a>
                </div>
                <div className="header-col menu">
                    <nav>
                        <ul>
                            <li><button className="btn primary-btn">Upload JSON</button></li>
                            <li><button className="btn primary-btn">Signin</button></li>
                        </ul>
                    </nav>
                </div>
            </header>

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
                                            <input type="radio" id="fcfs" name="algorithm" value="fcfs" defaultChecked />
                                            <label htmlFor="fcfs">FCFS</label>
                                        </div>

                                        <div className="btn-option">
                                            <input type="radio" id="sjf" name="algorithm" value="sjf" />
                                            <label htmlFor="sjf">SJF</label>
                                        </div>

                                        <div className="btn-option">
                                            <input type="radio" id="srjf" name="algorithm" value="srjf" />
                                            <label htmlFor="srjf">SRJF</label>
                                        </div>

                                        <div className="btn-option">
                                            <input type="radio" id="priority" name="algorithm" value="priority" />
                                            <label htmlFor="priority">Priority</label>
                                        </div>

                                        <div className="btn-option">
                                            <input type="radio" id="rr" name="algorithm" value="rr" />
                                            <label htmlFor="rr">RR</label>
                                        </div>

                                        <div className="btn-option">
                                            <input type="radio" id="mq" name="algorithm" value="mq" />
                                            <label htmlFor="mq">Multi Queue</label>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div id="time-quantum-group" className="form-group" style={{ display: 'none' }}>
                                <div className="form-row">
                                    <h3 className="header-text">Time Quantum</h3>
                                </div>
                                <div className="form-row">
                                    <input type="number" name="quantum" min="0" />
                                </div>
                            </div>

                            <div id="number-of-queues-group" className="form-group" style={{ display: 'none' }}>
                                <div className="form-row">
                                    <h3 className="header-text">Number of Queues</h3>
                                </div>
                                <div className="form-row">
                                    <input type="number" name="nqueues" id="nqueues" min="0" />
                                </div>
                            </div>

                            <div id="queue-attributes-group" className="form-group" style={{ display: 'none' }}>
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
                                        <tbody id="queue-attributes-body"></tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-row">
                                    <h3 className="header-text">Number of Processes</h3>
                                </div>
                                <div className="form-row">
                                    <input type="number" name="nprocesses" min="0" />
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
                                                <th id="priorityHeader" style={{ display: 'none' }}>Priority</th>
                                                <th id="queueHeader" style={{ display: 'none' }}>Queue Number</th>
                                            </tr>
                                        </thead>
                                        <tbody id="process-attributes-body"></tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="form-row footer-btns">
                                <input type="button" className="btn secondary-btn" value="Visualize" />
                                <input type="reset" className="btn secondary-btn" value="Reset" />
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

                            <div id="rq-container" className="queue-container">
                                <div className="queue-row header-text-row">
                                    <h3 className="header-text">R.Q</h3>
                                </div>
                                <div id="rq" className="queue-row queue horizontal-scroll">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="ganttchart" className="ganttchart-container">
                        <div className="ganttchart-row header-text-row">
                            <h3 className="header-text">Gantt Chart</h3>
                        </div>
                        <div id="ganttchart" className="ganttchart-row ganttchart horizontal-scroll">

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

            <footer>
                <div className="footer">
                    <p>&copy; Schedulizer <span id="year"></span> Coded by <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/cameronfloid">Came'ron</a> in Zambia &#128420;</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
