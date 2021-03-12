import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">HOME</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/test">TEST</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Username" className="mr-sm-2" />
            <FormControl type="password" placeholder="Password" className="mr-sm-2" />
            <Button variant="outline-secondary">Login</Button>
          </Form>
        </Navbar>
      ); 
}
 
export default CustomNavbar;