import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostsWithPagination } from "../../../services/PostsServices";

function LeftSideBar() {
  const [postsItem, setPostsItem] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    const postList = await getPostsWithPagination();
    setPostsItem(postList);
  };

  const clickHandler = (id) => {
    navigation(`/post-detail/${id}`);
  };

  return (
    <>
      <div className="prominent-news">
        <div className="prominent-news-title">TIN NỔI BẬT</div>
        <ul>
          {postsItem.map((post) => {
            return (
              <div
                className="prominent-news-item-container container"
                onClick={() => clickHandler(post.id)}
              >
                <li></li>
                <span
                  className="prominent-news-item"
                  title={post.title}
                >
                  {post.title}
                </span>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default LeftSideBar;
