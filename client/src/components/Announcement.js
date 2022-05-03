import styled from "styled-components";
import { tab } from "../responsive";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  ${tab({ fontSize: "10px" })}
`;

function Announcement() {
  return (
    <Container>Super Deal! Free Shipping on Orders Over Rs.10000</Container>
  );
}

export default Announcement;
