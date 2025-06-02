import SavedCitiesComponent from "../Components/SavedCitiesComponent";
import FetchedCitiesComponent from "../Components/FetchedCitiesComponent";
import './Home.css'
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <main>
            <div className="main-app">
                <FetchedCitiesComponent/>
                <SavedCitiesComponent/>
            </div>
            <button id="logout-button" onClick={handleLogout}>Log out</button>
        </main>
    )
}

export default Home;