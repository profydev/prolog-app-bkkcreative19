import React, { useMemo, useContext } from "react";

import styled, { css } from "styled-components";
import { SelectContext } from "./select-context";

interface SelectOptionProps extends React.ComponentPropsWithoutRef<"div"> {
  disabled?: boolean;
  className?: string;
  value: string;
}
interface StyleSelectOptionProps extends React.ComponentPropsWithoutRef<"div"> {
  bgColor: string;
  hoverBgColor: string;
  isDisabled: boolean;
  disabled: boolean;
}

export const StyledOption = styled.div<StyleSelectOptionProps>`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  font-weight: normal;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 14px;
  background-color: ${(props) => props.bgColor};
  color: #101828;
  user-select: none;
  border: 0;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
  &:hover {
    background-color: #fcfaff;
  }
`;

export function SelectOption({
  children,
  value: identValue,
  className = "",
  disabled = false,
}: SelectOptionProps) {
  const selectContext = useContext(SelectContext);
  // const { updateValue, value, disableAll } = useSelectContext();

  const isDisabled = useMemo(
    () => disabled || selectContext?.disableAll,
    [disabled, selectContext?.disableAll]
  );

  const selected = useMemo(() => {
    if (!selectContext?.value) return false;
    if (typeof selectContext?.value === "string") {
      return identValue === selectContext.value;
    }
  }, [identValue, selectContext?.value]);

  const bgColor = useMemo(() => {
    if (isDisabled) return "#f0eef1";
    return selected ? "#3378F7" : "#fff";
  }, [selected, isDisabled]);

  const hoverBgColor = useMemo(() => {
    if (isDisabled || selected) return bgColor;
    return "#f0eef1";
  }, [selected, isDisabled, bgColor]);

  const color = useMemo(() => {
    if (isDisabled) return "#888888";
    return selected ? "#fff" : "#888888";
  }, [selected, isDisabled]);

  const handleClick = (event: any) => {
    event.preventDefault();
    if (identValue !== selectContext?.value) {
      selectContext?.updateValue(identValue);
    }
  };

  return (
    <StyledOption
      className={className}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
      color={color}
      isDisabled={disabled}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </StyledOption>
  );
}
