import { createContext, useState } from "react";

const CountryContext = createContext({});

export const CountryProvider = ({ children }) => {
    
    const getFromLocal = (item) => {
        let items = localStorage.getItem(item);
        items = items ? JSON.parse(items) : [];
        return items;
    }

    const [countries, setCountries] = useState(getFromLocal("countries"));
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
        const groupEmpty = !countries.some(country => 
            country.groups.includes(groupId));
        if(!groupEmpty)
        {
            throw new Error("The group must be empty before it can be removed")
        }
        let newGroups = groupsLocal.filter(g => g.id !== groupId);
        setGroups(newGroups);
        localStorage.setItem("groups",JSON.stringify(newGroups));

    }

    const saveCountry = (country) => {
        let countriesLocal = getFromLocal("countries");
        country.favorite = false;
        country.groups = [];
        const exists = countriesLocal.some(c => c.name === country.name && c.code === country.code);
        if(exists)
        {
            throw new Error("Country is already saved.");
        }
        countriesLocal.push(country); 
        setCountries(countriesLocal);
        localStorage.setItem("countries", JSON.stringify(countriesLocal));
    }

    const removeCountry = (country) => {
        let countriesLocal = getFromLocal("countries");
        countriesLocal = countriesLocal.filter(c => country.code !== c.code);
        setCountries(countriesLocal);
        localStorage.setItem("countries", JSON.stringify(countriesLocal));
    }

    const favoriteCountry = (country) => {
        let countriesLocal = JSON.parse(localStorage.getItem("countries"));
        let countryIndex = countriesLocal.findIndex(c => c.code === country.code);
        if(countryIndex === -1)
        {
            throw new Error("Country not found");
        }
        countriesLocal[countryIndex].favorite = countriesLocal[countryIndex].favorite ? false : true;
        setCountries(countriesLocal);
        localStorage.setItem("countries", JSON.stringify(countriesLocal));
    }

    const addCountryToGroup = (countryCode, groupId) => {
        if(!countryCode || !groupId)
        {
            throw new Error("Country or group is not selected!");
        }
        let countriesLocal = JSON.parse(localStorage.getItem("countries"));
        const countryIndex = countriesLocal.findIndex(c => c.code === countryCode);
        if(countryIndex === -1)
        {
            throw new Error("Country not found.");
        }
        const inGroup = countries[countryIndex].groups.includes(groupId);
        if(inGroup)
        {
            throw new Error("Country is already in the group.");
        }
        countriesLocal[countryIndex].groups.push(groupId);
        setCountries(countriesLocal);
        localStorage.setItem("countries", JSON.stringify(countriesLocal));
    }

    const removeCountryFromGroup = (countryCode, groupId) => {
        if(!countryCode || !groupId)
        {
            throw new Error("Country or group is not selected.");
        }
        let countriesLocal = JSON.parse(localStorage.getItem("countries"));
        const countryIndex = countriesLocal.findIndex(c => c.code === countryCode);
        if(countryIndex === -1)
        {
            throw new Error("Country not found.");
        }
        const groupIndex = countries[countryIndex].groups.findIndex(x => x === groupId);
        if(groupIndex === -1)
        {
            throw new Error("Country is not in the group.");
        }
        countriesLocal[countryIndex].groups.splice(groupIndex, 1);
        setCountries(countriesLocal);
        localStorage.setItem("countries", JSON.stringify(countriesLocal));
    }

    return (
        <CountryContext.Provider value={{countries, saveCountry, removeCountry, favoriteCountry,
                                     groups, saveGroup, removeGroup, addCountryToGroup, removeCountryFromGroup}}>
            {children}
        </CountryContext.Provider>
    )
}


export default CountryContext;