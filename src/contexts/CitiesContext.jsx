import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
    isClicked: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true }
        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload }
        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload }
        case 'cities/created':
            return { ...state, isLoading: false, currentCity: action.payload, cities: [...state.cities, action.payload] }
        case 'cities/deleted':
            return { ...state, isLoading: false, currentCity: {}, cities: state.cities.filter(city => city.id !== action.payload) }
        case 'rejected':
            return { ...state, isLoading: false, error: action.payload }
        case 'isClicked':
            return { ...state, isClicked: !state.isClicked }
        default:
            throw new Error('Error');
    }
}

function CitiesProvider({ children }) {
    const BASE_URL = "https://6537de1aa543859d1bb0f7ad.mockapi.io";
    const [{ cities, isLoading, currentCity, isClicked }, dispatch] = useReducer(reducer, initialState);


    useEffect(function () {
        async function fetchCities() {
            try {
                dispatch({ type: 'loading' })
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data })
            } catch (err) {
                dispatch({ type: 'rejected', payload: err.message })
            }
        }

        fetchCities();
    }, [])

    async function getCity(id) {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data })
        } catch {
            dispatch({ type: 'rejected', payload: 'there was some error loading the city..' })
        }
    }

    async function createCity(city) {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(city),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();
            dispatch({ type: 'cities/created', payload: data })
        } catch {
            dispatch({ type: 'rejected', payload: 'there was an error loading data...' })
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({ type: 'loading' })
            await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
            dispatch({ type: 'cities/deleted', payload: id })
        } catch {
            dispatch({ type: 'rejected', payload: 'Error deleting city' })
        }
    }

    function clicked() {
        dispatch({ type: 'isClicked' })
    }

    return <CitiesContext.Provider value={{ isClicked, cities, isLoading, currentCity, clicked, getCity, createCity, deleteCity }}>
        {children}
    </CitiesContext.Provider>
}

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw new Error('error');

    return context;
}

export { CitiesProvider, useCities }

