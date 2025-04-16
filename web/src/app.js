const tbody = document.querySelector('#tbody')
const saveButton = document.querySelector('#saveButton')

const idInput = document.querySelector('#id')
const nameInput = document.querySelector('#name')
const cityInput = document.querySelector('#city')
const salaryInput = document.querySelector('#salary')


//Read

const url ='http://localhost:8000/api/employees'

function getEmployees() {
    fetch(url)
.then((response) => {
   return response.json()
})
.then((result) => {
    console.log(result)
    renderTbody(result.data)
})
}

getEmployees()

function renderTbody() {
    var tbodyContent = '';
    empList.forEach((emp) =>  {
        var row = `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="btn btn-warning" onclick="deleteEmployee(${emp.id})">Törlés</button>
            </td>
            <td>
                <button class="btn btn-secondary" onclick="updateEmployee(${emp})">Szerkesztés</button>
            </td>
        
        </tr>
        `;
        tbodyContent += row;
    })
    tbody.innerHTML = tbodyContent
}

/* Create művelet */

saveButton.addEventListener('', () => {
    console.log(salaryInput.value)
    //JavaScript objektum
    const emp = {
        name: nameInput.value,
        city: cityInput.value,
        salary: salaryInput.value 
    }
    
    // console.log(emp)

    addEmployee(emp)

    clearFields()
    getEmployees()
})

function clearFields() {
    idInput.value = ''
    nameInput.value = ''
    cityInput.value = ''
    salaryInput.value = ''
}

function addEmployee(emp) {
    // console.log(emp)
    fetch(url, {
        method: 'post', 
        body: JSON.stringify(emp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

function deleteEmployee(id) {
    const delUrl = url + "/" + id;

    fetch(delUrl, { Method: "delete"})
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getEmployees()
    });
}

function updateEmployee(emp) {
    const name = this.event.target.getAttribute('data-name')
    console.log(name)
    const emp = {
        id: this.event.target('data-id'),
        name: this.event.target('data-name'),
        city: this.event.target('data-city'),
        salary: this.event.target('data-salary')
    }
    console.log(emp)
}
