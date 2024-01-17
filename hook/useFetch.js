import { useState, useEffect } from "react";
import axios from "axios";
import job_data from "../constants/job_data"

const apiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            if (response.status === 429) {
                setData(job_data.data)
            } else {
                setData(response.data.data);
            }

        } catch (error) {
            // setError(error);
            console.log(error)
            setData(job_data.data)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;