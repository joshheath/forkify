import uniqid from 'uniqid';

export default class List {
  constructor(){
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }
    this.items.push(item);
    return item;
  }

  deleteItem(id){
    const index = this.items.findIndex(el => el.id ===id);

    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    // loops through all elements in the items array and returns the item with the id that is passed into the function. the object is returned and the count increased
    this.items.find(el => el.id === id).count = newCount;
  }
}
