import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import config from "../config.json";
import { post, raiseErrorNotification, useNotificationRaiser } from "../helpers"; 
import { NotificationType } from "./notifications/Notification";


const SignInForm = (_props) => {
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const notificationRaiser = useNotificationRaiser();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password === passwordRepeat) {
            const notification = { type: NotificationType.Success, message: "User created successfuly!" };
            const onSuccess = (_responseData) => { notificationRaiser(notification) }
            const onError = (error) => { raiseErrorNotification(notificationRaiser, error) }
            const data = { "username": email, "password": password };
            post(config.api_host+"/users", null, data, onSuccess, onError);
        } else {
            const notification = { type: NotificationType.Danger, message: "Passwords do not match" };
            notificationRaiser(notification);
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

// class SignInForm extends Component {
//     state = {
//         fields: {},
//         errors: []
//     }

//     handleChange(fieldName, event) {
//         let fields = {...this.state.fields};
//         fields[fieldName] = event.target.value;        
//         this.setState({fields});
//     }

//     handleValidation() {
//         const fields = this.state.fields;
//         var errors = [];
//         var isValid = true;

//         if(fields["password1"] !== fields["password2"]) {
//             errors.push("Passwords do not match")
//             isValid = false
//         }

//         this.setState({errors})
//         return isValid
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault();

//         if(this.handleValidation()) {
//             const notification = { type: NotificationType.Success, message: "User created successfuly!" }
//             const notificationRaiser = useNotificationRaiser();
//             function onSuccess(_responseData){ notificationRaiser(notification) }
//             const data = { "username": this.state.fields["email"], "password": this.state.fields["password1"] }
//             post(config.api_host+"/users", null, data, onSuccess);
//         } else {
//             const errors = this.state.errors;
//             alert(errors)
//         }
//     }

//     render() {
//         return (
//             <Card className="bg-light text-white" style={{width: "45%", margin: "auto", marginTop: "2%"}}>
//                 <Card.Body>
//                     <Form onSubmit={this.handleOnSubmit}>
//                         <Form.Group controlId="formBasicEmail">
//                             <Form.Label className="text-dark">Email address</Form.Label>
//                             <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange.bind(this, "email")} required/>
//                             <Form.Text className="text-muted">
//                                 We'll never share your email with anyone else.
//                             </Form.Text>
//                         </Form.Group>

//                         <Form.Group controlId="formBasicPassword">
//                             <Form.Label className="text-dark">Password</Form.Label>
//                             <Form.Control type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password1")} required/>
//                         </Form.Group>

//                         <Form.Group controlId="formBasicPassword2">
//                             <Form.Label className="text-dark">Repeat password</Form.Label>
//                             <Form.Control type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password2")} required/>
//                         </Form.Group>

//                         <Button variant="secondary" type="submit">
//                             Sign In
//                         </Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         )
//     }
// }

// export default SignInForm