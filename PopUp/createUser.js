
const form = document.getElementById('signUp');
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPassword= document.getElementById('password');

const infoDiv= document.querySelector('.info');
const msgDiv = document.querySelector('.info-msg');
const loading = document.querySelector('.loading');


form.addEventListener('submit',(e)=>{
    const data={
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    };

    loading.style = 'display:block;';      
    
    createUser(data)
        .then((res)=>{
            console.log(res);
            let m;
            const status = res.status===200;

            if(!status)
                m=res.text;
            else{
                m='User created successfully';
                
                window.open('popup.html','_top');
                
                localStorage.setItem('jwtKey',res.text)
            }        
            showMsgOnUI(status,m); 
            
        })
        .catch((err)=>showMsgOnUI(false,'Something went wrong'));   
            
    e.preventDefault();
});


function showMsgOnUI(status,msg){
    loading.style = 'display:none;';      
    infoDiv.style='display: block;';
    let className = '';

    if(status){
        className = 'alert alert-dismissible alert-success';
    }else{
        className = 'alert alert-dismissible alert-danger';        
    }
    
    msgDiv.className += className;
    msgDiv.innerHTML =`<strong>${msg}</strong>`;

    // console.log(msg);
    setTimeout(()=>{infoDiv.style='display: none'},3000);
}


async function createUser(data){
    
    const result=  await fetch('http://localhost:3000/test/users',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            // 'x-frontendId':'abc@123'
        },
        body:JSON.stringify(data)
    },true);
    return {
        status:result.status,
        text:await result.text(),
        res: result.response
    }
    // if(result.status !== 200)
    //     return false;
    // return {text:await result.text(),m:result.response};
 
}

