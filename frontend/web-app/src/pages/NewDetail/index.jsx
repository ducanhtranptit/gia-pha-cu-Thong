import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostAPI from "../../api/post";

function NewDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async (id) => {
      try {
        const response = await PostAPI.getDetail(id);
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchPost(id);
  }, [id]);
  console.log(post.title);
  return (
    <div className="mt-5">
      <div>
        <h1>{post?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </div>
    </div>
  );
}

export default NewDetail;
