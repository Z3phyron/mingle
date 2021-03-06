import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdOutlinePermMedia } from "react-icons/md";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPost, getPosts, reset } from "../../features/posts/postSlice";

const CreatePost = (props) => {
  const { user } = props;
  // const { profile_pic } = user.user;

  const [formData, setFormData] = useState({
    author: "",
    content: "",
    images: [],
  });

  const { author, content, images } = formData;
  const { posts } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posts) {
      toast.error("Passwords do not match");
    } else {
      const authorId = user?.user?._id;
      console.log(authorId);
      const PostData = {
        author: authorId,
        content,
        images,
      };
      console.log(PostData);
      dispatch(createPost(PostData));
    }
  };

  return (
    <Cont onSubmit={handleSubmit}>
      <Box>
        <Avatar alt="Remy Sharp" src={user?.user?.profile_pic} />
        <div className="input_field">
          <textarea
            name="content"
            onChange={onChange}
            value={content}
          ></textarea>
        </div>
      </Box>

      <Box2>
        <Media>
          <div className="photo">
            <MdOutlinePermMedia className="icon" />
            <input
              type="file"
              className="file"
              name="images"
              onChange={onChange}
              value={images}
            />
            <div className="text">Photo/Video</div>
          </div>
          <div className="feelings">
            <BsEmojiSmileUpsideDown className="icon" />
            <div className="text">Feelings</div>
          </div>
        </Media>
        <button type="submit">Send</button>
      </Box2>
    </Cont>
  );
};

const Cont = styled.form`
  border-radius: 10px;
  margin-bottom: 5vh;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.18);
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);
  padding: 20px;
`;
const Box = styled.div`
  display: grid;
  grid-template-columns: 7% auto;
  grid-gap: 20px;
  /* align-items: center; */

  .input_field {
    width: 100%;
    position: relative;

    textarea {
      width: 100%;
      max-height: 13vh;
      outline: none;
      color: var(--white);
      border: none;
      padding: 15px 10px;
      border-radius: 8px;
      /* From https://css.glass */
      background: var(--light-blue);
      /* border-radius: 16px; */
      box-shadow: 0 4px 30px var(--light-blue);
      backdrop-filter: blur(2.1px);
      -webkit-backdrop-filter: blur(2.1px);
    }
  }
`;

const Box2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  button {
    outline: none;
    border: none;
    padding: 10px 25px;
    color: var(--white);
    border-radius: 8px;
    /* From https://css.glass */
    background: var(--light-blue);
    /* border-radius: 16px; */
    box-shadow: 0 4px 30px var(--light-blue);
    backdrop-filter: blur(2.1px);
    -webkit-backdrop-filter: blur(2.1px);
    transition: all 0.5s;

    &:hover {
      background: var(--blue);
    }
  }
`;

const Media = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  .photo,
  .feelings {
    display: flex;
    align-items: center;
    color: var(--white);
    position: relative;
    .file {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
    }

    .icon {
      margin-right: 10px;
      font-size: 20px;
      color: var(--white);
    }
  }
`;

export default CreatePost;
