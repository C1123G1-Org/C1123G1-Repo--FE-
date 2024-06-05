import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { getAllPost } from '../../../services/PostsServices';

function MidContent() {

    const itemsPerPage = 3;

    const [postsItem, setPostsItem] = useState([]);
    const navigation = useNavigate();

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = postsItem.slice(itemOffset, endOffset);

    const pageCount = Math.ceil(postsItem.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % postsItem.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        getPostList();
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
                        currentItems.map((post) => {
                            return (
                                <div onClick={() => clickHandler(post.id)} className="list-news-items col-4 d-flex flex-column">
                                    <img className='list-news-image' src={post.image} alt="" />
                                    <p className='list-news-title' title={post.title}>{post.title}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="d-flex justify-content-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="Previous"

                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>
            </div>
        </>
    )
}

export default MidContent;