import React, { memo } from "react";
import styled from "styled-components";

const Button = styled.button`
  flex-shrink: 0;
  border: 10px solid ${props => props.color};
  border-radius: 50px;
  width: 40px;
  height: 40px;
  background: transparent;
  position: relative;
  z-index: 1;
  transition: border-color 0.4s cubic-bezier(0.61, 0, 0.74, 0.05);
  position: relative;
  outline: none;
  cursor: pointer;

  ::before {
    content: attr(data-label);
    position: absolute;
    top: -60px;
    left: 50%;
    white-space: nowrap;
    font-size: 26px;
    transform: translate(-50%);
    color: ${props => props.color};
    font-weight: 500;
    transition: color 0.4s cubic-bezier(0.61, 0, 0.74, 0.05);
  }
`;

export default memo(({ label, index, ...rest }) => (
  <Button data-label={label} data-index={index} {...rest} />
));
