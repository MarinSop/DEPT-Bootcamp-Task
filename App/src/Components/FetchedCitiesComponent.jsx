import { useContext, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import CityContext from "../Contexts/CityContext";
import Pagination from "./PaginationComponent";
import './FetchedCitiesComponent.css'

const FetchedCitiesComponent = () => {
    
    const { saveCity } = useContext(CityContext);
    const { token, isAuthenticated, logout } = useContext(AuthContext);
    const [fetchedCities, setFetchedCities] = useState([]);
    const [limit, setLimit] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [elementsPerPage, setElementsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(Math.ceil(fetchedCities.length / elementsPerPage));
    const [errorMsg, setErrorMsg] = useState('\u00A0');
    
    const fetchCities = async () => { 
        try
        {
            let domainPath = "/api/countries";
            if(limit)
                {
                domainPath += "?limit=" + limit;
            }
            
            const response = await fetch(import.meta.env.VITE_API_URL + domainPath, {
                headers: {'Authorization': 'Bearer ' + token},
            });
            if(!response.ok)
            {
                const error = await response.json();
                const errStr = error.errors.map(e => e.message).join(". ");
                if(response.status === 401)
                {
                    logout();
                    errStr = "Please log in to fetch cities.";
                }

                throw new Error(errStr);
            }
            
            const data = await response.json();
            setFetchedCities(data.data);
            setTotalPages(Math.ceil(data.data.length / 5));
            setCurrentPage(1);
        }
        catch(err)
        {
            console.log(err.message);
            setErrorMsg(err.message);
        }
        
    }

    const getPagedCities = () => {
        let start = (currentPage - 1) * elementsPerPage;
        let end = start + elementsPerPage;
        return fetchedCities.slice(start, end);
    }
    
    useEffect(() => {
        if(!isAuthenticated)
        {
            setErrorMsg("Please log in to fetch cities.");
        }
    }, [])


    return (
        <section className="fetch-component">
            <p className="error-msg">{errorMsg}</p>
            <div className="fetch-cities">
                <div className="fetch-buttons">
                    <select name="limit-select" id="limit-select" defaultValue={5} onChange={e => setLimit(e.target.value)}>
                    {[...Array(10)].map((_,i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                    </select>
                    <button onClick={fetchCities} disabled={!isAuthenticated}>Fetch</button>
                </div>
                <ul>
                    {[...getPagedCities(),...Array(elementsPerPage-getPagedCities().length).fill(null)]
                        .map((c,i) => c ? (
                            <li key={c.code}>
                                <p>{c.name}-{c.code}</p>
                                <button onClick={() => saveCity(c)}>Save</button>
                            </li> 
                        ) : (<li key={i}><p>&nbsp;</p></li>)
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

export default FetchedCitiesComponent;