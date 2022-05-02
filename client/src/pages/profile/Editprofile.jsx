import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";


const Editprofile = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  console.log(user);

  const [userUpdate, setUserUpdate] = useState({
    firstName: user?.user?.firstName,
    lastName: user?.user?.lastName,
    email: user?.user?.email,
    liveAt: user?.user?.liveAt,
    relationship: user?.user?.relationship,
    bio: user?.user?.bio,
    profile_pic: user?.user?.profile_pic,
    cover_pic: user?.user?.cover_pic,
  });

  const {
    profile_pic,
    bio,
    cover_pic,
    firstName,
    lastName,
    liveAt,
    relationship,
    email,
  } = userUpdate;

   const onChange = (e) => {
     setUserUpdate((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value,
     }));
   };


  return (
    <Form>
      <FormControl>
        <InputField className="images">
          <div className="profile_pic">
            <input type="file" name="" id="" />
          </div>
        </InputField>
      
      </FormControl>
      <FormControl>
        <InputField>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            variant="outlined"
            onChange={onChange}
            value={firstName}
          />
        </InputField>
        <InputField>
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            variant="outlined"
            onChange={onChange}
            value={lastName}
          />
        </InputField>
      </FormControl>
      <FormControl>
        <InputField>
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={onChange}
            value={email}
          />
        </InputField>
        <InputField>
          <TextField
            fullWidth
            name="liveAt"
            label="Address"
            variant="outlined"
            onChange={onChange}
            value={liveAt}
          />
        </InputField>
      </FormControl>
    </Form>
  );
};

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
`;
const FormControl = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
const InputField = styled.div`
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  max-height: 13vh;
  outline: none;
  color: var(--white);
  border: none;
  padding: 15px 10px;
  border-radius: 8px;



  
`;

export default Editprofile;
