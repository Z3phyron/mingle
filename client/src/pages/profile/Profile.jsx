import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import cover from "../../assets/cover.jpg";
import user from "../../assets/dp_4.jpg";
import Feeds from "../../components/feeds/Feeds";
import { Content, Menu, Tab } from "../../components/Style";
import UserInfo from "./UserInfo";
import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import Editprofile from "./Editprofile";

const Profile = () => {
  const [toggleState, setToggleState] = useState(1);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <Cont>
      <UserWraper>
        <CoverPhoto>
          <img src={cover} alt="" />
        </CoverPhoto>
        <User>
          <Avatar alt="Remy Sharp" src={user} className="avatar" />
          <div className="user_info">
            <h3 className="user_name">Damian Ricketts</h3>
            <small className="handle">@abyss_returner</small>
          </div>
        </User>

        <Menu>
          <div className="menu">
            <Tab
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Feed
            </Tab>
            <Tab
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              About
            </Tab>
          </div>

          <div className="edit" onClick={handleOpen}>
            <FiEdit className="icon" />
            Edit Profile
          </div>
          <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalBox>
              <button onClick={handleClose}>
                <IoClose className="icon" />
              </button>
              <Editprofile />
            </ModalBox>
          </Modal>
        </Menu>
      </UserWraper>

      <Content className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <Feeds />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <UserInfo />
        </div>
      </Content>
    </Cont>
  );
};

const Cont = styled.div`
  width: 80%;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const UserWraper = styled.div`
  width: 100%;
  height: 40vh;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const CoverPhoto = styled.div`
  width: 100%;
  border-radius: 20px 20px 0 0;
  height: 80%;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const User = styled.div`
  /* width: ; */
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 40px;
  @media screen and (max-width: 700px) {
    bottom: 35px;
    left: 30px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border: 5px solid rgba(255, 255, 255, 0.18);

    @media screen and (max-width: 900px) {
      width: 70px;
      height: 70px;
    }
  }
  .user_info {
    margin-left: 10px;
    color: var(--white);
    letter-spacing: 1px;
    @media screen and (max-width: 900px) {
   .user_name {
     font-size: 15px;
   }
   .handle {
     font-size: 10px;
   }
    }
  }
`;

const ModalBox = styled.div`
  width: 60%;
  height: auto;
  /* From https://css.glass */
  background: var(--light-blue);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.6px);
  -webkit-backdrop-filter: blur(7.6px);
  border: none;
  outline: none;
  position: absolute;
  top: 50%;
  /* bottom: 50%; */
  left: 50%;
  /* right: 50%; */
  transform: translate(-50%, -50%);
  padding: 5% 2% 2%;
  position: relative;

  button {
    background: var(--light-blue);
    outline: none;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.6px);
    -webkit-backdrop-filter: blur(7.6px);
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white);

    .icon {
      color: var(--white);
    }
  }
`;

export default Profile;
