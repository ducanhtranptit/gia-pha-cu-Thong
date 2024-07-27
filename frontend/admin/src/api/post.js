import ApiSender from "./config/index";

class PostAPI {
  getAllPosts() {
    const url = "/posts/posts-list";
    return ApiSender.get(url);
  }

  createPost(post) {
    const url = "/posts/create-posts";
    return ApiSender.post(url, post);
  }

  updatePost(post) {
    const url = `/posts/update-posts/${post.id}`;
    return ApiSender.put(url, post);
  }

  deletePost(id) {
    const url = `/posts/delete-posts/${id}`;
    return ApiSender.delete(url);
  }
}

export default new PostAPI();
