const apiURL= 'https://api.github.com/users/'


const form= document.getElementById('form')
const search= document.getElementById('search')
const main= document.getElementById('main')

async function getUser(username){
    try{

        const {data}= await axios(apiURL + username)

        createCard(data)
        getRepo(username)

    }catch(error){
        if(error.response.status == 404){
            console.log(error)

            createErrorcard('No profile with this username!')
        }
        console.log(error)
    }
}
async function getRepo(username){
    try{

        const {data}= await axios(apiURL + username + '/repos')

        createRepo(data)
        
    }catch(error){
        if(error.response.status == 404){
            console.log(error)
        }
        console.log(error)
    }
}


function createCard(data){
    const cardHTML=`<div class="card">
    <div>
        <img src=${data.avatar_url}  alt="${data.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${data.name ? data.name : 'No Name'} <br> <small>user name: ${data.login}</small></h2>
        <p>${data.bio ? data.bio : `No bio`}</p>
        <ul>
            <li>${data.followers} <strong>Followers</strong></li>
            <li>${data.following} <strong>Following</strong></li>   
            <li>${data.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"> </div>
    </div>
</div>`
    main.innerHTML=cardHTML
}
function createRepo(repos){
    const reposEl=document.getElementById('repos')
    repos
    .slice(0,5)
    .forEach((repo)=>{
        const repoEl=document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href=repo.html_url
        repoEl.target='_blank'
        repoEl.innerText=repo.name
       
        reposEl.appendChild(repoEl)
    })

}
function createErrorcard(msg){
    const cardHTML=`
    <div class="card">
    <h1>${msg}</h1>
    </div>
    `
    main.innerHTML=cardHTML
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const userName=search.value
    if(userName){
        getUser(userName)
        search.value=''

    }
})
