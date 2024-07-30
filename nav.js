const navBar = () => {
    let is_loggedin = false
    
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    if(token && user_id){
        is_loggedin = true
    }
    
    const navbar = document.getElementById('navbar') 
    navbar.innerHTML = `
            <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <!-- Logo -->
                <div class="text-indigo-500 md:order-1">
                    <!-- Heroicon - Chip Outline -->
                    <a href="index.html" class="font-semibold text-2xl">MY HOTEL</a>
                </div>
                <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul class="flex font-semibold justify-between">
                        <!-- Active Link = text-indigo-500
                        Inactive Link = hover:text-indigo-500 -->
                        <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Explore</a></li>
                        <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">About</a></li>
                        <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="order-2 md:order-3 flex gap-5">
                    ${is_loggedin == true ? `<div class="flex gap-5">
                        <a href="profile.html" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                            <span>Profile</span>
                        </a>
                        <button onclick=logout() class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                            <span>Logout</span>
                        </button>
                        </div>` : `<div div class="flex gap-5">
                            <a href="login.html" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span>Login</span>
                            </a>
                            <a href="registration.html" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                                <span>Registration</span>
                            </a>
                        </div>`
                    }
        
                </div>
            </div>`
}

navBar()


const logout = () => {
    const token = localStorage.getItem('token')

    fetch(`https://hotel-booking-backend-u4dd.onrender.com/customer/logout/`,{
        method : 'GET',
        headers:{
            Authorization: `Token ${token}`,
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
            console.log(data)
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
    })
    .catch(err => console.log(err))
}