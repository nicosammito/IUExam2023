const openTab = (tabID) => {

    const tabContent = document.querySelector(`.tabcontent[attr-tab="${tabID}"]`)
    const tabContents = document.querySelectorAll(".tabcontent")
    const tabLink = document.querySelector(`.tablinks#${tabID}`)
    const tabLinks = document.querySelectorAll(".tablinks")


    tabContents.forEach((tabContent) => {
        tabContent.classList.remove("active")
    })

    tabContent.classList.add("active")


    tabLinks.forEach((tabLink) => {
        tabLink.classList.remove("active")
    })
    tabLink.classList.add("active")
}

const fetchCompany = () => {
    fetch("https://iu-backend.onrender.com/manufacturer/", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        return response.json()
    }).then((json) => {
        json.response.manufacturers.forEach(manufacturer => {
            addCompany(manufacturer)
        })
    })
}

fetchCompany();
const addCompany = (dataCompany) => {

    const tabContentCompany = document.querySelector('.tabcontent[attr-tab="company"]')    //

    const button = document.createElement("button")
    button.classList.add("intab-button", "btn")

    button.addEventListener("click", () => {
        fetchDevices(dataCompany.slug)
        openTab("devices")
    })

    const icon = document.createElement("i");
    icon.classList.add("ti", `ti-${dataCompany.icon}`)

    const name = document.createElement("span")
    name.innerText = dataCompany.name

    button.appendChild(icon)
    button.appendChild(name)

    tabContentCompany.appendChild(button)

}

const fetchDevices = (manufacturer) => {
    fetch(`https://iu-backend.onrender.com/manufacturer/${manufacturer}/devices`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
        //TODO: set device into HTML
    })
}