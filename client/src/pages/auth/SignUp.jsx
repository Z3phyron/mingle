import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { signUp, reset } from "../../features/auth/authSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
  );

  

    useEffect(() => {
      if (isError) {
        toast.error(message);
      }

      if (isSuccess || user) {
        navigate("/");
      }

      dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };
      console.log(userData);
       dispatch(signUp(userData));
    }
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

    if (isLoading) {
      return <>loooooooooodddddiiiiii       .................</>;
    }

  return (
    <Cont>
      <Wrap>
        <h3 className="heading">Sign Up</h3>

        <Form onSubmit={handleSubmit}>
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

          <FormControl className="single">
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
        <div className="link">
          <p>
            Already have an Account? <Link to="/sign-in">Sign In</Link>{" "}
          </p>
        </div>
      </Wrap>
    </Cont>
  );
};

const Cont = styled.div`
  /* p  */
  padding: 10vh 5%;
  display: flex;
  height: 100vh;
  color: var(--white);
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

  .heading {
    margin-bottom: 20px;
    font-size: 30px;
    color: var(--white);
  }
  .link {
    margin: 20px;
    display: grid;
    gap: 10px;
  }
`;
const Form = styled.form`
  /* p  */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  border: ${(props) => props.theme.fontColor};
  /* background: ${(props) => props.theme.bg2}; */

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
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  &.single {
    grid-template-columns: repeat(1, 1fr);
  }
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

export default SignUp;
