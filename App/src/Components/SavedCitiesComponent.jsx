import { useContext } from "react";
import CityContext from "../Contexts/CityContext";

const SavedCitiesComponent = () => {

    const { cities, removeCity } = useContext(CityContext);
  
    return (
        <div className="saved-cities">
            <ul>
                {Object.entries(cities).map(([code,name]) => (
                    <li key={code}>{name}-{code}
                        <button onClick={() => removeCity(code)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default SavedCitiesComponent;