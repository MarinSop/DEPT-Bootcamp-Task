import SavedCitiesComponent from "../Components/SavedCitiesComponent";
import FetchedCitiesComponent from "../Components/FetchedCitiesComponent";
import GroupsComponent from "../Components/GroupsComponent";
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
            <GroupsComponent/>
        </main>
    )
}

export default Home;