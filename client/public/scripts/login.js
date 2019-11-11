$(document).ready(()=>{
    console.log("Document ready");

    $("#loginBtn").click((event)=>{
        event.preventDefault();
        
        let email = $("#loginEmail").val();
        let password = $("#loginPassword").val();

        let userDetails = {email, password};

        fetch('/users/login', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(userDetails)
        })
        .then(result=>{
            console.log("Result was received with status", result.status)
            if(result.status===200){
                console.log("Login was successful with status", result.status)
                alert("Login was successful!")
            }
            else{
                console.log("Login failed with status", result.status)
                alert("Login failed!")
            }
            return result.json()
        })
        .then(result=>{
            console.log("Result.json()", result)
        })
        .catch(error=>{
            console.error(`There was an error logging in user with email ${email}`, error)
        })
    })
})