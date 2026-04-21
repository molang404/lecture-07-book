import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { Link, useParams } from "react-router";
import type { BookItem } from "./Search.tsx";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type ApiResponseType = BookItem;

function Detail() {
    // 들어온 주소값을 가지고, API 요청을 해서 받아온 데이터를 저장하고, 화면을 출력해준다.
    const { id } = useParams();

    const [detail, setDetail] = useState<BookItem | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setDetail(json);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className={styles.container}>
            <Link to={"/"} className={styles.backBtn}>
                &larr; 다시 검색하기
            </Link>
            {detail && (
                <div className={styles.content}>
                    <div>
                        {detail.volumeInfo.imageLinks ? (
                            <img
                                className={styles.cover}
                                src={detail.volumeInfo.imageLinks?.thumbnail}
                                alt={detail.id}
                            />
                        ) : (
                            <div className={styles.noCover}>No Cover</div>
                        )}
                        <h3 className={styles.title}>{detail.volumeInfo.title}</h3>
                        <div className={styles.authors}>
                            {detail.volumeInfo.authors?.join(", ")}
                        </div>
                        <div>
                            <ul className={styles.publish}>
                                {detail.volumeInfo.publisher ? (
                                    <li>{detail.volumeInfo.publisher}</li>
                                ) : null}
                                {detail.volumeInfo.publishDate ? (
                                    <li>{detail.volumeInfo.publishDate}</li>
                                ) : null}
                                <li>{detail.volumeInfo.pageCount}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.desc}>{detail.volumeInfo.description}</div>
                </div>
            )}
        </div>
    );
}

export default Detail;
