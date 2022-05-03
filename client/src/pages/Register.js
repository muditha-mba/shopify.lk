import { useState } from "react";
import styled from "styled-components";
import CircleAnimation from "../Animations/RegisterCircleAnimi";
import bg from "../imgs/register/regBG.jpg";
import { mobile, smallLap, tab } from "../responsive";
import { publicRequest } from "../requestMethods";
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
  ${smallLap({ width: "40%" })}
  ${tab({ width: "60%" })}
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
  flex-direction: column;
`;

const Error = styled.span`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

const Success = styled.span`
  margin-top: 10px;
  color: #20d75d;
  font-size: 14px;
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

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* const EmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; */
  const EmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const NameRegex = /^[a-zA-Z]+$/;

  if (isError || isSuccess) {
    setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
    }, 5000);
  }

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!email.match(EmailRegex)) {
      console.log("Please Provide a valid Email.");
      setIsError(true);
      return;
    } else if (!firstName.match(NameRegex) || !lastName.match(NameRegex)) {
      console.log("Name can not have numbers");
      setIsError(true);
      return;
    } else if (username.length > 20) {
      console.log("Username can not have more than 20 characters.");
      setIsError(true);
      return;
    } else if (password.length < 8) {
      console.log("The password should have at least 8 characters.");
      setIsError(true);
      return;
    } else if (confirmPassword !== password) {
      console.log("Password and the Confirm Password does not match.");
      setIsError(true);
      return;
    }

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      const res = await publicRequest.post("/auth/signup", newUser);
      setIsSuccess(true);
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  return (
    <Container>
      <BackgroundImage src={bg} />
      <Content>
        <Wrapper>
          <TitleContainer>
            <Title>Create An Account</Title>
          </TitleContainer>
          <Form onSubmit={registerHandler}>
            <Input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              placeholder="First Name"
            />
            <Input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              placeholder="Last Name"
            />
            <Input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Email"
            />
            <Input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              placeholder="Username"
            />
            <Input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              placeholder="Password"
            />
            <Input
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              placeholder="Confirm Password"
            />
            <ButtonContainer>
              <Button type="submit">CREATE</Button>
              {isError && (
                <Error>
                  Something Went Wrong! Please try again with a different email
                  and username
                </Error>
              )}
              {isSuccess && (
                <Success>
                  Registration Successful! Please Login to start shopping
                </Success>
              )}
            </ButtonContainer>
            <ConnectContainer>
              <Link to={"/"}>
                <Connect>Go Back Home</Connect>
              </Link>
              <Link to={"/login"}>
                <Connect>Sign In</Connect>
              </Link>
            </ConnectContainer>
          </Form>
        </Wrapper>
      </Content>
      <CircleAnimation />
    </Container>
  );
}

export default Register;
