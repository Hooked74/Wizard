import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Step from "./Step";
import AdvancedStep from "./AdvancedStep";

const Steps = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 50px;
`;

const Content = styled.div`
  padding-top: 15px;
`;

export default class Wizard extends PureComponent {
  static MAX_STEPS = 5;
  static MIN_STEPS = 2;

  static defaultProps = {
    activeColor: "#5111df",
    inactiveColor: "#dbdbdb"
  };

  static propTypes = {
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
      })
    ).isRequired,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    updateStep: PropTypes.func.isRequired
  };

  lockedClickOnStep = false;

  constructor(props) {
    super(props);

    const { length } = props.steps;

    if (length > Wizard.MAX_STEPS) {
      console.warn(
        `Step limit exceeded. Only ${Wizard.MAX_STEPS} steps will be rendered.`
      );
    } else if (length < Wizard.MIN_STEPS) {
      throw new Error(
        "Сannot render component. Make sure the props is correctly."
      );
    }
  }

  get lastActiveStep() {
    const { steps } = this.props;
    let step;

    for (let i = steps.length; i--; ) {
      if (steps[i].active) {
        step = { ...steps[i], index: i };
        break;
      }
    }

    if (!step) step = { ...steps[0], index: 0 };

    return step;
  }

  onClickStep = e => {
    const clickedStepIndex = parseInt(e.target.getAttribute("data-index"), 10);
    const lastActiveStep = this.lastActiveStep;

    if (
      !this.lockedClickOnStep &&
      Math.abs(clickedStepIndex - lastActiveStep.index) === 1
    ) {
      const { updateStep } = this.props;
      if (clickedStepIndex < lastActiveStep.index) {
        updateStep({ active: false }, lastActiveStep.index);
      } else {
        updateStep({ active: true }, clickedStepIndex);
      }
      this.lockedClickOnStep = true;
    }
  };

  onTransitionStepEnd = () => {
    this.lockedClickOnStep = false;
  };

  render() {
    const { steps, activeColor, inactiveColor } = this.props;

    return (
      <div>
        <Steps>
          <Step
            label={steps[0].label}
            color={activeColor}
            index={0}
            onClick={this.onClickStep}
            onTransitionEnd={this.onTransitionStepEnd}
          />
          {steps.slice(1, Wizard.MAX_STEPS).map((step, index) => (
            <AdvancedStep
              key={index}
              index={index + 1}
              label={step.label}
              active={step.active}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onClick={this.onClickStep}
              onTransitionEnd={this.onTransitionStepEnd}
            />
          ))}
        </Steps>
        <Content>{this.lastActiveStep.content}</Content>
      </div>
    );
  }
}
