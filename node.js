// AngularJS controller code
angular.module("custom-webapp-ui", []).controller('CustomUIController', function CustomUIController($scope, $http) {
    $scope.lines = [
        { name: "Фамилия заказчика", value: "", showSuggestions: false, suggestions: [], selectedUserId: null },
        { name: "Имя и Отчество заказчика", value: "" },
        { name: "Адрес выполнения", value: "" },
        { name: "Дата в формате ДД.ММ.ГГГ", value: "" }
    ];
    $scope.mediaFiles = [];

    const mainButton = window.Telegram.WebApp.MainButton;
    mainButton.text = "Добавить фото/видео";
    mainButton.enable();
    mainButton.show();

    mainButton.onClick(async function(){
        const filesData = await Promise.all($scope.mediaFiles.map(file => toBase64(file)));

        // Фильтрация заполненных полей
        const filledLines = $scope.lines.filter(line => line.value.trim() !== "").map(line => ({
            name: line.name,
            value: line.value
        }));

        const out = {
            lines: filledLines,
            mediaFiles: filesData,
            selectedUserId: $scope.lines[0].selectedUserId  // Передаем ID пользователя
        };
        console.log("Sending data:", JSON.stringify(out));  // Debug output
        try {
            window.Telegram.WebApp.sendData(JSON.stringify(out));
        } catch (error) {
            console.error("Error sending data:", error);  // Debug output
        }
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
        $scope.lines[0].selectedUserId = suggestion.ID;  // Сохраняем ID пользователя
        line.showSuggestions = false;
        console.log("Selected suggestion:", suggestion);  // Debug output
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
});


async function searchUsers(substring) {
    const webhookUrl = 'https://stv-terem.bitrix24.ru/rest/82/54ipf3xuj9n4sr61/crm.contact.list.json';

    async function fetchUsers(filter) {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter,
                select: ['ID', 'NAME', 'LAST_NAME', 'SECOND_NAME']
            })
        });

        if (!response.ok) {
            throw new Error('Ошибка при запросе к API Битрикса');
        }

        const data = await response.json();
        if (!data.result) {
            throw new Error('Нет данных от API Битрикса');
        }

        return data.result;
    }

    const [lastNameResults, nameResults, secondNameResults] = await Promise.all([
        fetchUsers({ '%LAST_NAME': substring }),
        fetchUsers({ '%NAME': substring }),
        fetchUsers({ '%SECOND_NAME': substring })
    ]);

    // Объединение результатов и удаление дубликатов
    const combinedResults = [...lastNameResults, ...nameResults, ...secondNameResults];
    const uniqueResults = combinedResults.filter((user, index, self) =>
        index === self.findIndex((t) => (
            t.ID === user.ID
        ))
    );

    console.log('Combined unique results from Bitrix:', uniqueResults);  // Debug output

    return uniqueResults;
}
