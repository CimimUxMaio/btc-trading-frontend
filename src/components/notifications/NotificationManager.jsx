import React, { createContext, useReducer } from "react";
import Notification from "./Notification";

export const NotificationContext = createContext();

export const NotificationAction = {
    Add: "ADD_NOTIFICATION",
    Remove: "REMOVE_NOTIFICATION"
}

const NotificationManager = (props) => {
    const [notifications, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case NotificationAction.Add:
                return [...state, action.payload];
            case NotificationAction.Remove:
                return state.filter(n => n.id !== action.id);
            default:
                return state;
        }
    },[]);

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className="notification-container">
                {
                    notifications.map(n => {
                        return <Notification key={n.id} dispatch={dispatch} object={n}/>;
                    })
                }
            </div>
            {props.children}
        </NotificationContext.Provider>
    );
}
 
export default NotificationManager;