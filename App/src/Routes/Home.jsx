import SavedCitiesComponent from "../Components/SavedCitiesComponent";
import FetchedCitiesComponent from "../Components/FetchedCitiesComponent";



const Home = () => {


    return (
        <main>
            <FetchedCitiesComponent/>
            <SavedCitiesComponent/>
        </main>
    )
}

export default Home;