import { useContext, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import CountryContext from "../Contexts/CountryContext";
import Pagination from "./PaginationComponent";
import { canRequest } from "../Tools/RateLimiter";
import './FetchedCountriesComponent.css'

const FetchedCountriesComponent = () => {
    
    const { saveCountry } = useContext(CountryContext);
    const { token, isAuthenticated, logout } = useContext(AuthContext);
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const [limit, setLimit] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [elementsPerPage, setElementsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(Math.ceil(fetchedCountries.length / elementsPerPage));
    const [errorMsg, setErrorMsg] = useState("");
    const [infoMsg, setInfoMsg] = useState("");
    
    const fetchCountries = async () => { 
        try
        {
            if(!canRequest())
            {
                throw new Error("Rate limit exceeded. Please wait.");
            }
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
                let errStr = error.errors.map(e => e.message).join(". ");
                if(response.status === 401)
                {
                    logout();
                    errStr = "Please log in to fetch countries.";
                }

                throw new Error(errStr);
            }
            
            const data = await response.json();
            setFetchedCountries(data.data);
            setTotalPages(Math.ceil(data.data.length / 5));
            setCurrentPage(1);
            setErrorMsg("");
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
        
    }

    const getPagedCountries = () => {
        let start = (currentPage - 1) * elementsPerPage;
        let end = start + elementsPerPage;
        let countriesPage = fetchedCountries.slice(start, end);
        let filledCountriesPage = countriesPage.concat(Array(elementsPerPage - countriesPage.length).fill(null));
        return filledCountriesPage;
    }

    const saveCountryHandler = (city) => 
    {
        try
        {
            saveCountry(city);
            setInfoMsg("Country has been saved.");
            setErrorMsg("");
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
    }
    
    useEffect(() => {
        if(isAuthenticated)
        {
            if (infoMsg || errorMsg) {
                const timer = setTimeout(() => {
                    setInfoMsg("");
                    setErrorMsg("");
                }, 3000);
            return () => clearTimeout(timer);
            }
        }
    }, [infoMsg,errorMsg])

    useEffect(() => {
        if(!isAuthenticated)
        {
            setErrorMsg("Please log in to fetch countries.");
        }
    },[isAuthenticated])

    return (
        <section className="fetch-component">
            <h2>Fetch countries</h2>
            {errorMsg && (<div className="error-msg">{errorMsg}</div>)}
            {infoMsg && (<div className="info-msg">{infoMsg}</div>)}
            <div className="fetch-countries">
                <div className="fetch-buttons">
                    <div className="per-page-select">
                        <label htmlFor="per-page-select">Per<br/>page:</label>
                        <input type="number" 
                            onChange={(e) => setElementsPerPage(Number(e.target.value))} defaultValue={5} min="1"/>
                    </div>
                    <select name="limit-select" id="limit-select" defaultValue={5} onChange={e => setLimit(e.target.value)}>
                    {[...Array(10)].map((_,i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                    </select>
                    <button onClick={fetchCountries} disabled={!isAuthenticated}>Fetch</button>
                </div>
                <ul>
                    {getPagedCountries().map((c,i) => c ? (
                            <li key={c.code}>
                                <p>{c.name}-{c.code}</p>
                                <button onClick={() => saveCountryHandler(c)}>Save</button>
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

export default FetchedCountriesComponent;