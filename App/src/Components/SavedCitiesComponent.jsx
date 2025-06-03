import { useContext, useEffect, useState } from "react";
import CityContext from "../Contexts/CityContext";
import Pagination from "./PaginationComponent";
import './SavedCitiesComponent.css'

const SavedCitiesComponent = () => {

    const { cities, removeCity } = useContext(CityContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage,setElementsPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(Math.ceil(cities.length / elementsPerPage));
    const [errorMsg, setErrorMsg] = useState('\u00A0');


    const getPagedCities = () => {
        let start = (currentPage - 1) * elementsPerPage;
        let end = start + elementsPerPage;
        return cities.slice(start,end);
    }

    useEffect(() => {
        setTotalPages(Math.ceil(cities.length / elementsPerPage));
        if(currentPage === 0 && totalPages > 0)
        {
            setCurrentPage(1);
        }
        if(currentPage > totalPages)
        {
            setCurrentPage(totalPages);
        }
    },[cities,totalPages])
  
    return (
        <section className="save-component">
            <p className="error-msg">{errorMsg}</p>
            <div className="saved-cities">
                <ul>
                    {[...getPagedCities(),...Array(elementsPerPage - getPagedCities().length).fill(null)]
                    .map((city,i) => city ? 
                        (<li key={city.code}>
                            <p>{city.name}-{city.code}</p>
                            <button onClick={() => removeCity(city)}>Remove</button>
                        </li>)
                        :
                        (<li key={i}><p>&nbsp;</p></li>)
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