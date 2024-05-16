import React from 'react';


const Stats = (props) => {
    return (
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
    )
};


export default Stats;