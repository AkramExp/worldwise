import styles from "./CityList.module.css"
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => <CityItem city={city} key={city.id} />)}
        </ul>
    )
}
