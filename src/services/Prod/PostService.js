import NetworkingService from './NetworkingService'

const newNetworkingService = new NetworkingService()

class PostService {

    posts = []

    constructor(networkingService = newNetworkingService, errorService) {
        this.networkingService = networkingService
        this.errorService = errorService
    }

    createPost = (title, coverPhotoUrl, roasterId, content) => {
        const newPost = {
            title: title,
            coverPhotoUrl: coverPhotoUrl,
            author: roasterId,
            content: content
        }
        const path = `${roasterId}/posts`
        return this.networkingService.networkCall("post", path, newPost)
            .then(newPost => {
                this.posts.push(newPost)
                debugger
                return newPost
            }).catch(error => {
                debugger
                this.errorService.addError(error)
            })
    }

    updatePost = (postId, updates) => {
        const path = `posts/${postId}`
        return this.networkingService.networkCall('put', path, updates)
            .then(updatedPost => {
                this.posts = this.posts.map(post => {
                    if (post._id === postId) {
                        return updatedPost
                    } else {
                        return post
                    }
                })
                return updatedPost
            }).catch(error => {
                this.errorService.addError(error)
            })
    }

    loadPosts = (predicate, responseGroups) => {
        return this.networkingService.networkCall("get", "posts", null, predicate)
            .then(posts => {
                this.posts = posts
                return posts
            }).catch(error => {
                this.errorService.addError(error)
                return error
            })
    }

    fetchPostWithId = (id, responseGroups) => {
        return this.networkingService.networkCall('get', `posts/${id}`, null, {responseGroups})
    }

    deletePostsWithId = postId => {
        return this.networkingService.networkCall('delete', `posts/${postId}`)
            .catch(error => {
                this.errorService.addError(error)
            })
    }

    // MARK: - Content
    updateContent = (id, delta) => {
        return this.networkingService.networkCall('put', `posts/content/${id}`, delta)
    }

    formatOps = contentBody => {
        var newOps = contentBody.ops.map(op => {
            if (op.insert.image) {
              var opCopy = op
              opCopy.insert = {
                image: {
                  url: op.attributes.src,
                  alt: op.attributes.alt
                }
              }
              return opCopy
            } else {
              return op
            }
          })
          return { ops: newOps }
    }

    // formatPostsForQuill = async (posts) => {
    //     const formattedPostPromises = posts.map(async rawPost => {
    //         const formatted = await this.formatPostForQuill(rawPost)
    //         return formatted
    //     })
    //     const formattedPosts = await Promise.all(formattedPostPromises)
    //     return formattedPosts
    // }

    // formatPostForQuill = async (rawPost) => {
    //     var post = rawPost
    //     post.content = await this.formatDeltaForQuill(post.content)
    //     return post
    // }

    // formatDeltaForDatabase = (delta) => {
    //     var deltaCopy = delta
    //     deltaCopy.ops = deltaCopy.ops.map(op => {
    //         if (op.insert.image) {
    //             return { image: op.attributes.photoId }
    //         }
    //         return op
    //     })
    //     return deltaCopy
    // }

    // formatDeltaForQuill = async (rawDelta) => {
    //     var deltaCopy = rawDelta
    //     const opPromises = deltaCopy.ops.map(async op => {
    //         if (op.image) {
    //             const quillOp = await this.opForImageId(op.image)
    //             return quillOp
    //         } else {
    //             return op
    //         }
    //     })
    //     const quillOps = await Promise.all(opPromises)
    //     deltaCopy.ops = quillOps
    //     return deltaCopy
    // }

    // opForImageId = async photoId => {
    //     // const stringData = await this.fileUploadService.fetchPhoto(photoId)
    //     return {
    //         attributes: {
    //             align: 'center',
    //             alt: 'User Upload',
    //             photoId: photoId,
    //             // src: `data:image/jpeg;base64,${stringData}`
    //         },
    //         insert: {
    //             'image': {
    //                 alt: 'User Upload',
    //                 photoId: photoId,
    //                 // url: `data:image/jpeg;base64,${stringData}`
    //             }
    //         }
    //     }
    // }
}

export default PostService;