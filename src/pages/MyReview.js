import { useEffect, useState } from "react";
import { handleData } from "../api";
import styles from "./pageStyles/MyReview.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating }) {
  const className = `${selected ? "selected" : ""}`;

  return (
    <FontAwesomeIcon
      className={`${styles[className]} ${styles.star}`}
      icon={faStar}
    />
  );
}

function ReviewListItem({ item, onDelete }) {
  const handleDeleteClick = () => {
    onDelete(item.reviewId);
  };

  return (
    <>
      <div>
        <div>
          {RATINGS.map((rating) => (
            <Star
              key={rating}
              selected={item.rank >= rating}
              className={`${styles.star}`}
              icon={faStar}
            />
          ))}
        </div>
        <div>{item.description}</div>
        <Link to="/mypage/review/review-detail" state={{ item: item }}>
          <button>수정</button>
        </Link>
        <button type="button" onClick={handleDeleteClick}>
          삭제
        </button>
      </div>
    </>
  );
}

function ReviewList({ items, onDelete }) {
  if (items.length === 0)
    return <div className={styles.noItem}>작성한 리뷰가 없습니다.</div>;

  return (
    <ul className={styles.items}>
      {items.map((item) => {
        return (
          <li key={item.reviewId} className={styles.item}>
            <ReviewListItem
              key={item.reviewId}
              item={item}
              onDelete={onDelete}
            />
          </li>
        );
      })}
    </ul>
  );
}

function MyReview() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const reviews = await handleData.getData("/review/user");
    setItems(reviews.data);
  };

  const handleDelete = async (id) => {
    const result = await handleData.deleteData(`/user/${id}/review`);
    if (!result) {
      alert("리뷰 삭제에 실패했습니다.");
      return;
    }
    setItems((prevItems) => prevItems.filter((item) => item.reviewId !== id));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.page}>
      <ReviewList items={items} onDelete={handleDelete} />
    </div>
  );
}

export default MyReview;
