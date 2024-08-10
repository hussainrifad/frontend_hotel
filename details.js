const hotel_detail = () => {
    const id = new URLSearchParams(window.location.search).get("hotelId")
    fetch(`https://hussainrifad.pythonanywhere.com/hotel/list/${id}/?format=json`)
    .then(res => res.json())
    .then((data) => {
        render_details(data)
    })
    .catch(error => console.log(error))
}

hotel_detail()

const render_details = (hotel) => {
    const parent = document.getElementById('hotel-detail-section')
    const child = document.createElement('div')
    child.innerHTML = `
            <div class="flex flex-wrap -mx-4">
                <div class="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
                    <img class="w-full rounded-lg shadow-lg" src=${hotel.photo}>
                </div>
                <div class="w-full lg:w-1/3 px-4">
                    <h1 class="text-4xl font-bold mb-4">${hotel.name}</h1>
                    <p class="text-lg mb-6">${hotel.ratings}</p>
                    <p class="text-lg mb-6">Total Rooms : ${hotel.rooms}</p>
                    <div class="mb-6">
                        <p class="text-xl font-bold mb-2">Price:</p>
                        <p class="text-lg">${hotel.price}</p>
                    </div>
                    <div class="mb-6">
                        <p class="text-xl font-bold mb-2">Phone:</p>
                        <p class="text-lg">${hotel.phone}</p>
                    </div>
                    <div class="mb-6">
                        <p class="text-xl font-bold mb-2">Address</p>
                        <p class="text-lg">${hotel.address}</p>
                        <p class="text-lg">Country : ${hotel.country}</p>
                    </div>
                    <button onclick="handle_modal(${hotel.id})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        Book Now
                    </button>
                </div>
            </div>`
    child.classList.add('md:p-10')
    parent.appendChild(child)

    fetch_reviews(hotel.id)
}

const fetch_reviews = (id) => {
    fetch(`https://hussainrifad.pythonanywhere.com/hotel/reviews/get/${id}/?format=json`)
    .then(res => res.json())
    .then((data) => {
        render_reviews(data)
    })
    .catch(error => console.log(error))
}

const render_reviews = (data) => {
    console.log(data)
    const parent = document.getElementById('hotel-review-section')
    data.forEach( review => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="border p-3 shadow-xl">
            <p>${review.review}</p>
            <div class="my-2 flex justify-between">
            <p class="text-sm">${review.created_at}</p>
            </div>
            </div>
        `
        div.classList.add("bg-gray-200")
        parent.appendChild(div)
    });
}

const handle_modal = (id) => {
    
    const parent = document.getElementById('hotel-detail-section')
    const modal = document.createElement('div')
    modal.innerHTML = `
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div class="sm:flex sm:items-start">
                        <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg class="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Modal Title
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm leading-5 text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                                    mollitia inventore quod. Yay!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button onclick=book_confirmation(${id}) type="button"
                                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                Accept
                            </button>
                        </span>
                        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button onclick=remove_modal() type="button"
                                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                Cancel
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `
    modal.id = 'modal-section'
    parent.appendChild(modal)
}

const book_confirmation = (hotelId) => {
    const customer = localStorage.getItem('user_id')
    if(customer){
        const info = {
            customer,
            "hotel" : hotelId,
        }
        
        fetch(`https://hussainrifad.pythonanywhere.com/hotel/bookings/`,
            {
                method : 'POST',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(info)
            }
        )
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch(error => console.log(error))
        remove_modal()
    }
    else{
        window.location.replace('login.html')
    }
}

const remove_modal = () => {
    const modal = document.getElementById('modal-section')
    modal.remove()
}

const post_review = (event) => {
    event.preventDefault()
    const review = event.target.review.value
    const customer = localStorage.getItem('user_id')
    const hotel = new URLSearchParams(window.location.search).get("hotelId")

    const info = {
        review,
        customer,
        hotel
    }

    fetch(`https://hussainrifad.pythonanywhere.com/hotel/reviews/`,
        {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(info)
        }
    )
    .then(res => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error))
} 