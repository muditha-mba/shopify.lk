import { CardGiftcard, Home, Person } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import profilepic from "../imgs/Logo/profile-pic.png";
import { setFirstLetterCapital } from "../utils";
import { smallLap } from "../responsive";

const Container = styled.div`
  margin: 0;
`;

/* @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }
    .sidebar a {float: left;}
    div.content {margin-left: 0;}
  }
  
  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
  } */

const Sidebar = styled.div`
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100vh;
  overflow: auto;

  ${smallLap({
    height: "auto",
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap",
  })}
`;

const Links = styled.div`
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover:not(.active) {
    background-color: #555;
    color: white;

    p {
      color: #fff;
    }
  }
`;

const LinksContent = styled.div`
  display: flexbox;
  margin-left: 20px;
  align-items: center;
  justify-content: flex-start;
`;

const Text = styled.p`
  color: #2b2b2b;
  font-size: 15px;
  margin-left: 10px;
  font-weight: 500;
`;
const ProfileImgContainer = styled.div`
  ${smallLap({ marginLeft: "30px" })}
`;

const ProfilePicContainer = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  background-color: orange;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 2px solid teal;
`;

const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const SidebarNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SidebarName = styled.p`
  font-size: 15;
  font-weight: 600;
  color: #2b2b2b;
`;
const Content = styled.div`
  margin-left: 200px;
  padding: 1px 16px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${smallLap({ margin: "0px 10px", padding: "0px" })}
`;

const ProfileInfoContainer = styled.div`
  width: 70%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  ${smallLap({ width: "90%" })}
`;

const ProfileInfoTitle = styled.h1`
  font-size: 35px;
  color: teal;
  font-weight: 500;
  margin-bottom: 10px;
`;

const ProfileInfoContent = styled.form``;

const ProfileInputContainer = styled.div`
  display: flex;
  margin-left: 10px;
  margin-top: 20px;
  width: 60%;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
  ${smallLap({ width: "100%" })}
`;

const ProfileInfoContentTitle = styled.p`
  margin-right: 10px;
`;

const ProfileInfoContentInput = styled.input`
  width: 70%;
  height: 30px;
`;

const ProfileInfoUpdateBtn = styled.button`
  margin-left: 10px;
  margin-top: 20px;
  padding: 10px 20px;
  font-weight: 600;
  color: #ffffff;
  font-size: 15px;
  border: 2px #2b2b2b solid;
  background-color: teal;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border: 2px #2b2b2b solid;
    background-color: #ffffff;
    color: #2b2b2b;
  }
`;

const Hr = styled.hr`
  background-color: #e1e1e1;
  border: none;
  height: 1px;
`;

function Profile() {
  let user = useSelector((state) => state.user.currentUser);
  console.log(user.data.user);
  const userName = user.data.user.username;
  const email = user.data.user.email;
  const firstName = setFirstLetterCapital(userName.split(".")[0]);
  const lastName = setFirstLetterCapital(userName.split(".")[1]);
  const fullName = firstName.concat(" ", lastName);
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Sidebar>
          <ProfileImgContainer>
            <ProfilePicContainer>
              <ProfileImg src={profilepic} />
            </ProfilePicContainer>
            <SidebarNameContainer>
              <SidebarName>{fullName}</SidebarName>
            </SidebarNameContainer>
          </ProfileImgContainer>
          <Links>
            <LinksContent>
              <Person />
              <Text>Profile</Text>
            </LinksContent>
          </Links>
          <Links>
            <LinksContent>
              <CardGiftcard />
              <Text>My Orders</Text>
            </LinksContent>
          </Links>
          <Links
            onClick={() => {
              navigate("/");
            }}
          >
            <LinksContent>
              <Home />
              <Text>Home</Text>
            </LinksContent>
          </Links>
        </Sidebar>
        <Content>
          <ProfileInfoContainer>
            <ProfileInfoTitle>Profile Info</ProfileInfoTitle>
            <Hr />
            <ProfileInfoContent>
              <ProfileInputContainer>
                <ProfileInfoContentTitle>First Name:</ProfileInfoContentTitle>
                <ProfileInfoContentInput
                  required
                  type={"text"}
                  defaultValue={firstName}
                />
              </ProfileInputContainer>
              <ProfileInputContainer>
                <ProfileInfoContentTitle>Last Name:</ProfileInfoContentTitle>
                <ProfileInfoContentInput
                  required
                  type={"text"}
                  defaultValue={lastName}
                />
              </ProfileInputContainer>
              <ProfileInputContainer>
                <ProfileInfoContentTitle>Email:</ProfileInfoContentTitle>
                <ProfileInfoContentInput
                  required
                  type={"email"}
                  defaultValue={email}
                />
              </ProfileInputContainer>
              <ProfileInputContainer>
                <ProfileInfoContentTitle>Usename:</ProfileInfoContentTitle>
                <ProfileInfoContentInput
                  required
                  type={"text"}
                  defaultValue={userName}
                />
              </ProfileInputContainer>
              <ProfileInfoUpdateBtn
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Update
              </ProfileInfoUpdateBtn>
            </ProfileInfoContent>
          </ProfileInfoContainer>

          <ProfileInfoContainer>
            <ProfileInfoTitle>Change My Password</ProfileInfoTitle>
            <Hr />
            <ProfileInfoContent>
              <ProfileInputContainer>
                <ProfileInfoContentTitle>Password:</ProfileInfoContentTitle>
                <ProfileInfoContentInput
                  required
                  type={"password"}
                  defaultValue={"pass1234"}
                />
              </ProfileInputContainer>
              <ProfileInputContainer>
                <ProfileInfoContentTitle>
                  Confirm Password:
                </ProfileInfoContentTitle>
                <ProfileInfoContentInput
                  required
                  type={"password"}
                  defaultValue={"pass1234"}
                />
              </ProfileInputContainer>
              <ProfileInfoUpdateBtn
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Change Password
              </ProfileInfoUpdateBtn>
            </ProfileInfoContent>
          </ProfileInfoContainer>
        </Content>
      </Container>
    </>
  );
}

export default Profile;
