import { createContext, useState } from "react";

const CityContext = createContext({});

export const CityProvider = ({ children }) => {

    const getCitiesFromLocal = () => {
        let cities = localStorage.getItem("cities");
        cities = cities ? JSON.parse(cities) : [];
        return cities;
    }

    const [cities, setCities] = useState(getCitiesFromLocal);

    const saveCity = (city) => {
        let cities = getCitiesFromLocal();
        const exists = cities.some(c => c.name === city.name && c.code === city.code);
        if(!exists)
        {
            cities.push(city); 
            setCities(cities);
            localStorage.setItem("cities", JSON.stringify(cities));
        }
    }

    const removeCity = (city) => {
        let cities = getCitiesFromLocal();
        cities = cities.filter(c => city.code !== c.code);
        setCities(cities);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    return (
        <CityContext.Provider value={{cities, saveCity, removeCity}}>
            {children}
        </CityContext.Provider>
    )
}


export default CityContext;