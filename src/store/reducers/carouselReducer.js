import { NEXT_SLIDE, PREV_SLIDE, GO_TO_SLIDE } from '../actions/carouselActions';

const initialState = {
  currentIndex: 0,
  images: [
    "/images/best1.jpg",
    "/images/best2.jpg",
    "/images/best3.jpg",
    "/images/best4.jpg",
  ]
};

const carouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_SLIDE:
      return {
        ...state,
        currentIndex: state.currentIndex === state.images.length - 1 ? 0 : state.currentIndex + 1
      };
    case PREV_SLIDE:
      return {
        ...state,
        currentIndex: state.currentIndex === 0 ? state.images.length - 1 : state.currentIndex - 1
      };
    case GO_TO_SLIDE:
      return {
        ...state,
        currentIndex: action.payload
      };
    default:
      return state;
  }
};

export default carouselReducer;
