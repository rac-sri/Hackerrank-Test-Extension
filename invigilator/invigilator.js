
let no=1;
const tableBody=document.querySelector('.table-body');
const searchName = document.getElementById('search-name');

searchName.addEventListener('keyup',filterNames);
document.addEventListener('DOMContentLoaded',checkLogout);

setInterval(getReports,3000);

// setInterval(()=>console.log(no),3000);


async function  checkLogout(){
    const prevLogIns = JSON.parse(localStorage.getItem('loggedInUsers'));
    
    let loggedInUsers = await fetch('http://localhost:3000/test/auth',{
        headers:{
            'x-invAuth':'abc@123'
        }
    });

    loggedInUsers = await loggedInUsers.json();
    // console.log(prevLogIns);
    
    prevLogIns.forEach(element=>{
        const e = loggedInUsers.find((l)=> l.email===element.email);
        if(!e){
            console.log('aaa');
            element.URL = 'logged out';
            element.timestamp = Date();
            element.status = 'warning' ;
            element.no =no;
            addRow(element)
        }
     })
    localStorage.setItem('loggedInUsers',JSON.stringify(loggedInUsers));

    loggedInUsers.forEach(element => {
        element.no=no++;
        element.timestamp='-';
        element.URL= '-'
        element.status = 'ok';
        addRow(element);
    });

}
function filterNames(e){
    let val = e.target.value.toLowerCase();
    
    document.querySelectorAll('.table-item').forEach(row=>{
        
        console.log(row);
            if(row.firstElementChild.nextElementSibling.textContent.toLowerCase().indexOf(val) != -1){
                row.style.display = 'table-row';
            }else{

                row.style.display = 'none';
            }
        
        })

}


async function getReports(){
    let reports = await fetch('http://localhost:3000/test/reports');
    reports = await reports.json();
    console.log(reports);
    reports.forEach(element => {
        // element.no=no++;
        element.status = 'danger';

        modifyRow(element,'danger');
    });
    
}

function modifyRow(element,s){
    let row = document.getElementById(element.userEmail);
    
    // console.log(row.classList);
    if(!row)return;
    if(row.classList.contains('table-warning'))return;
    row.className =`table-item table-${s}`

    row = row.firstElementChild.nextElementSibling.nextElementSibling;

    row.textContent = element.URL;    
    row = row.nextElementSibling.nextElementSibling;
    row.textContent= element.timestamp;

}

function addRow(row){
    // const div = document.createElement('div');

    const tableRowDiv = document.createElement('tr');
    tableRowDiv.className = 'table-item ';
    let className = '';
    if(row.status === 'ok')
        className = "table-light";
    else if(row.status === 'warning')
        className = "table-warning";
    else if(row.status === 'danger')
        className = "table-danger";
    
    tableRowDiv.className += className + ' ';
    // tableRowDiv.className += row.email;
    tableRowDiv.id = row.email;
    tableRowDiv.innerHTML = `
    <td>${row.no}</td>
    <td>${row.name}</td>
    <td>${row.URL}</td>
    <td>${row.email}</td>
    <td>${row.timestamp}</td>
    `;
    // div.append(tableRowDiv)
    tableBody.append(tableRowDiv);
    
    
}

