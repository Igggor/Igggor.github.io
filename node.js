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
        var test = new Date(input);
        alert(test)
        data["drive_date"] = input; });
    
    document.getElementById("KS_date").addEventListener("change", function() {
        var input = this.value;
        data["KS_date"] = input; });
    
    
    // tg.sendData(data);
    let s = "";
    s += data["user"] + '\n' + data["worker"] + '\n' + data["mounter"] + '\n' + data["drive_date"] + '\n' + data["KS_date"] + '\n' + data["Home_model"] + '\n' + data["mont_type"] + '\n' + data["adress"] + '\n' + data["adress"] + '\n' + data["comm"];
    tg.sendData(s);
    alert(s);
    tg.close();
    

});