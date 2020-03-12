
const newTabURL ="chrome://newtab/";
const allowed = ["chrome://newtab/","chrome://extensions/","https://google.com","https://www.youtube.com/"];//get from backend

var flag= false;

chrome.tabs.onUpdated.addListener((tabID,tabObj,tab)=>{
    // console.log(tabObj);    
if(tabObj.status === "complete"){
        console.log('onUpdated',tab);
        if(tab.url === newTabURL){
            console.log('mistake');
        }else{
            console.log(`url of updated tab:${tab.url}`);
         
            console.log(``)    
            
            const found= allowed.find(a => a=== tab.url)
            if(!found)chrome.tabs.remove(tab.id);
                
            }
    }

  
});
