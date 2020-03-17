
const form = document.getElementById('login')
const userEmail = document.getElementById('email');
const userPassword= document.getElementById('password');
const signIN = document.querySelector('.signIN');
const loggedIN = document.querySelector('.loggedIN');
const logoutBtn = document.querySelector('.logOUT');
const loginErr= document.querySelector('.login-err');
const alertMsg = document.querySelector('.alert-msg');
const loading = document.querySelector('.loading');

document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('jwtKey'))
        logIn(localStorage.getItem('jwtKey'));
    else
        logOut(); 
});

form.addEventListener('submit',(e)=>{
    const data={
        email:userEmail.value,
        password:userPassword.value
    };
    loading.style = 'display:block;';      
    
    checkLogin(data)
        .then((a)=>{
            logIn(a); 
        })
        .catch((err)=>showErrOnUI('Something went wrong'));   
            
    e.preventDefault();
});

logoutBtn.addEventListener('click',logOut);

function showErrOnUI(msg){
    loginErr.style='display: block;';
    alertMsg.innerHTML =`<strong>${msg}</strong>`;
    loading.style = 'display:none;';      

    setTimeout(()=>{loginErr.style='display: none'},3000);
}


async function checkLogin(data){
    
    const result=  await fetch('http://localhost:3000/test/auth',{
        method:'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    },true);
    if(result.status !== 200)
        return false;
    return result.text();
 
}


function logOut(){
    loggedIN.style = 'display: none;'
    signIN.style = 'display: block;'
    localStorage.setItem('jwtKey','');
    // informBackend();
   
}




function logIn(result){
    if(result){
        localStorage.setItem('jwtKey',result);

        loggedIN.style = 'display: block;';
        signIN.style = 'display: none;';
                
        loading.style = 'display:none;';          
    }else{
       showErrOnUI('Invalid Emial or Password');
    
    }
}