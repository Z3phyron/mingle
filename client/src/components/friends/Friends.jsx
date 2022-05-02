import React from "react";
import styled from "styled-components";
import Friend from "./Friend";
import { useSelector, useDispatch } from "react-redux";

const Friends = () => {
  const { allUsers, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.friend
  );
  return (
    <Cont>
      <div className="header">Friends</div>
      {allUsers.map((user) => {
        return (<Friend user={user} key={user._id} />);
      })}
      {/* <Friend time="3m" />
      <Friend time="34m" />
      <Friend time="2m" />
      <Friend time="2m" /> */}
    </Cont>
  );
};

const Cont = styled.div`
  /* p  */
  background: rgba(255, 255, 255, 0.18);
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);
  padding: 10px;
  border-radius: 10px;
  height: auto;
  .header {
    color: var(--white);
    padding: 10px;
  }
`;

export default Friends;
