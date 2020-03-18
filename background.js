

const devAllowedList = ["newtab","settings","extensions"];//get from backend

// let allowedHostNames;
// init();
// console.log(allowedHostNames);
// async function init(){
//     allowedHostNames = await getHostnames();
// }
// getHostnames()
async function getHostnames(){
    try{
    let hostnames = await fetch('http://localhost:3000/test/allowed');
    hostnames = await hostnames.json();
    // console.log(hostnames);
    // hostnames
    return hostnames;
    
    }catch(ex){
       console.log(ex);
        // return;
    }

}


//allowed hostnames list fro backend

//detect incognito

chrome.tabs.onUpdated.addListener((tabId,tabObj,tab)=>{
    if(localStorage.getItem('jwtKey')){
        if(tabObj.status === "complete")
            checkTab(tab)
    }
});

chrome.tabs.onActivated.addListener(({tabId})=>{
    if(localStorage.getItem('jwtKey')){
        setTimeout(()=>{
            chrome.tabs.get(tabId, tab=> checkTab(tab) );
        },1000);
    }
})

function checkTab(tab){
    if(tab.url==='http://127.0.0.1:5501/invigilator.js/invigilator.html')return;//to allow invigilator.html

    let {hostname} =new URL(tab.url);
    let pos=1;
    if(hostname.startsWith('www'))
        pos=1;
    else pos=0;
    
    let hn = hostname.split('.')[pos];
    getHostnames().then((allowedHostNames)=>{
        devAllowedList.forEach((e)=>{
            allowedHostNames.push({
                hostname:e
            })
        })
        const found= allowedHostNames.find(({hostname}) => hostname===hn)
        if(!found){
            chrome.tabs.remove(tab.id);
            reportBackend(tab.url);
        }  
    });
    

}

async function reportBackend(url){
    const report={
        URL:url
    }
    // console.log('sdadsdadsadasdasdasddas');
    const result =await fetch('http://localhost:3000/test/reports',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'x-auth-token':localStorage.getItem('jwtKey')
        },
        body:JSON.stringify(report)
        
    });
    if(result.status === 200)
        // alert('success');
        ;
    else console.log(result);
    
}

// chrome.extension.isAllowedIncognitoAccess((a)=>{console.log(a)});

// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
// 	console.log(request,sendResponse,sender); 
// });
