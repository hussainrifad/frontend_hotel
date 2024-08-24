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
            <div class="bg-gray-100 py-5">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row -mx-4">
                        <div class="md:flex-1 px-4">
                            <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img class="w-full h-full object-cover" src=${hotel.photoUrl} alt="Product Image">
                            </div>
                            <div class="flex mb-4">
                                ${hotel.rooms != 0 ?
                                    `<button onclick="handle_modal(${hotel.id})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button">
                                        Book Now
                                    </button>`
                                    :
                                    `<button disabled class="bg-grey-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button">
                                        No room left
                                    </button>`
                                }
                            </div>
                        </div>
                        <div class="md:flex-1 px-4">
                            <h2 class="text-2xl font-bold mb-2">Hotel ${hotel.name}</h2>
                            <p class="text-sm mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                                ante justo. Integer euismod libero id mauris malesuada tincidunt.
                            </p>
                            <div class="flex mb-4">
                                <div class="mr-4">
                                    <p class="font-bold">Price: ${hotel.price}</p>
                                    <p class="font-bold">Available rooms: ${hotel.rooms}</p>
                                    <p class="font-bold">Ratings: ${hotel.ratings}</p>
                                    <p class="font-bold">Phone: ${hotel.phone}</p>
                                </div>
                            </div>
                            <div class="mb-4">
                                <span class="font-bold ">Select Direction:</span>
                                <div class="flex items-center mt-2">
                                    <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">N</button>
                                    <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                                    <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">E</button>
                                    <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">W</button>
                                </div>
                            </div>
                            <div>
                                <span class="font-bold ">Product Description:</span>
                                <p class=" text-sm mt-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                    lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                    ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                    sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    child.classList.add('md:p-10')
    parent.appendChild(child)
    const user_id = localStorage.getItem('user_id')
    isBookedCheck(hotel.id, user_id)
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
    const parent = document.getElementById('hotel-review-section')
    const user_id = localStorage.getItem('user_id')
    data.forEach( review => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="flex flex-col text-sm w-80 justify-between rounded-md shadow shadow-2xl bg-gray-100 p-8 shadow-sm max-w-sm mx-auto">
                ${parseInt(user_id) === review.customer ? `
                    <div class="flex justify-between">
                    <button onclick=handle_edit_modal(${review.id}) class="bg-green-500 px-3 py-1 rounded">Edit</button>
                    <button onclick=handle_delete(${review.id}) class="bg-red-500 px-3 py-1 rounded">Delete</button>
                    </div>
                `:`<div></div>`}
                <p class="my-4 mb-0 text-black font-normal leading-relaxed tracking-wide text-gray-400">
                    ${review.review}
                </p>
                <div class="mt-6 flex items-center gap-6 ">
                    <div class="h-10 w-10 overflow-hidden rounded-full shadow-sm outline-neutral-800">
                        <div class="relative inline-block overflow-hidden rounded-lg border-neutral-800">
                            <img alt="" src="https://randomuser.me/api/portraits/women/2.jpg" width="50" height="50"
                                decoding="async" data-nimg="1" class="inline-block " loading="lazy" style="color: transparent;">
                        </div>
                    </div>
                    <div>
                        <p class="leading-relaxed tracking-wide text-black">${review.ratings}</p>
                        <p class="text-xs leading-relaxed tracking-wide text-black ">${review.created_at}</p>
                    </div>
            </div>
        `
        parent.appendChild(div)
    });
    parent.classList.add('flex', 'flex-wrap', 'gap-4', 'md:p-10')
}

const handle_modal = (id) => {
    
    const parent = document.getElementById('hotel-detail-section')
    const modal = document.createElement('div')
    modal.innerHTML = `
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 text-center sm:block sm:p-0">
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
                                Booking Confirmation
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm leading-5 text-gray-500">
                                    Are you sure you want to book this hotel room ?
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
    const customer = parseInt(localStorage.getItem('user_id'))
    if(customer){
        const info = {
            'customer' : customer,
            'hotel' : hotelId,
        }
        console.log(info);
        
        fetch(`https://hussainrifad.pythonanywhere.com/hotel/bookings/`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(info)
            }
        )
        .then(res => res.json())
        .then((data) => {            
            if(data.success){
                window.alert('You have successfully booked this room. Now check your email')
                window.location.href = 'index.html'
            }
            else{
                window.alert(`You can't book right now. Try again leter.`)
                window.location.href = 'index.html'
            }
        })
        .catch(error => {
            window.alert(error)
            window.location.href = 'index.html'           
        })
        remove_modal()
    }
}

const remove_modal = () => {
    const modal = document.getElementById('modal-section')
    modal.remove()
}

const render_review_form = () => {
    const parent = document.getElementById('post-review-section')
    const div = document.createElement('div')
    div.innerHTML = `
        <form onsubmit=post_review(event) class="p-2">
            <div class="w-full sm:w-1/2 my-5">
                <div>
                    <input required type="text" name="review" id="review" placeholder="Share your review" class="w-full h-28 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
            </div>
            <div class="w-full sm:w-1/2 my-5">
                <div>
                    <input required type="number" name="ratings" id="ratings" placeholder="Rate this hotel out of 5" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
            </div>
            <div>
                <button
                    class="hover:shadow-form sm:w-1/5 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Post
                </button>
            </div>
        </form>
    `
    div.classList.add('md:pl-16')
    parent.appendChild(div)
}

const isBookedCheck = (hotel_id, user_id=0) => {
    fetch(`https://hussainrifad.pythonanywhere.com/hotel/reviews/is_booked/${hotel_id}/${parseInt(user_id)}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        if(data.booked === true){
            render_review_form()
        }
    }
    )
}

const post_review = (event) => {
    event.preventDefault()
    const review = event.target.review.value
    const ratings = event.target.ratings.value
    const customer = localStorage.getItem('user_id')
    const hotel = new URLSearchParams(window.location.search).get("hotelId")

    const info = {
        ratings,
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
        window.alert('You have successfully posted a review')
        window.location.href = ''
    })
    .catch(error => console.log(error))
} 

const handle_delete = (id) => {
    console.log(id)
    fetch(`https://hussainrifad.pythonanywhere.com/hotel/reviews/${id}/`,
        {
            method : 'DELETE',
        }
    )
    .then(res => res.json())
    .then((data) => {
        window.alert('post deleted successfully')
        window.location.reload()
    })
    .catch(error => {
        window.alert(error)
    })
}

const handle_edit_modal = (id) => {
    fetch(`https://hussainrifad.pythonanywhere.com/hotel/reviews/${id}/`)
    .then(res => res.json())
    .then((data) =>{
        const parent = document.getElementById('edit_post')
        const modal = document.createElement('div')
        const review = data.review
        modal.innerHTML = `
            <div class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <form
                        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div class="p-2">
                            <div class="w-full my-5">
                                <div>
                                    <input required type="text" value="${review}" name="review" id="review" placeholder="Share your review" class="w-full h-28 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div class="w-full sm:w-1/2 my-5">
                                <div>
                                    <input required type="number" value=${data.ratings} name="ratings" id="ratings" placeholder="Rate this hotel out of 5" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button id="postButton" type="button"
                                    class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                    Post
                                </button>
                            </span>
                            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                <button onclick=remove_edit_modal() type="button"
                                    class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        `
        modal.id = 'modal-edit-section'
        parent.appendChild(modal)

        document.getElementById('postButton').addEventListener('click', (event) => {
            edit_review_post(event, data);
        });
    })
    .catch(error => {
        window.alert(error)
    })
}

const edit_review_post = (event, data) => {
    event.preventDefault()
    const info = {
        review : event.target.form.review.value,
        ratings : event.target.form.ratings.value,
        customer : data.customer,
        hotel : data.hotel
    }    
    fetch(`https://hussainrifad.pythonanywhere.com/hotel/reviews/${data.id}/`,
        {
            method : 'PUT',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(info)
        }
    )
    .then(res => res.json())
    .then((data) => {
        window.alert('You have successfully Update a review')
        window.location.href = ''
    })
    .catch(error => console.log(error))
}


const remove_edit_modal = () => {
    const modal = document.getElementById('modal-edit-section')
    modal.remove()
}