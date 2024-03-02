const loadPhone = async (onlyPhone='13',isShowAll) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${onlyPhone}`)
    const data = await response.json()
    const phones= data.data
    // console.log(phones)
    displayPhone(phones,isShowAll)
}


const displayPhone = (phones,isShowAll) =>{
    // console.log(phones)


// ______Step1._________//
const phoneContainer=document.getElementById('phone-container')
//clear phone container cards before adding new cards
phoneContainer.textContent="";

//___Display show all button if there are more than 12 phones
const showAllContainer= document.getElementById("Show all container")
if(phones.length>12 && !isShowAll){
    showAllContainer.classList.remove("hidden")
}
else{
    showAllContainer.classList.add("hidden")
}
// console.log('Is Show All',isShowAll)

// ___Display only first 12 Phones if not show all__//
if(!isShowAll){
phones = phones.slice(0,12)
}


    phones.forEach((phone =>{
        // console.log(phone)
    //___Step-2:Create a div___//
    const phoneCard =document.createElement("div")
    phoneCard.classList=`card bg-gray-200 p-4  shadow-xl`;
    // ___Step-3:Set innerHtml___//
    phoneCard.innerHTML =`
<figure><img src="${phone.image}" alt="Shoes" /></figure>
<div class="card-body">
<h2 class="card-title">${phone.phone_name}</h2>
<p>If a dog chews shoes whose shoes does he choose?</p>
<div class="card-actions justify-center">
<button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show  Details</button>
</div>
</div>
    `;
    //____Step-4: Append Child____//
    phoneContainer.appendChild(phoneCard);
    }))

    //___________Hide loading spinner___________________//
    toggleLoadingSpinner(false)

}


//
const handelShowDetails = async (id) =>{
    // console.log('clicked show details', id)
    //load single phone data
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json()
    const phone =data.data
    
    showPhoneDetails(phone)
} 

const showPhoneDetails = (phone) => {
console.log(phone);

const phoneName =document.getElementById("Show-details-phone-name")
phoneName.innerText = phone.name;

const showDetailsContainer =document.getElementById("show-details-container")
showDetailsContainer.innerHTML = `  
    <img src="${phone.image}" alt=""/>
<p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
<p><span>ReleaseDate:</span>${phone?.mainFeatures?.others?.releaseDate}</p>
<p><span>Display-Size:</span>${phone?.mainFeatures?.displaySize}</p>
<p><span>GPS:</span>${phone?.others?.GPS}</p>
    
`;
    // show the modal
Show_details_modal.showModal()
}





//Handel  Search button____//
const handelSearch=(isShowAll) =>{
    const searchField=document.getElementById("search-field");
    const searchText = searchField.value
    console.log(searchText)
    loadPhone(searchText,isShowAll)
    toggleLoadingSpinner(true)

}


//Handel  Search button--2_____//
// const handelSearch2 = () =>{
//     const searchField2=document.getElementById("Search-Field-2")
//     const searchText2=searchField2.value
//     console.log(searchText2)
//     loadPhone(searchText2)
//     toggleLoadingSpinner(true)
// }

// _____Toggle Loading Spinner_____//
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner= document.getElementById("loading-spinner")
    if(isLoading){
    loadingSpinner.classList.remove( "hidden" )
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}


// _____Handle show all
const  handleShowAllBtn = () =>{
    handelSearch(true);
}


loadPhone()