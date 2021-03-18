import Axios from "axios";
import { NotificationAction, NotificationContext } from "./components/notifications/NotificationManager";
import { v4 } from "uuid";
import { useContext } from "react";
import { NotificationType } from "./components/notifications/Notification";

async function request(url, method, params={}, onSuccess=function(_responseData){}, onError=function(_error){}, data={}, headers={}){
    return Axios.request({
        method: method,
        url: url,
        headers: headers,
        data: data,
        params: params
    }).then(response => {
        const responseData = response.data;
        onSuccess(responseData);
        return responseData;
    }).catch(error => {
        onError(error);
    });
}

export function errorMessage(error) {
    if(error.response) {
        // Request made and server responded
        return error.response.data.message;
    } else if(error.request) {
        // The request was made but no response was received
        return error.request;
    } else {
        // Something happened in setting up the request that triggered an Error
        return error.message;
    }
}

export function get(url, params={}, onSuccess=function(){}, onError=function(){}, headers={}) {
    return request(url, "GET", params, onSuccess, onError, headers);
}

export function post(url, params={}, data={}, onSuccess=function(){}, onError=function(){}, headers={}) {
    return request(url, "POST", params, onSuccess, onError, data, headers);
}

export function camelToSentence(camelString) {
    var result = camelString.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export function useNotificationRaiser() {
    const dispatch = useContext(NotificationContext);

    return (
        notificationProps => {
            dispatch({
                type: NotificationAction.Add,
                payload: {
                    id: v4(),
                    ...notificationProps
                }
            });
        }
    );
}

export function raiseErrorNotification(notificationRaiser, error) {
    notificationRaiser({ type: NotificationType.Danger, message: errorMessage(error) });
}