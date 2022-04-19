import React from 'react'
import styled from "styled-components";
import CreatePost from '../../components/feeds/CreatePost';
import Feeds from '../../components/feeds/Feeds';
import Friends from '../../components/friends/Friends';

const Home = () => {
  return (
    <Cont>
      <div className="feed">
        <CreatePost />
        <Feeds />
      </div>
     
      <Friends/>
    </Cont>
  )
}

const Cont = styled.div`
  display: grid;
  grid-template-columns: auto 30%;
  grid-gap: 30px;

  .feed {
    display:grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap:20px ;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;


export default Home