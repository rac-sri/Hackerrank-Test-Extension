const endTestBtn = document.querySelector('.endTest');

endTestBtn.addEventListener('click', endTest);
function endTest(){
    reportBackend('logout');
    localStorage.setItem('startTest','');
    window.open('popup.html','_self');

}

async function reportBackend(url){
    const report={
        username: localStorage.getItem('username'),
        URL: url
    }
    // console.log('sdadsdadsadasdasdasddas');
    const result =await fetch(' https://hackerrank-invigilator.herokuapp.com/test/reports',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(report)
        
    });
    if(!result.ok){
        alert('Server Stoped Unexpectedly');
        localStorage.setItem('username','');
        localStorage.setItem('startTest','');
        return;
    }
    
}
