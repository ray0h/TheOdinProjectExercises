const headerLoad = function () {
  let container = document.getElementById("nav-head-cont")

  let headerCont = document.createElement('div')
  headerCont.id = "header-container"

  let bobaTeaImg = document.createElement('img')
  bobaTeaImg.src = "/dist/images/bubble-tea.jpg"
  bobaTeaImg.alt = "Bubble tea"
  bobaTeaImg.id = "logo1"

  let beerImg = document.createElement('img')
  beerImg.src = "/dist/images/beer.jpg"
  beerImg.alt = "Glass of Beer"
  beerImg.id = "logo2"

  let header = document.createElement('h1')
  header.textContent = "Boba and Brews"

  headerCont.appendChild(bobaTeaImg)
  headerCont.appendChild(header)
  headerCont.appendChild(beerImg)

  container.appendChild(headerCont)
}

export default headerLoad