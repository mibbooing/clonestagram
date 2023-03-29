const initialState = {
  isHeaderOpen: false,
  isDetailOpen: false,
  detailData: undefined,
  targetId: undefined,
  isToFeed: false
};
const layouts = (state = initialState, { type, payload }) => {
  switch (type) {
    case '@layouts/UPDATE_IS_COMMENT_TO_FEED':
      return {
        ...state,
        isToFeed: payload
      };
    case '@layouts/UPDATE_COMMENT_TARGET':
      return {
        ...state,
        targetId: payload
      };
    case '@layouts/UPDATE_DETAIL_DATA':
      return {
        ...state,
        detailData: payload
      };
    case '@layouts/UPDATE_DETAIL_STATE':
      return {
        ...state,
        isDetailOpen: payload
      };
    case '@layouts/UPDATE_HEADER_STATE':
      return {
        ...state,
        isHeaderOpen: payload
      };
    default:
      return state;
  }
};
export default layouts;
