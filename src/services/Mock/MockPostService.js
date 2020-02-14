class MockPostService {

    constructor(){
        this.getPosts = this.getPosts.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
        this.addPost = this.addPost.bind(this)
    }

    posts = [
        {
            title: "Welcome to Spilt.Coffee",
            subtitle: "A Coffee App for Coffee People",
            bodyText: "We like coffee.  We hope you do too.",
            isFeatured: true,
            coverPhotoUrl: "https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-super-tease.jpg",
            roasterInfo: {
                name: "Patrick Adcock",
                id: "3519Z"
            }
        },
        {
            title: "Pairing Well",
            subtitle: "How to pair your favorite coffees",
            bodyText: "Everything goes well with chocolate.  When in doubt, just talk about 'subtle hint' of anything.",
            isFeatured: true,
            coverPhotoUrl: "https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-super-tease.jpg",
            roasterInfo: {
                name: "Patrick Adcock",
                id: "3519Z"
            }
        },
        {
            title: "Different Grinds",
            subtitle: "And why it actually matters",
            bodyText: "Usually it doesn't",
            isFeatured: false,
            coverPhotoUrl: "https://cdn1.medicalnewstoday.com/content/images/hero/325/325295/325295_1100.jpg",
            roasterInfo: {
                name: "Patrick Adcock",
                id: "3519Z"
            }
        }
    ]

    getPosts() {
        return this.posts
    }

    addPost(title, subtitle, bodyText, coverPhotoUrl, bookmarkCount) {
        let roasterInfo = { name: "Patrick Adcock", id: "3519Z" }
        const newPost = { title: title, subtitle: subtitle, bodyText: bodyText, coverPhotoUrl: coverPhotoUrl, bookmarkCount: bookmarkCount, roasterInfo: roasterInfo }
        this.posts.push(newPost)
        return new Promise((resolve, reject) => resolve(this.posts))
    }

    fetchPosts() {
        return new Promise((resolve, reject) => {
            resolve(this.posts)
        })
    }
}

export default MockPostService;