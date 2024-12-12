
const form=document.querySelector('form');
const addDeveloperButton=document.querySelector('#send-form');
const removeDeveloperButton=document.querySelector('#reset-form');
const developerList=document.querySelector('#developer-list');

addDeveloperButton.addEventListener('click', (event) =>{
    event.preventDefault();
    const firstNameValue = form.firstName.value;
    const lastNameValue= form.lastName.value;
    const programmingLanguage= form.programmingLanguage.value;
    const newDeveloper={
        firstName:firstNameValue,
        lastName:lastNameValue,
        programmingLanguage:programmingLanguage
    }

      console.log(newDeveloper);
      form.firstName.value='';
      form.lastName.value='';


console.log('Befor update', JSON.parse(localStorage.getItem('developers'))); //Das hier für Task-4 zum checken
let developers=localStorage.getItem('developers')
console.log(localStorage.getItem('developers'));
if(developers===null){
    developers=[newDeveloper]
}else{
developers=JSON.parse(developers)
developers.push(newDeveloper)
}
localStorage.setItem('developers', JSON.stringify(developers));
console.log('After update', JSON.parse(localStorage.getItem('developers')));
displayDevelopers();
});



removeDeveloperButton.addEventListener('click', (event) =>{
    event.preventDefault();
    localStorage.removeItem('developers');
displayDevelopers();
});

function displayDevelopers(){
const developers=JSON.parse(localStorage.getItem('developers'));
developerList.innerHTML='';

const headerrow=document.createElement('tr');
const header=['First Name', 'Last Name', 'Programming Language'];

header.forEach(head =>{
const th=document.createElement('th');
th.textContent=head;
headerrow.appendChild(th);
});
developerList.appendChild(headerrow);
if(developers!==null){
    developers.forEach(developer =>{
        const row=document.createElement('tr');
        console.log(developer);
        row.innerHTML=`<td>${developer.firstName} </td>`
        row.innerHTML+=`<td>${developer.lastName} </td>`
        row.innerHTML+=`<td>${developer.programmingLanguage} </td>`
        developerList.appendChild(row);
    });
}
//taking data from developer for rows

}

document.addEventListener('DOMContentLoaded',displayDevelopers);
