const form = document.getElementById('add-hostname');
const urlInput = document.getElementById('url');
const msgUI = document.querySelector('.msg');
const alertMsg = document.querySelector('.alert-msg');
const loading = document.querySelector('.loading');
const list = document.querySelector('.list-group');
//remove hostname;
document.addEventListener('DOMContentLoaded',()=>{
    getHostnames().then((arr)=>{
        arr.forEach(element => {
            showHostname(element.hostname);
        }); 
    })
});
list.addEventListener('click' ,removeHostname);

form.addEventListener('submit',addHostname);

async function removeHostname(e){
   try{
    // console.log(e.target.parentElement);
    let val=e.target.parentElement.textContent;
    
    val = val.slice(1);
    let result  =await fetch(`http://localhost:3000/test/allowed/${val}`,{
        method:'DELETE',
        headers:{
            'x-invAuth':'abc@123'
        }

    })
    result = await result.text();
    console.log(result);
    showMsgOnUI('Hostname removed successfully',true);
    if(e.target.classList.contains('del-item')) 
        e.target.parentElement.remove();
    
}catch(ex){
    showMsgOnUI(ex.message,false);

}
}

async function addHostname(e){
    e.preventDefault();

    const inputHostname = host(urlInput.value);
        loading.style.display = 'block';
    try{
    let r = await fetch('http://localhost:3000/test/allowed',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
        'x-invAuth':'abc@123'
    },
    body:JSON.stringify({hostname:inputHostname})
    })
    if(r.status !== 200){
        r = await r.text();        
        showMsgOnUI(r,false);
        
        return
    }
    r = await r.json();
    // if(r.status)
    
    showMsgOnUI('Hostname Added',true);

    // setTimeout(()=>{console.log('a')},1);
    showHostname(r.hostname);
    console.log(r);
}catch(ex){
    showMsgOnUI(ex.message,false);
}
}

function showMsgOnUI(msg,status){

    msgUI.style='display: block;';
    // msgUI.className=' alert alert-dismissible alert-success'
    let className;
    if(status)className = 'alert-msg alert  alert-dismissible alert-success';
    else className = 'alert-msg alert alert-dismissible alert-danger';
    
    alertMsg.className = className;
    alertMsg.innerHTML =`<strong>${msg}</strong>`;
    loading.style.display = 'none';

    // loading.style = 'display:none;';      
    console.log('sdsd');
    setTimeout(()=>{msgUI.style='display: none'},3000);
    
}

function host(url){

    try{let {hostname} =new URL(url);

    let pos=1;
    if(hostname.startsWith('www'))
        pos=1;
    else pos=0;
    
    hostname = hostname.split('.')[pos];
    return hostname;
    }catch(ex){
        showMsgOnUI(ex.message,false);
    }   
    // const found= allowedHostNames.find(a => a===hostname)
    // if(!found){
    //     chrome.tabs.remove(tab.id);
    //     reportBackend(tab.url);
    // }  
    

}
async function getHostnames(){
    try{
    let hostnames = await fetch('http://localhost:3000/test/allowed');
    hostnames = await hostnames.json();
    // console.log(hostnames);
    // hostnames
    return hostnames;
    
    }catch(ex){
        showMsgOnUI(ex.message,false);
        return;
    }

}

function showHostname(hostname){
    const listItemDiv = document.createElement('div');
    listItemDiv.className = "list-group-item list-group-item-action ";
    listItemDiv.innerHTML = '<button class="close del-item" type="button" data-dismiss="alert">&times;</button>';

    listItemDiv.innerHTML += hostname;
    list.appendChild(listItemDiv);

}




