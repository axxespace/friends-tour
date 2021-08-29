import React, {useRef} from "react";
import {useEffect, useState} from "react";
import styled, {css} from "styled-components/macro";
import {menuData} from "../data/MenuData";
import {Button} from "./Button";
import {RiCloseCircleFill} from 'react-icons/ri';
import {Link} from "react-router-dom";

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 40%;
  height: 100%;
  background: #000d1a;
  display: grid;
  align-items: center;
  justify-content: center;
  left: ${({click}) => (click === true ? '0' : '-100%')};
  top: 60px;
  transition: 0.3s ease-in-out;
  opacity: ${({click}) => (click === true ? '1' : '0')};
  -webkit-box-shadow: 0px 8px 15px -1px rgba(0,0,0,0.82);
  box-shadow: 0px 8px 15px -1px rgba(0,0,0,0.82);
  overflow: hidden;
`;

const DropIconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 22px;
  background: black;
  width: 25px;
  height: 25px;
  
`;

const DropIcon = styled(RiCloseCircleFill)`
  color: white;
  -webkit-border-radius: 50px;
  background-size: contain;
  cursor: pointer;
  width: 45px;
  height: auto;
  margin: -9px;
  &:hover{
    color: rgb(0, 196, 196);
  }
`;

const MenuItems = styled.div`
  display: grid;
  grid-template-rows: repeat(${menuData.length}, 100px);
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-size: 28px;
  align-self: center;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: 0.2s;

  &:hover {
    color: black;
  }
`;

const newButtonStyle = css`
  margin-top: 60px;
  width: 250px;
  height: 60px;
  font-size: 22px;
`;


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Dropdown = ({click, navbarClick, setDropBtnClicked}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const prevCount = usePrevious(width);
    useEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);


    useEffect(() => {
        if (width > 768 && prevCount < 768 && click === true) navbarClick();
    }, [width, click, navbarClick, prevCount]);

    return (
        <DropdownContainer click={click}>
            <MenuItems>
                <DropIconContainer>
                    <DropIcon onClick={navbarClick}/>
                </DropIconContainer>
                {menuData.map((item, index) => (
                    <MenuItem to={`/${item.link}`} key={index} onClick={() => {
                        setDropBtnClicked(true);
                        navbarClick();
                    }}>
                        {item.title}
                    </MenuItem>
                ))}
                <Button primary="true" to='/contact' css={newButtonStyle} onClick={() => {
                    setDropBtnClicked(true);
                    navbarClick();
                }}>
                    Contact Us
                </Button>
            </MenuItems>
        </DropdownContainer>
    )
}

export default Dropdown;
