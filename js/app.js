const loadPhone = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}
const displayPhone = phone =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = ' ';
    //display 20 phones
    phone = phone.slice(0,20);
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
         </div>
       </div>
     
       `;
       phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);

}

document.getElementById('btn-search').addEventListener('click',function(){
  // start loader
  toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
    
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

loadPhone();