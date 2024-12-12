// add event listener to form, submit event
// call addDeveloperToTable
const formElement = document.getElementById("form");
const firstNameElement = document.querySelector("#firstName");
const lastNameElement = document.querySelector("#lastName");
const programmingLanguageElement = document.querySelector("#programmingLanguage");

formElement.addEventListener("submit", addDeveloperToTable);

// event handler
function addDeveloperToTable(event) {
  event.preventDefault();

 // create an object from the values ​​of the input fields
  const newDeveloper = {
    firstName: firstNameElement.value,
    lastName: lastNameElement.value,
    programmingLanguage: programmingLanguageElement.value
  }

 // check if developers in localStorage is currently null
  let currentValue = localStorage.getItem("developers");

  if (currentValue === null) {
  // if yes: add a new array to the localStorage with newDeveloper object as element
    const developerArr = [newDeveloper];
    localStorage.setItem("developers", JSON.stringify(developerArr));
  } else {
   // convert string back to array
    currentValue = JSON.parse(currentValue);
    if (Array.isArray(currentValue)) {
     /*
    if there is already an array in there
    [{...}, our new one goes here]
     */
      currentValue.push(newDeveloper);
      localStorage.setItem("developers", JSON.stringify(currentValue))
    }
  }
  formElement.reset();
}
// add event listener to reset button
resetButton.addEventListener("click", clearLocalStorage);

function clearLocalStorage(event) {
  event.preventDefault();
 // reset form

  // remove developers from localStorage
  localStorage.removeItem("developers");
}
// load array from localStorage, display developers
function displayDevelopers() {
    let content = `<tr>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Programming Language</th>
                     </tr>`;
  
    // since this HTML code comes from us and not from the user, we can insert it
   // safely. For security reasons, we should not insert the user's code
    // with innerHTML
    table.innerHTML = content;
  
    if (localStorage.getItem("developers")) {
      const developerArr = JSON.parse(localStorage.getItem("developers"));
      developerArr.forEach((developer) => {
        const trElement = document.createElement("tr");

       // for each property we display we create a td
      // add it yourself for lastName and programmingLanguage
        const nameElement = document.createElement("td");
        nameElement.innerText = developer.firstName;

      // add the td element to the parent element
        trElement.appendChild(nameElement);

        // add the row to the table
        table.appendChild(trElement);
      });
    }
}