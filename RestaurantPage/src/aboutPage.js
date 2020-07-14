const aboutLoad = function() {
  let cont = document.getElementById("content")
  cont.innerHTML = ""

  let aboutCont = document.createElement('div')
  aboutCont.classList.add("mainCard")
  let aboutFoo = document.createElement('p')
  let aboutInfo = document.createElement('span')
  let link = document.createElement('a')
  aboutFoo.textContent="Etiam sit amet sem ornare, ullamcorper lorem suscipit, congue orci."
  aboutInfo.textContent = "Fake Establishment created by ray0h for "
  link.href = "https://www.theodinproject.com/courses/javascript/lessons/restaurant-page"
  link.textContent="The Odin Project"
  aboutCont.appendChild(aboutFoo)
  aboutInfo.appendChild(link)
  aboutCont.appendChild(aboutInfo)

  cont.appendChild(aboutCont)
}

export default aboutLoad