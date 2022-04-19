import React from 'react'
import styled from 'styled-components'

const Editprofile = () => {
  return (
      <Form>
          <FormControl>
              <InputField>
              <Input type="text" placeholder='First Name'/>
              </InputField>
              <InputField>
              <Input type="text" placeholder='First Name'/>
              </InputField>
          </FormControl>
          <FormControl>
              <InputField>
              <Input type="text" placeholder='First Name'/>
              </InputField>
              <InputField>
              <Input type="text" placeholder='First Name'/>
              </InputField>
          </FormControl>
          <FormControl>
              <InputField>
              <Input type="text" placeholder='First Name'/>
              </InputField>
              <InputField>
              <Input type="text" placeholder='First Name'/>
              </InputField>
          </FormControl>
          
    </Form>
  )
}

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

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.44);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.6px);
  -webkit-backdrop-filter: blur(7.6px);
  transition: all 0.5s;
  overflow: visible;
  z-index: 1;

  /* &:focus {
    z-index: 1;
    overflow: visible;
    transition: 0.5s;
    position: relative;
    &::placeholder {
      position: absolute;
      top: -10px;
      left: 15px;
      color: var(--white);
      background: linear-gradient(
        to bottom,
        var(--light-blue),
        rgba(255, 255, 255, 0.44)
      );
      z-index: 55;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(7.6px);
      -webkit-backdrop-filter: blur(7.6px);
      padding: 2px;
    }
  } */
`;

export default Editprofile