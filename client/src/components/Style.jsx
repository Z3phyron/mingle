import styled from "styled-components";


export const Tab = styled.button`
  &.tabs {
    padding: 7px 15px;
    margin: 5px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 15px;
    border: none;
    color: var(--white);
    background: none;
    position: relative;
    outline: none;
    @media (max-width: 900px) {
      padding: 2px 15px;
      margin: 19px 20px 0;
    }
    @media (max-width: 700px) {
      padding: -40px 15px;
      margin: 19px 20px 0;
    }
    @media (max-width: 600px) {
      padding: 4px 10px;
      margin: 10px 0 0;
      font-size: 10px;
    }
    .icon {
      margin-right: 3px;
      font-size: 20px;
    }
  }
  /* &.tabs:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.274);
  } */
  &.active-tabs {
    position: relative;
    color: rgb(88, 147, 241);
  }
  &.active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 2px;

    /* From https://css.glass */
    background: var(--light-blue);
    /* border-radius: 16px; */
    box-shadow: 0 4px 30px var(--light-blue);
    backdrop-filter: blur(2.7px);
    -webkit-backdrop-filter: blur(2.7px);
    background: rgb(88, 147, 241);
  }
`;



export const Content = styled.div`
 
  .content {
    /* padding: 3%; */
    margin-top: 40px;
    width: 100%;
    height: 100%;
    display: none;
  }


  .active-content {
    display: block;
  }
`;

export const Menu = styled.div`
  width: 100%;
  padding: 10px 20px;
  position: relative;
  display: flex;
  /* grid-template-columns: auto 25%; */
  /* grid-template-columns: repeat(2, 1fr); */
  align-items: center;

  @media (max-width: 900px) {
    padding: 5px 10px;
  }

  /* flex-wrap: wrap; */

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    @media (max-width: 900px) {
      justify-content: flex-start;
      margin-left: 80px;
    }
  }

  .edit {
    /* margin-left: auto; */
    position: absolute;
    right: 5%;
    bottom: 25px;
    padding: 7px 15px;
    color: var(--white);
    border-radius: 8px;
    /* From https://css.glass */
    background: var(--light-blue);
    font-size: 12px;
    box-shadow: 0 4px 30px var(--light-blue);
    backdrop-filter: blur(2.1px);
    -webkit-backdrop-filter: blur(2.1px);
    transition: all 0.5s;
    @media (max-width: 900px) {
      font-size: 10px;
      right: 3%;
      bottom: 16vh;
      
    }

    .icon {
      margin-right: 10px;
    }

    &:hover {
      background: var(--blue);
    }
  }

  @media (max-width: 1270px) {
    font-size: 13px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
  @media (max-width: 530px) {
    font-size: 10px;
  }
`;