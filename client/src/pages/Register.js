import styled from "styled-components";
import CircleAnimation from "../Animations/RegisterCircleAnimi";
import bg from "../imgs/register/regBG.jpg";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const BackgroundImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  padding: 20px 30px;
  width: 25%;
  /* background-color: #ffffff82; */
  background-color: #ffffffb1;
  border-radius: 20px;
  ${mobile({ width: "75%" })}
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  color: #1b2735;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin-top: 20px;
  padding: 10px;
  border-radius: 7px;
  border: none;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #1b2735;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.4s ease;
  border-radius: 20px;
  font-size: 15px;

  &:hover {
    background-color: #090a0f;
  }
`;

function Register() {
  return (
    <Container>
      <BackgroundImage src={bg} />
      <Content>
        <Wrapper>
          <TitleContainer>
            <Title>Create An Account</Title>
          </TitleContainer>
          <Form>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Email" />
            <Input placeholder="Username" />
            <Input placeholder="Password" />
            <Input placeholder="Confirm Password" />
            <ButtonContainer>
              <Button>CREATE</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </Content>
      <CircleAnimation />
    </Container>
  );
}

export default Register;
