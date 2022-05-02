import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { forgotPassword, reset } from "../../features/auth/authSlice";
import ForgotpasswordSuccess from "./ForgotPasswordSuccess";

const Forgotpassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("please Enter an Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const userData = {
        email,
      };
      console.log(userData);
      dispatch(forgotPassword(userData));
    }
  };

     if (isSuccess === true) {
       return <ForgotpasswordSuccess />;
     }

  return (
    <Cont>
      <Wrap>
        <header>
          <h3 className="heading">Forgot password</h3>
          <p className="desc">Please Enter your email</p>
        </header>

        <Form onSubmit={handleSubmit}>
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
          </FormControl>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Wrap>
    </Cont>
  );
};

const Cont = styled.div`
  /* p  */
  color: var(--white);
  padding: 15vh 5% 10vh;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  /* p  */
  width: 50%;
  margin: auto;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.18);
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);
  padding: 50px;
  border-radius: 20px;
  padding: 50px;
  border-radius: 20px;

  @media (max-width: 900px) {
    width: 100%;
    padding: 20px;
  }

  header {
    margin-bottom: 20px;
    .heading {
      margin-bottom: 10px;
      font-size: 30px;
      color: var(--white);
    }
  }
`;
const Form = styled.form`
  /* p  */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;

  button {
    width: 100%;
    padding: 20px 10px;
    border-radius: 8px;
    outline: none;
    border: none;
  }
`;
const FormControl = styled.div`
  /* p  */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
`;
const InputField = styled.div`
  /* p  */
  width: 100%;
`;

export default Forgotpassword;
