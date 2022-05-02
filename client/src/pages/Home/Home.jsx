import React, {useState, useEffect, useLayoutEffect} from 'react'
import styled from "styled-components";
import CreatePost from '../../components/feeds/CreatePost';
import Feeds from '../../components/feeds/Feeds';
import Friends from '../../components/friends/Friends';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getPosts, reset } from "../../features/posts/postSlice";
import { getFriends, allUsers } from "../../features/users/userSlice";

const Home = (props) => {
  const { user } = props
 
  

    const { posts, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.post
  );
  
  

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
  useEffect(() => {
    if (isError) {
    console.log(message)
  }

  if (!user) {
  navigate('/sign-in')
    }
    
    dispatch(getPosts())
    dispatch(allUsers())
    dispatch(getFriends());
    

    return  () => {
      dispatch(reset())
    }
}, [user, navigate, isError, message, dispatch])

  // console.log(friends)
  
  return (
    <Cont>
      <div className="feed">
        <CreatePost user={user} />
        <Feeds user={user} posts={posts}/>
      </div>
     
      <Friends allUsers={allUsers} />
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