const form = document.getElementById('setURL');
const urlInput = document.getElementById('url');
const msgUI = document.querySelector('.msg');
const alertMsg = document.querySelector('.alert-msg');
const loading = document.querySelector('.loading');
const list = document.querySelector('.list-group');

form.addEventListener('submit',submitURL);

async function submitURL(e){
    e.preventDefault();
    console.log('ss');
    loading.style.display = 'block';
    
    try{
        let result = await fetch('http://localhost:3000/test/invigilator/startTest',{
            method:'POST',
            headers:{
            'Content-Type': 'application/json',
            'x-invAuth':'abc@123'
            },
            body:JSON.stringify({testURL: urlInput.value })
        });
        
        if(!result.ok){
            throw new Error(await result.text());
        }
        showMsgOnUI('Test URL saved',true);
    }catch(ex){
      showMsgOnUI(ex.message,false);
    }
}

function showMsgOnUI(msg,status){
    console.log(msg);
    loading.style.display = 'none';

    const classStatus = (status)? 'success':'danger' ;   
   
    msgUI.className += classStatus;

    alertMsg.className = `alert-msg alert alert-dismissible alert-${classStatus} `;
    alertMsg.innerHTML = `
    <strong>${msg}</strong>
    `;
    msgUI.style.display = 'block';
    setTimeout(()=>{
        msgUI.style.display = 'none';
    },3000);

}







