import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

import { color } from "@styles/theme";

export interface SelectProps extends React.ComponentPropsWithoutRef<"div"> {
  options: Array<string>;
  icon?: string;
  label?: string;
  hint?: string;
  error?: string;
  hasError?: boolean;
  disabled?: boolean;
}

const regular = (p: DropDownContainerProps) => {
  return css`
    border: 1px solid ${p.isOpen ? color("primary", 300) : color("gray", 300)};
    outline: ${p.isOpen && " 4px solid #F9F5FF"};

    &:focus {
      outline: 4px solid #f9f5ff;
      border: 1px solid ${color("primary", 300)};
    }
  `;
};
const error = (p: DropDownContainerProps) => {
  return css`
    border: 1px solid ${color("error", 300)};
    outline: ${p.isOpen && "none"} !important;

    &:focus {
      outline: 4px solid #fef3f2;
    }
  `;
};

const SelectContainer = styled.div`
  width: 320px;

  & div input:disabled & div {
    background: #d0d5dd;
  }
`;

type DropDownContainerProps = {
  isOpen: boolean;
  isError?: boolean;
};

const test = (p: DropDownContainerProps) => {
  if (!p.isError) {
    return regular(p);
  } else {
    return error(p);
  }
};

const DropDownContainer = styled("div")<DropDownContainerProps>`
  display: flex;
  align-items: center;
  ${test}
  width: 100%;
  height: 44px;
  margin: 6px auto;
  padding: 10px 14px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  & input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

const Label = styled.span`
  font-size: 1rem;
  font-weight: 500;

  &:focus-within {
    color: red;
  }
`;

const SelectInput = styled.input`
  border: none;

  &:focus {
    border: none;
    outline: none;
  }
`;

const Icon = styled.img`
  margin-right: 11.33px;
  display: block;
`;

const DownArrow = styled.img`
  cursor: pointer;
  margin-left: auto;
`;

const DropDownListContainer = styled("div")`
  width: 320px;
  position: absolute;
  top: 3rem;
  left: 0;
`;

const DropDownList = styled("ul")`
  padding: 14px;
  margin: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
`;

const ListItem = styled("li")`
  list-style: none;
  cursor: pointer;
`;

const Yay = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #344054;
`;
const Hint = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #667085;
`;

const Error = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #f04438;
`;

export function Select({
  children,
  options,
  icon,
  label,
  hint,
  error,
  hasError,
  disabled,
}: SelectProps) {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const ty = useRef<HTMLInputElement>(null);

  return (
    <SelectContainer>
      <Yay>{label}</Yay>
      <DropDownContainer
        ref={ty}
        tabIndex={1}
        isOpen={isOpen}
        isError={hasError}
      >
        <SelectInput disabled={disabled} type={"text"} />
        {icon && <Icon src={icon} />}

        <Label style={{ color: !selected ? "#667085" : "#101828" }}>
          {!selected ? "Select team member" : selected}
        </Label>
        <DownArrow onClick={() => setIsOpen(!isOpen)} src="/icons/down.svg" />

        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => {
                return (
                  <ListItem
                    onClick={() => {
                      setIsOpen(false);
                      setSelected(option);

                      if (ty.current != null) {
                        ty.current.blur();
                      }
                    }}
                    key={option}
                  >
                    {option}
                  </ListItem>
                );
              })}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      {error ? <Error>{error}</Error> : <Hint>{hint}</Hint>}
    </SelectContainer>
  );
}
