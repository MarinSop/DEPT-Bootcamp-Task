import CountryContext from "../Contexts/CountryContext"
import { useContext, useState, useEffect } from "react"
import './AddRemoveFromGroupComponent.css'


const AddRemoveFromGroupComponent = () => {

    const { groups, countries, addCountryToGroup, removeCountryFromGroup } = useContext(CountryContext);
    const [ addCountry, setAddCountry ] = useState(null);
    const [ addGroup, setAddGroup ] = useState(null);
    const [ removeCountry, setRemoveCountry ] = useState(null);
    const [ removeGroup, setRemoveGroup ] = useState(null);
    const [ filteredCountries, setFilteredCountries] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ infoMsg, setInfoMsg ] = useState("");


    const addCountryToGroupHandler = (countryCode, groupId) => {
        try
        {
            addCountryToGroup(countryCode, Number(groupId));
            const countriesInGroup = countries.filter(c => c.groups.includes(Number(groupId)));
            setFilteredCountries(countriesInGroup);
            setErrorMsg("");
            setInfoMsg("Country has been added to the group.");
            
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
    }

    const removeCountryFromGroupHandler = (countryCode, groupId) => {
        try
        {
            removeCountryFromGroup(countryCode, Number(groupId));
            const countriesInGroup = countries.filter(c => c.groups.includes(Number(groupId)));
            setFilteredCountries(countriesInGroup);
            setErrorMsg("");
            setInfoMsg("Country has been removed from the group.");
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
    }

    const setRemoveGroupHandler = (groupId) => {
        setRemoveGroup(groupId);
        const countriesInGroup = countries.filter(c => c.groups.includes(Number(groupId)));
        setFilteredCountries(countriesInGroup);
    }

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
        <section className="ar-from-groups-component">
            <h2>Add or remove countries from groups</h2>
            {errorMsg && (<div className="error-msg">{errorMsg}</div>)}
            {infoMsg && (<div className="info-msg">{infoMsg}</div>)}
            <div className="ar-from-groups">
                <div className="ar-inner-section">
                    <select onChange={e => setAddGroup(e.target.value)}>
                        <option value="">Select group</option>
                        {groups.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                    <select onChange={e => setAddCountry(e.target.value)}>
                        <option value="">Select country</option>
                        {countries.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                    </select>
                    <button onClick={() => addCountryToGroupHandler(addCountry, addGroup)}>
                        Add to group</button>
                </div>
                <div className="ar-inner-section">
                    <select onChange={e => setRemoveGroupHandler(e.target.value)}>
                        <option value="">Select group</option>
                        {groups.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                    <select onChange={e => setRemoveCountry(e.target.value)}>
                        <option value="">Select country</option>
                        {filteredCountries.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                    </select>
                    <button onClick={() => removeCountryFromGroupHandler(removeCountry, removeGroup)}>
                        Remove from group</button>
                </div>
            </div>
        </section>
    )
}

export default AddRemoveFromGroupComponent;