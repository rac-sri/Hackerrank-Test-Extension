
const usernameDiv = document.querySelector('.username');
const form = document.querySelector('#form');
const startBtn = document.querySelector('.startTest');

const errMsg= document.querySelector('.errMsg');

const loading = document.querySelector('.loading');

document.addEventListener('DOMContentLoaded',()=>{
    const startTest = localStorage.getItem('startTest');
    if(startTest)
        return testStarted();

    const username = localStorage.getItem('username'); 
    console.log(username);
    if(username){    
        usernameDiv.lastElementChild.innerHTML = username;
        console.log(usernameDiv);
    }else{
        usernameDiv.style.display = 'none';  
        startBtn.disabled = true;
        console.log(startBtn);
        showErrOnUI('You need to log into hackerrank first',0)
    }
});
form.addEventListener('submit', startTest);


function testStarted(){
    window.open('test.html','_self');
}

async function startTest(e){
    e.preventDefault();
    const username = localStorage.getItem('username'); 
    loading.style.display = 'block';
   try{
        const testUrl = await fetch(' https://hackerrank-invigiator.herokuapp.com/test/candidate',{
            method: 'GET',
            headers:{
            'x-username': username
            }
        },true);
        
        const url = await testUrl.text();
        if(!testUrl.ok)
           return showErrOnUI(url,3000);
        
        localStorage.setItem('startTest','true');
        testStarted();
        window.open(url);
        loading.style.display = 'none';
    
    }catch(ex){
        alert('error');
        showErrOnUI(ex.message,3000);
        console.log(ex);
    }
    
}

function showErrOnUI(msg,timeout){
    errMsg.firstElementChild.innerHTML = msg;

    loading.style.display = 'none';
    errMsg.style.display = 'block';
    if(timeout){
        setTimeout(()=>{
            errMsg.style.display = 'none';
        },timeout);
    }
}

