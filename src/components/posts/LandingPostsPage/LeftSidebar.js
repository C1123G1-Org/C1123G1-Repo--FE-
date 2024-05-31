import { useEffect, useState } from "react";
import { getAllPost } from '../../../services/PostsServices';

function LeftSideBar() {

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
            <div className="logo d-flex justify-content-center">
                <img src="https://innovad-global.com/sites/default/files/logo.svg" alt="" />
            </div>
            <div className="prominent-news">
                <div className="prominent-news-title">TIN NỔI BẬT</div>
                <ul>
                    {
                        postsItem.map((post) => {
                            return (
                                <div className='prominent-news-item-container container'>
                                    <li></li>
                                    <span className='prominent-news-item'>{post.title}</span>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default LeftSideBar;