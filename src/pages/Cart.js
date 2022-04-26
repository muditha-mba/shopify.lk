import {
  Add,
  FavoriteBorderOutlined,
  Remove,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import product3 from "../imgs/products/product3.png";
import product10 from "../imgs/products/product10.png";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const TopButton = styled.button`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

  ${mobile({ display: (props) => props.type === "filled" && "none" })}
`;

const TopTexts = styled.span`
  display: flex;
  align-items: center;
`;

const TopTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border: ${(props) =>
    props.type === "cart" ? "1px solid teal" : "1px solid red"};
  padding: 5px;
  ${mobile({ margin: "20px 20px 0px 20px", fontSize: "13px" })}
`;

const TopText = styled.span`
  font-weight: 500;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.span`
  font-size: 24px;
  margin: 5px;
  border: 1px solid teal;
  padding: 5px 15px;
  border-radius: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #e1e1e1;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  text-transform: uppercase;
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
`;

function Cart() {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton>continue shopping</TopButton>
          <TopTexts>
            <TopTextContainer type="cart">
              <ShoppingCartOutlined style={{ color: "teal" }} />
              <TopText>Shopping Cart(2)</TopText>
            </TopTextContainer>
            <TopTextContainer type="heart">
              <FavoriteBorderOutlined style={{ color: "red" }} />
              <TopText>Your Wishlist(0)</TopText>
            </TopTextContainer>
          </TopTexts>
          <TopButton type="filled">checkout now</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src={product3} />
                <Details>
                  <ProductName>
                    <b>Product:</b> Nikki Shoes
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 39475934750
                  </ProductId>
                  <ProductColor color="pink" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>Rs. 6000</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src={product10} />
                <Details>
                  <ProductName>
                    <b>Product:</b> Mark Hoodie
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 54645934750
                  </ProductId>
                  <ProductColor color="darkGreen" />
                  <ProductSize>
                    <b>Size:</b> L
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>1</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>Rs. 4000</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. 10000</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 500</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. 100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. 10400</SummaryItemPrice>
            </SummaryItem>
            <Button>Checkout now</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
