import { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import CityContext from "../Contexts/CityContext";
import Pagination from "./PaginationComponent";
import './FetchedCitiesComponent.css'

const FetchedCitiesComponent = () => {
    
    const { saveCity } = useContext(CityContext);
    const { token } = useContext(AuthContext);
    const [fetchedCities, setFetchedCities] = useState([]);
    const [limit, setLimit] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage, setElementsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(Math.ceil(fetchedCities.length / elementsPerPage));
    
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
                throw new Error(error.errors[0].message);
            }
            
            const data = await response.json();
            setFetchedCities(data.data);
            setTotalPages(Math.ceil(data.data.length / 5));
            setCurrentPage(1);
        }
        catch(err)
        {
            console.log(err.message);
        }
        
    }

    const getPagedCities = () => {
        let start = (currentPage - 1) * elementsPerPage;
        let end = start + elementsPerPage;
        return fetchedCities.slice(start, end);
    }
    
    return (
        <div className="fetch-cities">
            <div className="fetch-buttons">
                <select name="limit-select" id="limit-select" onChange={e => setLimit(e.target.value)}>
                <option value="">-</option>
                {[...Array(10)].map((_,i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                ))}
                </select>
                <button onClick={fetchCities}>Fetch</button>
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
    )
}

export default FetchedCitiesComponent;