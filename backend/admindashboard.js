function receiveDoubts(){
    var xhttp=new XMLHttpRequest()
    var url='http://localhost:8001/getDoubts'
    xhttp.open("GET",url,true)
    xhttp.onload= function(){
        if(this.status == 200){
            var queries= JSON.parse(this.responseText)
            console.log(queries.data)
            queries.data.forEach((query)=>{
                var li=document.createElement('li')
                var h5=document.createElement('h5')
                var p=document.createElement('p')
                h5.textContent='Question: '+query.question
                p.textContent=query.description
                li.appendChild(h5)
                li.appendChild(p)
                document.querySelector('.reports').appendChild(li)
            })

        }
    }
    xhttp.send()
}
receiveDoubts()

