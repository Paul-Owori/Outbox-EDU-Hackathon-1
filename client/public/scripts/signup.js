
$(document).ready(()=>{
    console.log("Import successful")
    
    
    $("#submitBtn").click((event)=>{
        event.preventDefault();
        let email = $("#email").val()
        let userName = $("#userName").val()
        let password = $("#password").val() 

        console.log("Value of email", email);
        console.log("userName", userName);
        console.log("password",  password);

        let newUser = {
            email,
            userName,
            password
        };

        // Use Fetch to send information to the backend
        fetch('/users', {
            method:"POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
    .then(response=>{
        // Check if the response is an error or a positive result
        console.log("A result was received", response)
        if(response.status===201){
            console.log("Response was positive", response.status)
            return response.json()
        }
        else{
            console.log("Response was negative", response.status)
            return response.json()
        }
    })
    .then(response=>{
        console.log("The response.json", response)
    })
    .catch(error=>{
        let message= `There was an error sending user ${newUser} to the backend: ${error}`
        console.error(message)
    })

})


})