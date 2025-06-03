import SavedCitiesComponent from "../Components/SavedCitiesComponent";
import FetchedCitiesComponent from "../Components/FetchedCitiesComponent";
import './Home.css'
import NavbarComponent from "../Components/NavbarComponent";


const Home = () => {

    return (
        <main>
            <NavbarComponent/>
            <div className="main-app">
                <FetchedCitiesComponent/>
                <SavedCitiesComponent/>
            </div>
        </main>
    )
}

export default Home;