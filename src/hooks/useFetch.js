// This hook is responsible for seending http requests

import { useCallback, useEffect, useReducer } from "react";
import { json } from "react-router-dom";

// to my backend or any external api
const initialHttpState = {
    data: null,
    isLoading: false,
    error: null,
};

const httpReducer = (state, action) => {
    if (action.type === "FETCH_START") {
        return {
            ...state,
            isLoading: state.data ? false : true,
            error: null,
        };
    }

    if (action.type === "FETCH_ERROR") {
        return {
            data: null,
            isLoading: false,
            error: action.payload,
        };
    }

    if (action.type === "FETCH_SUCCESS") {
        console.log(action.payload);
        return {
            data: action.payload,
            isLoading: false,
            error: null,
        };
    }

    return initialHttpState;
};

const useFetch = (url, type) => {
    const [httpState, dispatch] = useReducer(httpReducer, initialHttpState);

    const fetchData = useCallback(async function getData() {
        dispatch({ type: "FETCH_START" });

        try {
            let data;
            if (type && localStorage.getItem(type)) {
                data = JSON.parse(localStorage.getItem(type));
            } else {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to get data");
                data = await response.json();
                if (type) {
                    localStorage.setItem(type, JSON.stringify(data));
                }
            }
            dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
    }, []);

    useEffect(
        function () {
            fetchData();
        },
        [fetchData]
    );

    return httpState;
};

export default useFetch;
