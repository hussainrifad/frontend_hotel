const handle_upload = (event) => {
    event.preventDefault()
    const formData = new FormData();
    const image = document.getElementById('image').files[0]
    console.log(image);
    formData.append('image', image);
    
    fetch('https://api.imgbb.com/1/upload?key=470a41da597c86acbbba913390d32ac0', {
        method : 'POST',
        body : formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 200){
            const imageurl = data.data.display_url
            console.log(imageurl)
        }
    }
    )
    .catch(error => console.log(error)
    )
}

// const handle_imageupload = (url) => {
//     fetch(`https://hussainrifad.pythonanywhere.com/hotel/list/${}`)
// }