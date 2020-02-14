import PostService from "./Prod/PostService";
import MockPostService from "./Mock/MockPostService";
import AuthenticationService from "./Prod/AuthenticationService";
import UserMessageService from "./Prod/UserMessageService";
import NetworkingService from "./Prod/NetworkingService";
import FileUploadService from './Prod/FileUploadService'
import ProductService from "./Prod/ProductService";
import ErrorService from "./Prod/ErrorService";
import RecipeService from "./Prod/RecipeService";

export var ServicesConfig = {
    MOCK: 1,
    SERVER: 2
}

const networking = new NetworkingService()
const fileUploadService = new FileUploadService(networking)

class ServiceFactory {
    
    constructor(config) {
        this.config = config
        this._networkingService = networking
        this._errorService = new ErrorService();
        this._fileUploadService = fileUploadService
        this._serverPostService = new PostService(networking, this._errorService)
        this._mockPostService = new MockPostService()
        this._userMessageService = new UserMessageService()
        this._authenticationService = new AuthenticationService(this._userMessageService)
        this._productService = new ProductService(this._networkingService)
        this._recipeService = new RecipeService(this._networkingService, this._errorService)
    }

    networkingService(){
        return this._networkingService
    }

    postService(){
        let service = this.config === ServicesConfig.MOCK ? this._mockPostService : this._serverPostService
        return service
    }

    authenticationService() {
        return this._authenticationService
    }

    userMessageService() {
        return this._userMessageService
    }

    fileUploadService() {
        return this._fileUploadService
    }

    productService() {
        return this._productService
    }

    errorService() {
        return this._errorService
    }

    recipeService() {
        return this._recipeService
    }
}

export let serviceFactory = new ServiceFactory(ServicesConfig.SERVER)

export default ServiceFactory;