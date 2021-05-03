import runtimeEnv from '@mars/heroku-js-runtime-env'
import "toastr/build/toastr.min.css";
import toastr from "toastr";



export function submitNutrition(data) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/saveFatSecretDetails`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            window.location.reload();
        }).then((res) => {
            toastr.options = {
                positionClass: "toast-top-right",
                hideDuration: 700,
                timeOut: 2000,
                closeButton: false,
                progressBar: true,
            };
            setTimeout(() => toastr.success("New Food Saved"), 0);


        }).catch((e) => console.log(e));
    }
}