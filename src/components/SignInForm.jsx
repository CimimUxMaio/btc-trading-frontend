import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import config from "../config.json";
import { post, notificationAddAction, useNotificationContext, errorNotificationAddAction } from "../helpers"; 
import { NotificationType } from "./notifications/Notification";


const SignInForm = (_props) => {
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const notificationDispatch = useNotificationContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password === passwordRepeat) {
            const onSuccess = (_responseData) => { notificationDispatch(notificationAddAction(NotificationType.Success, "User created successfuly!")) };
            const onError = (error) => { notificationDispatch(errorNotificationAddAction(error)) };
            const data = { "username": email, "password": password };
            post(config.api_host+"/users", null, data, onSuccess, onError);
        } else {
            notificationDispatch(notificationAddAction(NotificationType.Danger, "Passwords do not match"));
        }
    }

    return (
        <Card className="bg-light text-white" style={{width: "45%", margin: "auto", marginTop: "2%"}}>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="text-dark">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => setMail(event.target.value)} required/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="text-dark">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label className="text-dark">Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event) => setPasswordRepeat(event.target.value)} required/>
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Sign In
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
 
export default SignInForm;