import { detecType, setStorage, detecIcon } from "./helpers.js";

const form = document.querySelector("form");
const list = document.querySelector("ul");
console.log(list);

// OLAY İZLEYİCİLERİ
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick);

// ORTAK KULLANIM ALANI
var map;
var notes = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];
var layerGroup = [];

navigator.geolocation.getCurrentPosition(
    loadMap,
    console.log("kullanıcı reddetti")
    );

    // HARİTAYA TIKLANINCA ÇALIŞIR
function onMapClick(e) {
    form.style.display = "flex";
    coords = [e.latlng.lat, e.latlng.lng];
    // console.log(coords);
 }

//  KULLANICININ KONUMUNA GÖRE HARİTAYI GETİRME
function loadMap(e){
    // console.log(e);
    // HARİTANIN KURULUMU
    map = new L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
    L.control;
    // HARİTANIN NASIL GÖRÜNECEĞİNİ BELİRLER
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// HARİTADA EKRANA BASILACAK İMLEÇLERİ TUTMA KATMANI
layerGroup = L.layerGroup().addTo(map);
renderNoteList(notes);

// HARİTAYA TIKLANDIĞINDA DİSPLAY FLEX OLACAK FONKSİYON
map.on("click", onMapClick);
}

function renderMarker (item) {
    L.marker(item.coords, { icon: detecIcon(item.status) })
    .addTo(layerGroup).bindPopup(`${item.desc}`);
}


// FORMUN GÖNDERİLME OLAYINDA ÇALIŞIR
function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const desc = e.target[0].value;
    if (!desc) return;
    const date = e.target[1].value;
    const status = e.target[2].value;
    // NOTES DİZİSİNE ELEMAN EKLEME
    notes.push({ id: new Date().getTime(), desc, date, status, coords});
    console.log(notes);
    setStorage(notes);
    renderNoteList(notes);
    form.style.display = "none"
}
// EKRANA NOTLARI BASMA
function renderNoteList(item) {
    // NOTLAR ALANINI TEMİZLER
    list.innerHTML = "";
    layerGroup.clearLayers();
    item.forEach((item) => {
       const listElement = document.createElement("li");
       
       listElement.dataset.id = item.id;
       listElement;
       listElement.innerHTML = `
       <div>
              <p>${item.desc}</p>
              <p><span>Tarih:</span>${item.date}</p>
              <p><span>Durum:</span>${detecType(item.status)}</p>
              <i class="bi bi-x" id="delete"></i>
              <i class="bi bi-airplane-fill" id="fly"></i>
            </div>
            `;
            list.insertAdjacentElement("afterbegin", listElement);
            renderMarker(item);
    });
}
function handleClick(e) {
    const id = e.target.parentElement.parentElement.dataset.id;
    
    if(e.target.id === "delete") {
        console.log(notes);
        notes = notes.filter((note) => note.id != id);
        setStorage(notes);
        renderNoteList(notes);
    }
    if(e.target.id === "fly") {
        const note = notes.find((note) => note.id == id);
        console.log(note);
        map.flyTo(note.coords); 
    }
}