import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import config from "../config.json";
import { Redirect, withRouter } from "react-router";


class LoginForm extends Component {
    state = {
        fields: {}
    }

    handleSubmit = (event) => { 
        event.preventDefault();

        let axiosConfig = {
            headers: {
                "Authorization": "Basic " + btoa(this.state.fields["email"] + ":" + this.state.fields["password"]),
            }
        }

        Axios.post(config.api_host+"/token", null, axiosConfig).then(response => {
            this.props.setToken(response.data["token"]);
            this.props.history.push("/");
        }).catch(error => {
            if(!error.response) {
                alert(error);
            } else {
                alert(error.response.data);
            }
        })
    }

    handleOnChange(fieldName, event) {
        let fields = {...this.state.fields};
        fields[fieldName] = event.target.value;
        this.setState({fields});
    }

    render() { 
        if(this.props.loggedIn) return <Redirect to="/"/>;

        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormControl type="email" placeholder="Email" className="mr-sm-2" required onChange={this.handleOnChange.bind(this, "email")}/>
                <FormControl type="password" placeholder="Password" className="mr-sm-2" required onChange={this.handleOnChange.bind(this, "password")}/>
                <Button variant="outline-secondary" type="submit">Login</Button>
            </Form>
        );
    }
}
 
export default withRouter(LoginForm);