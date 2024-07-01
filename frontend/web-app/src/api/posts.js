import ApiSender from "./config/index.js";

class PostsAPI {
    getPostsDetail(query) {
        const url = `/posts/posts-details?title=${query}`;
        return ApiSender.get(url);
    }
}

export default new PostsAPI();
