import styled from "styled-components";
import { Routes } from "@config/routes";
import Link from "next/link";
import { useState } from "react";
import ReactDOM from "react-dom";
import Icon from "../public/icons/mail.svg";
import Image from "next/image";

const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const ContactButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1rem;
  background: #7f56d9;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: none;
  cursor: pointer;

  &:hover {
    background: #6941c6;
  }
`;

const DashboardButton = styled.button`
  background: #7f56d9;
  padding: 0.6em 1.2em;
  border: 1px solid #7f56d9;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  cursor: pointer;

  /* White */

  color: #ffffff;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 2.5em;
`;
const NavListItem = styled.a`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #667085;
`;

const ModalStyles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(52, 64, 84, 0.6);
  /* Background blur/md */

  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  text-align: center;
  width: 400px;
  background-color: #fff;
  padding: 1.5em;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  border-radius: 12px;
`;
const Content = styled.div``;
const ContentHeading = styled.h2`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;

  color: #101828;
`;
const ContentText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #667085;
`;
const Buttons = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  margin-top: 2em;
`;
const Button = styled.button`
  color: ${(props) => props.color};
  background: ${(props) => props.bgColor};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  border: 1px solid ${(props) => props.borderColor};
  padding: 0.8em;
  width: 50%;
  cursor: pointer;
`;

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <ModalStyles id="myportal" onClick={props.onClose}>
      <ModalContent
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={Icon} />
        <Content>
          <ContentHeading>Contact Us Via Email</ContentHeading>
          <ContentText>
            Any questions? Send us an email at prolog@profy.dev. We usually
            answer within 24 hours.
          </ContentText>
        </Content>
        <Buttons>
          <Button
            borderColor="#D0D5DD"
            bgColor="#FFFFFF"
            color="#344054"
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Link href="/dashboard/users">
            <Button bgColor="#7F56D9" color="#FFFFFF">
              Open Email App
            </Button>
          </Link>
        </Buttons>
      </ModalContent>
    </ModalStyles>
  );
};

const IssuesPage = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <NavList>
          <Link href={`/`}>
            <NavListItem>Home</NavListItem>
          </Link>
          <Link href={`/products`}>
            <NavListItem>Products</NavListItem>
          </Link>
          <Link href={`/documentation`}>
            <NavListItem>Documentation</NavListItem>
          </Link>
          <Link href={`/pricing`}>
            <NavListItem>Pricing</NavListItem>
          </Link>
        </NavList>
        <Link href={Routes.projects}>
          <DashboardButton>Open Dashboard</DashboardButton>
        </Link>
      </Header>
      <ContactButton onClick={() => setShow(true)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
      <Modal onClose={() => setShow(false)} show={show} />
    </div>
  );
};

export default IssuesPage;
