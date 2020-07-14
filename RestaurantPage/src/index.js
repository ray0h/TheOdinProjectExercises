import headerLoad from './header'
import navLoad from './navbar'
import frontPageLoad from './frontPage'
import menuLoad from './menuPage'
import visitLoad from './visitPage'
import aboutLoad from './aboutPage'

// generate and load navbar before adding event handlers
navLoad();
headerLoad();
frontPageLoad();

let homeBtn = document.getElementById("home")
let menuBtn = document.getElementById("menu")
let visitBtn = document.getElementById("visit")
let aboutBtn = document.getElementById("about")

homeBtn.onclick=frontPageLoad;
menuBtn.onclick=menuLoad;
visitBtn.onclick=visitLoad;
aboutBtn.onclick=aboutLoad;
