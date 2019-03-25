import api from "./api";

class App {
  constructor() {
    this.repositories = [];
    this.formEl = document.getElementById("repo-form");
    this.inputEl = document.querySelector("input[name=repository]");
    this.listEl = document.getElementById("repo-list");
    this.registerHandlers();
  }
  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement("span");

      loadingEl.setAttribute("id", "loading");
      loadingEl.appendChild(document.createTextNode("Loading..."));

      this.formEl.appendChild(loadingEl);

      loadingEl.style.marginLeft = 10;
      loadingEl.style.color = "#5e3db8";
      loadingEl.style.fontSize = 12;
    } else {
      document.getElementById("loading").remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0) return;

    this.setLoading();

    try {
      const response = await api.get(`/repos/${repoInput}`);

      const {
        name,
        description,
        html_url,
        owner: { avatar_url }
      } = response.data;

      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url
      });
      this.inputEl.value = "";
      this.render();
    } catch (erro) {
      alert(`O repositório "${repoInput}" não existe`);
    }
    this.setLoading(false);
  }
  render() {
    this.listEl.innerHTML = ""; //para iniciar o site com a lista vazia
    this.repositories.forEach(repo => {
      let imgEl = document.createElement("img");
      imgEl.setAttribute("src", repo.avatar_url);

      let titleEl = document.createElement("strong");
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement("p");
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement("a");
      linkEl.setAttribute("target", "_blank");
      linkEl.setAttribute("href", repo.html_url);
      linkEl.appendChild(document.createTextNode("Acessar"));

      let listItemEl = document.createElement("li");
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}
new App();

// Os Repositorórios para teste que funcionam são estes
//repos/Rocketseat/starter-javascript-exercicios
//react-community/react-navigation
