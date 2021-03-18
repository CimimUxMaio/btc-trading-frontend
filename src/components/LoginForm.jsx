import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import config from "../config.json";
import { useHistory } from "react-router";
import { post, raiseErrorNotification, useNotificationRaiser } from "../helpers";


const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const notificationRaiser = useNotificationRaiser();

    const handleSubmit = (event) => {
        event.preventDefault();

        let headers = {
            "Authorization": "Basic " + btoa(`${email}:${password}`),
        }

        const onSuccess = (responseData) => {
            props.setToken(responseData["token"]);
            history.push("/");
        }

        const onError = (error) => {
            raiseErrorNotification(notificationRaiser, error);
        }

        post(`${config.api_host}/token`, null, null, onSuccess, onError, headers);
    }

    return (
        <Form inline onSubmit={handleSubmit}>
            <FormControl type="email" placeholder="Email" className="mr-sm-2" required onChange={(event) => { setEmail(event.target.value) }}/>
            <FormControl type="password" placeholder="Password" className="mr-sm-2" required onChange={(event) => { setPassword(event.target.value) }}/>
            <Button variant="outline-secondary" type="submit">Login</Button>
        </Form>
    );
}
 
export default LoginForm;