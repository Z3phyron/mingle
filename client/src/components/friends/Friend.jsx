import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import user from "../../assets/dp_1.jpg";


const Friend = (props) => {
  const [stat, setStat] = useState(false)
 

    const {time} = props
  return (
    <Cont>
      <div className="user">
        <Avatar alt="Remy Sharp" src={user} />
        <h3 className="user_name">Z3phyron Snides</h3>
      </div>

          <div className="status">
            {stat ? <div className="stat"></div> : <div className="time"> {time}</div> }
              
             
          </div>
    </Cont>
  );
};

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;
  padding: 5px 8px;
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover {
    /* From https://css.glass */
    background: rgba(36, 199, 230, 0.14);

    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.1px);
    -webkit-backdrop-filter: blur(4.1px);
  }

  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user_name {
      margin-left: 10px;
      color: var(--white);
      letter-spacing: 1px;
      font-weight: 300;
      font-size: 16px;
    }
  }

  .stat {
    width: 10px;
    height: 10px;
    background: var(--green);
    border-radius: 50px;
  }

  .time {
      color: var(--gray);
      font-size: 12px;
  }

  @media screen and (max-width: 700px) {
      display: none;
  }
`;



export default Friend;
