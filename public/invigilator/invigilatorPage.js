
let no =1;
const serverURL = 'https://hackerrank-invigilator.herokuapp.com';
const socket = io.connect(serverURL);

const tableBody=document.querySelector('.table-body');
const searchName = document.getElementById('search-name');

searchName.addEventListener('keyup',filterNames);

socket.on('report',report);

document.addEventListener('DOMContentLoaded',()=>{
    getReports();
});

async function getReports(){
    const reports = await fetch(' https://hackerrank-invigilator.herokuapp.com/test/reports',{
        headers:{
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('jwt')
            }
    });
    
    if(!reports.ok){
        if(reports.status === 401 ) {
            const url=  await reports.json();
            return window.open('/'+url.redirect,'_self');
        }
       
    }
    // if(!reports.ok) return alert('Error: cant fetch reports');
    const r =await reports.json();

    r.forEach(report=>addRow(report))
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


function report(r){
    
    const reportDiv = document.querySelector(`.table-item[data-username="${r.username}"]`)
    
    if(reportDiv){      
        modifyRow(reportDiv,r);
    }else addRow(r)

}

function modifyRow(rowDiv,report){
    let className = '';
    
    if(report.status === 'ok')
        className = "table-light";
    else if(report.status === 'cheating')
        className = "table-danger";
    else if(report.status === 'logout')
        className = "table-warning";
    
    rowDiv.className =`table-item ${className} `;
    rowDiv.dataset.username= report.username;
    const no = rowDiv.firstElementChild.textContent;
    console.log(report);
    
    rowDiv.innerHTML = `
        <td>${no}</td>
        <td>${report.username}</td>
        <td>${report.lastReport.URL}</td>
        <td>${report.status}</td>
        <td>${report.lastReport.timestamp}</td>
    `;
    
}



function addRow(report){
    
    const tableRowDiv = document.createElement('tr');
   
    let className = '';
    
    if(report.status === 'ok')
     className = "table-light";
    else if(report.status === 'cheating')
        className = "table-danger";
    else if(report.status === 'logout')
        className = "table-warning";
    
    
    tableRowDiv.className =`table-item ${className} `;
    tableRowDiv.dataset.username= report.username
    
    
    tableRowDiv.innerHTML = `
        <td>${no}</td>
        <td>${report.username}</td>
        <td>${report.lastReport.URL}</td>
        <td>${report.status}</td>
        <td>${report.lastReport.timestamp}</td>
    `;
   
    tableBody.append(tableRowDiv);
    
    no+=1;
}





