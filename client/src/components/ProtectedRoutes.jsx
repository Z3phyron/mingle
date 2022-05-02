import React from "react";
import { Routes, Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";


const ProtectedRoutes = ({ props: any }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Page><Outlet /></Page>  : <Navigate to="/sign-in" />;
};

const Page = styled.div`
  padding-left: 20%;
  padding-top: 20vh;

  @media screen and (max-width: 900px) {
    padding-left: 0;
  }
`;

export default ProtectedRoutes;
