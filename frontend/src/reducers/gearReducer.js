export const initialGearState = {
  gearList: [],
  loading: false,
  displayGear: false,
  error: null,
};

export function gearReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return {
        ...state,
        gearList: action.payload,
        displayGear: true,
        loading: false,
        error: null,
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    case "RESET":
      return initialGearState;
    default:
      return state;
  }
}
