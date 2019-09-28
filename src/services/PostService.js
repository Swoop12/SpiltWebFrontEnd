import Axios from "axios";

class PostService {

    posts = [];
    baseUrl = "http://localhost:4001/api/posts"

    getPosts() {
        return this.posts
    }

    addPost(title, subtitle, bodyText, coverPhotoUrl, bookmarkCount) {
        let roasterInfo = {name: "Patrick Adcock", id: "3519Z"}
        const newPost = {title: title, subtitle: subtitle, bodyText: bodyText, coverPhotoUrl: coverPhotoUrl, bookmarkCount: bookmarkCount, roasterInfo: roasterInfo}
        return Axios.post(this.baseUrl,newPost)
    }

    fetchPosts() {
        return Axios.get(this.baseUrl)
        .then((postResponse) => {
            this.posts = postResponse.data
            return postResponse.data
        }).catch((error) => {
            console.log("Balls")
            console.log(error)
        })
    }
}

export default PostService;