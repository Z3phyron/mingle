import React from "react";
import styled from "styled-components";

const UserInfo = () => {
  return (
    <Cont>
      <Card>
        <div className="header">Contact Info</div>
        <div className="info">
          <div className="title">Name:</div>
          <div className="value">Damian Ricketts</div>
        </div>
        <div className="info">
          <div className="title">Email:</div>
          <div className="value">Z3phyrondevs@gmail.com</div>
        </div>
        <div className="info">
          <div className="title">Phone:</div>
          <div className="value">+234 08148918529</div>
        </div>
        <div className="info">
          <div className="title">Address:</div>
          <div className="value">50 street, NewYork city</div>
        </div>
        <div className="info">
          <div className="title">Website:</div>
          <div className="value">https://rowland.vercel.app</div>
        </div>
      </Card>
    </Cont>
  );
};

const Cont = styled.div`
  /* p  */
`;

const Card = styled.div`
  border-radius: 10px;
  margin-bottom: 10vh;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.18);
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);
  padding: 20px;
  display: grid;
  grid-gap: 30px;

  .header {
    color: var(--white);
    position: relative;

    &::before {
      content: "";
      display: block;
      position: absolute;
      bottom: -5px;
      /* left: 50%; */
      /* transform: translateX(-50%); */
      width: 8%;
      height: 2px;

      /* From https://css.glass */
      background: var(--light-blue);
      /* border-radius: 16px; */
      box-shadow: 0 4px 30px var(--light-blue);
      backdrop-filter: blur(2.7px);
      -webkit-backdrop-filter: blur(2.7px);
      background: rgb(88, 147, 241);
    }
  }

  .info {
    display: grid;
    grid-template-columns: 15% auto;
    grid-gap: 30px;
    color: var(--white);
  }
`;

export default UserInfo;
