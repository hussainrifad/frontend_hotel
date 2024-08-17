const handle_deposite_money = (event) => {
    event.preventDefault()
    const user_id = localStorage.getItem('user_id')
    if(!user_id){
        window.alert('login first please')
        window.location.href = 'login.html'
    }
    const amount = event.target.amount.value
    fetch(`https://hussainrifad.pythonanywhere.com/customer/deposite_balance/${user_id}`,{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({amount})
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 'success'){
            window.alert(`${amount} has been added to your account now balance is ${data.new_balance}`)
        }
        else{
            window.alert(data)
        }
        window.location.href = 'profile.html'
    })
    .catch(error => {
        window.alert(error)
        window.location.href = 'profile.html'
    })
}