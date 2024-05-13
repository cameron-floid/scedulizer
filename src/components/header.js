import React from "react";


const Header = () => {
    return (
        <header>
            <div className="header-col logo">
                <a href="/" aria-label="Homepage">
                    <img className="logo" src="logo/icon.png" alt="Schedulizer Logo" />
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
    )
}


export default Header;