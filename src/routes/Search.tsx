import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publishDate: string;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        };
    };
};

type ApiResponseType = { items: BookItem[] };

// JSON에는 null이 없음 / undefined 없음
// key=value 되어져 있는 건, 값이 "있을 때만"
// API 명세롤 보고 타입 작성

// 사용자가 요청한 keyword를 받아서, 그것을 가지고 google API 요청을 하고, 받아온 결과를 화면에 출력해주는 일
function Search() {
    // query string으로 들어온 값을 꺼내오기 위해서는 useSearchParams를 사용

    // useParams를 사용할 때는 const { id } = useParams();
    // useSearchParms는 useParams와 사용법이 다름
    // keyword를 쿼리스트링으로 받겠다.
    const [params] = useSearchParams(); // queryString 내용이 params에 담겨 나옴
    // 이렇게 받아온 params라고 하는 state의 값은 객체
    const k = params.get("keyword"); // *URL*에서 가져온 값 -> 있을 수도 있지만, 없을 수도 있음

    // keyword 준비 됐으나, API를 통해 요청한 내용을 받아다가 화면에 출력만 해주면 됨
    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        if (!k) return;

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
            .then(response => response.json())
            .then((json: ApiResponseType) => {
                // list라고 하는 state에 가공한 데이터 저장
                setList(json.items);
            })
            .catch(err => {
                console.log(err);
            });
    }, [k]);

    return (
        <div className={styles.wrap}>
            <h3>검색 결과 : {k}</h3>

            {/* 검색 결과 (책 목록) 출력 */}
            {/* 데이터가 도착했는지 안 했는지, 목록이 있는지 없는지 판단 해줘야 되나? */}
            {/*{list.length === 0 && <div>검색 결과가 없습니다.</div>}*/}
            {list.map((value, index) => (
                <Link key={index} to={`/detail/${value.id}`} className={styles.item}>
                    {value.volumeInfo.imageLinks ? (
                        <img
                            src={value.volumeInfo.imageLinks?.thumbnail}
                            alt={value.volumeInfo.title}
                            className={styles.cover}
                        />
                    ) : (
                        <div className={styles.noCover}>No Cover</div>
                    )}
                    <div>
                        <div className={styles.title}>{value.volumeInfo.title}</div>
                        {/*
                            array에서 사용할 수 있는 메소드 join()
                            각 요소를 순회해서 하나의 값을 리턴하는데
                            각 요소 사이애 [매개변수로 제공된 스트링]을 넣어준다.
                        */}
                        <div className={styles.authors}>{value.volumeInfo.authors?.join(", ")}</div>
                    </div>
                </Link>
            ))}
            {/* map이라고 하는 메소드는 꼭 대상이 array여야만 쓸 수 있음 */}
        </div>
    );
}

export default Search;
