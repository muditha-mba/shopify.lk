import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { smallLap } from "../responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  background-color: #d9afd9;
  background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
  min-height: calc(100vh - 180px);
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${smallLap({
    padding: "5px",
    flexDirection: "column",
    minHeight: "90vh",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50%;
  height: 50vh;
  object-fit: cover;
  ${smallLap({ height: "40vh", width: "100%" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 0px 0px 0px 10px;
  ${smallLap({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  ${smallLap({ fontSize: "25px" })}
`;

const Desc = styled.p`
  font-weight: 400;
  font-size: 18px;
  margin: 20px 0px;
  ${smallLap({ fontSize: "15px" })}
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 40px;
  ${smallLap({ fontSize: "25px" })}
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${smallLap({ width: "100%", margin: "15px 0px" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
  ${smallLap({ margin: "5px 0px" })}
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 5px;
  /* border: 1px solid gray; */
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  ${smallLap({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin: 5px 5px 20px 5px;
`;

const Amount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;

  cursor: pointer;
  font-weight: 800;
  transition: all 0.4s ease;
  text-transform: uppercase;
  margin-bottom: 20px;
  border: 2px solid #000;
  background-color: teal;
  color: #fff;

  &:hover {
    border: 2px solid teal;
    background-color: #fff;
    color: #000;
  }
`;

const Error = styled.span`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

function Product() {
  const id = useParams().id;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleQuantity = (type) => {
    if (type === "inc") {
      quantity < 20 && setQuantity((prev) => prev + 1);
    } else {
      quantity > 1 && setQuantity((prev) => prev - 1);
    }
  };
  const [isError, setIsError] = useState(false);
  if (isError) {
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  }

  //scroll to top each time this component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleCartClick = () => {
    if (!user) {
      return setIsError(true);
    }
    if (!color || !size) {
      return alert("Please Select a Color and Size");
    }
    window.scrollTo(0, 0);
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>Rs. {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color : </FilterTitle>
                {product.color?.map((c) => (
                  <FilterColor
                    style={
                      color === c
                        ? { border: "3px solid #4c4c4c" }
                        : { border: "1px solid gray" }
                    }
                    key={c}
                    color={c}
                    onClick={() => setColor(c)}
                  />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size : </FilterTitle>
                <FilterSize
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <FilterSizeOption value="DEFAULT" disabled>
                    Select Size
                  </FilterSizeOption>
                  {product.size?.map((size) => (
                    <FilterSizeOption key={size}>
                      {" "}
                      {size.toUpperCase()}
                    </FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  onClick={() => handleQuantity("dec")}
                  style={{ cursor: "pointer" }}
                />
                <Amount>{quantity}</Amount>
                <Add
                  onClick={() => handleQuantity("inc")}
                  style={{ cursor: "pointer" }}
                />
              </AmountContainer>
              <Button onClick={handleCartClick}>Add to cart</Button>
            </AddContainer>
            {isError && <Error>Please Login to Start Shopping!</Error>}
          </InfoContainer>
        </Wrapper>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Product;
