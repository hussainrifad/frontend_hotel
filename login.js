const handle_login = (event) => {
    event.preventDefault()
    const form = event.target.form
    const info = {
        username : form.username.value,
        password : form.password.value
    }
    console.log(info);

    fetch('https://hussainrifad.pythonanywhere.com/customer/login/',
        {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(info)
        }
    )
    .then(res => res.json())
    .then(data => {
        const token = data.token
        const user_id = data.user_id
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user_id)
    })
    .catch(error => console.log(error))
}

const handle_logout = (event) => {
    event.preventDefault();

    fetch('https://hussainrifad.pythonanywhere.com/customer/logout/')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}