
document.addEventListener('DOMContentLoaded',()=>{
   
    const {hostname} = new URL(window.location.href);
    if(hostname !== 'www.hackerrank.com') return
    
    let username;
    const usernameDiv = document.querySelector('.username');
    if(usernameDiv)
         username = usernameDiv.textContent;
    else
         username = ''; 

    localStorage.setItem('username', username);
    chrome.runtime.sendMessage({username});
})