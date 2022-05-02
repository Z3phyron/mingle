import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  verifyToken,
  resetPassword,
  reset,
} from "../../features/auth/authSlice";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  // console.log(
  //   useLocation().search.slice(0, useLocation().search.length).split("=").pop()
  // );

  const token = useLocation()
    .search.slice(0, useLocation().search.length)
    .split("=")
    .pop();

  const { user, email, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (token) {
      dispatch(verifyToken(token));
      // setFormData(formData.email: email)
    }

     
    dispatch(reset());
  }, [email, isError, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // const {token} = user
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const { password, confirmPassword, showPassword, showConfirmPassword } =
    formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setFormData({
      ...formData,
      showConfirmPassword: !showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        email: email?.email,
        password,
        confirmPassword,
      };
      console.log(userData);
      dispatch(resetPassword(userData));
    }
  };

  return (
    <Cont>
      <Wrap>
        <header>
          <h3 className="heading">Reset password</h3>
          <p className="desc">Create a ne password</p>
        </header>

        <Form onSubmit={handleSubmit}>
          <FormControl>
            <InputField>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                onChange={onChange}
                value={password}
              />
              <div
                className="show"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                <p>{showPassword ? <HiEyeOff /> : <HiEye />}</p>
              </div>
            </InputField>
          </FormControl>
          <FormControl>
            <InputField>
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                onChange={onChange}
                value={confirmPassword}
              />
              <div
                className="show"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
              >
                <p>{showConfirmPassword ? <HiEyeOff /> : <HiEye />}</p>
              </div>
            </InputField>
          </FormControl>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Wrap>
      {/* ) : error ? (
        error
      ) : (
        <h1>"verifying please wait...."</h1>
      )} */}
    </Cont>
  );
};

const Cont = styled.div`
  /* p  */
  padding: 15vh 5% 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
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
  position: relative;

  .show {
    position: absolute;
    right: 20px;
    bottom: 13px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
    border-radius: 50px;

    &:hover {
      background: #f2f2f2;
    }
  }
`;

export default ResetPassword;
