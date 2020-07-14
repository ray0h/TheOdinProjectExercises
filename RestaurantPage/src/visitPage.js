const visitLoad = function () {

  let cont = document.getElementById("content")
  cont.innerHTML = ""

  let info = document.createElement('div')
  info.className = "mainCard"

  let hours = document.createElement('p')
  let phone = document.createElement('p')
  let address = document.createElement('p')
  let greeting = document.createElement('h2')
  hours.textContent = "Tues-Sat, 7am-9pm, Su 12pm-9pm"  
  phone.textContent = "555-555-5555"
  address.textContent = "123 Sesame St, SomeTown, SomeState, 12345"
  greeting.textContent = "Visit Us!"
  info.appendChild(greeting)
  info.appendChild(hours)
  info.appendChild(phone)
  info.appendChild(address)
  cont.appendChild(info)
}

export default visitLoad