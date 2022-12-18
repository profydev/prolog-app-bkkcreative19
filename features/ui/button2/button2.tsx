import styled, { css } from "styled-components";

import { color } from "@styles/theme";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "secondary" | "primary" | "gray" | "empty" | "empty-gray" | "error";
  size?: "small" | "medium" | "large" | "xlarge";
  icon?: string;
  iconPosition?: "leading" | "trailing";
  disabled?: boolean;
}

const primaryStyles = () => {
  return css`
    color: #ffffff;
    background-color: ${color("primary", 600)};

    &:hover {
      background-color: ${color("primary", 700)};
    }

    &:focus {
      border: 4px solid ${color("primary", 100)};
    }

    &:disabled {
      background-color: ${color("primary", 200)};
    }
  `;
};

const secondaryStyles = () => {
  return css`
    color: ${color("primary", 700)};
    background-color: ${color("primary", 50)};

    &:hover {
      background-color: ${color("primary", 100)};
    }

    &:focus {
      border: 4px solid ${color("primary", 200)};
    }

    &:disabled {
      color: ${color("primary", 300)};
      background-color: ${color("primary", 25)};
    }
  `;
};

const grayStyles = () => {
  return css`
    color: ${color("gray", 700)};
    background-color: #ffffff;
    border: 1px solid ${color("gray", 300)};

    &:hover {
      background-color: ${color("gray", 50)};
      color: ${color("gray", 800)};
    }

    &:focus {
      border: 4px solid ${color("gray", 100)};
    }

    &:disabled {
      color: ${color("gray", 300)};
      background-color: #ffffff;
      border-color: ${color("gray", 200)};
    }
  `;
};
const emptyStyles = () => {
  return css`
    color: ${color("gray", 700)};
    background-color: #ffffff;

    &:hover {
      background-color: ${color("gray", 50)};
      color: ${color("gray", 800)};
    }

    &:disabled {
      color: ${color("gray", 300)};
    }
  `;
};
const emptyGrayStyles = () => {
  return css`
    color: ${color("gray", 500)};
    background-color: transparent;

    &:hover {
      background-color: ${color("gray", 50)};
      color: ${color("gray", 600)};
    }

    &:disabled {
      color: ${color("gray", 300)};
    }
  `;
};
const errorStyles = () => {
  return css`
    color: #ffffff;
    background-color: ${color("error", 600)};

    &:hover {
      background-color: ${color("error", 700)};
    }

    &:focus {
      border: 4px solid ${color("error", 100)};
    }

    &:disabled {
      background-color: ${color("error", 200)};
    }
  `;
};

const colorStyles = (p: ButtonProps) => {
  if (p.variant === "primary") {
    return primaryStyles;
  } else if (p.variant === "secondary") {
    return secondaryStyles;
  } else if (p.variant === "gray") {
    return grayStyles;
  } else if (p.variant === "empty") {
    return emptyStyles;
  } else if (p.variant === "empty-gray") {
    return emptyGrayStyles;
  } else if (p.variant === "error") {
    return errorStyles;
  }
};

const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  font-weight: 400;
  width: 247px;
  align-items: center;
  gap: 9.67px;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;

  @media (max-width: 750px) {
    width: 100%;
    order: 3;
  }

  ${colorStyles}

  & img {
    order: ${(p) => (p.iconPosition === "leading" ? "" : "1")};
    fill: none;
    stroke-width: 1.67px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    vertical-align: bottom;
  }

  padding: ${(p) => {
    if (p.size === "large") {
      return "0.625rem 1.125rem";
    } else if (p.size === "small") {
      return "0.5rem 0.875rem";
    } else if (p.size === "xlarge") {
      return "0.75rem 1.25rem";
    }

    return "0.625rem 1rem";
  }};
  font-size: ${(p) => {
    if (p.size === "large") {
      return "1rem";
    } else if (p.size === "small") {
      return "0.875rem";
    } else if (p.size === "xlarge") {
      return "1rem";
    }

    return "0.875rem";
  }};
  line-height: 1.5;
  border-radius: 8px;
  transition: all 0.15s ease-in-out;
`;

export function Button2({
  children,
  variant,
  size,
  icon,
  disabled,
  iconPosition,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      disabled={disabled}
      variant={variant}
      size={size}
      icon={icon}
      iconPosition={iconPosition}
      type="button"
    >
      <img src={icon} />
      {children}
    </StyledButton>
  );
}
