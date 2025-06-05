import { createContext, useState } from "react";

const CityContext = createContext({});

export const CityProvider = ({ children }) => {
    
    const getFromLocal = (item) => {
        let items = localStorage.getItem(item);
        items = items ? JSON.parse(items) : [];
        return items;
    }

    const [cities, setCities] = useState(getFromLocal("cities"));
    const [groups, setGroups] = useState(getFromLocal("groups"));
    
    const saveGroup = (groupName) => {
        if(!groupName)
        {
            throw new Error("Please enter a group name.")
        }
        let groupsLocal = getFromLocal("groups");
        const exists = groupsLocal.some(g => g.name === groupName);
        if(exists)
        {
            throw new Error("Group with same name already exists.");
        }
        const currentId = localStorage.getItem("groupsIdCounter");
        const nextId = currentId ? Number(currentId) + 1 : 1;
        groupsLocal.push({id: nextId, name: groupName});
        setGroups(groupsLocal);
        localStorage.setItem("groups", JSON.stringify(groupsLocal));
        localStorage.setItem("groupsIdCounter", nextId);
    }

    const removeGroup = (groupId) => {
        let groupsLocal = getFromLocal("groups");
        const groupExists = groupsLocal.some(g => g.id === groupId);
        if(!groupExists)
        {
            throw new Error("Group doesn't exist.");
        }
        console.log(groupId);
        const groupEmpty = !cities.some(city => 
            city.groups.some((g => Number(g.id) === Number(groupId))));
        if(!groupEmpty)
        {
            throw new Error("The group must be empty before it can be removed")
        }
        let newGroups = groupsLocal.filter(g => g.id !== groupId);
        setGroups(newGroups);
        localStorage.setItem("groups",JSON.stringify(newGroups));

    }

    const saveCity = (city) => {
        let citiesLocal = getFromLocal("cities");
        city.favorite = false;
        city.groups = [];
        const exists = citiesLocal.some(c => c.name === city.name && c.code === city.code);
        if(exists)
        {
            throw new Error("City is already saved.");
        }
        citiesLocal.push(city); 
        setCities(citiesLocal);
        localStorage.setItem("cities", JSON.stringify(citiesLocal));
    }

    const removeCity = (city) => {
        let citiesLocal = getFromLocal("cities");
        citiesLocal = citiesLocal.filter(c => city.code !== c.code);
        setCities(citiesLocal);
        localStorage.setItem("cities", JSON.stringify(citiesLocal));
    }

    const favoriteCity = (city) => {
        let citiesLocal = JSON.parse(localStorage.getItem("cities"));
        let cityIndex = citiesLocal.findIndex(c => c.code === city.code);
        citiesLocal[cityIndex].favorite = citiesLocal[cityIndex].favorite ? false : true;
        setCities(citiesLocal);
        localStorage.setItem("cities", JSON.stringify(citiesLocal));
    }

    return (
        <CityContext.Provider value={{cities, saveCity, removeCity, favoriteCity,
                                     groups, saveGroup, removeGroup}}>
            {children}
        </CityContext.Provider>
    )
}


export default CityContext;