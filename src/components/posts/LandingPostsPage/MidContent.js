import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { getAllPost } from '../../../services/PostsServices';
import Element1 from './TestComp/Element1';
import Element2 from './TestComp/Element2';

function MidContent() {

    const [postsItem, setPostsItem] = useState([])

    useEffect(() => {
        getPostList();
        console.log(postsItem);
    }, []);

    const getPostList = async () => {
        const postList = await getAllPost();
        setPostsItem(postList);
    }

    return (
        <>
            <BrowserRouter>
                <div className="news-forcused-container">
                    <div className="news-forcused-container-title">
                        <NavLink to='/'>
                            <button className='btn-nav'>
                                TIÊU ĐIỂM
                            </button>
                        </NavLink>
                        {/* <NavLink to='/path1'>
                            <button className='btn-nav'>
                                VIDEO
                            </button>
                        </NavLink>
                        <NavLink to='/path2'>
                            <button className='btn-nav'>
                                PHÓNG SỰ ẢNH
                            </button>
                        </NavLink> */}
                        <button className="ofset-news-forcus"></button>
                    </div>
                    <Routes>
                        <Route path="/" element={<Element1 postsItem={postsItem} />} />
                        <Route path="/path1" element={<Element2 postsItem={postsItem} num={1} />} />
                        <Route path="/path2" element={<Element2 postsItem={postsItem} num={2} />} />
                    </Routes>
                </div>
            </BrowserRouter>

            <div className="list-news-container container">
                <div className="row">
                    {
                        postsItem.map((post) => {
                            return (
                                <div className="list-news-items col-4 d-flex flex-column">
                                    <img className='list-news-image' src={post.image} alt="" />
                                    <p className='list-news-title'>{post.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default MidContent;