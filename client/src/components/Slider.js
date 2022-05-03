import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile, smallLap, tab } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  position: relative;
  overflow: hidden;
  /* ${mobile({ display: "none" })} */
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${tab({ flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${tab({ height: "50%" })}
`;

const Image = styled.img`
  height: 80%;
  ${smallLap({ height: "60%" })}
  ${tab({ height: "80%" })} /* max-width: 100%; */
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${smallLap({ padding: "10px", textAlign: "center" })}
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 70px;
  ${smallLap({ fontSize: "50px" })}
  ${tab({ fontSize: "40px" })}
`;

const Desc = styled.p`
  margin: 25px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${smallLap({ fontSize: "12px", margin: "15px 0px" })}
`;

const Button = styled.button`
  text-transform: uppercase;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  ${smallLap({ fontSize: "10px", padding: "5px" })}
`;

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideIndex * 1);
    } else {
      setSlideIndex(slideIndex < 4 ? slideIndex + 1 : slideIndex * 1);
    }
  };
  /* const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  }; */

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
}

export default Slider;
