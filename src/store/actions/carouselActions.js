export const NEXT_SLIDE = 'NEXT_SLIDE';
export const PREV_SLIDE = 'PREV_SLIDE';
export const GO_TO_SLIDE = 'GO_TO_SLIDE';

export const nextSlide = () => ({
  type: NEXT_SLIDE
});

export const prevSlide = () => ({
  type: PREV_SLIDE
});

export const goToSlide = (index) => ({
  type: GO_TO_SLIDE,
  payload: index
});
