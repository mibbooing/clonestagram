const initialState = {
  session: undefined,
  following: [],
  followers: [],
  feeds: [],
  likelist: []
};
const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case '@auth/LIKE_LIST':
      return {
        ...state,
        likelist: [...payload]
      };
    case '@auth/FEEDS_UPDATE':
      return {
        ...state,
        feeds: [...payload]
      };
    case '@auth/FOLLOWER_UPDATE':
      return {
        ...state,
        followers: [...payload]
      };
    case '@auth/FOLLOWING_UPDATE':
      return {
        ...state,
        following: [...payload]
      };
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
