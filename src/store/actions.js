import { bindActionCreators } from "redux";
import Types from "./types";

export const actions = {
  updateStep(data, index) {
    return {
      type: Types.UPDATE_STEP,
      payload: { data, index }
    };
  }
};

export default dispatcher => bindActionCreators(actions, dispatcher);
