
// chrome.runtime.onSuspend.addListener(()=>{
    
//     // chrome.runtime.sendMessage({a:'sdhkdjschjd'});
//     alert('A');
// });
const allowedList = ["newtab","settings","extensions","www.hackerrank.com"];

localStorage.setItem('username','');
localStorage.setItem('startTest','');

chrome.tabs.onUpdated.addListener((tabId,tabObj,tab)=>{
    
    const startTest = localStorage.getItem('startTest');
  
    if(!startTest) 
        return
    if(tabObj.status === "complete")
        checkTab(tab)

});
// console.log('a');
// window.addEventListener("storage", function (e) {
//      alert('z');
//     console.log('z',e);
    
//}, false);
chrome.tabs.onActivated.addListener(({tabId})=>{
    
    const startTest = localStorage.getItem('startTest');
    
    if(!startTest )
        return
    
    setTimeout(()=>{
        chrome.tabs.get(tabId, tab=> checkTab(tab) );
    },1000);
   
})
chrome.runtime.onMessage.addListener(request=>{
    localStorage.setItem('username', request.username);
});
    
function checkTab(tab){    
    let {hostname} =new URL(tab.url);
    console.log(hostname);
    const found = allowedList.find(hn=> hn ===hostname);
    
    if(!found){
         chrome.tabs.remove(tab.id)
         reportBackend(tab.url);
    }
    if(found === 'extentions'){
        localStorage.setItem('isDisabled',true)
    }
}

async function reportBackend(url){
    const report={
        username: localStorage.getItem('username'),
        URL: url
    };
    const result =await fetch(' https://hackerrank-invigiator.herokuapp.com/test/reports',{
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
