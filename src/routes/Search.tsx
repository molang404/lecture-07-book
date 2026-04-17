import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        author?: string[];
        description: string;
        imageLink?: {
            thumbnail?: string;
            small?: string;
        }
    }
}


function Search() {
    // query string으로 들어온 값을 꺼내오기 위해서는 useSearchParams를 사용

    // useParams를 사용할 때는 const { id } = useParams();
    // useSearchParms는 useParams와 사용법이 다름
    const [params, setParams] = useSearchParams();    // queryString 내용이 params에 담겨 나옴
    const k = params.get("keyword");   // "수학"이라는 게 있을 수도 있지만, 없을 수도 있음

    // keyword 준비 됐으나, API를 통해 요청한 내용을 받아다가 화면에 출력만 해주면 됨
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${p}&maxResults=20&key=${API_KEY}`);

    }, []);

    return (
        <div></div>
    );
}

export default Search;