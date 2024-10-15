let labText;

function dropDown() {
  const userName = document.querySelector(".user-name");
  if (window.innerWidth < 768) {
    userName.style.display =
      userName.style.display === "none" ? "block" : "none";
  }
}

const userImg = document.querySelector(".img2");
userImg.addEventListener("click", dropDown);

const toolTip = () => {
  labText = document.querySelector(".lab-text");

  if (window.innerWidth < 768) {
    labText.style.display =
      labText.style.display === "none" ? "block" : "none";
  }
};

const listIcon = document.querySelector(".list");
listIcon.addEventListener("click", toolTip);

const addSearch = document.getElementById("search");
const addInterval = document.getElementById("interval");
const addInstruction = document.getElementById("instruction");
const addDuration = document.getElementById("duration");
const addTable = document.getElementById("table-body");

const pastInputs = {
  search: [],
  interval: [],
  instruction: [],
  duration: []
};

const addDrug = document.querySelector(".add-drug");

addDrug.addEventListener("click", (e) => {
  e.preventDefault();

  const search = addSearch.value;
  const interval = addInterval.value;
  const instruction = addInstruction.value;
  const duration = addDuration.value;

  const rowCount = addTable.getElementsByTagName('tr').length;
  const serialNumber = rowCount + 1;

  const [medicine, description] = search.split("\n");

  if (search && interval && instruction && duration) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${serialNumber}</td>
      <td class="tab1">${search}
        <span>
           <p>${description || 'Arthemeter'}</p>
        </span>
      <td  class="tab1">${interval}</td>
      <td class="tab1">${instruction}</td>
      <td class="tab1" >${duration}</td>
      <td><button class="Remove">Remove</button></td>
    `;
    addTable.appendChild(row);

    addToPastInputs('search', search);
    addToPastInputs('interval', interval);
    addToPastInputs('instruction', instruction);
    addToPastInputs('duration', duration);

    resetInputs();
  } else {
    alert('Please fill in all fields.');
  }
});

function addToPastInputs(inputField, value) {
  if (!pastInputs[inputField].includes(value)) {
    pastInputs[inputField].push(value);
    addToDropdown(inputField, value);
  }
}

function addToDropdown(inputField, value) {
  const dropdownList = document.getElementById(`${inputField}DropdownList`);
  const li = document.createElement('li');
  li.textContent = value;
  const lines = value.split("\n");
  li.innerHTML = lines.map(line => `<p>${line}</p>`).join("");
  li.addEventListener('click', () => {
    document.getElementById(inputField).value = value;
    document.getElementById(`${inputField}Dropdown`).style.display = 'none';
  });
  dropdownList.appendChild(li);
}

function showDropdown(inputField) {
  const inputValue = document.getElementById(inputField).value.toLowerCase();
  const dropdownList = document.getElementById(`${inputField}DropdownList`);
  dropdownList.innerHTML = '';

  const filteredInputs = pastInputs[inputField].filter(item =>
    item.toLowerCase().includes(inputValue)
  );

  filteredInputs.forEach(item => {
    addToDropdown(inputField, item);
  });

  document.getElementById(`${inputField}Dropdown`).style.display = filteredInputs.length > 0 ? 'block' : 'none';
}


addSearch.addEventListener('input', () => showDropdown('search'));
addSearch.addEventListener('focus', () => showDropdown('search'));

addInterval.addEventListener('input', () => showDropdown('interval'));
addInterval.addEventListener('focus', () => showDropdown('interval'));

addInstruction.addEventListener('input', () => showDropdown('instruction'));
addInstruction.addEventListener('focus', () => showDropdown('instruction'));

addDuration.addEventListener('input', () => showDropdown('duration'));
addDuration.addEventListener('focus', () => showDropdown('duration'));

function resetInputs() {
  addSearch.value = '';
  addInterval.value = '';
  addInstruction.value = '';
  addDuration.value = '';
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.style.display = 'none';
  });
}

