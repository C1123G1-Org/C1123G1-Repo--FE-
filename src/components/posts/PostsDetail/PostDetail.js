import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from '../../../services/PostsServices';
import Header from "../CommonPostPage/Header";
import RightSideBar from "../LandingPostsPage/RightSideBar";

function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        getPost(postId);
    }, [postId]);

    useEffect(() => {
        (document.querySelector('.post-detail-main-content') !== null) ? (document.querySelector('.post-detail-main-content').innerHTML = post.content) : (console.warn("Do not find the place to fill data (content of post)"));
    }, [post])

    const getPost = async (id) => {
        const recievePost = await getPostById(id);
        setPost(recievePost);
    }

    return (
        <>
            <div className="container">
                <Header />
                <div className="row">
                    <div className="post-detail-container col-9">
                        <h1 className="post-detail-title">
                            {post.title}
                        </h1>
                        <div className="post-detail-main-content">
                        </div>
                    </div>

                    <div className="col-3">
                        <RightSideBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetail;