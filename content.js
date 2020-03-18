var body=document.querySelector('body');

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload= function() {
      if (this.status == 200) {
       var parsedData=JSON.parse(this.responseText)
       alert(parsedData);
       console.log(parsedData.data)
      }
    };
    xhttp.open("GET", "http://localhost:8001/ext", true);
    xhttp.send();
  }

loadDoc()

var span=document.createElement('span');
body.appendChild(span);

function showLeftTime()
{
    var next= new Date("Mar 13, 2021 01:12:10");
    // to be dynamically updated
    var now= new Date();
    var days=Math.floor((next-now)/(1000*24*3600));
    var hrs= Math.floor(((next-now)%(1000*24*3600))/(1000*60*60));
    var mins= Math.floor(((next-now)%(1000*3600))/(1000*60));
    var sec= Math.floor(((next-now)%(1000*60))/1000);

    if((next-now)>0){
        console.log(`${days} days: ${hrs} hours: ${mins} minutes: ${sec} seconds `)
        span.textContent=`${days} days: ${hrs} hours: ${mins} minutes: ${sec} seconds `
    }
    else{
        span.textContent="Time's Up";
        alert('Time\'s up')
    }


}
setInterval(showLeftTime,1000);