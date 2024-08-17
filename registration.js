const handle_registration = (event) => {
    event.preventDefault()
    const form = event.target
    const username = form.username.value
    const first_name = form.first_name.value
    const last_name = form.last_name.value
    const password = form.password.value
    const confirm_password = form.confirm_password.value
    const email = form.email.value
    const birth_date = form.date_of_birth.value
    const age = form.age.value
    const address = form.address.value
    const phone = form.phone.value
    
    const info = {
        username,
        first_name,
        last_name,
        password,
        confirm_password,
        email,
        birth_date,
        address,
        age,
        phone,
    }

    fetch('https://hussainrifad.pythonanywhere.com/customer/registration/',
        {
            method : 'POST',
            headers: {'Content-Type': "application/json"},
            body : JSON.stringify(info)
        }
    )
    .then(res => res.json())
    .then(data => {
        if(data === 'success'){
            window.alert('Please check your email to activate your account')
            window.location.href = 'login.html'
        }
        else{
            window.alert(data)
        }
    })
    .catch(error =>{
        console.log(error)
    }
    )
}

const redirect_to = () => {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    if(token && user_id){
        window.location.href = 'profile.html'
    }
}

redirect_to()