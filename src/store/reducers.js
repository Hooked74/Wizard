import Types from "./types";

export default {
  [Types.UPDATE_STEP](state, action) {
    const { index, data } = action.payload;
    const step = {
      ...state.steps[index],
      ...data
    };
    const steps = state.steps.slice(0);

    steps[index] = step;

    return {
      ...state,
      steps
    };
  }
};
