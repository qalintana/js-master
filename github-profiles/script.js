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
        </div>      
  
  </div>   
  `;
  main.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
