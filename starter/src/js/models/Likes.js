export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
  }

  isLiked(id){
    // if an item is not liked the id will equal -1 and the expression below will be false
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes(){
    return this.likes.length;
  }
}
