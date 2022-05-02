
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail, reset } from "../../features/auth/emailSlice";

const VerifyMail = () => {
  const [loading, setLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  
  const token = useLocation()
    .search.slice(0, useLocation().search.length)
    .split("=")
    .pop();

  const { verified, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.email
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (token) {
      dispatch(verifyEmail(token));

    }
 if (isSuccess) {
   setInterval(() => {
     setIsVerified(verified.success)
     dispatch(reset());
     setLoading(true)
      navigate("/");
    }, 5000);
  }
    
  }, []);
  console.log(verified);

  if (isVerified === true) {
    return (
    <Cont>
      <Wrap>done</Wrap> 
    </Cont>
  );
  } else if (loading) {
    return <Wrap>Loading</Wrap>;
 }

 
};

const Cont = styled.div`
  /* p  */
  padding: 15vh 5% 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  /* p  */
  width: 50%;
  margin: auto;
  border: 1px solid #002;
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
    }
  }
`;
// const Form = styled.form`
//   /* p  */
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-gap: 20px;

//   button {
//     width: 100%;
//     padding: 20px 10px;
//     border-radius: 8px;
//     outline: none;
//     border: none;
//   }
// // `;
// const FormControl = styled.div`
//   /* p  */
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-gap: 20px;
// `;
// const InputField = styled.div`
//   /* p  */
//   width: 100%;
// `;
// const Input = styled.input`
//   /* p  */
//   width: 100%;
//   padding: 20px 10px;
//   border-radius: 8px;
//   outline: none;
//   border: none;
//   background: rgba(0, 0, 0, 0.05);
// `;

export default VerifyMail;
