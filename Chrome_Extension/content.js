// chrome.runtime.onMessage.addListener(z=>{
//      console.log(z);
// });

document.addEventListener('DOMContentLoaded',()=>{

     console.log(sessionStorage);
    const {hostname} = new URL(window.location.href);
    if(hostname !== 'www.hackerrank.com')    return
    
    let username;
    const usernameDiv = document.querySelector('.username');
    if(usernameDiv)
         username = usernameDiv.textContent;
    else
         username = ''; 

    localStorage.setItem('username', username);
    chrome.runtime.sendMessage({username});
    
});
// window.addEventListener("storage", function (e) {
     
//      console.log('assasasas',e);
     
//  }, false);
//