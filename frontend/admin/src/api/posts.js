import ApiSender from "./config/index.js";

class PostsAPI {
    getAllPosts(query) {
        const url = "/posts/posts-list";
        return ApiSender.get(url, query);
    }

    updatePosts(id, data) {
        const url = `/posts/update-posts/${id}`;
        return ApiSender.put(url, data);
    }

    deletePosts(id) {
        const url = `/posts/delete-posts/${id}`;
        return ApiSender.delete(url);
    }

    createPosts(formData) {
        const url = `/posts/create-posts`;
        return ApiSender.post(url, formData);
    }
}

export default new PostsAPI();
