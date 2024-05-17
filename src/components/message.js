import React, { useEffect, useState } from "react";

const Message = ({ message, setMessage }) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (message.content) {
            setFade(false); // Reset fade effect when the message changes

            const timer = setTimeout(() => {
                setFade(true); // Trigger fade out effect after a delay
                setMessage({}); // Clear message after fade out
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    if (!message.content) {
        return null;
    }

    return (
        <div className={`alert ${message.type} ${fade ? 'fade-out' : ''}`}>
            {message.content}
        </div>
    );
};

export default Message;