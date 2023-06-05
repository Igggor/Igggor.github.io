let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.hide();
tg.MainButton.textColor = "#FFFFFF"; //изменяем цвет текста кнопки
tg.MainButton.color = "#2cab37"; //изменяем цвет бэкграунда кнопки
tg.MainButton.setText("Отправить форму");
tg.MainButton.show();

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

    

    data["user"] = document.getElementById("user").value;


    data["worker"] = document.getElementById("worker").value;


    data["mounter"] = document.getElementById("mounter").value;


    data["adress"] = document.getElementById("adress").value;


    data["obr_type"] = document.getElementById("obr_type").value;


    data["comm"] = document.getElementById("comm").value;

    document.getElementById("drive_date").addEventListener("change", function() {
        var input = this.value;
        data["drive_date"] = input; });
    alert( data["drive_date"]);
    
    
    
    document.getElementById("KS_date").addEventListener("change", function() {
        var input = this.value;
        data["KS_date"] = input; });
    alert( data["KS_date"]);
    
    


    // var fs = require("fs");
    // fs.writeFile("data.json", data, (err) => {
    //     if (err) throw err;
    //     console.log("All right!");
    // });
    
    tg.sendData(data);
    tg.close();
    

});

// tg.MainButton.onClick(callback) = function(){
//     let data = {};

//     var e = document.getElementById("Home_model");
//     var text = e.options[e.selectedIndex].text;
//     data["Home_model"] = text
    
//     e = document.getElementById("mont_type");
//     text = e.options[e.selectedIndex].text;
//     data["mont_type"] = text;
    
//     e = document.getElementById("obr_type");
//     text = e.options[e.selectedIndex].text;
//     data["obr_type"] = text;
    

//     data["user"] = document.getElementById("user").value;
    
//     data["worker"] = document.getElementById("worker").value;

//     data["mounter"] = document.getElementById("mounter").value;

//     data["adress"] = document.getElementById("adress").value;
    
//     data["obr_type"] = document.getElementById("obr_type").value;

//     data["comm"] = document.getElementById("comm").value;


//     document.getElementById("drive_date").addEventListener("change", function() {
//         var input = this.value;
//         data["drive_date"] = input; });
    
    
//     document.getElementById("KS_date").addEventListener("change", function() {
//         var input = this.value;
//         data["KS_date"] = input; });   
//     let s = ""
//     tg.sendData("data"); 
//     tg.close()
//     tg.sendData("some string that we need to send");
//     tg.MainButton.color = "#FFFFFF";

//     }


// let drop1 = document.getElementById("Home_model");
// let drop2 = document.getElementById("mont_type");
// let drop3 = document.getElementById("obr_type");


// Открыть файл
// Получить из файла данные для дроплистов