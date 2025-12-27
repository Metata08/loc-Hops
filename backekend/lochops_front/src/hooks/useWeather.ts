import { useEffect, useState } from "react";

// Types pour la réponse API OpenMeteo
interface OpenMeteoResponse {
    current_weather: {
        temperature: number;
        weathercode: number;
    };
}

// Map des codes météo WMO vers des émojis
const getWeatherIcon = (code: number): string => {
    // 0: Ciel dégagé
    if (code === 0) return "☀️";
    // 1-3: Partiellement nuageux
    if (code >= 1 && code <= 3) return "⛅";
    // 45, 48: Brouillard
    if (code === 45 || code === 48) return "🌫️";
    // 51-67: Bruine / Pluie
    if (code >= 51 && code <= 67) return "🌧️";
    // 71-77: Neige
    if (code >= 71 && code <= 77) return "❄️";
    // 80-82: Averses de pluie
    if (code >= 80 && code <= 82) return "🌦️";
    // 95-99: Orage
    if (code >= 95 && code <= 99) return "⛈️";

    return "☀️"; // Défaut
};

export function useWeather() {
    const [temperature, setTemperature] = useState<number | null>(null);
    const [weatherIcon, setWeatherIcon] = useState<string>("☀️");
    const [loading, setLoading] = useState<boolean>(true);

    // Coordonnées pour Dakar, Sénégal (par défaut pour l'hôpital Dalal Jamm)
    const LAT = 14.766;
    const LON = -17.388;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                // Utilisation de l'API gratuite Open-Meteo
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
                );

                if (!response.ok) {
                    throw new Error('Météo non disponible');
                }

                const data: OpenMeteoResponse = await response.json();

                setTemperature(Math.round(data.current_weather.temperature));
                setWeatherIcon(getWeatherIcon(data.current_weather.weathercode));
            } catch (error) {
                console.error("Erreur météo:", error);
                // Valeur par défaut réaliste en cas d'erreur
                setTemperature(28);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();

        // Rafraîchir toutes les 30 minutes
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return { temperature, weatherIcon, loading };
}
