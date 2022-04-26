import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Products() {
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id}></Product>
      ))}
    </Container>
  );
}

export default Products;