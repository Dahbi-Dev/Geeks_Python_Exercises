import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from '../utils';
import axios from 'axios';

const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY;
const autoCompleteBaseUrl = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";

export default function SearchBar({ setSelectedCity }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const throttledAPICall = useCallback(debounce((query) => {
        if (!apiKey) return
        console.log('API call with search term:', query);
        const url = new URL(autoCompleteBaseUrl);
        url.searchParams.append("apikey", apiKey);
        url.searchParams.append("q", query);

        axios.get(url)
            .then((response) => {
                console.log(response.data);
                if (response.data)
                    setResult(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, 500), []);

    useEffect(() => {
        if (searchTerm) {
            throttledAPICall(searchTerm);
            setShowResult(true);
        }
    }, [searchTerm, throttledAPICall]);

    const selectCity = (city) => {
        if (city) { setSelectedCity(city); }
        setShowResult(false);
    }

    return (
        <div className="container py-8 relative">
            {/* search bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for a city"
                    className="w-full rounded-lg border-2 border-gray-300 p-2 text-black"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 fas fa-search"></i>

                {/* search result autocomplete */}
                {showResult && result && result.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 z-10 bg-white flex flex-wrap gap-2 rounded-lg shadow-lg p-2 cursor-pointer">
                        {result.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg p-2 shadow-md w-full"
                                onClick={() => selectCity(item)}>
                                <h3 className="text-lg font-bold">{item?.LocalizedName}</h3>
                                <p className="text-sm">{item?.Country?.LocalizedName}, {item?.AdministrativeArea?.LocalizedName}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
