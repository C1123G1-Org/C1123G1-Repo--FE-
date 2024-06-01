import { useEffect, useState } from 'react';
import { getAllPost } from '../../services/PostServices';

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
            <div className="news-forcused-container">
                <div className="news-forcused-container-title">
                    <button>
                        TIÊU ĐIỂM
                    </button>
                    <button>
                        VIDEO
                    </button>
                    <button>
                        PHÓNG SỰ ẢNH
                    </button>
                    <button className="ofset-news-forcus"></button>
                </div>
                <div className='news-forcused-container-item'>
                    {
                        (postsItem.length !== 0) ? (<>
                            <img className='news-forcus-image' src={postsItem[0].image} alt="" />
                            <div className='news-forcus-title'>
                                <p className='news-forcus-title-item'>{postsItem[0].title}</p>
                            </div>
                        </>) : <p>Loading...</p>
                    }
                </div>
            </div>

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