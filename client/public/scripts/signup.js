
$(document).ready(()=>{
    console.log("Import successful")
    
    
    $("#submitBtn").click((event)=>{
        event.preventDefault();
        let email = $("#email").val()
        let userName = $("#userName").val()
        let password = $("#password1").val() 
        let password2 = $("#password2").val() 


        console.log("Value of email", email);
        console.log("userName", userName);
        console.log("password",  password);

        if(password===password2){

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
        }
        else{
            console.error("Passwords do not match")
        }

})


// Navigation from step to step
// Step one to step two
$("#stepOneNext").click(()=>{
    $("#stepOneCard").slideToggle("fast", "swing", ()=>{
        $("#stepTwoCard").slideToggle("fast", "swing")
    });
})

// Step two to step one
$("#stepTwoPrev").click(()=>{
    $("#stepTwoCard").slideToggle("fast", "swing", ()=>{
        $("#stepOneCard").slideToggle("fast", "swing")
    });
})

// Step two to step three
$("#stepTwoNext").click(()=>{
    $("#stepTwoCard").slideToggle("fast", "swing", ()=>{
        $("#stepThreeCard").slideToggle("fast", "swing")
    });
})

// Step three to step two
$("#stepThreePrev").click(()=>{
    $("#stepThreeCard").slideToggle("fast", "swing", ()=>{
        $("#stepTwoCard").slideToggle("fast", "swing")
    });
})



})