const initialState = {
  isHeaderOpen: false,
  isDetailOpen: false,
  detailData: undefined
};
const layouts = (state = initialState, { type, payload }) => {
  switch (type) {
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
