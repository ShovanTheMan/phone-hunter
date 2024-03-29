const loadPhone = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}
const displayPhone = (phone, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = ' ';
    //display 10 phones
    const showAll = document.getElementById('show-all');
    if(dataLimit && phone.length > 10){
      phone = phone.slice(0,10);
      
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');
    }
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phone.length === 0){
       noPhone.classList.remove('d-none');
    }
    else{
      noPhone.classList.add('d-none');
    }
    phone.forEach(phone => {
       const phoneDiv = document.createElement('div');
       phoneDiv.classList.add('col');
       console.log(phone.phone_name);
       phoneDiv.innerHTML = `
      
       <div class="card">
         <img src="${phone.image}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${phone.phone_name}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
          
        
         </div>
       </div>
     
       `;
       phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);

}

const processSearch = (dataLimit) =>{
  toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
  // start loader
 processSearch(10);
})
// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function (e){
  
  if (e.key === 'Enter') {
    processSearch(10);   
  }
})

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading ){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
processSearch();
})
 
const loadPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Inforamation Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'Not Available at the moment'}</p>

    `
}


 loadPhone('apple');