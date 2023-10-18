import styles from "./Login.module.css"
import PageNav from "../components/PageNav"
import Button from "../components/Button";

function Login() {
    return <main className={styles.login}>
        <PageNav />
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <input type="email" />
            </div>
            <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input type="password" />
            </div>
            <div>
                <Button type='primary'>Login</Button>
            </div>
        </form>
    </main>
}

export default Login;