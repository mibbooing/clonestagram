const initialState = {
  session: undefined
};
const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case '@auth/SESSION_UPDATE':
      return {
        ...state,
        session: payload
      };
    default:
      return state;
  }
};
export default auth;
