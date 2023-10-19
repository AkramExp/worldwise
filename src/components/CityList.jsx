import { useEffect, useState } from "react"
import styles from "./CityList.module.css"
import CityItem from "./CityItem";

export default function CityList() {
    const BASE_URL = "http://localhost:8000";
    const [cities, setCities] = useState();

    useEffect(function () {
        async function fetchCities() {
            const res = await fetch(`${BASE_URL}/cities`);
            const data = await res.json();
            setCities(data);
        }

        fetchCities();
    }, [])

    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id} />)}
        </ul>
    )
}
