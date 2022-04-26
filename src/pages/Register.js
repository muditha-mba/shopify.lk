import styled from "styled-components";
import CircleAnimation from "../Animations/RegisterCircleAnimi";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 20px 30px;
  width: 40%;
  /* background-color: #ffffff82; */
  background-color: #ffffffb1;
  border-radius: 20px;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 7px;
  border: none;
`;

const Agreement = styled.span`
  color: #090a0f;
  font-size: 14px;
  margin: 20px 0px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
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
