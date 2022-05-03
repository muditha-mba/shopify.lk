import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import orderImg from "../imgs/order/order.png";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.h2`
  color: #242424;
  font-size: 21px;
  font-weight: 800;
`;

const Button = styled.button`
  padding: 15px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.4s ease;
  text-transform: uppercase;
  margin-top: 20px;
  border: 2px solid #000;
  background-color: teal;
  color: #fff;

  &:hover {
    color: #000;
    border: 2px solid teal;
    background-color: #fff;
  }
`;

const ImageContainer = styled.div`
  height: 300px;
  width: 300px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

function Success() {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  //reference props.location.state.data
  console.log(location.state.data);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <Container>
      {orderId ? (
        <Message>
          Order has been created successfully. Your order number is ${orderId}
        </Message>
      ) : (
        <Message>Successfull. Your order is being prepared...</Message>
      )}
      <ImageContainer>
        <Image src={orderImg} />
      </ImageContainer>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back Home
      </Button>
    </Container>
  );
}

export default Success;
