import Axios from "axios";

async function request(url, method, params={}, onSuccess=function(responseData){}, onError=function(error){}, data={}){
    return Axios.request({
        method: method,
        url: url,
        data: data,
        params: params
    }).then(response => {
        const responseData = response.data;
        onSuccess(responseData);
        return responseData;
    }).catch(error => {
        onError(error);
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data.message);
            alert(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            alert(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message);
            alert('Error', error.message);
        }
    });
}

export function get(url, params={}, onSuccess=function(){}, onError=function(){}) {
    return request(url, "GET", params, onSuccess, onError);
}

export function post(url, params={}, data={}, onSuccess=function(){}, onError=function(){}) {
    return request(url, "POST", params, onSuccess, onError, data);
}

export function camelToSentence(camelString) {
    var result = camelString.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
}