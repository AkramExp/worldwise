import React from 'react'
import styles from "./AppLayout.module.css"
import Sidebar from '../components/Sidebar'

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
        </div>
    )
}
