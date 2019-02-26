import { elements } from './base';

export const toggleLikedBtn = isLiked => {
  const iconString = isLiked ? 'icon-hear' : 'icon-heart-outlined';
  // finds the liked button and sets the attribute according to the iconString variable
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);

};
