const loadData = () => {
    const id = localStorage.getItem('user_id')
    fetch(`https://hussainrifad.pythonanywhere.com/customer/list/${id}/`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        render_form(data)
    })
    .catch(error => console.log(error))
}

loadData()

const update_data = (event) => {
    event.preventDefault()
    const id = localStorage.getItem('user_id')
    const form = event.target
    const address = form.address.value
    const birth_date = form.date_of_birth.value
    const age = form.age.value
    const phone = form.phone.value

    const info = {
        address,
        birth_date,
        age,
        phone,
    }

    fetch(`https://hussainrifad.pythonanywhere.com/customer/list/${id}/`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(info)
        }
    )
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error))
}

const render_form = (data) => {
    const form = document.getElementById('form-section')
    form.innerHTML = `
        <form onsubmit=update_data(event)>
            <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                        <label for="date_of_birth" class="mb-3 block text-base font-medium text-[#07074D]">
                            Birth Date
                        </label>
                        <input required type="date" value=${data.birth_date} name="date_of_birth" id="date_of_birth"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                        <label for="age" class="mb-3 block text-base font-medium text-[#07074D]">
                            Age
                        </label>
                        <input required type="number" value=${data.age} name="age" id="age"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-3">
                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <label for="address" class="mb-3 block text-base font-medium text-[#07074D]">
                            Address
                        </label>
                        <div class="mb-5">
                            <input required type="text" value=${data.address} name="address" id="address" placeholder="Enter Address"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                            Phone
                        </label>
                        <div class="mb-5">
                            <input required type="text" name="phone" value=${data.phone} id="phone" placeholder="Enter phone"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Update Profile
                </button>
            </div>
        </form>`
}

