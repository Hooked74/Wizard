import React, { PureComponent } from "react";
import Wizard from "../components/Wizard/Wizard";
import { connect } from "react-redux";
import buildActions from "../store/actions";

class App extends PureComponent {
  static propTypes = {
    ...Wizard.propTypes // eslint-disable-line
  };

  render() {
    const { steps, updateStep } = this.props;

    return (
      <div className="App">
        <Wizard steps={steps} updateStep={updateStep} />
      </div>
    );
  }
}

export default connect(
  state => ({
    steps: state.steps
  }),
  buildActions
)(App);
