import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { BookItem } from "./Search.tsx";
import styled from "styled-components";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
    gap: 12px;
`;

const Back = styled.button`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin-bottom: 20px;
    font-size: 10px;
    font-weight: bold;
    border: 1px solid #b3ccde;
    border-radius: 5px;
    background-color: #d5e7f3;
    color: #78a5c4;
    outline: none;

    &:hover {
        background-color: #698a9f;
        color: #fff;
        border-color: #435564;
    }
`;

const Content = styled.div`
    display: flex;
    width: 100dvh;
    justify-content: space-between;
    padding: 30px;
    gap: 30px;
    background-color: aliceblue;
    border: 2px solid #cce4ef;
    border-radius: 10px;
`;

const Cover = styled.img`
    flex: 1.6;
    object-fit: cover;
    width: 250px;
    height: 300px;
    border-radius: 5px;
    box-shadow: 6px 13px 11px -1px #93acbb;
`;

const NoCover = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 300px;
    border-radius: 10px;
    color: #555555;
`;

const Title = styled.h3`
    color: #1c202d;
    font-size: 24px;
    margin-bottom: 10px;
`;

const Authors = styled.div`
    color: #1c202d;
    font-size: 24px;
    margin-bottom: 10px;
`;

const Publish = styled.ul`
    list-style: none;
    display: flex;
    margin-bottom: 20px;
    color: #32536b;
    font-size: 12px;
    padding-bottom: 17px;
    border-bottom: 1px solid rgb(147 187 217 / 0.4);
`;

const Desc = styled.div`
    color: #081d31;
    font-size: 12px;
    font-weight: 450;
    line-height: 16px;
`;

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
        <Container>
            <Back
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </Back>
            {detail && (
                <Content>
                    {detail.volumeInfo.imageLinks ? (
                        <Cover
                            src={detail.volumeInfo.imageLinks?.thumbnail}
                            alt={detail.id}
                        />
                    ) : (
                        <NoCover>No Cover</NoCover>
                    )}
                    <div>
                        <Title>{detail.volumeInfo.title}</Title>
                        <Authors>
                            {detail.volumeInfo.authors?.join(", ")}
                        </Authors>
                        <div>
                            <Publish>
                                {detail.volumeInfo.publisher ? (
                                    <li>{detail.volumeInfo.publisher}</li>
                                ) : null}
                                {detail.volumeInfo.publishDate ? (
                                    <li>{detail.volumeInfo.publishDate}</li>
                                ) : null}
                                <li>{detail.volumeInfo.pageCount}</li>
                            </Publish>
                        </div>
                        <Desc
                            dangerouslySetInnerHTML={{
                                __html: detail.volumeInfo.description || "설명 없음",
                            }}></Desc>
                    </div>
                </Content>
            )}
        </Container>
    );
}

export default Detail;
