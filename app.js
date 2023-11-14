const apiURL= 'https://api.github.com/users/'


const form= document.getElementById('form')
const search= document.getElementById('search')

async function getUser(username){
    try{
        const {data}= await axios(apiURL + username)
        console.log(data)
    }catch(error){
        console.log(error)
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const userName=search.value
    if(userName){
        getUser(userName)
        search.value=''

    }
})
