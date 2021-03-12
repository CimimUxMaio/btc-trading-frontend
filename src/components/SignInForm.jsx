import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"


class SignInForm extends Component {
    state = {
        fields: {},
        errors: []
    }


    handleChange(field, event) {
        let fields = this.state.fields;
        fields[field] = event.target.value;        
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

    onSubmit = (event) => {
        event.preventDefault();

        if(this.handleValidation()) {
            alert("User created!");
        } else {
            const errors = this.state.errors;
            alert(errors)
        }
    }

    render() {
        return (
            <Card className="bg-light text-white" style={{width: "45%", margin: "auto", marginTop: "2%"}}>
                <Form style={{width: "80%", margin: "3% 0% 3% 10%"}} onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="text-dark">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} required/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="text-dark">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password1")} value={this.state.fields["password1"]} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="text-dark">Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password2")} value={this.state.fields["password2"]} required/>
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