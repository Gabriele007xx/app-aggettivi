class AppConstants {


  title = document.createElement("h1");
  subtitle = document.createElement("span");
  inputLogin = document.createElement("input");
  buttonLogin = document.createElement("button");
  prideMonth = document.createElement("span");

  input = document.createElement("input");
  buttonAddPerson = document.createElement("button");
  personList = document.createElement("ul");
  buttonLogout = document.createElement("button");

  buttonBack = document.createElement("button");

  titleName = document.createElement("span");
  inputAdjective = document.createElement("input");
  buttonAddAdjective = document.createElement("button");
  adjectiveList = document.createElement("ul");

  constructor() {
    this.title.textContent = "InsultaPersone";
    this.subtitle.textContent =
      "Insultare le persone senza nessuna conseguenza. Il futuro è qui.";
    this.inputLogin.setAttribute("type", "text");
    this.buttonLogin.innerHTML = "Login";
    this.prideMonth.innerHTML = "Happy Pride Month GUYS! (devo essere politicamente corretto)"

    this.buttonLogout.innerHTML = "Logout";

    this.input.setAttribute("type", "text");
    this.buttonAddPerson.innerHTML = "Aggiungi Persona";
    this.inputAdjective.setAttribute("type", "text");
    this.buttonAddAdjective.innerHTML = "Aggiungi aggettivo";
    this.buttonBack.innerHTML = "Indietro";
    
  }
}
const appConstants = new AppConstants();

export default appConstants;