document.addEventListener("DOMContentLoaded", function () {
    // Инициализация Битрикс24
    BX24.init(function () {
        console.log("Приложение инициализировано");

        // Получаем данные авторизации
        const authData = BX24.getAuth();
        console.log("Данные авторизации:", authData);

        // Обработчик кнопки "Получить задачи"
        document.getElementById("actionButton").addEventListener("click", function () {
            doAction();
        });
    });
});

// Функция для получения списка задач
function doAction() {
    makeTask();
}

async function makeTask() {
    try {
        let id = await getUserId(); // Ждем получения ID
        console.log(id); // Теперь id будет правильным
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
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                    reject(result.error()); // Отклоняем промис в случае ошибки
                } else {
                    const id = result.data().ID; // Получаем ID
                    console.log(id);
                    resolve(id); // Разрешаем промис с ID
                }
            }
        );
    });
}
