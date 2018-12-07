import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Step from "./Step";
import StepConnector from "./StepConnector";

export default class AdvancedStep extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    activeColor: PropTypes.string.isRequired,
    inactiveColor: PropTypes.string.isRequired,
    onTransitionEnd: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active: nextPropsActive, activeColor, inactiveColor } = nextProps;

    if (nextPropsActive !== prevState.active) {
      const chunkState = nextPropsActive
        ? {
            onTransitionStepEnd: nextProps.onTransitionEnd,
            onTransitionConnectorEnd: () =>
              prevState.component.setState({ stepColor: activeColor })
          }
        : {
            onTransitionStepEnd: () =>
              prevState.component.setState({ activeConnector: false }),
            onTransitionConnectorEnd: nextProps.onTransitionEnd
          };

      return {
        active: nextPropsActive,
        activeConnector: true,
        stepColor: inactiveColor,
        ...chunkState
      };
    }

    return prevState;
  }

  state = {
    component: this, // readonly
    active: this.props.active,
    activeConnector: this.props.active,
    stepColor: this.props.active
      ? this.props.activeColor
      : this.props.inactiveColor,
    onTransitionStepEnd: void 0,
    onTransitionConnectorEnd: void 0
  };

  render() {
    const { index, label, activeColor, inactiveColor, onClick } = this.props;
    const {
      onTransitionStepEnd,
      stepColor,
      onTransitionConnectorEnd,
      activeConnector
    } = this.state;

    return (
      <>
        <StepConnector
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          active={activeConnector}
          onTransitionEnd={onTransitionConnectorEnd}
        />
        <Step
          index={index}
          label={label}
          color={stepColor}
          onClick={onClick}
          onTransitionEnd={onTransitionStepEnd}
        />
      </>
    );
  }
}
