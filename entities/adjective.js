class Adjective {
    #author;
    #adjective;
    constructor(author, adjective)
    {
        this.#author = author;
        this.#adjective = adjective;
    }
getAuthor()
  {
    return this.#author;
  }
  getAdjective()
  {
    return this.#adjective;
  }
}

export default Adjective;