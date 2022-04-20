import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import Avatar from "@mui/material/Avatar";
import user from "../../assets/dp_4.jpg";
import Popper from "@mui/material/Popper";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const changeBackground = () => {
    if (window.scrollY >= 30) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <Nav className={navbar ? "isActive" : ""}>
      <Logo>
        <Link to="/">
          Face_<span>Gram.</span>
        </Link>
      </Logo>
      <Search>
        <div className="input_field">
          <RiSearchLine className="icon" />
          <input type="search" placeholder="Search" />
        </div>
      </Search>
      <User>
        <Avatar src={user} className="avatar" onClick={handleClick} />
        <div className="user_info">
          <h4 className="name">Damian Ricketts</h4>
          <small>@Abyss_Returner</small>
        </div>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <PopBox>
            <li>
              <Link to="/">profile</Link>
            </li>
            <li>
              <Link to="/">logout</Link>
            </li>
          </PopBox>
        </Popper>
      </User>
    </Nav>
  );
};

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 18% auto 18%;
  align-items: center;
  grid-gap: 40px;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: 15vh;
  padding: 3% 5%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  &.isActive {
    /* From https://css.glass */
    background: var(--light-blue);
    /* border-radius: 16px; */
    box-shadow: 0 4px 30px var(--light-blue);
    backdrop-filter: blur(2.7px);
    -webkit-backdrop-filter: blur(2.7px);
    height: 15vh;
    padding: 2% 5%;
  }

  @media screen and (max-width: 900px) {
    grid-gap: 20px;
    grid-template-columns: 18% auto 10%;
    &.isActive {
      height: 10vh;
    }
  }
`;
const Logo = styled.div`
  font-size: 15px;
  a {
    color: #fff;
    span {
      color: var(--blue);
    }
  }
`;

const Search = styled.div`
  width: 100%;
  .input_field {
    position: relative;
    width: 100%;

    input {
      width: 100%;
      outline: none;
      border: none;
      color: var(--white);
      font-size: 17px;
      letter-spacing: 1px;
      border-radius: 50px;
      padding: 15px 15px 15px 45px;
      background: var(--light-blue);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(4.1px);
      -webkit-backdrop-filter: blur(4.1px);

      &::placeholder {
        color: var(--white);
        font-size: 17px;
        letter-spacing: 1px;
      }
    }

    .icon {
      position: absolute;
      z-index: 2;
      color: var(--white);
      font-size: 24px;
      top: 12px;
      left: 10px;
    }
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    .input_field {
      position: relative;
      width: 100%;

      input {
        font-size: 12px;

        padding: 10px 10px 10px 35px;

        &::placeholder {
          font-size: 12px;
        }
      }

      .icon {
        font-size: 16px;
        top: 9px;
        left: 10px;
      }
    }
  }
`;

const User = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar {
    width: 50px;
    height: 50px;
    @media screen and (max-width: 900px) {
      width: 40px;
      height: 40px;
    }
  }

  .user_info {
    margin-left: 10px;
    color: var(--white);
    letter-spacing: 1px;
    small {
      /* color: var(--light-blue); */
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
  @media screen and (max-width: 500px) {
    .user_info {
      display: none;
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
  margin-left: 30px;
  margin-top: 5px;

  padding: 10px 15px;

  transition: all 0.5s;

  display: grid;
  grid-gap: 20px;

  a {
    color: var(--white);
  }
`;

export default Navbar;
