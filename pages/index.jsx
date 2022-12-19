import styled from "styled-components";
import { Routes } from "@config/routes";
import Link from "next/link";
import Icon from "../public/icons/logo-large.svg";
import IssueIcon from "../public/images/mediamodifier_image_three.png";
import { useState } from "react";
import Image from "next/image";
// import { Button } from "../features/ui/button";

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

const HeroContainer = styled.section`
  background: #f9fafb;
  flex-grow: 1;
`;

const HeroStyles = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;
const HeroTitle = styled.h1`
  font-weight: 600;
  font-size: 60px;
  line-height: 72px;
  /* identical to box height, or 120% */
  margin: 0;
  margin-top: 5rem;
  text-align: center;
  letter-spacing: -0.02em;

  /* Gray/900 */

  color: #101828;
`;

const HeroText = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  /* or 150% */
  margin: 0;
  margin-top: 1.5rem;
  width: 70%;
  text-align: center;

  /* Gray/500 */

  color: #667085;
`;

const ImageContainer = styled.div``;

const Hero = ({ content }) => {
  return (
    <HeroStyles>
      <HeroTitle>{content.title}</HeroTitle>
      <HeroText>{content.description}</HeroText>
      <ImageContainer>
        <Image src={IssueIcon} />
      </ImageContainer>
    </HeroStyles>
  );
};

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
        <img src="/icons/mails.svg" />
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

{
  /* <Header>
        {/* eslint-disable-next-line @next/next/no-img-element */
}
//   <img src="/icons/logo-large.svg" alt="Prolog logo" />
//   <a href={Routes.projects}>Dashboard</a>
// </Header>
// <ContactButton
//   onClick={() =>
//     alert(
//       "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal"
//     )
//   }
// >
//   {/* eslint-disable-next-line @next/next/no-img-element */}
//   <img src="/icons/message.svg" alt="Contact" />
// </ContactButton> */}

const IssuesPage = ({ data }) => {
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

      <HeroContainer>
        <Hero content={data} />
      </HeroContainer>

      <Modal onClose={() => setShow(false)} show={show} />
    </div>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://prolog-api.profy.dev/content-page/home");
  const data = await res.json();

  console.log(data.meta);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data: data.meta,
    },
  };
}

export default IssuesPage;
