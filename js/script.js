const form = document.querySelector('.form');

const userImg = document.querySelector('.user-img');
const userLogin = document.querySelector('.user-login');
const userLink = document.querySelector('.user-link');
const userName = document.querySelector('.user-name');
const userBio = document.querySelector('.user-bio');
const userLocation = document.querySelector('.user-location');

form.addEventListener('submit', event => {
    event.preventDefault();

    const inputUserName = form.querySelector('.input-field').value;

    fetch(`https://api.github.com/users/${inputUserName}`)
        .then(response => response.json())
        .then(data => {
            const { login, name, avatar_url, bio, location, html_url } = data;

            document.querySelector('.search-main__user-block').classList.add('created');

            userLogin.innerHTML = login;
            userName.innerHTML = name;
            userImg.src = avatar_url;
            userBio.innerHTML = bio;
            userLocation.innerHTML = location;
            userLink.href = html_url;
            userLink.innerHTML = 'Repository';
        })
        .catch(err => console.error('Error: ', err));
    
    fetch(`https://api.github.com/users/${inputUserName}/repos`)
        .then(response => response.json())
        .then(data => {
            const node = document.getElementById('search-main');
        
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }

            for (const key in data) {
                const { name, description, html_url } = data[key];
                
                const reposBlock = document.querySelector('.search-main__repos-block');

                const div = document.createElement('div');
                const h3 = document.createElement('h3');
                const p = document.createElement('p');
                const a = document.createElement('a');
                
                div.classList.add('repos');
                h3.classList.add('repos-name');
                p.classList.add('repos-description');
                a.classList.add('repos-link');

                h3.appendChild(document.createTextNode(name));
                p.appendChild(document.createTextNode(description));
                a.appendChild(document.createTextNode(html_url));
                a.href = html_url;
                a.target = '_blank';

                div.appendChild(h3);
                div.appendChild(p);
                div.appendChild(a);

                reposBlock.appendChild(div);
            }
        })
        .catch(err => console.error(`Repos error: ${err}`));
});