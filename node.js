angular.module("custom-webapp-ui", []).controller('CustomUIController', function CustomUIController($scope, $http) {
    $scope.lines = [
        { name: "Фамилия заказчика", value: "", showSuggestions: false, suggestions: [] },
        { name: "Имя и Отчество заказчика", value: "" },
        { name: "Адрес выполнения", value: "" },
        { name: "Дата в формате ДД.ММ.ГГГГ", value: "" }
    ];
    $scope.mediaFiles = [];

    const mainButton = window.Telegram.WebApp.MainButton;
    mainButton.text = "Save Preferences";
    mainButton.enable();
    mainButton.show();

    mainButton.onClick(async function(){
        const filesData = await Promise.all($scope.mediaFiles.map(file => toBase64(file)));
        const data = {
            lines: $scope.lines,
            mediaFiles: filesData
        };
        console.log("Sending data:", JSON.stringify(data));  // Debug output
        window.Telegram.WebApp.sendData(JSON.stringify(data));
    });

    $scope.onInputChange = function(line) {
        if (line.name === "Фамилия заказчика" && line.value.length > 2) {
            searchUsers(line.value).then(users => {
                line.suggestions = users;
                line.showSuggestions = true;
                $scope.$apply();
            });
        } else {
            line.showSuggestions = false;
        }
    };

    $scope.onInputFocus = function(line) {
        if (line.suggestions.length > 0) {
            line.showSuggestions = true;
        }
    };

    $scope.selectSuggestion = function(line, suggestion) {
        $scope.lines[0].value = suggestion.LAST_NAME;
        $scope.lines[1].value = `${suggestion.NAME} ${suggestion.SECOND_NAME}`;
        $scope.lines[2].value = suggestion.ADDRESS || ""; // Assuming you have an ADDRESS field
        line.showSuggestions = false;
    };

    function applyTheme() {
        const theme = window.Telegram.WebApp.colorScheme;
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    applyTheme();
    window.Telegram.WebApp.onEvent('themeChanged', applyTheme);

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({
                name: file.name,
                type: file.type,
                data: reader.result
            });
            reader.onerror = error => reject(error);
        });
    }

    async function searchUsers(substring) {
        const webhookUrl = 'https://stv-terem.bitrix24.ru/rest/82/54ipf3xuj9n4sr61/crm.contact.list.json';

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                select: ['NAME', 'LAST_NAME', 'SECOND_NAME', 'ADDRESS']
            })
        });

        if (!response.ok) {
            throw new Error('Ошибка при запросе к API Битрикса');
        }

        const data = await response.json();
        if (!data.result) {
            throw new Error('Нет данных от API Битрикса');
        }

        const regex = new RegExp(substring, 'i');
        return data.result.filter(user => {
            const firstName = user.NAME || '';
            const lastName = user.LAST_NAME || '';
            const secondName = user.SECOND_NAME || '';
            return regex.test(firstName) || regex.test(lastName) || regex.test(secondName);
        });
    }
});
