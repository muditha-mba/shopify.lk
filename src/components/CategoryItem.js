import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  text-transform: uppercase;
  border: none;
  padding: 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

function CategoryItem({ item }) {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>shop now</Button>
      </Info>
    </Container>
  );
}

export default CategoryItem;
