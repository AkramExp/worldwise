import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvent,
    useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {

    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([0, 40]);

    const [mapLat, mapLng] = useUrlPosition();

    const { isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition } = useGeolocation();

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng])

    useEffect(function () {
        if (geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type='position' onClick={getPosition}>
                {isLoadingPosition ? 'Loading..' : 'Get your position'}
            </Button>}
            <MapContainer center={mapPosition} zoom={12} scrollWheelZoom={true} className={styles.map} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    cities.map(city =>
                        <Marker position={city.position} key={city.id}>
                            <Popup>
                                {city.cityName}
                            </Popup>
                        </Marker>)
                }
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}
