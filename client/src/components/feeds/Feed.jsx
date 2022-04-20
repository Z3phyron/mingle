import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import user from "../../assets/dp_4.jpg";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { IoIosHeartEmpty, IoIosHeart, IoMdShare } from "react-icons/io";
import WordLimit from "react-word-limit";
import post from "../../assets/pexels-mikotoraw-photographer-3594262.jpg";
import Popper from "@mui/material/Popper";
import { Link } from "react-router-dom";

const Feed = () => {
  const [liked, setLiked] = useState(true);
      const [anchorEl, setAnchorEl] = useState(null);

      const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };

      const open = Boolean(anchorEl);
      const id = open ? "simple-popper" : undefined;

  return (
    <Card>
      <User>
        <div className="user">
          <Avatar src={user} sx={{ width: 50, height: 50 }} />
          <div className="user_info">
            <h4 className="name">Damian Ricketts</h4>
            <small>@Abyss_Returner</small>
          </div>
        </div>

        <div className="options">
          <HiOutlineDotsHorizontal className="icon" onClick={handleClick} />
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <PopBox>
              <li>
                <Link to="/">Edit</Link>
              </li>
              <li>
                <Link to="/">Delete</Link>
              </li>
            </PopBox>
          </Popper>
        </div>
      </User>

      <Text>
        <WordLimit limit={120}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
          recusandae voluptatem, tempora saepe libero labore molestias earum
          odio similique quaerat.
        </WordLimit>
      </Text>
      <Image>
        <img src={post} alt="post" />
      </Image>
      <Activities>
        {liked ? (
          <IoIosHeart className="icon active" />
        ) : (
          <IoIosHeartEmpty className="icon" />
        )}
        <BsChatDots className="icon" />
        <IoMdShare className="icon" />
      </Activities>
      <Comment>
        <Avatar src={user} sx={{ width: 40, height: 40 }} />
        <div className="input_field">
          <input type="text" />
        </div>
        <button type="submit">
          <BiSend className="snd-icon" />
        </button>
      </Comment>
    </Card>
  );
};

const Card = styled.div`
  border-radius: 10px;
  margin-bottom: 10vh;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.18);
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);
  padding: 20px;
`;
const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user_info {
      margin-left: 10px;
      color: var(--white);
      letter-spacing: 1px;
    }
  }

  .options {
    .icon {
      font-size: 30px;
      color: var(--white);
    }
  }

  @media screen and (max-width: 900px) {
    .user_info {
      margin-left: 10px;
      color: var(--white);
      letter-spacing: 1px;
      .name {
        font-size: 14px;
      }
      small {
        font-size: 10px;
      }
    }
  }
`;

const Text = styled.div`
  font-size: 13px;
  line-height: 120%;
  letter-spacing: 1px;
  margin: 20px 0;
  padding: 1%;
  color: var(--white);
  font-weight: 100;
`;
const Image = styled.div`
  border-radius: 16px;
  overflow: hidden;
  height: 50vh;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Activities = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  padding: 5px 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 95%;
    margin: auto;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2.1px);
    -webkit-backdrop-filter: blur(2.1px);
    bottom: -10px;
  }

  .icon {
    color: var(--white);
    font-size: 20px;

    &.active {
      color: var(--red);
    }
  }
`;

const Comment = styled.form`
  display: grid;
  grid-template-columns: 10% auto 10%;
  align-items: center;
  grid-gap: 20px;
  margin-top: 25px;

  .input_field {
    width: 100%;
    input {
      width: 100%;
      outline: none;
      border: none;
      padding: 10px 30px;
      border-radius: 8px;
      /* From https://css.glass */
      background: var(--light-blue);
      /* border-radius: 16px; */
      box-shadow: 0 4px 30px var(--light-blue);
      backdrop-filter: blur(2.1px);
      -webkit-backdrop-filter: blur(2.1px);
    }
  }

  button {
    outline: none;
    border: none;
    /* padding: 10px 30px; */
    border-radius: 8px;
    background: var(--light-blue);
    box-shadow: 0 4px 30px var(--light-blue);
    backdrop-filter: blur(2.1px);
    -webkit-backdrop-filter: blur(2.1px);
    display: flex;
    height: 35px;
    width: 35px;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: #fff;
    .snd-icon {
      color: var(--white);
      font-size: 16px;
    }
  }
`;


const PopBox = styled.ul`
  width: auto;
  height: auto;
  /* From https://css.glass */
  background: var(--light-blue);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.6px);
  -webkit-backdrop-filter: blur(7.6px);
  border: none;
  outline: none;
  margin-left: -20px;
  margin-top: 5px;

  padding: 10px 15px;

  transition: all 0.5s;

  display: grid;
  grid-gap: 20px;

  a {
    color: var(--white);
  }
`;


export default Feed;
