const handle_login = (event) => {
    event.preventDefault()
    const form = event.target.form
    const info = {
        username : form.username.value,
        password : form.password.value
    }
    fetch('http://127.0.0.1:8080/customer/login/',
        {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(info)
        }
    )
    .then(res => res.json())
    .then(data => {
        if(data.token && data.user_id){
            const token = data.token
            const user_id = data.user_id
            localStorage.setItem('token', token)
            localStorage.setItem('user_id', user_id)
            window.alert('you have successfully loged in')
        }
        else{
            window.alert(`${data.error}. please register first`)
        }
    })
    .catch(error => {
        if(error){
            window.alert(error)
        }
    })
}

const handle_logout = (event) => {
    event.preventDefault();

    fetch('http://127.0.0.1:8080/customer/logout/')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}