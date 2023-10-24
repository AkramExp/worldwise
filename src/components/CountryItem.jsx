import styles from "./CountryItem.module.css";

export default function CountryItem({ country }) {
    return (
        <li className={styles.countryItem}>
            <span>{country.country}</span>
        </li>
    )
}
