const frontPageLoad = function () {
  let cont = document.getElementById("content")
  cont.innerHTML = ""

  let para1 = document.createElement('p')
  let para2 = document.createElement('p')
  let pcont = document.createElement('div')
  pcont.className="mainCard"
  para1.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non efficitur metus. Donec ultricies, nisl vitae tempor molestie, nibh nunc lacinia dui, quis tincidunt felis enim porttitor orci. Donec vel aliquet erat, quis eleifend justo. Nullam erat ante, ullamcorper vel tellus ac, tincidunt lacinia turpis. Morbi pulvinar volutpat neque, ac hendrerit leo iaculis id. Nam sed mollis justo, auctor rhoncus mi. Duis auctor enim elementum, egestas purus nec, rutrum ante. Sed commodo, nunc eu ullamcorper venenatis, eros dolor pharetra felis, in mattis tellus ante lobortis sem. Praesent vehicula dolor nibh. "
  para2.textContent = "Duis venenatis lacinia lorem, non consectetur lectus dignissim sit amet. Nunc vitae nisi eu dolor scelerisque viverra. Quisque ut quam eros. Suspendisse potenti. Sed tempor maximus dui vitae aliquet. Mauris sit amet risus et augue ultricies molestie. Nullam ut fermentum ex."
  pcont.appendChild(para1)
  pcont.appendChild(para2)
  cont.appendChild(pcont)
}

export default frontPageLoad