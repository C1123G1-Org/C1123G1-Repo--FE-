import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from '../../../services/PostsServices';
import Footer from "../CommonPostPage/Footer";
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
                    <div className="post-detail-container col-lg-9 col-12">
                        <h1 className="post-detail-title">
                            {post.title}
                        </h1>
                        <div className="post-detail-main-content">
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 offset-lg-0 offset-3">
                        <RightSideBar />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PostDetail;