import styles from "./Login.module.css"
import PageNav from "../components/PageNav"
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('jack@example.com');
    const [password, setPassword] = useState('qwerty');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password) login(email, password);
    }

    useEffect(function () {
        if (isAuthenticated)
            navigate('/app', { replace: true });
    }, [isAuthenticated, navigate])

    return <main className={styles.login} onSubmit={handleSubmit}>
        <PageNav />
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <Button type='primary'>Login</Button>
            </div>
        </form>
    </main>
}

export default Login;