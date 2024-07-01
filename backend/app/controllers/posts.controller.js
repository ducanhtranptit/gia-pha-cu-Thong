const PostsActions = require("../actions/posts.actions");
const {
    SuccessResponse,
    ErrorResponse,
    ForbiddenResponse,
    BadRequestResponse,
} = require("../core/ApiResponse.js");

class PostsController {
    async GetAllPosts(req, res) {
        try {
            const postList = await PostsActions.GetAllPosts();
            return new SuccessResponse().send(req, res, postList);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async CreatePosts(req, res) {
        try {
            const { posts } = req.body;
            const newPosts = await PostsActions.CreatePosts(posts);
            return new SuccessResponse().send(req, res, newPosts);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async UpdateDataPost(req, res) {
        try {
            const { id } = req.params;
            const dataPosts = req.body;
            if (!dataPosts) {
                return new ForbiddenResponse().send(req, res);
            }
            const updatedPosts = await PostsActions.EditPosts(id, dataPosts);
            return new SuccessResponse().send(req, res, updatedPosts);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async DeletePosts(req, res) {
        try {
            const { id } = req.params;
            await PostsActions.DeletePosts(id);
            return new SuccessResponse().send(req, res);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async GetPostsDetail(req, res) {
        try {
            const { title } = req.query;
            const posts = await PostsActions.GetPostsDetail(title);
            return new SuccessResponse().send(req, res, posts);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
}

module.exports = new PostsController();
