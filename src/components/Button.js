import styled from "styled-components";
// import {Link} from "react-router-dom";
import {HashLink} from "react-router-hash-link";


export const Button = styled(HashLink)`
  background: ${({primary}) => (primary ? '#000d1a' : 'CD853F')};
  white-space: nowrap;
  outline: none;
  border: none;
  min-width: 100px;
  max-width: 200px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  padding: ${({big}) => (big ? '16px 40px' : '14px 24px')};
  color: ${({primary}) => (primary ? '#fff' : '#000d1a')};
  font-size: ${({big}) => (big ? '20px' : '14px')};
  @media (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;
