const navBar = () => {
    let is_loggedin = false
    
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    if(token && user_id){
        is_loggedin = true
    }
    
    const navbar = document.getElementById('navbar') 
    navbar.innerHTML = `
            <div class="md:px-10">
                <div class="mx-auto px-4 sm:px-6 lg:px-8 md:flex justify-between items-center">
                    <div class="-ml-2 mr-2 flex flex-row-reverse items-center md:hidden justify-between">
                        <button onclick=handle_toggle id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <a href="index.html" class="text-indigo-500">
                            <img src="logo/logo-no-background.png" alt="logo" width="80" height="80">
                        </a>
                    </div>
                    <a href="index.html" class="text-indigo-500 hidden md:block">
                        <img src="logo/logo-no-background.png" alt="logo" width="80" height="80">
                    </a>
                    <div>
                        <div class="hidden md:ml-6 md:flex md:space-x-8 md:justify-around">
                            <div class="flex gap-10 ml-10">
                                <a href="explore.html" class="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">Explore</a>
                                <a href="about.html" class="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">About</a>
                                <a href="contact.html" class="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">Contact</a>
                            </div>
                            <div class="order-2 md:order-3 flex gap-5">
                                ${is_loggedin == true ? `<div class="flex gap-5">
                                    <a href="profile.html" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                        <span>Profile</span>
                                    </a>
                                    <button onclick=logout() class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                        <span>Logout</span>
                                    </button>
                                    </div>` : `<div div class="flex gap-5">
                                        <a href="login.html" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                            <span>Login</span>
                                        </a>
                                        <a href="registration.html" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                            <span>Registration</span>
                                        </a>
                                    </div>`
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Mobile menu -->
                <div id="mobile-menu" class="md:hidden">
                    <div class="pt-8 pb-3 space-y-1">
                        <a href="explore.html" class="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium">Explore</a>
                        <a href="about.html" class="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium">About</a>
                        <a href="contact.html" class="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium">Contact</a>
                    </div>
                    <div class="order-2 md:order-3 flex gap-5">
                        ${is_loggedin == true ? `<div class="flex gap-5">
                            <a href="profile.html" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                <span>Profile</span>
                            </a>
                            <button onclick=logout() class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                <span>Logout</span>
                            </button>
                            </div>` : `<div div class="flex gap-5">
                                <a href="login.html" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                    <span>Login</span>
                                </a>
                                <a href="registration.html" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none"">
                                    <span>Registration</span>
                                </a>
                            </div>`
                        }
                    </div>
                </div>
            </div>
            `
    navbar.classList.add('py-5')
}
navBar()


const logout = () => {
    const token = localStorage.getItem('token')

    fetch(`https://hussainrifad.pythonanywhere.com/customer/logout/`,{
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
            window.location.href = 'login.html'
    })
    .catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
});