import { useState } from "react";
import styled from "styled-components";
import CircleAnimation from "../Animations/LoginCircleAnimi";
import bg from "../imgs/login/loginBG.jpg";
import { mobile } from "../responsive";
import { loginAPICall } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  font-size: 17px;
  min-width: 40%;
  margin-top: 20px;
  padding: 10px;
  border-radius: 7px;
  border: none;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

  &:disabled {
    color: green;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #090a0f;
  }
`;

const ConnectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const Connect = styled.a`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;

const Error = styled.span`
  color: red;
  margin-top: 10px;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    loginAPICall(dispatch, { email, password });
  };

  return (
    <Container>
      <BackgroundImage src={bg} />
      <Content>
        <Wrapper>
          <TitleContainer>
            <Title>Sign In</Title>
          </TitleContainer>
          <Form>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonContainer>
              <Button onClick={handleLogin} disabled={isFetching}>
                {isFetching ? "Pending..." : "Sign In"}
              </Button>
              {error && <Error>Something Went Wrong Please Try again.</Error>}
            </ButtonContainer>
            <ConnectContainer>
              <Link to={"/"}>
                <Connect>Go Back Home</Connect>
              </Link>
              <Link to={"/register"}>
                <Connect>Create an account</Connect>
              </Link>
            </ConnectContainer>
          </Form>
        </Wrapper>
      </Content>
      <CircleAnimation />
    </Container>
  );
}

export default Login;
