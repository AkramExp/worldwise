import { useEffect, useState } from "react"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem";

export default function CountryList() {
    const BASE_URL = "http://localhost:8001";
    const [cities, setCities] = useState([]);

    useEffect(function () {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                console.log(data);
                setCities(data);
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchCities();
    }, [])

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, [])

    return (
        <ul className={styles.countryList}>{countries.map(country => <CountryItem country={country} />)}</ul>
    )
}
