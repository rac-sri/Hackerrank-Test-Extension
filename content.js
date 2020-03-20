var body=document.querySelector('body');

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload= function() {
      if (this.status == 200) {
       var parsedData=JSON.parse(this.responseText)

       //console.log(parsedData.data.time - Date.now())

       window.next=parsedData.data.time// global object

      }
    };
    xhttp.open("GET", "http://localhost:8001/ext", true);
    xhttp.send();
  }
loadDoc()
setInterval(loadDoc,60*1000)

var span=document.createElement('span');
      body.appendChild(span);

      function showLeftTime()
      {
          window.now= new Date()
          var days=Math.floor((window.next-window.now)/(1000*24*3600));
          var hrs= Math.floor(((window.next-window.now)%(1000*24*3600))/(1000*60*60));
          var mins= Math.floor(((window.next-window.now)%(1000*3600))/(1000*60));
          var sec= Math.floor(((window.next-window.now)%(1000*60))/1000);
          if((next-now)>0){
              // console.log(`${days} days: ${hrs} hours: ${mins} minutes: ${sec} seconds `)
              span.textContent=`${days} days: ${hrs} hours: ${mins} minutes: ${sec} seconds `
          }
          else{
              span.textContent="Time's Up";
              alert('Time\'s up')
          }
      }
      setInterval(showLeftTime,1000);

