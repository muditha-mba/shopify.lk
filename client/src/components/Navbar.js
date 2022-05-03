import { ExitToApp, Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import logo from "../imgs/Logo/logo.png";
import { mobile, tab } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  background-color: #393939;
  height: 60px;
  ${tab({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${tab({ padding: "10px 0px" })}
`;

const Left = styled.div`
  /* padding-top: 10px; */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
  /* ${tab({ display: "none" })} */
`;

const Logo = styled.img`
  height: 60px;
  cursor: pointer;
  ${tab({ height: "35px" })}
`;

const Right = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* padding-top: 10px; */
  ${tab({ justifyContent: "flex-end", marginRight: "14px", flex: 2 })}
`;

const MenuItem = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 25px;
  ${tab({ fontSize: "12px", marginLeft: "10px" })}
`;

function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={"/"}>
            <Logo src={logo} />
          </Link>
        </Left>
        <Right>
          <Link to={"/search"}>
            <MenuItem title="Search">
              <Search />
            </MenuItem>
          </Link>
          {user ? (
            <>
              <MenuItem>My Profile</MenuItem>
              <Link to={"/cart"}>
                <MenuItem title="My Cart">
                  <Badge
                    overlap="rectangular"
                    badgeContent={quantity}
                    color="primary"
                  >
                    <ShoppingCartOutlined
                      color="action"
                      style={{ color: "#fff" }}
                    />
                  </Badge>
                </MenuItem>
              </Link>
              <MenuItem title="Logout">
                <ExitToApp
                  onClick={() => {
                    dispatch(logout());
                    navigator("/");
                  }}
                />
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  navigator("/register");
                }}
              >
                Register
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigator("/login");
                }}
              >
                Sign In
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
