import { SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import searchImg from "../imgs/empty/search-img.png";
import noResultsImg from "../imgs/empty/no-results.png";
import Navbar from "../components/Navbar";
import { publicRequest } from "../requestMethods";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { tab } from "../responsive";

const Container = styled.div`
  margin-bottom: 30px;
`;

const SearchContainer = styled.div`
  height: 15vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ResultContainer = styled.div`
  width: 100%;
  min-height: calc(84vh-60px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.form`
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
  cursor: pointer;
`;
const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "80%" })}
`;
const Image = styled.img`
  width: 70%;
`;

const Hr = styled.hr`
  border: none;
  background-color: #e1e1e1;
  height: 1px;
`;

const SearchResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: 20px 0px;
`;

function Search() {
  const [initialSearch, setInitialSearch] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  console.log(inputValue);

  const fetchResults = async () => {
    try {
      const res = await publicRequest.get(`/products?category=${inputValue}`);
      setData(res.data.data.products);
      console.log(data);
      setInitialSearch(false);
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();
    fetchResults();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container>
        <Navbar />
        <SearchContainer>
          <InputContainer>
            <Input
              onChange={(e) => {
                setInputValue(e.target.value.toLowerCase());
              }}
              placeholder="Search..."
            />
            <Button type="submit" onClick={clickHandler}>
              <SearchOutlined />
            </Button>
          </InputContainer>
        </SearchContainer>
        <Hr />
        <ResultContainer>
          {data.length === 0 && !initialSearch && (
            <ImageContainer>
              <Image src={noResultsImg} />
            </ImageContainer>
          )}
          {initialSearch && (
            <ImageContainer>
              <Image src={searchImg} />
            </ImageContainer>
          )}
          {!initialSearch && data.length > 0 && (
            <SearchResults>
              {data.map((item) => (
                <Product key={item._id} item={item} />
              ))}
            </SearchResults>
          )}
        </ResultContainer>
      </Container>
      <Footer />
    </>
  );
}

export default Search;
