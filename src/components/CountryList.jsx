import { useEffect, useState } from "react"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";

export default function CountryList() {
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

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, [])

    if (isLoading) return <Spinner />

    return (
        <ul className={styles.countryList}>{countries.map(country => <CountryItem country={country} />)}</ul>
    )
}
