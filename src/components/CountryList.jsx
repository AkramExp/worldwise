import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import Message from "./Message";

export default function CountryList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message='Add your first city' />

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, [])

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem country={country} />)}
        </ul>
    )
}
