import { useState } from "react";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";

export default function Form() {
    const [cityName, setCityName] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");

    return (
        <form className={styles.form}>
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
            </div>
        </form>
    )
}
