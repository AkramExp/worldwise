import AppNav from "./AppNav"
import styles from "./Sidebar.module.css"

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <img src="logo.png" alt="logo" className="logo" />
            <AppNav />
        </div>
    )
}
