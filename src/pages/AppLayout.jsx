import React from 'react'
import styles from "./AppLayout.module.css"
import Sidebar from '../components/Sidebar'
import Map from "../components/Map"
import User from '../components/User'
import { useCities } from '../contexts/CitiesContext'

export default function AppLayout() {

    const { clicked } = useCities();

    return (
        <div className={styles.app}>
            <button className={styles.hamburger} onClick={clicked}><div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div></button>
            <Sidebar />
            <Map />
            <User />
        </div>
    )
}
