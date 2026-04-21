import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./Search.tsx";
import styles from "./Detail.module.css";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Detail() {
    // 들어온 주소값을 가지고, API 요청을 해서 받아온 데이터를 저장하고, 화면 출력
    const { id } = useParams();
    const navigate = useNavigate();

    // 받아오는 데이터가 1개인 API를 대상으로 라고 있기 때문에,
    // 그 response는 객체이고, 이럴 경우 초기값을 null로 설정
    const [book, setBook] = useState<BookItem | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then(json => setBook(json))
            .catch(err => console.log(err));
    }, [id]);

    // Search 컴포넌트에서는 list가 초기값도 [], 값이 도착해도 [], 값이 도착하지 않아도 [] 감지
    // loading을 보여주기 위해서는 따로 loading을 관리 했어야 함
    // Detail 컴포넌트에서는  book이 초기값은 null이고, 값이 도착하면 BookType 되고, 값이 도착하지 않으면 null임
    // book의 값이 있는지 없는지만 체크해도 loading 표현 가능
    if (!book) return <div className={styles.wrap}>Loading...</div>;

    return (
        <div className={styles.wrap}>
            <button
                className={styles.backBtn}
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </button>

            <h2>{book.volumeInfo.title}</h2>
            {book.volumeInfo.imageLinks ? (
                <img className={styles.cover} src={book.volumeInfo.imageLinks?.thumbnail} />
            ) : (
                <div className={styles.noCover}>No Cover</div>
            )}
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            {/*
                웹브라우저가 아닌 이상 데이터 베이스에서 웹에디터로 인해 태그 형태의 string으로 넘어옴
                컴퓨터 입장에서 그냥 string, 그대로 내보냄
            */}
            {/*
                dangerouslySetInnerHTML 속성
                - 사용자가 입력한 내용을 그대로 렌더링 할 때 사용
                - 사용할 때 주의 필요
                - 혹시라도, 해당 내용에 "악성코드"가 포함이 되어 있다면
                - 그것조차 그대로 실행함

                사용법 : dangerouslySetInnerHTML={{ __html: '내용' }}
             */}
            <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "설명 없음"}}></p>
        </div>
    );
}

export default Detail;
