import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostsAPI from "../../api/posts.js";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
function NewDetail() {
    const { title } = useParams();
    const [newsDetails, SetNewsDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchPostsDetails = async () => {
            if (title) {
                setLoading(true);
                try {
                    const response = await PostsAPI.getPostsDetail(title);
                    const responseData = response.data;
                    SetNewsDetails(responseData);
                    console.log("detail:", newsDetails?.title);
                } catch (error) {
                    toast.error(
                        "Error fetching family data. Please try again later.",
                        {
                            autoClose: 10000,
                        }
                    );
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPostsDetails();
    }, [title]);
    return (
        <div className="containerr">
            <h1>Tin tức dòng họ</h1>
            <div className="title">
                <h2>{newsDetails?.title}</h2>
            </div>
            <div className="row">
                <div className="col-md-8">
                    {typeof newsDetails?.content === "string" ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: newsDetails?.content,
                            }}
                        />
                    ) : (
                        <span>Invalid content format</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewDetail;
