import React, {useEffect, useRef, useState} from "react";
import styled, {css, keyframes} from "styled-components/macro";
import {Button} from "./Button";
import {FiChevronsRight, FiArrowLeft, FiArrowRight} from "react-icons/fi";

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  max-height: 1100px;
  overflow: hidden;
`;

const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const HeroSlide = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const HeroSlider = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    bottom: 0vh;
    left: 0;
    overflow: hidden;
    opacity: 0.4;
    background: linear-gradient(0deg,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.6) 100%);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const toRight = keyframes`
  0% {
    opacity: 0;
    margin-left: -90px;
  }
  100% {
    opacity: 1;
    margin-left: 0;
  }
`

const toBottom = keyframes`
  0% {
    opacity: 0;
    margin-top: -90px;
  }
  100% {
    opacity: 1;
    margin-top: 0;
  }
`

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  animation: 1s ${pulse};
`;
const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: calc(100% - 100px);
  color: #fff;
  h3{
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
  
  h1 {
    font-size: 33px;
    font-weight: 400;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    text-align: left;
    max-width: 800px;
    @media only screen and (max-width: 300px){
      font-size: 25px;
      max-width: 180px;
    }
      @media only screen and (min-width: 300px) and (max-width: 480px){
      font-size: 25px;
      max-width: 220px;
    }
    @media only screen and (min-width: 480px) and (max-width: 535px){
      max-width: 350px;
    }
    @media only screen and (min-width: 535px) and (max-width: 600px){
      max-width: 430px;
    }
  }
  
`;
const Arrow = styled(FiChevronsRight)`
  margin-left: 10px;
`;

const arrowButtons = css`
  width: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
  background: #000d1a;
  border-radius: 50px;
  padding: 10px;
  margin-right: 1rem;
  user-select: none;
  transition: 0.3s;

  @media (pointer: fine) {
    &:hover {
      background: rgb(0, 196, 196);
      transform: scale(1.05);
    }
  }
`;

const SliderButtons = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  z-index: 10;
`;

const PrevArrow = styled(FiArrowLeft)`
  ${arrowButtons}
`;

const NextArrow = styled(FiArrowRight)`
  ${arrowButtons}
`;

const Container = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px){
    height: 70px;
  }
`;

const Hero = ({slides}) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    const timeout = useRef(null);

    useEffect(() => {
        const currentChangeByTimer = () => setCurrent(current < length - 1 ? current + 1 : 0);
        timeout.current = setTimeout(() =>
                currentChangeByTimer(),
            6000);
        return () => {
            clearInterval(timeout.current);
        }
    }, [current, length])

    const nextSlide = () => {
        setCurrent(current < length - 1 ? current + 1 : 0);
    }
    const prevSlide = () => {
        setCurrent(current > 0 ? current - 1 : length - 1);
    }
    return (
        <HeroSection>
            <HeroWrapper id={"about"}>
                {slides.map((slide, index) => (
                    <HeroSlide key={index}>
                        {index === current && (
                            <HeroSlider>
                                <HeroImage src={slide.image} alt={slide.alt}/>
                                <HeroContent>
                                    <Container>
                                        <h1 css={`
                                          position: absolute;
                                          animation: 0.7s ${toRight} forwards;
                                        `}>{slide.title}</h1>
                                    </Container>
                                    <Container>
                                        <h3 css={`
                                          position: absolute;
                                          animation: 0.7s ${toBottom} forwards;
                                        `}>{slide.price}</h3>
                                    </Container>
                                    <Container>
                                        <Button
                                            to={`/${slide.path}`} primary="true"
                                            css={`
                                              position: absolute;
                                              max-width: 160px;
                                              animation: 2s ${pulse} forwards;
                                            `}
                                            onClick={() => {
                                                const element = document.getElementById(slide.path);
                                                element && element.scrollIntoView(
                                                    {behavior: "smooth", block: "start", inline: "nearest"});
                                            }}
                                        >
                                            {slide.label}
                                            <Arrow/>
                                        </Button>
                                    </Container>
                                </HeroContent>
                            </HeroSlider>
                        )}

                    </HeroSlide>
                ))}
                <SliderButtons>
                    <PrevArrow onClick={prevSlide}/>
                    <NextArrow onClick={nextSlide}/>
                </SliderButtons>
            </HeroWrapper>
        </HeroSection>
    );
}

export default Hero;
