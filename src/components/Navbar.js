import React, {useState, useEffect} from "react";
import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import {menuData} from "../data/MenuData";
import {FiAlignRight} from "react-icons/fi";
import {Button} from "./Button";

const Nav = styled.nav`
  top: ${({click, y}) => (click ? `${y}px` :"0")};
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  z-index: 100;
  position: fixed;
  width: 100%;
  background: rgba(0, 196, 196, .8);
  transition: ease-in-out top 0.5s;
  top: ${({scrolled}) => (scrolled ? "-60px" : "0px")};

  @media only screen and (max-width: 1024px){
    padding-left: -20px;
    padding-right: -20px;
  }
`;

const NavLink = css`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled(Link)`
  ${NavLink};
  font-style: italic;
  font-weight: bolder;
  color: white;
  @media only screen and (max-width: 1024px){
    color: black;
  }
`;

const MenuBars = styled(FiAlignRight)`
  display: none;
  @media only screen and (max-width: 1024px){
    display: block;
    height: 120%;
    width: auto;
    color: black;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;
  @media only screen and (max-width: 1024px){
    display: none;
  }
`;

const NavMenuLinks = styled(Link)`
  ${NavLink};
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media only screen and (max-width: 1024px){
    display: none;
  }
`;

const Navbar = ({navbarClick, click, y, setY, prevY, setDropBtnClicked}) => {
    const [scrollDown, setScrollDown] = useState(false);
    const [beforeChange, setBeforeChange] = useState();
    const [hideNavbar, setHideNavbar] = useState(false);

    useEffect(() => {
        if (y > prevY) setScrollDown(true);
        else if (y < prevY) setScrollDown(false);
    }, [y, prevY]);

    useEffect(() => {
        setBeforeChange(prevY);
    }, [scrollDown, prevY]);

    useEffect(() => {
        if (y > beforeChange + 10 && beforeChange !== 0) setHideNavbar(true);
        else if (y < beforeChange - 10) setHideNavbar(false);
    }, [y, beforeChange]);

    const smoothScroll = (prop) => {
        const component = document.getElementById(prop);
        component && component.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    return (
        <Nav scrolled={hideNavbar} click={click} y={y}>
            <Logo to="/" val={y >= window.innerHeight - 50 ? "true" : null}>FRIEND'S TOUR</Logo>
            <MenuBars onClick={() => {
                navbarClick();
                setDropBtnClicked(false);
            }} val={y >= window.innerHeight - 50 ? "true" : null}/>
            <NavMenu>
                {menuData.map((slide, index) => (
                    <NavMenuLinks
                        to={slide.link}
                        key={index}
                        onClick={() => {
                            smoothScroll(slide.link)
                        }}
                    >
                        {slide.title}
                    </NavMenuLinks>
                ))}
            </NavMenu>
            <NavBtn>
                <Button to='/contact' primary="true" onClick={(e) => {
                    smoothScroll("contact");
                }}>Contact Us</Button>
            </NavBtn>
        </Nav>
    );
}
export default Navbar;
