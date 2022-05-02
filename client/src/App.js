import Navbar from "./components/Navbar/Navbar";
import styled from "styled-components";
import SideNav from "./components/SideNav/SideNav";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
import SignIn from "./pages/auth/SignIn";
import ProtectedRoutes from "./components/ProtectedRoutes";

import SignUp from "./pages/auth/SignUp";
import "react-toastify/dist/ReactToastify.css";
import Forgotpassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyMail";
import VerifyToken from "./pages/auth/VerifyToken";
import { ToastContainer } from "react-toastify";

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);
  console.log(user);
  // console.log(user.token)
  return (
    <Cont>
      {user ? <Navbar user={user} /> : <></>}
      {user ? <SideNav /> : <></>}

      <Pages>
        <Routes>
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<Forgotpassword />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/verifyEmail" element={<VerifyEmail />} />
          <Route exact path="/verifyToken" element={<VerifyToken />} />
          <Route path="/" exact element={<ProtectedRoutes />}>
            <Route exact path="/" element={<Home user={user} />} />
            <Route exact path="/profile" element={<Profile user={user} />} />
          </Route>
        </Routes>
      </Pages>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Cont>
  );
}

const Cont = styled.div`
  /* padding-left: 20%; */
  /* padding-top: 20vh; */

  @media screen and (max-width: 900px) {
    /* padding-left: 0; */
  }
`;
const Pages = styled.div`
  padding: 0 5%;
`;

export default App;
