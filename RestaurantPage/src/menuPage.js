const menuLoad = function() {
  
  function subCardGenerator(array, container) {
    let listHeader = document.createElement('h4')
    listHeader.textContent = array[0]
    container.appendChild(listHeader)
    array.forEach(function(item, ind) {
      if (ind !== 0) {
        let card = document.createElement('div')
        card.className="card"
        card.textContent=item
        container.appendChild(card)
      }
    })
  }
  
  let cont = document.getElementById("content")
  cont.innerHTML = ""

  let menucont = document.createElement('div')
  let beercont = document.createElement('div')
  let teacont = document.createElement('div')
  let coffeecont = document.createElement('div')
  let misccont = document.createElement('div')

  menucont.classList.add("mainCard")
  menucont.classList.add("menu")

  let teas = ["Bubble Teas", "thai", "milk tea(black)","peach oolong", "mango green", "apple green"]
  let beers = ["Beers", "pale ale", "ipa", "stout", "lager", "hefeweizen", "shandy"]
  let coffees = ["Coffees", "drip", "cafe au lait", "espresso", "cafe latte", "cafe mocha", "macchiato"]
  let misc = ["Misc", "chai latte", "hot chocolate", "hot tea(various)", "wine"]

  subCardGenerator(teas, teacont)
  subCardGenerator(coffees, coffeecont)
  subCardGenerator(beers, beercont)
  subCardGenerator(misc, misccont)

  menucont.append(teacont)
  menucont.append(coffeecont)
  menucont.append(beercont)
  menucont.append(misccont)
  cont.appendChild(menucont)
}

export default menuLoad