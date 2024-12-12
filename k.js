// event listener zu form hinzufügen, submit Event
// rufe addDeveloperToTable auf
const formElement = document.getElementById("form");
const firstNameElement = document.querySelector("#firstName");
const lastNameElement = document.querySelector("#lastName");
const programmingLanguageElement = document.querySelector("#programmingLanguage");

formElement.addEventListener("submit", addDeveloperToTable);

// event handler
function addDeveloperToTable(event) {
  event.preventDefault();

  // erstelle ein Objekt aus den Werten der Input Felder
  const newDeveloper = {
    firstName: firstNameElement.value,
    lastName: lastNameElement.value,
    programmingLanguage: programmingLanguageElement.value
  }

  // check ob aktuell developers im localStorage null ist
  let currentValue = localStorage.getItem("developers");

  if (currentValue === null) {
    // falls ja: füge ein neues Array in den localStorage mit newDeveloper Objekt als Element
    const developerArr = [newDeveloper];
    localStorage.setItem("developers", JSON.stringify(developerArr));
  } else {
    // wandele string in Array zurück um
    currentValue = JSON.parse(currentValue);
    if (Array.isArray(currentValue)) {
       /*
      wenn schon ein Array drin ist
      [{...}, unser neuer kommt hier dazu]
      */
      currentValue.push(newDeveloper);
      localStorage.setItem("developers", JSON.stringify(currentValue))
    }
  }
  formElement.reset();
}
// event listener zum reset Button hinzufügen
resetButton.addEventListener("click", clearLocalStorage);

function clearLocalStorage(event) {
  event.preventDefault();
  // form resetten

  // developers aus localStorage entfernen
  localStorage.removeItem("developers");
}
// lade Array aus localStorage, zeige developers an
function displayDevelopers() {
    let content = `<tr>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Programming Language</th>
                     </tr>`;
  
    // da dieser HTML Code von uns kommt und nicht vom Benutzer, können wir ihn
    // sicher einfügen. Den Code vom Benutzer sollten wir aus Sicherheitsgründen
    // nicht mit innerHTML einfügen
    table.innerHTML = content;
  
    if (localStorage.getItem("developers")) {
      const developerArr = JSON.parse(localStorage.getItem("developers"));
      developerArr.forEach((developer) => {
        const trElement = document.createElement("tr");
        // pro Eigenschaft die wir anzeigen erstellen wir ein td
        // ergänze es selber für lastName und programmingLanguage
        const nameElement = document.createElement("td");
        nameElement.innerText = developer.firstName;
        // füge das td Element dem Elternelement hinzu
        trElement.appendChild(nameElement);
        // füge die Zeile dem Table hinzu
        table.appendChild(trElement);
      });
    }
}