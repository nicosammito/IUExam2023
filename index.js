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

    const tabContentCompany = document.querySelector('.tabcontent[attr-tab="manufacturers"]')

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
        const tabContentDevice = document.querySelector('.tabcontent[attr-tab="devices"]')
        tabContentDevice.innerHTML = ""
        json.response.forEach(device => {
            addDevice(device)
        })
    })
}

const addDevice = (dataDevice) => {

    const tabContentDevice = document.querySelector('.tabcontent[attr-tab="devices"]')

    const button = document.createElement("button")
    button.classList.add("intab-button", "btn")

    button.addEventListener("click", () => {
        fetchComponents(dataDevice.manufacturer, dataDevice.slug)
        openTab("components")
    })

    const name = document.createElement("span")
    name.innerText = dataDevice.name

    button.appendChild(name)

    tabContentDevice.appendChild(button)
}

const fetchComponents = (manufacturer, device) => {
    fetch(`https://iu-backend.onrender.com/manufacturer/${manufacturer}/devices/${device}/components`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        return response.json()
    }).then((json) => {
        const tabContentComponent = document.querySelector('.tabcontent[attr-tab="components"]')
        tabContentComponent.innerHTML = ""
        json.response.forEach(component => {
            addComponent(component, json.response)
        })
    })
}

const addComponent = (dataComponent, components) => {

    const tabContentComponent = document.querySelector('.tabcontent[attr-tab="components"]')

    const button = document.createElement("button")
    button.classList.add("intab-button", "btn")

    button.addEventListener("click", () => {
        const componentsSection = document.querySelector("#searchedComponents")
        componentsSection.innerHTML = ""
        //TODO: load component with prices
        components.filter(component => {
            return component.type === dataComponent.type
        }).forEach(component => {

            console.log(component)

            const componentDiv = document.createElement("div")
            componentDiv.classList.add("component")

            const componentIcon = document.createElement("div")
            componentIcon.classList.add("component__icon")

            const Icon = document.createElement("i")
            Icon.classList.add("ti", "ti-device-mobile")

            componentIcon.appendChild(Icon)
            componentDiv.appendChild(componentIcon)

            const componentInfo = document.createElement("div")
            componentInfo.classList.add("component__info")

            const componentHeading = document.createElement("h4")
            componentHeading.classList.add("component__heading")

            const componentSpan = document.createElement("span")
            componentSpan.innerHTML = component.type

            const componentPrice = document.createElement("h5")
            componentPrice.innerHTML = `${component.price}€`

            componentHeading.appendChild(componentSpan)
            componentHeading.appendChild(componentPrice)

            const componentDesc = document.createElement("p")
            componentDesc.classList.add("component__desc")
            componentDesc.innerHTML = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\n" +
                "                    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."

            componentInfo.appendChild(componentHeading)
            componentInfo.appendChild(componentDesc)
            componentDiv.appendChild(componentInfo)

            const button = document.createElement("button")
            button.classList.add("component__action")
            button.addEventListener("click", () => {
                const object = {
                    price: component.price,
                    description: component.description,
                    type: component.type
                }

                if (!localStorage.getItem("bucket"))
                    localStorage.setItem("bucket", JSON.stringify([]))


                const bucket = JSON.parse(localStorage.getItem("bucket"));
                bucket.push(object)
                localStorage.setItem("bucket", JSON.stringify(bucket))
            })

            const btnIcon = document.createElement("i")
            btnIcon.classList.add("ti", "ti-shopping-cart")

            button.appendChild(btnIcon)
            componentDiv.appendChild(button)
            componentsSection.appendChild(componentDiv)
        })
    })

    const type = document.createElement("span")
    type.innerText = dataComponent.type

    button.appendChild(type)
    tabContentComponent.appendChild(button)
}