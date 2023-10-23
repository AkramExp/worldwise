import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
    const [cityName, setCityName] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [lat, lng] = useUrlPosition();
    const [country, setCountry] = useState('');
    const [geocodingError, setGeocodingError] = useState('');
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const emoji = '';
    const navigate = useNavigate();

    const { createCity, isLoading } = useCities();

    function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        }

        createCity(newCity);
        navigate('/app/cities');
    }

    useEffect(function () {
        if (!lat && !lng) return;
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError('')
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();

                if (!data.countryCode) throw new Error("That doesn't seems to be a country, try somewhere else.");

                setCityName(data.city || data.locality || "")
                setCountry(data.country);
            } catch (err) {
                setGeocodingError(err.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }

        fetchCityData();
    }, [lat, lng])

    if (!lat && !lng) return <Message message="try clicking by somewhere on the map" />

    if (isLoadingGeocoding) return <Spinner />

    if (geocodingError) return <Message message={geocodingError} />

    return (
        <form className={`${styles.form} ${isLoading ? styles['form-loading'] : ''}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input id="cityName" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            </div>
            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker onChange={(date) => setDate(date)} selected={date} />
            </div>
            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea value={notes} id="notes" onChange={(e) => setNotes(e.target.value)}></textarea>
            </div>
            <div className={styles.button}>
                <Button type='primary'>Add</Button>
                <BackButton />
            </div>
        </form>
    )
}
