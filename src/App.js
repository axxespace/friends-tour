import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import GlobalStyle from "./globalStyles";
import Hero from "./components/Hero";
import {SliderData} from "./data/SliderData";
import Dropdown from "./components/Dropdown";
import InfoSection from "./components/InfoSection";
import styled from "styled-components/macro";
import {AddScrollHandler, UsePrevious} from "./components/globalMethods";

const AppContainer = styled.div`
  width: 100%;
  height: ${({click}) => (click && "100vh")};
  overflow: hidden;
`;

const AppContainer1 = styled.div`
  height: 100%;
  width: 100%;
  margin-top: ${({click, y}) => (click ? `${-y}px` : "0")};
`;

const ShadedBackground = styled.div`
  transition: background .5s;
  position: absolute;
  background: ${({click}) => (click && 'rgba(0,0,0,0.6)')};
  height: 100%;
  width: 100%;
  z-index: ${({click}) => (click ? '30' : '-5')};;
  cursor: ${({click}) => (click && 'pointer')};
`;

function App() {
    const [click, setClick] = useState();
    const [y, setY] = useState(0);
    const prevY = UsePrevious(y);
    const [dropBtnClicked, setDropBtnClicked] = useState(false);

    const scroll = () => {
        setY(window.pageYOffset);
    }

    useEffect(() => {
        console.log(`y: ${y}, prevY: ${prevY}`);
    }, [y, prevY]);

    useEffect(() => {
        if (click === false && !dropBtnClicked) {
            console.log("aaa")
            window.scrollTo(0, prevY);
        } else if (!click && dropBtnClicked) {
            console.log("bbb")
            window.scrollTo(0, prevY);
            const url = window.location.href;
            const splitUrl = url.split('/');
            const element = document.getElementById(splitUrl[splitUrl.length - 1].toLowerCase());
            element && element.scrollIntoView({behavior: "smooth", block: "start"});
        }
        else if (click === true) {
            setY(prevY);
        }
    }, [click, dropBtnClicked]);

    useEffect(() => {
        window.onbeforeunload = function () {
            const url = window.location.href;
            const splitUrl = url.split('/');
            const element = document.getElementById(splitUrl[splitUrl.length - 1].toLowerCase());
            element && element.scrollIntoView({behavior: "auto", block: "end"});
        }
    }, []);

    AddScrollHandler(scroll);

    const navbarClick = () => {
        setClick(prev => !prev);
    }

    const closeMenu = () => {
        if (click) setClick(false);
    }
    return (
        <AppContainer click={click}>
            <Navbar navbarClick={navbarClick} click={click} y={y} setY={setY} prevY={prevY}
                    setDropBtnClicked={setDropBtnClicked}/>
            <ShadedBackground click={click} onClick={closeMenu}/>
            <AppContainer1 click={click} y={prevY}>
                <Dropdown click={click} navbarClick={navbarClick} setDropBtnClicked={setDropBtnClicked}/>
                <GlobalStyle/>
                <Hero slides={SliderData}/>
                <InfoSection/>
            </AppContainer1>
        </AppContainer>
    );
}

export default App;
