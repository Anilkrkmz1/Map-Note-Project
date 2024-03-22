export const detecType = (type) => {
    switch (type) {
        case "park":
            return "Park yeri";
        case "home":
            return "Ev";
        case "job":
            return "İş";
        case "goto":
            return "Ziyaret";
    }
};


export const setStorage = (data) => {
    const strData = JSON.stringify(data)
    localStorage.setItem("notes", strData);
};

var carIcon = L.icon({
    iconUrl: "car.png",
    iconSize: [50, 50],
});
var homeIcon = L.icon({
    iconUrl: "home-marker.png",
    iconSize: [50, 50],
});
var jobIcon = L.icon({
    iconUrl: "job.png",
    iconSize: [50, 50],
});
var visitIcon = L.icon({
    iconUrl: "visit.png",
    iconSize: [50, 50],
});

export function detecIcon(type){
    console.log(type);
    switch (type){
        case "park":
            return carIcon;
        case "home":
            return homeIcon;
        case "job":
            return jobIcon;
        case "goto":
            return visitIcon;
    }
}