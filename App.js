/*
Cosa che non sono riuscito a fare:
 - Aggiungere la possibilità di eliminare aggettivi/persone (sminchiava il codice quando ci ho tentato)
 - Capire il perchè aggiungere l'aggettivo ti porta alla lista delle persone e aggiungere il refresh automatico della lista degli aggettivi (sminchiava il codice quando ci ho tentato)
 - Mettere il nome della persona anziché 'nada' (errori undefined quando ci provavo)
*/

/*const appConstants = require("./management/constants.js");
const Person = require("./entities/person.js");
const Adjective = require("./entities/adjective.js");
*/

import appConstants from "./management/constants.js";
import Person from "./entities/person.js";
import Adjective from "./entities/adjective.js";

const container = document.getElementById("main");
class App {
  // array delle pesone
  #persons = [];
  // login = pagina di login, app è l'app
  #status = {
    page: "null",
    id: "null",
  };

  constructor() {
    appConstants.buttonLogin.addEventListener("click", this.login);
    appConstants.buttonLogout.addEventListener("click", this.logout);
    appConstants.buttonAddPerson.addEventListener("click", this.addPerson);
    appConstants.buttonAddAdjective.addEventListener(
      "click",
      this.addAdjective
    );
    appConstants.buttonBack.addEventListener("click", this.refresh);
    this.#status.page = "login";
  }
  //funzione che effettua il login logico e carica gli appropriati elementi, par bypass_input è come se saltasse il controllo dell'input.
  login(bypass_input) {
    if (!app.checkInputs() == "false" || bypass_input) {
      window.localStorage.setItem("isLogged", "true");
      window.localStorage.setItem("username", appConstants.inputLogin.value);
      container.innerHTML = "";
      container.appendChild(appConstants.input);
      container.appendChild(document.createElement("br"));
      container.appendChild(appConstants.buttonAddPerson);
      container.appendChild(document.createElement("br"));
      app.buildList();
      container.appendChild(appConstants.personList);
      container.appendChild(document.createElement("br"));
      container.appendChild(appConstants.buttonLogout);
      container.appendChild(appConstants.buttonBack);
      app.getStatus().page = "app";
    } else {
      window.alert("input vuoto");
    }
  }
  // stessa cosa per il logout
  logout(bypass_input) {
    if (!app.checkInputs() || bypass_input) {
      window.localStorage.setItem("isLogged", "false");
      window.localStorage.setItem("username", null);
      container.innerHTML = "";
      container.appendChild(appConstants.title);
      container.appendChild(document.createElement("br"));
      container.appendChild(appConstants.subtitle);
      container.appendChild(document.createElement("br"));
      container.appendChild(appConstants.inputLogin);
      container.appendChild(document.createElement("br"));
      container.appendChild(appConstants.buttonLogin);
      container.appendChild(document.createElement("br"));
      container.appendChild(appConstants.prideMonth);
      app.getStatus().page = "login";
    } else {
      window.alert("Input vuoto");
    }
  }
  // ignorate i parametri, nell'addeventlistener uso gli attributi direttamente
  addPerson(name, author) {
    let person = new Person(
      appConstants.input.value,
      window.localStorage.getItem("username")
    );
    const persons = [...app.getPersons(), person];
    app.setPersons(persons);
    app.refresh();
  }
  // ignorate i parametri, nell'addeventlistener uso gli attributi direttamente
  addAdjective(id, adjective) {
    id = app.getStatus().id;
    // trova i aggettivi della persona
    if (!app.checkInputs()) {
      function OnFindIndex(el) {
        if (el.getID() == id) {
          return true;
        }
        return false;
      }
      let index = app.getPersons().findIndex(OnFindIndex);
      // gli aggettivi sono già 3?
      if (app.getPersons().at(index).getAdjectives().length >= 3) {
        window.alert("Limite aggettivi aggiunto");
      } else {
        const adj = new Adjective(
          window.localStorage.getItem("username"),
          appConstants.inputAdjective.value
        );
        app.getPersons().at(index).addAdjectives(adj);
        app.refresh();
      }
    } else {
      window.alert("input vuoto");
    }
  }
  // ignorate i parametri, nell'addeventlistener uso gli attributi direttamente
  removeAdjective(id, indice) {
    function OnFindIndex(el) {
      if (el.getID() == this.getAttribute("target")) {
        return true;
      }
      return false;
    }
    let index = app.getPersons().findIndex(OnFindIndex);
    app.getPersons().at(index).removeAdjective(this.getAttribute("index"));
  }

  // costruisce e appende (in italiano non lo so) le persone dinamicamente alla lista
  buildList() {
    appConstants.personList = document.createElement("ul");
    for (let i = 0; i < app.getPersons().length; i++) {
      let element = document.createElement("li");

      let button = document.createElement("button");
      button.setAttribute("view", this.#persons[i].getID());
      button.innerHTML = "Visualizza";
      let button1 = document.createElement("button");
      button1.setAttribute("target", app.getPersons().at(i).getID());
      button1.innerHTML = "Elimina";
      button1.setAttribute("disabled", true);
      button.addEventListener("click", this.viewPerson);
      button1.addEventListener("click", this.deletePerson);
      /*if (
        app.getPersons().at(i).getAuthor() !=
        window.localStorage.getItem("username")
      ) {
        button.setAttribute("disabled", false);
      } */
      element.innerHTML = `${app.getPersons().at(i).getName()} by ${app
        .getPersons()
        .at(i)
        .getAuthor()}`;
      element.appendChild(button);
      element.appendChild(button1);
      appConstants.personList.appendChild(element);
    }
  }

  //stessa cosa per gli aggettivi di UNA persona. method indica se è un refresh
  buildAdjectiveList(id, method) {
        appConstants.adjectiveList = document.createElement("ul");
        // trova la persona che ci interessa
        function OnFindIndex(el) {
          if (el.getID() == id) {
            return true;
          }
          return false;
        }
        let index = this.#persons.findIndex(OnFindIndex);
        // crea la lista dei suoi aggettivi
        for (
          let i = 0;
          i < app.getPersons().at(index).getAdjectives().length;
          i++
        ) {
          let element = document.createElement("li");
          let button1 = document.createElement("button");
          button1.setAttribute("target", app.getPersons().at(index).getID());
          button1.setAttribute("index", i);
          button1.innerHTML = "Elimina";
          button1.addEventListener("click", this.removeAdjective);
         /* if (
            app.getPersons().at(i).getAdjectives().at(i).getAuthor() !=
            window.localStorage.getItem("username")
          ) {
            button1.setAttribute("disabled", true);
          } */
          element.innerHTML = `${app
            .getPersons()
            .at(index)
            .getAdjectives()
            .at(i)
            .getAdjective()} by ${app
            .getPersons()
            .at(index)
            .getAdjectives()
            .at(i)
            .getAuthor()}`;
          element.appendChild(button1);
          appConstants.adjectiveList.appendChild(element);
        }
      
}
  // ignorate i parametri, nell'addeventlistener uso gli attributi direttamente
  viewPerson(id) {
    container.innerHTML = "";
    /*
    function OnFind(el)
    {
      if(el.getID()==this.getAttribute("view"))
      {
        return el;
      }
    }
    const person = app.getPersons().find(OnFind);
    appConstants.titleName.innerHTML = person.getName();
    */
    appConstants.titleName.innerHTML = "nada";
    container.appendChild(appConstants.titleName);
    container.appendChild(document.createElement("br"));
    container.appendChild(appConstants.inputAdjective);
    container.appendChild(document.createElement("br"));
    container.appendChild(appConstants.buttonAddAdjective);
    container.appendChild(document.createElement("br"));
    app.buildAdjectiveList(this.getAttribute("view"));
    container.appendChild(appConstants.adjectiveList);
    container.appendChild(document.createElement("br"));
    container.appendChild(appConstants.buttonLogout);
    container.appendChild(appConstants.buttonBack);
    app.getStatus().page = "person";
    app.getStatus().id = this.getAttribute("view");
  }

  deletePerson(id) {
    function onFiter(ele) {
      if (ele.getID() == this.getAttribute("view")) {
        return false;
      }
      return true;
    }
    const persons = app.getPersons().filter(onFiter);
    app.setPersons(persons);
  }

  // funzione di ricarica, so che è fatta in modo lagnusu ricopiando le altre operazioni ma pensare a rendere le cose piu' compatte sarebbe stato tempo extra
  refresh() {
    /* if (this.#status.page == "person") {
      this.buildAdjectiveList(this.#status.id, true);

      return; // return solo interrompe l'esecuzione della funzione
    } */
    const log = window.localStorage.getItem("isLogged");

    if (log == "true") {
      app.login(true);
    } else {
      app.logout(true);
    }
  }

  // al caricamento dell'app
  onLoad() {
    const log = window.localStorage.getItem("isLogged");

    if (log == "true") {
      this.login(true);
    } else {
      this.logout(true);
    }
  }
  // Controlla se gli input sono vuoti
  checkInputs() {
    if ((app.getStatus().page = "login")) {
      if (appConstants.inputLogin.value == "") {
        return true;
      }
      return false;
    }
    if ((app.getStatus().page = "app")) {
      if (appConstants.input.value == "") {
        return true;
      }
      return false;
    }
    if ((app.getStatus().page = "person")) {
      if (appConstants.inputAdjective.value == "") {
        return true;
      }
      return false;
    }
    return false;
  }
  getStatus() {
    return this.#status;
  }
  getPersons() {
    return this.#persons;
  }
  setPersons(persons) {
    this.#persons = persons;
  }
  add(person) {
    this.#persons = [...this.#persons, person];
  }
}
const app = new App();
app.onLoad();
