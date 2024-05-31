import { BrowserRouter, Route, Routes } from "react-router-dom";

function PostsRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/post" />
                    <Route path="/post-detail" />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PostsRouter;