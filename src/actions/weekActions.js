import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'
import toastr from "toastr";
import "toastr/build/toastr.min.css";

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie[0]
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

function moviesSearched(searchData){
    return {
        type: actionTypes.SEARCH_MOVIE,
        selectedMovie: searchData
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function getEachDay(data){
    return {
        type: actionTypes.GETEACHDAY,
        data: data
    }
}

export function deleteDay(data){
    return dispatch => {
        dispatch(getEachDayData(data));
    }
}

export function getFatSecret(data){
    return {
        type: actionTypes.GETFATSECRET,
        data: data
    }
}

export function getWeekWise(data){
    return {
        type: actionTypes.GETWEEKWISE,
        data: data
    }
}

export function getEachDayData(data) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/getEachDayData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(getEachDay(res['data']));
            // window.location.reload()
        }).catch((e) => console.log(e));
    }
}

export function deleteDayData(data) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/deleteDayData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            toastr.options = {
                positionClass: "toast-top-right",
                hideDuration: 700,
                timeOut: 2000,
                closeButton: false,
                progressBar: true,
              };
              toastr.clear();
              setTimeout(() => toastr.success("Data Deleted Successfullt"), 0);
            dispatch(deleteDay(data));
            // window.location.reload()
        }).catch((e) => console.log(e));
    }
}

export function addDayData(data) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/addDayData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            toastr.options = {
                positionClass: "toast-top-right",
                hideDuration: 700,
                timeOut: 2000,
                closeButton: false,
                progressBar: true,
              };
              toastr.clear();
              setTimeout(() => toastr.success("Data Added Successfullt"), 0);
            dispatch(deleteDay(data));
        }).catch((e) => console.log(e));
    }
}

export function getFatSecretDetails() {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/getFatSecretDetails`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: "",
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(getFatSecret(res['data']));
            // window.location.reload()
        }).catch((e) => console.log(e));
    }
}

export function getWeekWiseData(data) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/getWeekWiseData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(getWeekWise(res['data']));
            // window.location.reload()
        }).catch((e) => console.log(e));
    }
}