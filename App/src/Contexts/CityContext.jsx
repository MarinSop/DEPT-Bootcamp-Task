import { createContext, useState } from "react";

const CityContext = createContext({});

export const CityProvider = ({ children }) => {

    const getCitiesFromLocal = () => {
        let cities = localStorage.getItem("cities");
        cities = cities ? JSON.parse(cities) : {};
        return cities;
    }

    const [cities, setCities] = useState(getCitiesFromLocal);

    const saveCity = (name,code) => {
        let cities = getCitiesFromLocal();
        cities[code] = name; 
        setCities(cities);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    const removeCity = (code) => {
        let cities = getCitiesFromLocal();
        delete cities[code];
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