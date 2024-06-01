import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPost } from '../../../services/PostsServices';

function MidContent() {

    const [postsItem, setPostsItem] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        getPostList();
        console.log(postsItem);
    }, []);

    const getPostList = async () => {
        const postList = await getAllPost();
        setPostsItem(postList);
    }

    const clickHandler = (id) => {
        navigation(`/post-detail/${id}`)
    }

    return (
        <>
            <div className="news-forcused-container">
                <div className="news-forcused-container-title">
                    <button className='btn-nav'>
                        TIÊU ĐIỂM
                    </button>
                    <button className="ofset-news-forcus"></button>
                </div>
                <div className='news-forcused-container-item' onClick={() => clickHandler(postsItem[0].id)}>
                    {
                        (postsItem.length !== 0) ? (<>
                            <img className='news-forcus-image' src={postsItem[0].image} alt="" />
                            <div className='news-forcus-title'>
                                <p className='news-forcus-title-item' title={postsItem[0].title}>{postsItem[0].title}</p>
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
                                <div onClick={() => clickHandler(post.id)} className="list-news-items col-4 d-flex flex-column">
                                    <img className='list-news-image' src={post.image} alt="" />
                                    <p className='list-news-title' title={post.title}>{post.title}</p>
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