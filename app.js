document.addEventListener("DOMContentLoaded", function () {
    // Инициализация Битрикс24
    BX24.init(function () {
        console.log("Приложение инициализировано");

        // Получаем данные авторизации
        const authData = BX24.getAuth();
        console.log("Данные авторизации:", authData);

        // Обработчик кнопки "Получить задачи"
        document.getElementById("createTaskButton").addEventListener("click", function () {
            makeTask();
        });

        // Обработчик кнопки "Получить фамилию"
        document.getElementById("getLastNameButton").addEventListener("click", function () {
            getLastName();
        });

        // Обработчик кнопки "Поменять фамилию"
        document.getElementById("setLastNameButton").addEventListener("click", function () {
            setLastName();
        });
    });
});

// Функция для получения списка задач
function getLastName() {
    BX24.callMethod("user.current", {}, function (result) {
        if (result.error()) {
            console.error(result.error());
        } else {
            console.log(result.data().LAST_NAME);
        }
    });
}

// Функция для изменения фамилии на "новая фамилия"
function setLastName() {
    BX24.callMethod("user.current", {}, function (result) {
        if (result.error()) {
            console.error(result.error());
        } else {
            console.log(result.data().LAST_NAME);
            // используем метод user.update,не user.userfield.update
            BX24.callMethod("user.update", {
                // важно написать именно ID, не id
                ID: result.data().ID, // тут можно хардкодом написать id, например 1 (без ковычек)
                // тут пишем сразу поле, не fields {LAST_NAME: "новая фамилия"}
                LAST_NAME: "новейшая фамилия"
            }, function (result) {
                console.log(result);
            });
        }
    });
}

async function makeTask() {
    try {
        let id = await getUserId(); // Ждем получения ID
        BX24.callMethod("tasks.task.add", {
            fields: {
                TITLE: "test",
                DESCRIPTION: "test description",
                RESPONSIBLE_ID: id // Используем полученный ID
            }
        });
    } catch (error) {
        console.error("Ошибка при получении ID:", error);
    }
}

async function getUserId() {
    return new Promise((resolve, reject) => {
        BX24.callMethod(
            "user.current",
            {},
            function (result) {
                if (result.error()) {
                    console.error(result.error());
                    reject(result.error()); // Отклоняем промис в случае ошибки
                } else {
                    const id = result.data().ID; // Получаем ID
                    console.log("ID пользователя:", id);
                    resolve(id); // Разрешаем промис с ID
                }
            }
        );
    });
}
