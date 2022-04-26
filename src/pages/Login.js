import styled from "styled-components";
import CircleAnimation from "../Animations/LoginCircleAnimi";

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
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 7px;
  border: none;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;
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

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const Link = styled.a`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

function Login() {
  return (
    <Container>
      <Content>
        <Wrapper>
          <TitleContainer>
            <Title>Sign In</Title>
          </TitleContainer>
          <Form>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <ButtonContainer>
              <Button>CREATE</Button>
            </ButtonContainer>
            <LinkContainer>
              <Link>Forgot Password?</Link>
              <Link>Create an account</Link>
            </LinkContainer>
          </Form>
        </Wrapper>
      </Content>
      <CircleAnimation />
    </Container>
  );
}

export default Login;
