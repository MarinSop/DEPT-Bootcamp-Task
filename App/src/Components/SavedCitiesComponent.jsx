import { useContext, useEffect, useState } from "react";
import CityContext from "../Contexts/CityContext";
import Pagination from "./PaginationComponent";
import './SavedCitiesComponent.css'

const SavedCitiesComponent = () => {

    const { cities, removeCity, favoriteCity } = useContext(CityContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage,setElementsPerPage] = useState(5);
    const [showFavorite, setShowFavorite] = useState(false);
    const [totalPages, setTotalPages] = useState(Math.ceil(cities.length / elementsPerPage));
    const [errorMsg, setErrorMsg] = useState("");


    const getPagedCities = () => {
        let start = (currentPage - 1) * elementsPerPage;
        let end = start + elementsPerPage;
        let citiesPage = showFavorite ? 
            cities.filter((c) => c.favorite === true).slice(start,end) :
            cities.slice(start,end);
        let filledCitiesPage = citiesPage.concat(Array(elementsPerPage - citiesPage.length).fill(null));
        return filledCitiesPage;
    }

    useEffect(() => {
        if(showFavorite)
        {
            const favoriteCities = cities.filter((c) => c.favorite === true);
            setTotalPages(Math.ceil(favoriteCities.length / elementsPerPage));
        }
        else
        {
            setTotalPages(Math.ceil(cities.length / elementsPerPage));
        }

        if(currentPage === 0 && totalPages > 0)
        {
            setCurrentPage(1);
        }
        if(currentPage > totalPages)
        {
            setCurrentPage(totalPages);
        }
    },[cities,totalPages,showFavorite, elementsPerPage])
  
    return (
        <section className="save-component">
            <div className="error-msg"
                style={{visibility: errorMsg ? "visible" : "hidden"}}>
                {errorMsg}
            </div>
            <div className="saved-cities">
                <div className="saved-cities-buttons">
                    <div className="per-page-select">
                        <label htmlFor="per-page-select">Per<br/>page:</label>
                        <input type="number" 
                            onChange={(e) => setElementsPerPage(Number(e.target.value))} defaultValue={5} min="1"/>
                    </div>
                    <select name="group-select">
                        <option value="">All groups</option>
                    </select>
                    <button className={!showFavorite ? "button-active" : undefined} 
                        onClick={() => setShowFavorite(false)}>All</button>
                    <button className={showFavorite ? "button-active" : undefined} 
                        onClick={() => setShowFavorite(true)}>Favorites</button>
                </div>
                <ul>
                    {getPagedCities().map((city,i) => city ? (
                        <li key={city.code}>
                            <p>{city.name}-{city.code}</p>
                            <button className="favorite-button" onClick={() => favoriteCity(city)}>
                                {city.favorite ? '★' : '☆'}
                            </button>
                            <button onClick={() => removeCity(city)}>&#10060;</button>
                        </li>
                        )
                        :
                        (<li key={i} className="prevent-select"><p>&nbsp;</p></li>)
                    )}
                    <li>
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(Math.max(1,Math.min(page,totalPages)))}/>
                    </li>
                </ul>
            </div>
        </section>
    )

}

export default SavedCitiesComponent;