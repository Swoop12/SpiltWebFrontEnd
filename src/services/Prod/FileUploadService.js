import { UniqueId } from '../Utils'
import Axios from 'axios'

export default class FileUploadService {

    imageCache = {}

    constructor(networkingService) {
        this.networkingService = networkingService
    }

    uploadPhoto = (file, contentType) => {
        debugger
        let data = new FormData()
        data.append('image', file)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
            maxRedirects: 0
        }
        const url = "http://localhost:4001/api/images"
        return Axios.post(url, data, config)
            .then(response => { 
                return response.data.url 
            }) 
            .catch(error => {
                throw error
            })
    }

    decodePhotoResponse = (photo, fileId) => {
        if (photo.data) {
            const buffer = photo.data.data
            const photoString = this.arrayBufferToBase64(buffer)
            this.imageCache[fileId] = photoString
            return photoString
        } else {
            throw Error("Photo unavailable ):")
        }
    }

    readFileForInput = (event) => {
        let input = event.target
        const file = input.files[0]
        let readerPromise = new Promise((resolve, reject) => {
            if (input.files && file) {
                var reader = new FileReader();
                reader.onload = resolve
                reader.onerror = reject
                reader.readAsDataURL(file);
            }
        })
        return readerPromise
    }

    uploadForInput = (event, contentType, fileId) => {
        return this.readFileForInput(event)
            .then(file => { 
                debugger
                return this.uploadPhoto(file) 
            })
            .catch(error => {
                debugger
                console.log(error)
            })
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
}