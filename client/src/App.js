import Navbar from "./components/Navbar/Navbar";
import styled from "styled-components";
import SideNav from "./components/SideNav/SideNav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <Cont>
      <Navbar />
      <SideNav />
      <Pages>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Pages>
    </Cont>
  );
}

const Cont = styled.div`
  padding-left: 20%;
  padding-top: 20vh;

  @media screen and (max-width: 900px) {
    padding-left: 0;
  }
`;
const Pages = styled.div`
  padding: 0 5%;
`;

export default App;
