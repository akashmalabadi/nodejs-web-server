


console.log("added client side js file.")



const weatherReport=document.querySelector("form")
const search=document.querySelector("input")
const messageOne=document.querySelector("#message")


weatherReport.addEventListener("submit",(e)=>{
    e.preventDefault()
    const lattitude=search.value
    messageOne.textContent="loading..."

    fetch("http://localhost:3000/weather?lattitude="+lattitude).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent=data.error
            }
            else{
                console.log(data.forecastdata)
                messageOne.textContent=data.forecastdata
            }
        })
    })
    
    
})