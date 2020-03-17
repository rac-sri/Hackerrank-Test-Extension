

const allowedHostNames = ["newtab","settings","extensions","google","youtube"];//get from backend


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
        
    let {hostname} =new URL(tab.url);
    let pos=1;
    if(hostname.startsWith('www'))
        pos=1;
    else pos=0;
    
    hostname = hostname.split('.')[pos];

    const found= allowedHostNames.find(a => a===hostname)
    if(!found){
        chrome.tabs.remove(tab.id);
        // alert('LOL');
        reportBackend(tab.url);
    }  
    

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
