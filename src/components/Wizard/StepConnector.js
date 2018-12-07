import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ConnectorWrapper = styled.div`
  background-color: ${props => props.color};
  height: 10px;
  width: 100%;
  position: relative;
`;

const LeftConnector = styled.div`
  background-color: ${props => props.color};
  width: 1px;
  height: 10px;
  position: absolute;
  top: 0px;
  left: -1px;
`;

const RightConnector = styled.div`
  background-color: ${props => props.color};
  width: 1px;
  height: 10px;
  position: absolute;
  top: 0px;
  right: -1px;
`;

const ConnectorFiller = styled.div`
  width: ${props => (props.active ? "100%" : "0")};
  height: 10px;
  background-color: ${props => props.color};
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

export default class StepConnector extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    activeColor: PropTypes.string.isRequired,
    inactiveColor: PropTypes.string.isRequired,
    onTransitionEnd: PropTypes.func
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active: nextPropsActive, activeColor, inactiveColor } = nextProps;

    if (nextPropsActive !== prevState.active) {
      return {
        active: nextPropsActive,
        leftConnectorColor: activeColor,
        rightConnectorColor: inactiveColor
      };
    }

    return prevState;
  }

  constructor(props) {
    super(props);

    const color = props.active ? props.activeColor : props.inactiveColor;

    this.state = {
      active: props.active,
      leftConnectorColor: color,
      rightConnectorColor: color
    };
  }

  onTransitionEnd = () => {
    const { activeColor, inactiveColor, active, onTransitionEnd } = this.props;
    const state = active
      ? { rightConnectorColor: activeColor }
      : { leftConnectorColor: inactiveColor };

    this.setState(state, () => {
      if (onTransitionEnd) onTransitionEnd();
    });
  };

  render() {
    const { activeColor, inactiveColor, active } = this.props;
    const { leftConnectorColor, rightConnectorColor } = this.state;

    return (
      <ConnectorWrapper color={inactiveColor}>
        <LeftConnector color={leftConnectorColor} />
        <ConnectorFiller
          color={activeColor}
          active={active}
          onTransitionEnd={this.onTransitionEnd}
        />
        <RightConnector color={rightConnectorColor} />
      </ConnectorWrapper>
    );
  }
}
