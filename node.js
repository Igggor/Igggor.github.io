let tg = window.Telegram.WebApp;
tg.expand()
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
tg.MainButton.setText("Отправить форму");


Telegram.WebApp.onEvent("mainButtonClicked", function(){
    let data = {};

    var e = document.getElementById("Home_model");
    var text = e.options[e.selectedIndex].text;
    data["Home_model"] = text
    
    e = document.getElementById("mont_type");
    text = e.options[e.selectedIndex].text;
    data["mont_type"] = text;

    e = document.getElementById("obr_type");
    text = e.options[e.selectedIndex].text;
    data["obr_type"] = text;

    text = document.getElementById("user").val();
    data["user"] = text;

    text = document.getElementById("worker").val();
    data["worker"] = text;

    text = document.getElementById("mounter").val();
    data["mounter"] = text;

    text = document.getElementById("adress").val();
    data["adress"] = text;

    text = document.getElementById("obr_type").val();
    data["obr_type"] = text;

    text = document.getElementById("comm").val();
    data["comm"] = text;
    document.getElementById("drive_date").addEventListener("change", function() {
        var input = this.value;
        data["drive_date"] = input; });
    
    document.getElementById("KS_date").addEventListener("change", function() {
        var input = this.value;
        data["KS_date"] = input; });
    


    var fs = require("fs");
    fs.writeFile("data.json", data, (err) => {
        if (err) throw err;
        console.log("All right!");
    });


    tg.sendData("Ваша форма отправлена");
});


let but = document.getElementById("bubu");
but.addEventListener("click", function(){
    but.setText("ПРИВЕТ");
});

let drop1 = document.getElementById("Home_model");
let drop2 = document.getElementById("mont_type");
let drop3 = document.getElementById("obr_type");


// Открыть файл
// Получить из файла данные для дроплистов
