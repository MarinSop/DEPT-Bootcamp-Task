import Pagination from './PaginationComponent';
import CountryContext from '../Contexts/CountryContext';
import { useContext, useState, useEffect } from 'react';
import './GroupsComponent.css'

const GroupsComponent = () => {

    const { groups, saveGroup, removeGroup } = useContext(CountryContext);
    const [groupName, setGroupName] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage, setElementsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [errorMsg, setErrorMsg] = useState("");
    const [infoMsg, setInfoMsg] = useState("");

    const getPagedGroups = () => {
        let start = (currentPage - 1) * elementsPerPage;
        let end = start + elementsPerPage;
        let groupsPage = groups.slice(start, end);
        let filledGroupsPage = groupsPage.concat(Array(elementsPerPage - groupsPage.length).fill(null));
        return filledGroupsPage;
    }

    const saveGroupHandler = (groupName) => {
        try
        {
            saveGroup(groupName);
            setErrorMsg("");
            setInfoMsg("Group has been created.")
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
    }

        const removeGroupHandler = (groupId) => {
        try
        {
            removeGroup(groupId);
            setErrorMsg("");
            setInfoMsg("Group has been removed.");
        }
        catch(err)
        {
            setErrorMsg(err.message);
            setInfoMsg("");
        }
    }

    useEffect(() => {

            setTotalPages(Math.ceil(groups.length / elementsPerPage));

            if(currentPage === 0 && totalPages > 0)
            {
                setCurrentPage(1);
            }
            if(currentPage > totalPages)
            {
                setCurrentPage(totalPages);
            }
    },[groups, totalPages, elementsPerPage])

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
        <section className="groups-component">
            <h2>Groups</h2>
            {errorMsg && (<div className="error-msg">{errorMsg}</div>)}
            {infoMsg && (<div className="info-msg">{infoMsg}</div>)}
            <div className="groups">
                <div className="groups-buttons">
                    <div className="per-page-select">
                        <label htmlFor="per-page-select">Per<br/>page:</label>
                        <input type="number" 
                            onChange={(e) => setElementsPerPage(Number(e.target.value))} defaultValue={5} min="1"/>
                    </div>
                    <input type="text" placeholder="Enter name" 
                        onChange={e => setGroupName(e.target.value)}/>
                    <button onClick={() => saveGroupHandler(groupName)}>Create group</button>
                </div>
                <ul>
                    {getPagedGroups().map((g,i) => g ? (
                        <li key={g.id}>
                            <p>{g.name}</p>
                            <button onClick={() => removeGroupHandler(g.id)}>&#10060;</button>
                        </li>
                    ) : (
                        <li key={"empty:" + i}>&nbsp;</li>
                    ))}
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

export default GroupsComponent;