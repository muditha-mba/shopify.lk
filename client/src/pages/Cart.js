import { Add, Remove, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, smallLap, tab } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Logo from "../imgs/Logo/logo.png";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import {
  increaseSingleProductQuantity,
  decreaseSingleProductQuantity,
  clearCart,
} from "../redux/cartRedux";
import emptyCart from "../imgs/empty/empty-cart.png";

const KEY =
  "pk_test_51KdFBxLfpNjR8V9MTJ5U5nlc48g5vvSF39OPmQFxZJNzWZgPpFGINksPRAzU1xAQZFhN0b1Z99vKxIWei23teLPy00XCmtr1UV";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${tab({ padding: "10px" })}
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
  ${tab({ flexDirection: "column" })}
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

const TopTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border: ${(props) =>
    props.type === "cart" ? "1px solid teal" : "1px solid red"};
  padding: 5px;
  ${tab({ margin: "20px 20px 0px 20px", fontSize: "13px" })}
`;

const TopText = styled.span`
  font-weight: 500;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${smallLap({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${tab({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  ${tab({ flexDirection: "column" })}
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

const ProductColorContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-top: 7px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: ${(props) => props.color};
`;

const ProductInfo = styled.span`
  margin-top: 7px;
`;

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
  ${tab({ marginBottom: "20px" })}
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
const ImageContainer = styled.div``;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const EmptyCartContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyCartImg = styled.img`
  height: 50vh;
  ${mobile({ height: "200px", width: "200px" })}
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const shippingCost = cart.total > 0 ? 500 : 0;
  const shippingDiscount = cart.total > 0 ? 100 : 0;
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          source: stripeToken.id,
          amount: cart.total * 100,
        });
        //reference props.location.state.data
        dispatch(clearCart());

        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate, cart, dispatch]);

  /* const handleIncreaseProductQuantity = () => {}; */

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton
            onClick={() => {
              navigate("/search");
            }}
          >
            continue shopping
          </TopButton>

          <TopTextContainer type="cart">
            <ShoppingCartOutlined style={{ color: "teal" }} />
            <TopText>Shopping Cart({cart.quantity})</TopText>
          </TopTextContainer>
        </Top>
        <Bottom>
          {cart.quantity > 0 ? (
            <Info>
              {cart.products.map((product, i) => (
                <Container key={product._id}>
                  <Product>
                    <ProductDetail>
                      <ImageContainer>
                        <Image src={product.img} />
                      </ImageContainer>
                      <Details>
                        <ProductInfo>
                          <b>Product:</b> {product.title}
                        </ProductInfo>
                        <ProductInfo>
                          <b>ID:</b> {product._id}
                        </ProductInfo>
                        <ProductColorContainer>
                          <b>Color:</b>
                          <ProductColor color={product.color} />
                        </ProductColorContainer>
                        <ProductInfo>
                          <b>Size:</b> {product.size}
                        </ProductInfo>
                        <ProductInfo>
                          <b>Price: Rs.</b> {product.price}
                        </ProductInfo>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Remove
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(
                              decreaseSingleProductQuantity({ index: i })
                            );
                          }}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Add
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(
                              increaseSingleProductQuantity({
                                index: i,
                                price: product.price,
                                total: cart.total * 1 + product.price * 1,
                              })
                            );
                          }}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        Rs. {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </Container>
              ))}
            </Info>
          ) : (
            <EmptyCartContainer>
              <EmptyCartImg src={emptyCart} />
            </EmptyCartContainer>
          )}
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. {shippingCost}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. {shippingDiscount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                Rs. {cart.total + shippingCost - shippingDiscount}
              </SummaryItemPrice>
            </SummaryItem>
            <ButtonContainer>
              <StripeCheckout
                name="Shopify.LK"
                image={Logo}
                billingAddress
                shippingAddress
                description={`Your total is Rs. ${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
                currency="LKR"
              ></StripeCheckout>
            </ButtonContainer>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
