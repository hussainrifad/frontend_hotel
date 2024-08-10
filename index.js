const fetch_hotel = async () => {
    fetch('https://hussainrifad.pythonanywhere.com/hotel/list/?format=json')
    .then(res => res.json())
    .then((data) => {
        display_hotel(data)
        console.log(data)
    })
    .catch(error => console.log(error))
    console.log("hello");
}
fetch_hotel()

const display_hotel = (hotels) => {
    const parent = document.getElementById('hotel-section')
    hotels.forEach( hotel => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="rounded overflow-hidden shadow-lg flex flex-col">
                <a href="#"></a>
                <div class="relative"><a href="#">
                        <img class="w-full"
                            src=${hotel.photo}
                            alt="Sunset in the mountains">
                        <div
                            class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>
                    </a>
                    <a href="#!">
                        <a href="details.html?hotelId=${hotel.id}" class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Details
                        </a>
                    </a>
                </div>
                <div class="px-6 py-4 mb-auto">
                    <a href="#" class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                        ${hotel.name}
                    </a>
                    <p class="text-gray-500 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                    <span href="#" class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                        <svg height="13px" width="13px" version="1.1" id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                            y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
                            xml:space="preserve">
                            <g>
                                <g>
                                    <path
                                        d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                    </path>
                                </g>
                            </g>
                        </svg>
                        <span class="ml-1">${hotel.address}</span>
                    </span>

                    <span href="#" class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                        Per night $
                        <span class="ml-1">${hotel.price}</span>
                    </span>
                </div>
            </div>
        `
        parent.appendChild(div)
    });
}