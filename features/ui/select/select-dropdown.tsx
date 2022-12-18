import React from "react";
import styled from "styled-components";

interface SelectDropdownProps extends React.ComponentPropsWithoutRef<"div"> {
  visible: boolean;
  className?: string;
}

const StyledDropdown = styled.div<SelectDropdownProps>`
  position: absolute;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-collapse: separate;
  width: 100%;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  top: 52px;
  left: 0;
  z-index: 1100;
  transition: opacity 0.2s, transform 0.2s, bottom 0.2s ease,
    -webkit-transform 0.2s;
`;

export function SelectDropdown({
  visible,
  className,
  children,
}: SelectDropdownProps) {
  return (
    <StyledDropdown visible={visible} className={className}>
      {children}
    </StyledDropdown>
  );
}
