import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import styled, { css } from "styled-components";
import { SelectContext, hi } from "./select-context";
import { color } from "@styles/theme";
import { useDetectClickOutside } from "react-detect-click-outside";
import { pickChildByProps } from "../../../utils";
import { StyledOption } from "./select-option";
import { SelectDropdown } from "./select-dropdown";
import { IoCloseOutline } from "react-icons/io5";

export interface SelectProps extends React.ComponentPropsWithoutRef<"div"> {
  value?: string;
  disabled?: boolean;
  handleSelect(name: string): any;
  icon?: string;
  className?: string;
  placeholder?: string;
  options?: string[];
}

const StyledSelect = styled.div<SelectProps>`
  position: relative;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  min-width: 180px;
  width: 100%;
  transition: border 0.2s ease 0s, color 0.2s ease-out 0s,
    box-shadow 0.2s ease 0s;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  height: 44px;
  padding: 10px 14px;
  background-color: ${(props) => (props.disabled ? "#f0eef1" : "#fff")};
  &:hover {
    border-color: ${(props) => (props.disabled ? "#888888" : "#d6bbfb")};
  }

  &:focus {
    border-color: #d6bbfb;
    outline: 4px solid #f9f5ff;
  }
`;

type StyledValueProps = {
  isPlaceholder: boolean;
};

type StyledIconProps = {
  size?: string;
  visible: boolean;
};

export const StyledCloseIcon = styled.img``;

export const StyledIcon = styled.div<StyledIconProps>`
  // position: absolute;
  // right: 14px;
  font-size: ${(props) => props.size};
  // top: 50%;
  // bottom: 0;

    rotate(${(props) => (props.visible ? "180" : "0")}deg);
  pointer-events: none;
  transition: transform 200ms ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: .5rem;
  color: #999999;
`;

const StyledValue = styled.div<StyledValueProps>`
  display: inline-flex;
  flex: 1;
  height: 100%;
  align-items: center;
  line-height: 1;
  padding: 0;
  margin-right: 1.25rem;
  font-size: 1rem;
  color: "#888888";
  width: calc(100% - 1.25rem);
  ${StyledOption} {
    border-radius: 0;
    background-color: transparent;
    padding: 0;
    margin: 0;
    color: inherit;
    &:hover {
      border-radius: inherit;
      background-color: inherit;
      padding: inherit;
      margin: inherit;
      color: inherit;
    }
  }
  ${({ isPlaceholder }) =>
    isPlaceholder &&
    css`
      color: #bcbabb;
    `}
`;

type yay = {
  preventAllEvents: boolean;
};

export function Select({
  children,
  value: customValue,
  disabled = false,
  handleSelect,
  icon: Icon = "/icons/down.svg",
  className,
  placeholder = "Choose one",
}: SelectProps) {
  // const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (customValue === undefined) return;
    setValue(customValue);
  }, [customValue]);

  const updateVisible = useCallback((next) => {
    setVisible(next);
  }, []);

  const updateValue = useCallback(
    (next) => {
      setValue(next);
      if (typeof handleSelect === "function") {
        handleSelect(next);
      }
      setVisible(false);
    },
    [handleSelect]
  );

  const clickHandler = (event: any) => {
    event.preventDefault();
    if (disabled) return;
    setVisible(!visible);
  };

  const initialValue: hi = useMemo(
    () => ({
      value,
      visible,
      updateValue,
      updateVisible,
      disableAll: disabled,
    }),
    [visible, updateVisible, updateValue, disabled, value]
  );

  const selectedChild = useMemo(() => {
    const [, optionChildren] = pickChildByProps(children, "value", value);
    return React.Children.map(optionChildren, (child) => {
      if (!React.isValidElement(child)) return null;
      const el = React.cloneElement<yay>(child as React.ReactElement<any>, {
        preventAllEvents: true,
      });
      return el;
    });
  }, [value, children]);
  // const newOptions = ["All", ...options];
  // const ty = useRef<HTMLInputElement>(null);

  const closeDropdown = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  return (
    <SelectContext.Provider value={initialValue}>
      <StyledSelect
        ref={ref}
        disabled={disabled}
        className={className}
        onClick={clickHandler}
        tabIndex={1}
        handleSelect={handleSelect}
      >
        <StyledValue isPlaceholder={!value}>
          {!value ? placeholder : selectedChild}
        </StyledValue>
        {value && (
          <IoCloseOutline
            onClick={() => {
              handleSelect("");
              setValue("");
            }}
          />
        )}
        |
        <StyledIcon visible={visible}>
          <img src={Icon} />
        </StyledIcon>
        <SelectDropdown visible={visible}>{children}</SelectDropdown>
      </StyledSelect>
    </SelectContext.Provider>
  );
}
