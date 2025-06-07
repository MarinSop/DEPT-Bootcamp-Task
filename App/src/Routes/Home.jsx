import SavedCountriesComponent from "../Components/SavedCountriesComponent";
import FetchedCountriesComponent from "../Components/FetchedCountriesComponent";
import GroupsComponent from "../Components/GroupsComponent";
import AddRemoveFromGroupComponent from "../Components/AddRemoveFromGroupComponent";
import './Home.css'
import NavbarComponent from "../Components/NavbarComponent";


const Home = () => {

    return (
        <main>
            <NavbarComponent/>
            <section className="countries-section">
                <FetchedCountriesComponent/>
                <SavedCountriesComponent/>
            </section>
            <section className="groups-section">
                <GroupsComponent/> 
                <AddRemoveFromGroupComponent/>
            </section>
        </main>
    )
}

export default Home;