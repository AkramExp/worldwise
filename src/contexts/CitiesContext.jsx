import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const BASE_URL = "http://localhost:8001";
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState([]);


    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                console.log(data);
                setCities(data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, [])

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(city) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(city),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();

            setCities(cities => [...cities, data]);
        } catch {
            alert("there was an error loading data...");
        } finally {
            setIsLoading(false);
        }
    }

    return <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity }}>
        {children}
    </CitiesContext.Provider>
}

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw new Error('error');

    return context;
}

export { CitiesProvider, useCities }

