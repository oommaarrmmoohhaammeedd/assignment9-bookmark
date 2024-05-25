var siteNameInput = document.getElementById("siteName")
var siteUrlInput = document.getElementById("siteUrl")


var site = []
if (localStorage.getItem("saveSite") !== null) {
    site = JSON.parse(localStorage.getItem("saveSite"))
    displaySite()
}

function addSite() {
    if (validName() == true && validUrl() == true) {
        var addSite = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        }
        site.push(addSite)

        localStorage.setItem("saveSite", JSON.stringify(site))

        displaySite()

        clearForm()
    }
}

function clearForm() {
    siteNameInput.value = null
    siteUrlInput.value = null
}

function displaySite() {
    var cartona = ""
    for (i = 0; i < site.length; i++) {
        cartona += `
        
        <tr>
        <td>${i + 1}</td>
        <td>${site[i].name}</td>
        <td><button onclick="visitSite(${i})" class="btn btn-success px-4"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger px-4"> <i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>
        
        `
    }
    document.getElementById("display").innerHTML = cartona
}


function visitSite(indexOf) {
    window.open(site[indexOf].url,'_blank');
}


function deleteSite(deleteIt) {
    site.splice(deleteIt, 1)

    localStorage.setItem("saveSite", JSON.stringify(site))

    displaySite()
}


function validName() {
    var text = siteNameInput.value
    var regex = /^.{3,}$/
    var msgName = document.getElementById("msgName")
    if (regex.test(text) == true) {
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
        msgName.classList.add("d-none")
        return true
    }
    else {
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("is-valid")
        msgName.classList.remove("d-none")
    }
    return false
}


function validUrl() {
    var text = siteUrlInput.value
    var regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    var msgUrl = document.getElementById("msgUrl")
    if (regex.test(text) == true) {
        siteUrlInput.classList.add("is-valid")
        siteUrlInput.classList.remove("is-invalid")
        msgUrl.classList.add("d-none")
        return true
    }
    else {
        siteUrlInput.classList.add("is-invalid")
        siteUrlInput.classList.remove("is-valid")
        msgUrl.classList.remove("d-none")
    }
    return false
}
