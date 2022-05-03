import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { tab } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  ${tab({ fontSize: "50px" })}
`;

const Desc = styled.p`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  ${tab({ textAlign: "center", fontSize: "20px" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${tab({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: #fff;
`;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get updates about your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
