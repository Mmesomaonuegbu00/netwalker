let labText;

function dropDown() {
  const userName = document.querySelector(".user-name");
  if (window.innerWidth < 768) {
    userName.style.display = userName.style.display === "none" ? "block" : "none";
  }
}


const userImg = document.querySelector(".img2");
userImg.addEventListener("click", dropDown);

const toolTip = () => {
  labText = document.querySelector(".lab-text");

  if (window.innerWidth < 768) {
    labText.style.display = labText.style.display === "none" ? "block" : "none";
  }
};

const listIcon = document.querySelector(".list");
listIcon.addEventListener("click", toolTip);

function toogleOut() {
  const donePrescrbe = document.querySelector(".prescibe-input");
  donePrescrbe.classList.toggle('slide1')
}

const doneButton =document.querySelector('.done')
doneButton.addEventListener("click" , toogleOut)


const addSearch = document.getElementById("search");
const addMedicineName = document.getElementById("medicineName");
const addDose = document.getElementById("dose");
const addInterval = document.getElementById("interval");
const addDuration = document.getElementById("duration");
const addInstruction = document.getElementById("instruction");
const addTable = document.getElementById("table-body");
const noMedRow = document.querySelector('.no-med');

function updateTable() {
  const rows = addTable.querySelectorAll('tr:not(.no-med)');
  
  if (rows.length === 0) {
    noMedRow.style.display = "table-row";
  } else {
    noMedRow.style.display = "none";
  }
}

const addDrug = document.querySelector(".add-drug");

addDrug.addEventListener("click", (e) => {
  e.preventDefault();

  const search = addSearch.value;
  const medicineName = addMedicineName.value;
  const dose = addDose.value;
  const interval = addInterval.value;
  const duration = addDuration.value;
  const instruction = addInstruction.value;

  const rows = addTable.querySelectorAll('tr:not(.no-med)');




  if (search && medicineName && dose && interval && duration && instruction) {

    let serialNumber = 0;

  
    for (let i = 0; i < rows.length; i++) {
      serialNumber++; 
    }

    
    if (rows.length === 0) {
      noMedRow.style.display = 'none';
    }

    const row = document.createElement('tr');
    row.classList.add('tab1');
    row.innerHTML = `
      <td>${serialNumber}</td>
      <td class="tab1">${search}</td>
      <td class="tab1">${medicineName}</td>
      <td class="tab1">${dose}</td>
      <td class="tab1">${duration}</td>
      <td class="tab1">${instruction}</td>
       <td><button class="Remove">Remove</button></td>
    `;
    addTable.appendChild(row);
    resetInputs();
    updateTable();
   
  } else {
    alert('Please fill in all fields.');
  }
});

function resetInputs() {
  addSearch.value = '';
  addMedicineName.value = '';
  addDose.value = '';
  addInterval.value = '';
  addDuration.value = '';
  addInstruction.value = '';
}

let selectedId = null;

addSearch.addEventListener('focus', async () => {
  const apiUrl = 'https://cliniqueplushealthcare.com.ng/prescriptions/drug_class';
  fetchFromAPI1('search', apiUrl);
});

addMedicineName.addEventListener('focus', async () => {
  if (selectedId) {
    fetchFromAPI2('medicineName', `https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/${selectedId}`);
  }
});

addDose.addEventListener('focus', async () => {
  if (selectedId) {
    fetchFromAPI3('dose', 'https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine', addMedicineName.value);
  }
});

function fetchFromAPI1(inputField, apiUrl) {
  const inputValue = document.getElementById(inputField).value;

  fetch(`${apiUrl}?query=${encodeURIComponent(inputValue)}`)
    .then(response => response.json())
    .then(data => {
      const dropdownList = document.getElementById(`${inputField}DropdownList`);
      const dropdown = document.getElementById(`${inputField}Dropdown`);

      dropdownList.innerHTML = '';

      if (!data || data.length === 0) {
        dropdown.style.display = 'none';
        return;
      }

      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;

        li.addEventListener('click', () => {
          document.getElementById(inputField).value = li.textContent;
          dropdownList.innerHTML = '';
          dropdown.style.display = 'none';

          selectedId = item.id;
          fetchFromAPI2('medicineName', `https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/${selectedId}`);
        });

        dropdownList.appendChild(li);
      });

      dropdown.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching data from API 1:', error);
    });
}

function fetchFromAPI2(inputField, apiUrl) {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const dropdownList = document.getElementById(`${inputField}DropdownList`);
      const dropdown = document.getElementById(`${inputField}Dropdown`);

      dropdownList.innerHTML = '';

      if (!data || data.length === 0) {
        dropdown.style.display = 'none';
        return;
      }

      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.medicine_name;

        li.addEventListener('click', () => {
          document.getElementById(inputField).value = li.textContent;
          dropdownList.innerHTML = '';
          dropdown.style.display = 'none';

          fetchFromAPI3('dose', 'https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine', item.medicine_name);
        });

        dropdownList.appendChild(li);
      });

      dropdown.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching data from API 2:', error);
    });
}

function fetchFromAPI3(inputField, apiUrl, prescription) {
  fetch(`${apiUrl}?prescription=${encodeURIComponent(prescription)}`)
    .then(response => response.json())
    .then(data => {
      const dropdownList = document.getElementById(`${inputField}DropdownList`);
      const dropdown = document.getElementById(`${inputField}Dropdown`);

      dropdownList.innerHTML = '';

      if (!data || data.length === 0) {
        dropdown.style.display = 'none';
        return;
      }

      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.strength;

        li.addEventListener('click', () => {
          document.getElementById(inputField).value = li.textContent;
          dropdownList.innerHTML = '';
          dropdown.style.display = 'none';
        });

        dropdownList.appendChild(li);
      });

      dropdown.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching data from API 3:', error);
    });
}
