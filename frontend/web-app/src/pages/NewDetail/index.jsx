import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostAPI from "../../api/post";
import { toast } from "react-toastify";
import { formatTime } from "../../utils/formatTime";
import "./style.css";
import { baseUrl } from "../../config/url-config";

function NewDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [postsLatest, setPostsLatest] = useState([]);

  useEffect(() => {
    const fetchPost = async (id) => {
      try {
        const response = await PostAPI.getDetail(id);
        setPost(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchPost(id);
  }, [id]);

  useEffect(() => {
    const fetchPostsLatest = async () => {
      try {
        const response = await PostAPI.getPostsLatest({ limit: 10 });
        if (response.data) {
          setPostsLatest(response.data);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast.error("Error fetching post data. Please try again later.", {
          autoClose: 5000,
        });
      }
    };
    fetchPostsLatest();
  }, []);
  return (
    <div className="mt-5 pb-5 w-100">
      <div className="container mt-5">
        <div className="text-center py-2">
          <span className="fs-2 fw-bold">Tin tức dòng họ</span>
        </div>
        <div className="row pt-4">
          <div className="col-lg-8 col-12">
            {post?.image && (
              <img
                src={baseUrl + "/upload/" + post.image}
                alt="post-img"
                className="w-100"
              />
            )}
            <div className="px-2 mt-2 post-title-time pb-4">
              <h1 className="fw-bolder fs-3">{post?.title}</h1>
              <span>Ngày đăng: {formatTime(post?.createdAt)}</span>
            </div>
            <div
              className="py-4"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>
          <div className="col-lg-4 col-12">
            <h3 className="fs-4 fw-bold">Bài viết mới nhất</h3>
            <div className="list-post-latest px-3">
              {postsLatest.length > 0 &&
                postsLatest.map((postItem, index) => (
                  <div key={index} className="post-latest-item">
                    <a href={`/news/${postItem.id}`} className="row">
                      {postItem.image && (
                        <div className="col-4">
                          <img
                            src={baseUrl + "/upload/" + postItem.image}
                            alt={postItem.title}
                          />
                        </div>
                      )}
                      <div className="col-8">
                        <h4 className="post-title">{postItem.title}</h4>
                        <span className="fs-6">
                          {formatTime(postItem.createdAt)}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDetail;
