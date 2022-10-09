// console.log(typeof undefined)
// console.log(typeof '')



function notiAddSuccess() {
    document.getElementById("missInformation").innerHTML = 'Added successfull !'
    document.getElementById("missInformation").style.color = 'yellow'
    document.querySelector(".notification").style.display = 'block'
}

function missInformation() {
    document.getElementById("submitSuccess").innerHTML = 'Information is invalid ! cannot add !'
    document.getElementById("submitSuccess").style.color = 'white'
    document.querySelector(".notification").style.display = 'block'
    // document.querySelector(".notification").style.display = 'none'
    // document.querySelector(".notification").style.color = 'yellow'
}

//////////////////////////////////////////////////////////////////////////////////

function submitButton() {

    validateForm()
    renderlistStudent()

}

function validateForm() {


    var fullName = document.getElementById('fullName').value
    var email = document.getElementById('email').value
    var phone = document.getElementById('phone').value
    var sexual = document.getElementById('sexual').value



    // check each item value
    if(_.isEmpty(fullName)) {
        document.getElementById('errorFullName').innerHTML = 'FullName is Empy'
        document.getElementById('fullName').value = ''
        // testRegex(fullName)
    } else document.getElementById('errorFullName').innerHTML = ''

    if(_.isEmpty(email)) {
        document.getElementById('errorEmail').innerHTML = 'Email is Empy'
        document.getElementById('email').value = ''
    } else document.getElementById('errorEmail').innerHTML = ''

    if(_.isEmpty(phone)) {
        document.getElementById('errorPhone').innerHTML = 'Phone is Empy'
        document.getElementById('phone').value = ''
    } else document.getElementById('errorPhone').innerHTML = ''

    if(_.isEmpty(sexual)) {
        document.getElementById('errorSexual').innerHTML = 'Sexual is Empy'
        document.getElementById('sexual').value = ''
    } else document.getElementById('errorSexual').innerHTML = ''


    if(fullName && email && phone && sexual) {
        addStudentToLocal()
        notiAddSuccess()
        
    } else {
        missInformation()
    }
}







function addStudentToLocal() {

    let fullName = document.getElementById('fullName').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let sexual = document.getElementById('sexual').value
   
    let student = {
        fullName: fullName,
        email: email,
        phone: phone,
        sexual: sexual
    }

    // console.log(localStorage)
    var listStudent = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : []
    listStudent.push(student)
    console.log(listStudent)
    localStorage.setItem('key', JSON.stringify(listStudent))
}






function renderlistStudent() {
    var listStudent = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : []
    // console.log(listStudent)
    // console.log(listStudent.splice(3,1))
    // console.log(listStudent)

    var tableinfo = 
    `
    <tr>
    <th>STT</th>
    <th class="title">Full Name</th>
    <th class="title">Email</th>
    <th class="title">phone</th>
    <th class="title">Gioi Tinh</th>
    <th class="title">Action</th>
</tr>
    `
    listStudent.map(function(value, index){
        // console.log(value)
        tableinfo += `
        <tr>
    <td>${index + 1}</td>
    <td class="title">${value.fullName}</td>
    <td class="title">${value.email}</td>
    <td class="title">${value.phone}</td>
    <td class="title">${value.sexual}</td>
    <td class="title"> <button onclick="editUser(${index})"> Edit </button> | <button onclick="deleteUser(${index})"> Delete </button> </td>
</tr>
        `
    })

    document.getElementById('table-info').innerHTML = tableinfo

}

function editUser(index) {
    document.getElementById('submitBtn').style.display = 'none'
    document.getElementById('update').style.display = 'block'

    let listStudent = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : []
    document.getElementById("fullName").value = listStudent[index].fullName
    document.getElementById("email").value = listStudent[index].email
    document.getElementById("phone").value = listStudent[index].phone
    document.getElementById("sexual").value = listStudent[index].sexual
    document.getElementById("updateStudent").value = index
    // console.log(document.getElementById("updateStudent").value)
    document.getElementById("update").style.display = 'block'
    // updateUSer()
}



function updateUSer() {

    console.log('dang update')
    let listStudent = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : []
    let indexChange = document.getElementById("updateStudent").value
    console.log(indexChange)
    // console.log('list1' +  JSON.stringify(listStudent))
    listStudent[indexChange] = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        sexual: document.getElementById("sexual").value
    }

    console.log(listStudent[indexChange])
    console.log(JSON.stringify(listStudent))
    // console.log('list2' +  JSON.stringify(listStudent))
    localStorage.setItem('key', JSON.stringify(listStudent))
    renderlistStudent()
    //clear form
    document.getElementById("fullName").value = ''
    document.getElementById("email").value = ''
    document.getElementById("phone").value = ''
    document.getElementById("sexual").value = ''
    // hidden button
    document.getElementById('update').style.display = 'none'
    document.getElementById('submitBtn').style.display = 'block'

}

function deleteUser(index) {
    // console.log(index)
    let listStudent = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : []
    // console.log(listStudent)
    listStudent.splice(index,1)
    // console.log(listStudent)
    localStorage.setItem('key', JSON.stringify(listStudent))
    // console.log(localStorage)
    renderlistStudent()

}
