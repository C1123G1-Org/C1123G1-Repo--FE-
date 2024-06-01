function Element2({ postsItem, num }) {
    return (
        <div className='news-forcused-container-item'>
            {
                (postsItem.length !== 0) ? (<>
                    <img className='news-forcus-image' src={postsItem[num].image} alt="" />
                    <div className='news-forcus-title'>
                        <p className='news-forcus-title-item'>{postsItem[num].title}</p>
                    </div>
                </>) : <p>Loading...</p>
            }
        </div>
    )
}

export default Element2;