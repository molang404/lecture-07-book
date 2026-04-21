import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css"

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
        }
    }
}

type Book = { items: BookItem[] };


function Search() {
    // query string으로 들어온 값을 꺼내오기 위해서는 useSearchParams를 사용

    // useParams를 사용할 때는 const { id } = useParams();
    // useSearchParms는 useParams와 사용법이 다름
    const [params] = useSearchParams();    // queryString 내용이 params에 담겨 나옴
    const k = params.get("keyword");   // "수학"이라는 게 있을 수도 있지만, 없을 수도 있음

    // keyword 준비 됐으나, API를 통해 요청한 내용을 받아다가 화면에 출력만 해주면 됨
    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        if (!k) return;

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
            .then(response => response.json())
            .then((json: Book) => {
                setList(json.items);
            })
            .catch(err => console.log(err));
    }, [k]);

    return (
        <div className={styles.wrap}>
            <h3 className={styles.title}>검색 결과</h3>
            {/*{list.length === 0 && <div>검색 결과가 없습니다</div>}*/}
            {list.map((value, index) => (
                <Link key={index} to={`/detail/${value.id}`} className={styles.item}>
                    {value.volumeInfo.imageLinks ? (
                        <img
                            src={value.volumeInfo.imageLinks?.thumbnail}
                            alt={value.volumeInfo.title}
                            className={styles.cover}
                        />
                    ) : (
                        <div className={styles.noCover}> No Cover </div>
                    )}
                    <div className={styles.title}>{value.volumeInfo.title}</div>
                    <div className={styles.authors}>{value.volumeInfo.authors?.join(", ")}</div>
                </Link>
            ))}
        </div>
    );
}

export default Search;