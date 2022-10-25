import styled from "styled-components";
import { Routes } from "@config/routes";
import Link from "next/link";

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

const IssuesPage = () => {
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
      <ContactButton
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal"
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </div>
  );
};

export default IssuesPage;
