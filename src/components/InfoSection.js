import React, {useRef, useState} from "react";
import styled from "styled-components/macro";
import {Button} from "./Button";
import interior from '../images/interior.jpg';
import {FiChevronsRight} from "react-icons/fi";
import {AddScrollHandler} from "./globalMethods";

const InfoContainer = styled.div`
  height: 100vh;
  max-height: 1100px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 50px;
  grid-gap: 50px;
  @media only screen and (max-width: 768px) and (min-height: 600px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
  }
`;

const TextAndButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 750px;
  order: 2;

  p, h1 {
    margin: 10px 0;
  }

  @media only screen and (max-width: 480px), only screen and (max-height: 600px) {
    .text2 {
      display: none;
    }
  }
  @media only screen and (max-width: 320px), only screen and (max-height: 460px) {
    .text1, .text2 {
      display: none;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  overflow: hidden;
  order: 3;
  @media (max-width: 768px) and (min-height: 600px) {
    order: 1;
  }
`;

const InfoImage = styled.img`
  z-index: 10;
  transition: 2s;
  width: ${({scrolled}) => (scrolled ? "100%" : "150%")};
  object-fit: cover;
`;

const Arrow = styled(FiChevronsRight)`
  margin-left: 10px;
`;


const InfoSection = () => {
    const [scrollState, setScrollState] = useState(false);
    const hiddenRef = useRef();
    const scrollHandler = () => {
        if (window.pageYOffset >= hiddenRef.current.offsetTop - hiddenRef.current.offsetHeight && !scrollState) {
            setScrollState(true);
        }
    }
    AddScrollHandler(scrollHandler);
    return (
        <InfoContainer id={"homes"}>
            <TextAndButton ref={hiddenRef}>
                <h1>
                    Explore our beautiful homes
                </h1>
                <p className="text1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus lorem, vehicula a metus s
                    it amet, rutrum feugiat massa. Donec vel diam consectetur,
                    tincidunt ante nec, tincidunt mauris. Nulla vel consequat ligula, ut efficitur augue. Curabitur
                    facilisis eleifend quam,
                </p>
                <p className="text2">
                    Nulla in felis et enim blandit fringilla id non magna. Morbi convallis quam in arcu pulvinar, a
                    vehicula urna accumsan. Sed ornare at diam a consequat. Nullam luctus
                    faucibus turpis vel ultrices. Proin viverra metus non dictum iaculis.
                </p>
                <Button to="/homes" primary="true" css={'max-width: 160px'}>
                    View Home
                    <Arrow/>
                </Button>
            </TextAndButton>
            <ImageContainer ref={hiddenRef}>
                <InfoImage src={interior} alt="interior" scrolled={scrollState}/>
            </ImageContainer>
        </InfoContainer>
    );
}
export default InfoSection;
