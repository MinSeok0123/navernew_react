import {useState, useEffect} from "react";
import styled from "styled-components";
import NewsItem from './NewsItem'
import axios from 'axios';
import usePromise from "../lib/UsePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width:60vw;
  margin:2rem auto 0;
  @media (max-width:768px) {
    width:100%; padding:0 3rem;
    font-size:2vw;
  }
`;
const NewsList = ({category}) => {

    const [loading, response, error] = usePromise(()=>{
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ab45f0129a8f410e8eead4e168f691be`,
        );
    },[category])

    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>
    }

    if (!response) {
        return null;
    }

    if (error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>
    }

    const {articles} = response.data;

    return(
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    );
};

export default NewsList;






