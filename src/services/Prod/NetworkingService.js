import axios from 'axios';

class NetworkingService {

    baseUrl = "/api/"

    networkCall(method, path, data, params) {
        return new Promise((resolve, reject) => {
            axios({
                method,
                url: this.baseUrl + path,
                data,
                params
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                console.log("ERROR",error)
                const errorResponse = error.response ? error.response.data.error : "Unown error encountered"
                reject(errorResponse)
            })
        })
    }

    setTokenHeader(token) {
        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }else {
            delete axios.defaults.headers.common["Authorization"]
        }
    }
}

export default NetworkingService;