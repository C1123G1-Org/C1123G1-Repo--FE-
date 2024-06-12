import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findPostsByName, getAllPost } from "../../../services/PostsServices";

function Header() {
  const [postsItem, setPostsItem] = useState([]);
  const [timer, setTimer] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    updateCurrentTime();
  }, []);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    const postList = await getAllPost();
    setPostsItem(postList);
  };

  const updateCurrentTime = () => {
    let dateTime = "";
    setInterval(() => {
      let d = new Date();
      switch (d.getDay()) {
        case 0:
          dateTime += "Chủ nhật ";
          break;
        case 1:
          dateTime += "Thứ hai ";
          break;
        case 2:
          dateTime += "Thứ ba ";
          break;
        case 3:
          dateTime += "Thứ tư ";
          break;
        case 4:
          dateTime += "Thứ năm ";
          break;
        case 5:
          dateTime += "Thứ sáu ";
          break;
        case 6:
          dateTime += "Thứ bảy ";
          break;
        default:
          break;
      }

      dateTime += ` ngày ${
        d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
      }/${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}/${
        d.getFullYear() < 10 ? `0${d.getFullYear()}` : d.getFullYear()
      } ${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${
        d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
      }:${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}`;
      setTimer(dateTime);
      dateTime = "";
    }, 1000);
  };

  const handleLandingLink = () => {
    navigation("/posts");
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const clickHandler = (id) => {
    navigation(`/post-detail/${id}`);
  };

  const changeSearchHandler = (e) => {
    if (e.target.value !== "") {
      findPost(e.target.value);
    } else {
      setSearchItems([]);
    }
  };

  const findPost = async (word) => {
    const searchList = await findPostsByName(word);
    setSearchItems(searchList);
  };

  return (
    <>
      <div className="container">
        <div className="top-header-container">
          <div
            className="logo-on-header"
            onClick={handleLandingLink}
          >
            <img
              src={require("../../../assets/image/logo.jpg")}
              alt=""
            />
          </div>
          <div className="search-bar-container">
            <form
              action=""
              className="search-form"
            >
              <input
                type="text"
                className="search-input"
                placeholder="Nhập nội dung tìm kiếm"
                onChange={changeSearchHandler}
              />
              <button
                className="search-btn"
                onClick={onSubmit}
              >
                Tìm kiếm
              </button>
            </form>
            {Boolean(searchItems.length) && (
              <div className="search-item-container">
                {searchItems.map((item) => (
                  <>
                    <p
                      className="search-item"
                      onClick={() => clickHandler(item.id)}
                    >
                      {item.title}
                    </p>
                  </>
                ))}
              </div>
            )}
          </div>
          <div className="langding-link">
            <button
              className="landing-link"
              onClick={handleLandingLink}
            >
              Trang chủ
            </button>
          </div>
        </div>

        <div className="header-container d-flex justify-content-between">
          <div className="left-header d-flex">
            <p className="newest-log">Mới nhất</p>
            {postsItem.length !== 0 ? (
              <p
                className="newest-title"
                onClick={() => clickHandler(postsItem[0].id)}
              >
                {postsItem[0].title}
              </p>
            ) : (
              <p>Loading...</p>
            )}
            <p></p>
          </div>
          <div className="right-header">
            <p>{timer}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
