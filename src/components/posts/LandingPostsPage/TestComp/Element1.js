function Element1({ postsItem }) {
    return (
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
    )
}

export default Element1;