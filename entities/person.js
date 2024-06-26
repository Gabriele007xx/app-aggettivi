class Person {
  #id;
  #author;
  #adjectives = [];
  #name;
  constructor(name, author) {
    this.#name = name;
    this.#author = author;
    this.#id = Math.random();
  }
  getAuthor()
  {
    return this.#author;
  }
  getAdjectives()
  {
    return this.#adjectives;
  }
  getName()
  {
    return this.#name;
  }
  addAdjectives(adjetive) {
    this.#adjectives = [...this.#adjectives, adjetive];
  }
  getID()
  {
    return this.#id;
  }
  removeAdjective(index)
  {
    function onFiter(ele, i)
    {
      if(i == index)
        {
          return false;
        }
        return true;
    }
    this.#adjectives = this.#adjectives.filter(onFiter);
  }
}
export default Person;