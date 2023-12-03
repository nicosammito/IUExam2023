const companyTab = document.querySelector("#tcompany");
let tmod = document.getElementById("tmodel");
let tdef = document.getElementById("tdefect");


const hidecontent = () => {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (tabcontent of tabcontent) {
    tabcontent.style.display = "none"
  }
}

const openTab = (tab) => {
   
   const tabID = tab.id
   const tabContent = document.querySelectorAll(`.tabcontent[attr-tab="${tabID}"]`)[0]
   const tabContents = document.querySelectorAll(".tabcontent")

   tabContents.forEach((tabContent) => {
     tabContent.classList.remove("active")
   })

   tabContent.classList.add("active")
   
   const tabLinks = document.querySelectorAll(".tablinks")
  
   tabLinks.forEach((tabLink) => {
    tabLink.classList.remove("active")
  })
   tab.classList.add("active")
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
    console.log(json)
  })
}