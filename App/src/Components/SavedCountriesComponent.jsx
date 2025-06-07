import { useContext, useEffect, useState } from "react";
import CountryContext from "../Contexts/CountryContext";
import Pagination from "./PaginationComponent";
import './SavedCountriesComponent.css'

const SavedCountriesComponent = () => {

    const { countries, removeCountry, favoriteCountry, groups } = useContext(CountryContext);
    const [showFavorite, setShowFavorite] = useState(false);
    const [groupFilter, setGroupFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage,setElementsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(Math.ceil(countries.length / elementsPerPage));
    const [errorMsg, setErrorMsg] = useState("");
    const [infoMsg, setInfoMsg] = useState("");


    const getPagedCountries = () => {
        const start = (currentPage - 1) * elementsPerPage;
        const end = start + elementsPerPage;
        const filteredCountries = groupFilter ?
            countries.filter(c => c.groups.includes(groupFilter)) :
            countries;
        let countriesPage = showFavorite ? 
            filteredCountries.filter((c) => c.favorite).slice(start,end) :
            filteredCountries.slice(start,end);
        let filledCountriesPage = countriesPage.concat(Array(elementsPerPage - countriesPage.length).fill(null));
        return filledCountriesPage;
    }

    const removeCountryHandler = (country) => {
        try
        {
            removeCountry(country);
            setInfoMsg("Country has been removed.");
            setErrorMsg("");
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
    }

    const favoriteCountryHandler = (country) => {
        try
        {
            favoriteCountry(country);
            setErrorMsg("");
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
    }

    useEffect(() => {
        if(showFavorite)
        {
            const favoriteCountries = countries.filter((c) => c.favorite === true);
            if(groupFilter)
            {
                const filteredCountries = favoriteCountries.filter(c => c.groups.includes(groupFilter));
                setTotalPages(Math.ceil(filteredCountries.length / elementsPerPage))
            }
            setTotalPages(Math.ceil(favoriteCountries.length / elementsPerPage));
        }
        else
        {
            if(groupFilter)
            {
                const filteredCountries = countries.filter(c => c.groups.includes(groupFilter));
                setTotalPages(Math.ceil(filteredCountries.length / elementsPerPage))
            }
            else
            {
                setTotalPages(Math.ceil(countries.length / elementsPerPage));
            }
        }

        if(currentPage === 0 && totalPages > 0)
        {
            setCurrentPage(1);
        }
        if(currentPage > totalPages)
        {
            setCurrentPage(totalPages);
        }
    },[countries, totalPages, showFavorite, elementsPerPage, groupFilter])

    useEffect(() => {
        if (infoMsg || errorMsg) {
            const timer = setTimeout(() => {
                setInfoMsg("");
                setErrorMsg("");
            }, 3000);
        return () => clearTimeout(timer);
    }
}, [infoMsg, errorMsg]);
  
    return (
        <section className="save-component">
            <h2>Saved Countries</h2>
            {errorMsg && (<div className="error-msg">{errorMsg}</div>)}
            {infoMsg && (<div className="info-msg">{infoMsg}</div>)}
            <div className="saved-countries">
                <div className="saved-countries-buttons">
                    <div className="per-page-select">
                        <label htmlFor="per-page-select">Per<br/>page:</label>
                        <input type="number" 
                            onChange={(e) => setElementsPerPage(Number(e.target.value))} defaultValue={5} min="1"/>
                    </div>
                    <select onChange={e => setGroupFilter(Number(e.target.value))} name="group-select">
                        <option value="">All groups</option>
                        {groups.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                    <button id="all-button" className={!showFavorite ? "button-active" : undefined} 
                        onClick={() => setShowFavorite(false)}>All</button>
                    <button className={showFavorite ? "button-active" : undefined} 
                        onClick={() => setShowFavorite(true)}>Favorites</button>
                </div>
                <ul>
                    {getPagedCountries().map((country,i) => country ? (
                        <li key={country.code}>
                            <p>{country.name}-{country.code}</p>
                            <button className="favorite-button" onClick={() => favoriteCountryHandler(country)}>
                                {country.favorite ? '★' : '☆'}
                            </button>
                            <button onClick={() => removeCountryHandler(country)}>&#10060;</button>
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

export default SavedCountriesComponent;