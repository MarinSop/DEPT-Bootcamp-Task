import { useContext } from "react";
import './NavbarComponent.css';
import { Link } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

const NavbarComponent = () => {

    const { logout, isAuthenticated } = useContext(AuthContext);
    
    return (
        <nav>
            <div className="logo-container">LOGO</div>
            <div className="navbar">
                <ul>
                    <li><Link to="/" style={{color:"white"}}>Home</Link></li>
                </ul>
            </div>
            <div className="login-container">
                {isAuthenticated ? (
                    <button id="logout-button" onClick={logout}>Logout</button>
                ) : (
                    <Link id="login-button" to="/login">Login</Link>
                )}
            </div>
        </nav>
    )

}

export default NavbarComponent;