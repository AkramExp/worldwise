import { useEffect, useState } from "react";
import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

export default function City() {
    const { id } = useParams();

    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        }).format(new Date(date));

    const BASE_URL = "http://localhost:8001/cities";
    const [currentCity, setCurrentCity] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function getCurrentCity() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/${id}`);
                const data = await res.json();
                setCurrentCity(data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        getCurrentCity();
    }, [id])


    const { cityName, date, notes } = currentCity;


    if (isLoading) return <Spinner />
    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City Name</h6>
                <h3>{cityName} </h3>
            </div>
            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>
            {notes && <div className={styles.row}>
                <h6>Your notes</h6>
                <p>
                    {notes}
                </p>
            </div>}
            <div className={styles.row}>
                <h6>Learn More</h6>
                <a href={`https://en.wikipedia.org/wiki/${cityName}`}>Check out {cityName} on Wikipidea </a>
            </div>
        </div>
    )
}
