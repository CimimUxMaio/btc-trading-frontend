import React, { useEffect, useState } from "react";
import { NotificationAction } from "./NotificationManager";

export const NotificationType = {
    Success: "success",
    Danger: "danger"
}

const Notification = ({ dispatch, object }) => {
    const [exit, setExit] = useState(false);
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBarWidth(prev => {
                return Math.min(100, prev + 0.5);
            })
        }, 20);

        return () => { clearInterval(interval) };
    }, []);

    useEffect(() => {
        if(barWidth === 100) {
            setExit(true);
            setTimeout(() => {
                dispatch({
                    type: NotificationAction.Remove,
                    id: object.id
                });
            }, 500);
        }
    }, [barWidth, dispatch, object.id]);

    return (
        <div className={`notification ${object.type} ${exit ? "exit" : ""}`}>
            <p>{object.message}</p>
            <div className="bar" style={{width: `${barWidth}%`}}/>
        </div>
    );
}
 
export default Notification;