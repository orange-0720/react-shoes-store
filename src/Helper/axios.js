import _axios from "axios";

const axios = baseUrl =>{
    const instance = _axios.create({
        baseURL: baseUrl || 'http://localhost:3003',
        timeout: 1000,
    });

    instance.interceptors.request.use(
        config => {
            const jwToken = global.auth.getToken();
            config.headers['Authorization'] = 'Bearer ' + jwToken;
            // do something before is sent

            return config;
        },
        error => {
            // do something with request error
            return Promise.reject(error);
        }
    )


    return instance;
}

export {axios};

export default axios();