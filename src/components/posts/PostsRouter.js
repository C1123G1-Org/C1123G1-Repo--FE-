import { Route, Routes } from "react-router-dom";
import PostsPage from './LandingPostsPage/PostsPage';
import PostDetail from './PostsDetail/PostDetail';

function PostsRouter() {
    return (
        <>
            <Routes>
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/post-detail/:postId" element={<PostDetail />} />
            </Routes>
        </>
    )
}

export default PostsRouter;