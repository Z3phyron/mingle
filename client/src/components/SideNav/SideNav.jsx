import React from "react";
import { RiHome2Fill } from "react-icons/ri";
import { GoFlame } from "react-icons/go";
import { FaBookmark } from "react-icons/fa";
import { HiBell, HiUserCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SideNav = () => {
  return (
    <Cont>
      <Links>
        <NavLink to="/">
          <div className="icon">
            <RiHome2Fill />
          </div>
          <div className="text">Home</div>
        </NavLink>
        <NavLink to="/">
          <div className="icon">
            <GoFlame />
          </div>
          <div className="text">For You</div>
        </NavLink>
        <NavLink to="/">
          <div className="icon">
            <HiBell />
          </div>
          <div className="text">Notifications</div>
        </NavLink>
        <NavLink to="/">
          <div className="icon">
            <FaBookmark />
          </div>
          <div className="text">Bookmark</div>
        </NavLink>
        <NavLink to="/profile">
          <div className="icon">
            <HiUserCircle />
          </div>
          <div className="text">profile</div>
        </NavLink>
      </Links>

      <Tweet>Tweet</Tweet>
    </Cont>
  );
};

const Cont = styled.div`
  position: fixed;
  top: 0;
  text-align: center;
  left: 0;
  width: 20%;
  height: 100vh;
  /* display: grid;
  grid-gap: 10px; */
  z-index: 1;
  //   background: var(--light-blue);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.1px);
  -webkit-backdrop-filter: blur(4.1px);
  padding-top: 20vh;
  transition: all 0.5s;

  @media screen and (max-width: 900px) {
    bottom: 0;
    right: 0;
    top: 93vh;
    height: 7vh;
    width: 100%;
    padding-top: 12px;
    /* From https://css.glass */
    background: rgba(36, 199, 230, 0.14);

  }
`;
const Links = styled.div`
  display: grid;
  padding-left: 25%;
  //   text-align: center;
  grid-gap: 40px;
  a {
    color: var(--white);
    display: flex;
    // margin: 0 auto;
    // text-align: center;
    // justify-content: center;
    align-items: center;
    transition: all 0.5s;
    .icon {
      font-size: 25px;
    }
    .text {
      margin-left: 10px;
    }

    &:active {
      color: var(--blue);
    }
    &:hover {
      color: var(--blue);
    }
  }

  @media screen and (max-width: 900px) {
    display: flex;
    padding-left: 0;
    justify-content: space-around;

    a {
      color: var(--white);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        font-size: 25px;
      }
      .text {
        margin-left: 10px;
        display: none;
      }

      &:active {
        color: var(--blue);
      }
    }
  }
`;

const Tweet = styled.button`
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.1px);
  -webkit-backdrop-filter: blur(4.1px);
  outline: none;
  border: none;
  padding: 15px 45px;
  font-size: 18px;
  border-radius: 50px;
  background: var(--light-blue);
//   background: none;
  color: var(--white);
  margin-top: 5vh;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export default SideNav;
