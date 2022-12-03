/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled, { css } from "styled-components";
import { breakpoint, color, space, zIndex } from "@styles/theme";

const containerStyles = css`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${color("gray", 50)};
  padding: ${space(5, 8)};
  box-sizing: border-box;

  & span {
    flex: 1 1 0px;
    color: ${color("gray", 400)};
  }

  & ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 24px;
    flex: 1 1 0px;

    & li {
      color: ${color("gray", 500)};
    }
  }

  & div {
    flex: 1 1 0px;
    display: flex;

    & img {
      margin-left: auto;
    }
  }
`;

const Container = styled.div`
  ${containerStyles}
`;

export function Footer() {
  return (
    <Container>
      <span>Version: 14.5.1</span>
      <ul>
        <li>Docs</li>
        <li>API</li>
        <li>Help</li>
        <li>Community</li>
      </ul>
      <div>
        <img src="/icons/logo-small.svg" alt="footer logo" />
      </div>
    </Container>
  );
}
