const APIURL = 'https://api.github.com/users/';

const main = document.querySelector('main');

const form = document.querySelector('form');
const search = document.querySelector('.search');

getUser();

async function getUser(user = undefined) {
  let completeURL = `${APIURL}github`;

  if (user) {
    completeURL = `${APIURL}${user}`;
  }

  const response = await fetch(completeURL);
  const responseData = await response.json();

  createUserCard(responseData);
  getRepos(user);
}

function createUserCard(user) {
  cardHTML = `
    <div class="card">
        <div class="img-container">
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar"/>
        </div>

        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info" >
                <li>${user.followers}</li>
                <li>${user.following}</li>
                <li>${user.public_repos}</li>
            </ul>   

            <h4>Repos</h4>
            <div class="repos" id="repos"></div>
        </div>      
  
  </div>   
  `;
  main.innerHTML = cardHTML;
}

async function getRepos(user) {
  let completeURL = `${APIURL}github/repos`;

  if (user) {
    completeURL = `${APIURL}${user}/repos`;
  }

  const response = await fetch(completeURL);
  const responseData = await response.json();

  addReposToCard(responseData);
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos.slice(0, 9).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');

    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerHTML = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
