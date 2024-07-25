import ApiSender from "./config/index.js";

class PostAPI {
  getAllPosts() {
    const url = `/posts/posts-list`;
    return ApiSender.get(url);
  }

  getPostsLatest(query) {
    const url = `/posts/get-posts-latest`;
    return ApiSender.get(url, query);
  }

  getDetail(id) {
    const url = `/posts/get-detail/${id}`;
    return ApiSender.get(url);
  }
}

export default new PostAPI();
