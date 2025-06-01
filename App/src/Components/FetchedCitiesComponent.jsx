import { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import CityContext from "../Contexts/CityContext";

const FetchedCitiesComponent = () => {
    
    const { saveCity } = useContext(CityContext);
    const { token } = useContext(AuthContext);
    const [fetchedCities, setFetchedCities] = useState([]);
    const [limit, setLimit] = useState("");
    
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
        }
        catch(err)
        {
            console.log(err.message);
        }
        
    }
    
    return (
        <div className="fetch-buttons">
        <select name="limit-select" id="limit-select" onChange={e => setLimit(e.target.value)}>
        <option value="">-</option>
        {[...Array(10)].map((_,i) => (
            <option key={i+1} value={i+1}>{i+1}</option>
        ))}
        </select>
        <button onClick={fetchCities}>Fetch</button>
        <ul>
            {
                [...fetchedCities,...Array(5-fetchedCities.length).fill(null)]
                .map((c,i) => c ? (
                    <li key={c.code}>{c.name}-{c.code}
                        <button onClick={() => saveCity(c.name,c.code)}>Save</button>
                    </li> 
                ) :
                (<li key={i}></li>)
            )
            }
        {/* {fetchedCities.map(c => (
            <li key={c.code}>{c.name}-{c.code}
            <button onClick={() => saveCity(c.name,c.code)}>Save</button>
            </li>
        ))} */}
        </ul>
        </div>
    )
}

export default FetchedCitiesComponent;