import { NavLink, Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import styles from "./Sidebar.module.css"
import { useCities } from "../contexts/CitiesContext"

export default function Sidebar() {
    const { isClicked } = useCities();

    return (
        <div className={`${styles.sidebar} ${isClicked ? styles.hidden : ''}`}>
            <NavLink to="/">
                <img src="./logo.png" alt="logo" className="logo" />
            </NavLink>
            <AppNav />
            <Outlet />
        </div>
    )
}
