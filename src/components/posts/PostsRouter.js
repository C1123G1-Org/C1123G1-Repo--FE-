import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostsPage from './LandingPostsPage/PostsPage';
import PostDetail from './PostsDetail/PostDetail';

function PostsRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/post" element={<PostsPage />} />
                    <Route path="/post-detail/:postId" element={<PostDetail />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PostsRouter;