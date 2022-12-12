import React from "react";

import styled, { css } from "styled-components";

import { color } from "@styles/theme";

type error = {
  isError: boolean;
  message: string;
};

export interface InputProps extends React.ComponentPropsWithoutRef<"div"> {
  hint?: string;
  label?: string;
  //   icon?: "leading" | "trailing";
  disabled?: boolean;
  error?: error;
}

const regular = (p: InputProps) => {
  return css`
    border: 1px solid #d0d5dd;

    &:focus {
      outline: 4px solid #f9f5ff;
      border: 1px solid ${color("primary", 300)};
    }
  `;
};
const error = (p: InputProps) => {
  return css`
    border: 1px solid #fda29b;

    &:focus {
      outline: 4px solid #fef3f2;
      border: 1px solid ${color("error", 300)};
    }
  `;
};

const test = (p: InputProps) => {
  if (p.error?.isError) {
    return error(p);
  } else {
    return regular(p);
  }
};

const InputContainer = styled.div<InputProps>`
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  width: 320px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  background: ${(props) => props.disabled && "#F9FAFB"};

  ${test}
`;

const InputStyles = styled.input`
  border: none;
  color: #101828;
  background: transparent;

  &:placeholder {
    color: #667085;
  }

  &:focus {
    border: none;
    outline: none;
  }
  &:active {
    border: none;
    outline: none;
  }
`;

const Icon = styled.img`
  margin-right: 9.67px;
`;

const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #344054;
  margin-bottom: 6px;
`;

const Hint = styled.p`
  font-weight: 400;
  font-size: 14px;
  margin-top: 6px;
  color: #667085;
`;

const ErrorIcon = styled.img`
  margin-left: auto;
`;

const ErrorMessage = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;

  color: #f04438;
`;

export function Input({ children, hint, label, disabled, error }: InputProps) {
  return (
    <>
      <Label>{label}</Label>
      <InputContainer error={error} disabled={disabled} tabIndex={1}>
        <Icon src="/icons/mail.svg" />
        <InputStyles disabled={disabled} placeholder="olivia@untitledui.com" />
        {error?.isError && <ErrorIcon src="/icons/error.svg" />}
      </InputContainer>
      {error?.isError ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : (
        <Hint>{hint}</Hint>
      )}
    </>
  );
}