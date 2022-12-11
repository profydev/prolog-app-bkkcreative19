import React, { useState } from "react";
import styled, { css } from "styled-components";
import { color } from "@styles/theme";

export interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium";
  label: string;
  //   onChange: Function;
}

// const StyledCheckbox = styled.div<CheckboxProps>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px solid #d0d5dd;
//   padding: 5px 4px;
//   border-radius: 4px;
//   height: 16px;
//   width: 16px;
//   cursor: pointer;
// `;
const StyledCheckbox = styled.div<CheckboxProps>`
  display: flex;
  align-items: center;

  & div {
    margin-right: 8px;
  }

  &:focus-within & div {
    background: red !important;
  }
`;

const Label = styled.span`
  font-size: 3rem;
  font-weight: 500;
`;

type IconContainerProps = {
  status: string;
};

const IconnContainer = styled.div<IconContainerProps>`
  box-sizing: border-box;
  height: 16px;
  width: 16px;
  padding: 5px 4px;
  border: 2px solid #7f56d9;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 4px solid red;
    border: 2px solid #7f56d9 !important;
  }

  &:hover {
    background: #f9f5ff !important;
    border: 2px solid #7f56d9 !important;
  }
`;

const Iconn = styled.img``;

export function Checkbox({ children, size, label, ...props }: CheckboxProps) {
  const [status, setStatus] = useState("notChecked");

  return (
    <StyledCheckbox
      // onClick={() => {
      //   if (status === "notChecked") {
      //     setStatus("isChecked");
      //   } else if (status === "isChecked") {
      //     setStatus("partlyChecked");
      //   } else {
      //     setStatus("notChecked");
      //   }
      // }}
      size={size}
      label={label}
    >
      <IconnContainer
        style={{
          height: size === "small" ? "16px" : "20px",
          width: size === "small" ? "16px" : "20px",
          borderRadius: size === "small" ? "4px" : "6px",
          backgroundColor: status === "notChecked" ? "#ffffff" : "#F9F5FF",
          border:
            status === "notChecked" ? "2px solid #D0D5DD" : "2px solid #7f56d9",
        }}
        status={status}
      >
        <Iconn
          src={
            status === "notChecked"
              ? ""
              : status === "partlyChecked"
              ? "icons/minus.svg"
              : "icons/check.svg"
          }
        />
      </IconnContainer>

      {/* <Icon size={size === "small" ? "1rem" : "1.25rem"} /> */}
      <Label style={{ fontSize: size === "small" ? "0.875rem" : "1rem" }}>
        {label}
      </Label>
    </StyledCheckbox>
  );
}
