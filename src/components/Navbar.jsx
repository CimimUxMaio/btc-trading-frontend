import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LoginForm from "./LoginForm";
import Button from "react-bootstrap/Button";
import Conditional from "./utils/Conditional";


function handleLogoutClick(props) {
  props.deleteToken();
}

function LogoutButton(props) {
  return <Button variant="outline-secondary" onClick={() => { handleLogoutClick(props) }}>Logout</Button>;
}

const CustomNavbar = (props) => {
  return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">HOME</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/test">TEST</Nav.Link>
        </Nav>
        <Conditional 
          condition={() => !props.isLoggedIn()}
          primary={<LoginForm/>}
          secondary={<LogoutButton/>}
          {...props}/>
      </Navbar>
    ); 
}
 
export default CustomNavbar;