import PostService from "./PostService";
import MockPostService from "./MockPostService";

export var ServicesConfig = {
    MOCK: 1,
    SERVER: 2
}

class ServiceFactory {
    
    constructor(config) {
        this.config = config
    }

    serverPostService = new PostService()
    mockPostService = new MockPostService()

    postService(){
        let service = this.config === ServicesConfig.MOCK ? this.mockPostService : this.serverPostService
        return service
    }
}

export let serviceFactory = new ServiceFactory(ServicesConfig.MOCK)

export default ServiceFactory;