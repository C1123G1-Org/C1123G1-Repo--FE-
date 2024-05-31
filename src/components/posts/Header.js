import { useEffect, useState } from "react";
import { getAllPost } from "../../services/PostServices";

function Header() {

    const [postsItem, setPostsItem] = useState([]);
    const [timer, setTimer] = useState('');

    useEffect(() => {
        updateCurrentTime();
    }, [])

    useEffect(() => {
        getPostList();
    }, []);

    const getPostList = async () => {
        const postList = await getAllPost();
        setPostsItem(postList);
    }

    const updateCurrentTime = () => {
        let dateTime = '';
        setInterval(() => {
            let d = new Date();
            switch (d.getDay()) {
                case 0:
                    dateTime += 'Chủ nhật ';
                    break;
                case 1:
                    dateTime += 'Thứ hai ';
                    break;
                case 2:
                    dateTime += 'Thứ ba ';
                    break;
                case 3:
                    dateTime += 'Thứ tư ';
                    break;
                case 4:
                    dateTime += 'Thứ năm ';
                    break;
                case 5:
                    dateTime += 'Thứ sáu ';
                    break;
                case 6:
                    dateTime += 'Thứ bảy ';
                    break;
                default:
                    break;
            }

            dateTime += ` ngày ${(d.getDate() < 10) ? `0${d.getDate()}` : d.getDate()}/${(d.getMonth() < 10) ? `0${d.getMonth()}` : d.getMonth()}/${(d.getFullYear() < 10) ? `0${d.getFullYear()}` : d.getFullYear()} ${(d.getHours() < 10) ? `0${d.getHours()}` : d.getHours()}:${(d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes()}:${(d.getSeconds() < 10) ? `0${d.getSeconds()}` : d.getSeconds()}`;
            setTimer(dateTime);
            dateTime = '';
        }, 1000)
    }

    return (
        <>
            <div className="header-container d-flex justify-content-between">
                <div className="left-header d-flex">
                    <p className="newest-log">Mới nhất</p>
                    {
                        (postsItem.length !== 0) ? (
                            <p className="newest-title">{postsItem[0].title}</p>
                        ) : <p>Loading...</p>
                    }
                    <p></p>
                </div>
                <div className="right-header">
                    <p>{timer}</p>
                </div>
            </div>

        </>
    )
}

export default Header;