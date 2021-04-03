import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";


const CustomNavbar = (_props) => {
  const history = useHistory();

  return (
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand onClick={() => history.push("/")}>HOME</Navbar.Brand>
          <Nav className="mr-auto"/>
      </Navbar>
    ); 
}
 
export default CustomNavbar;
