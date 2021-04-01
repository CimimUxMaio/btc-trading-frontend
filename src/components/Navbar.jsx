import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const CustomNavbar = (_props) => {
  return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">HOME</Navbar.Brand>
        <Nav className="mr-auto"/>
      </Navbar>
    ); 
}
 
export default CustomNavbar;
