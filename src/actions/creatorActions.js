import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export function submitNutrition(data) {
    const env = runtimeEnv();
    console.log(data);
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/saveFatSecretDetails`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            window.location.reload(true);
        }).catch((e) => console.log(e));
    }
}