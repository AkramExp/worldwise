import { useEffect, useState } from "react"
import styles from "./CityList.module.css"
import CityItem from "./CityItem";
import Spinner from "./Spinner";

export default function CityList() {
    const BASE_URL = "http://localhost:8001";
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                console.log(data);
                setCities(data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, [])

    if (isLoading) return <Spinner />

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => <CityItem city={city} key={city.id} />)}
        </ul>
    )
}
