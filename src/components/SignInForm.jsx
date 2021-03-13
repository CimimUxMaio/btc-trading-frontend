import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import config from "../config.json";
import Axios from "axios";


class SignInForm extends Component {
    state = {
        fields: {},
        errors: []
    }


    handleChange(fieldName, event) {
        let fields = {...this.state.fields};
        fields[fieldName] = event.target.value;        
        this.setState({fields});
    }

    handleValidation() {
        const fields = this.state.fields;
        var errors = [];
        var isValid = true;

        if(fields["password1"] !== fields["password2"]) {
            errors.push("Passwords do not match")
            isValid = false
        }

        this.setState({errors})
        return isValid
    }

    handleOnSubmit = (event) => {
        event.preventDefault();

        if(this.handleValidation()) {
            Axios.post(config.api_host + "/users", { "username": this.state.fields["email"], "password": this.state.fields["password1"] })
                .then(response => {
                    alert("User created successfuly!");
                }).catch( error => {
                    alert(error);
                })
        } else {
            const errors = this.state.errors;
            alert(errors)
        }
    }

    render() {
        return (
            <Card className="bg-light text-white" style={{width: "45%", margin: "auto", marginTop: "2%"}}>
                <Form style={{width: "80%", margin: "3% 0% 3% 10%"}} onSubmit={this.handleOnSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="text-dark">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange.bind(this, "email")} required/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="text-dark">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password1")} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label className="text-dark">Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password2")} required/>
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Sign In
                    </Button>
                </Form>
            </Card>
        )
    }
}

export default SignInForm