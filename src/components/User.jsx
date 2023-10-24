import styles from "./User.module.css";

export default function User(user) {
    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button>Logout</button>
        </div>
    )
}
