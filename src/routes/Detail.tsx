import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router";
import type { BookItem } from "./Search.tsx";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Detail() {
    // 들어온 주소값을 가지고, API 요청을 해서 받아온 데이터를 저장하고, 화면을 출력해준다.
    const { id } = useParams();
    const navigate = useNavigate();

    const [detail, setDetail] = useState<BookItem | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json) => {
                setDetail(json);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </button>
            {detail && (
                <div className={styles.content}>
                    {detail.volumeInfo.imageLinks ? (
                        <img
                            className={styles.cover}
                            src={detail.volumeInfo.imageLinks?.thumbnail}
                            alt={detail.id}
                        />
                    ) : (
                        <div className={styles.noCover}>No Cover</div>
                    )}
                    <div>
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
                        <div
                            className={styles.desc}
                            dangerouslySetInnerHTML={{
                                __html: detail.volumeInfo.description || "설명 없음",
                            }}></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
