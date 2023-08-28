//////// Step : 02
const loadPhone = async (inputFieldText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
};
////////
const displayPhone = (phones, isShowAll) => {
    ////////
    const showAllContainer = document.getElementById('show-all-container'); // Step : 08
    //////// Step : 03
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    //////// Step : 09
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    //////// Step : 10
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    //////// Step : 04
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        <div class="border bg-slate-100 rounded-md w-full text-center px-4 pb-4"> <!-- main-->
            <div class="flex justify-center p-3 ">
                <div class="p-3 bg-slate-300 rounded-md">
                        <img class="rounded-2xl" src="${phone.image}" alt="">
                </div>
            </div>
                <h3 class="text-2xl font-semibold">${phone.phone_name}</h3>
                <h5 class="font-bold">$999</h5>
                <button onclick="handleShowDetails('${phone.slug}')" class="bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded text-white">Show Details</button>
        </div>
        `
        phonesContainer.appendChild(phoneCard);
    });
    //////// Step : 07
    toggleSpinner(false);
    ////////
};
//////// Step : 12
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
};
//////// Step : 13
const showPhoneDetails = (phone) => {
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="flex bg-slate-100 rounded-md justify-center"><img class="bg-slate-300 rounded-2xl my-4 p-4" src="${phone.image}" alt="phone"/></div>
        <h3 class="font-semibold text-2xl">${phone.name}</h3>
        <h6>Storage :<span>${phone.mainFeatures.storage
        }</span></h6>
        <h6>Display Size :<span>${phone.mainFeatures.displaySize
        }</span></h6>
        <h6>Chipset :<span>${phone.mainFeatures.chipSet
        }</span></h6>
        <h6>GPS :</span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</h6>
    `;
    show_details_modal.showModal();  // Step : 14
};
//////// Step : 01
const handleSearch = (isShowAll) => {
    const inputField = document.getElementById('input-Field');
    const inputFieldText = inputField.value;
    // inputField.value = '';
    loadPhone(inputFieldText, isShowAll);
    toggleSpinner(true);  // Step : 06
};
//////// Step : 05
const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
};
//////// Step : 11
const handleShowAll = () => {
    handleSearch(true);
};
////////