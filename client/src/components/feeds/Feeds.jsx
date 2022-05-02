import React from "react";
import styled from "styled-components";
import Feed from "./Feed";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPost, reset } from "../../features/posts/postSlice";

const Feeds = (props) => {
  // const { posts } = props;

  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );

  

  // console.log(posts);
  return (
    <Cont>
      {posts.map((post) => {
        return <Feed post={post} key={post._id} />;
      })}
    </Cont>
  );
};

const Cont = styled.div`
  /* p  */
`;

export default Feeds;
