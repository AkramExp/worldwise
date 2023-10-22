import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvent,
} from "react-leaflet";

export default function Map() {
    const position = [0, 40];

    return (
        <div className={styles.mapContainer}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className={styles.map} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <DetectClick />
            </MapContainer>
        </div>
    )
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}
