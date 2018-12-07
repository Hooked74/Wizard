import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Wizard from "../Wizard";
import baseState from "../../../store/base-state";
import createStore from "../../../store";
import { actions } from "../../../store/actions";

Enzyme.configure({ adapter: new Adapter() });

describe("<Wizard />", () => {
  test("should compare snapshot", () => {
    const wrapper = shallow(
      <Wizard steps={baseState.steps} updateStep={() => void 0} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("simulates click events", () => {
    const store = createStore(baseState);
    let lastActiveIndex = store
      .getState()
      .steps.map(step => step.active)
      .lastIndexOf(true);

    if (!~lastActiveIndex) lastActiveIndex = 0;

    const wrapper = shallow(
      <Wizard
        steps={baseState.steps}
        updateStep={(...args) => store.dispatch(actions.updateStep(...args))}
      />
    );

    // There is no possibility to simulate a click as the mount does not work with React.memo
    wrapper.instance().onClickStep({
      target: {
        getAttribute() {
          return !lastActiveIndex ? 1 : lastActiveIndex - 1;
        }
      }
    });

    let currentLastActiveIndex = store
      .getState()
      .steps.map(step => step.active)
      .lastIndexOf(true);

    if (!~currentLastActiveIndex) currentLastActiveIndex = 0;

    if (lastActiveIndex) {
      expect(currentLastActiveIndex).toBe(lastActiveIndex - 1);
    } else {
      expect(currentLastActiveIndex).toBe(1);
    }
  });
});
