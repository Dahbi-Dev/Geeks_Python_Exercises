import axios from "axios";

export function debounce(func, duration) {
    let timeout;

    return function (...args) {
        const effect = () => {
            timeout = null;
            return func.apply(this, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(effect, duration);
    };
}

const weatherBaseUrl =
    "https://dataservice.accuweather.com/currentconditions/v1/";

export async function fetchWeatherData(apiKey, key) {
    if (!apiKey || !key) return;
    const url = new URL(weatherBaseUrl + key);
    url.searchParams.append("apikey", apiKey);
    url.searchParams.append("q", key);

    const data = await axios
        .get(url)
        .then((response) => {
            console.log(response.data);
            if (response.data) {
                return response.data;
            }
        })
        .catch((error) => {
            console.error(error);
        });
    return data;
}

const forecastBaseUrl =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";

export async function fetchForecastData(apiKey, key) {
    if (!apiKey || !key) return;
    const url = new URL(forecastBaseUrl + key);
    url.searchParams.append("apikey", apiKey);
    url.searchParams.append("q", key);
    url.searchParams.append("metric", true);

    const data = await axios
        .get(url)
        .then((response) => {
            console.log(response.data);
            if (response.data) return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
    return data;
}
