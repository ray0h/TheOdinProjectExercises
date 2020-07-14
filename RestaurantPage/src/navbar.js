const navLoad = function () {
  let container = document.getElementById("nav-head-cont")

  let navids = ["home", "menu", "visit", "about"]
  let nav = document.createElement('nav')
  nav.id = "navbar"
  let list = document.createElement('ul')

  navids.forEach(function(id) {
    let item = document.createElement('li')
    let btn = document.createElement('button')
    btn.id = id
    btn.textContent = id
    item.appendChild(btn)
    list.appendChild(item)
  })

  nav.appendChild(list)
  container.appendChild(nav)
}

export default navLoad