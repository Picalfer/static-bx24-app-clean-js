document.addEventListener("DOMContentLoaded", function () {
    // Инициализация Битрикс24
    BX24.init(function () {
        console.log("Приложение инициализировано");

        // Получаем данные авторизации
        const authData = BX24.getAuth();
        console.log("Данные авторизации:", authData);

        // Обработчик кнопки "Получить задачи"
        document.getElementById("makeTask").addEventListener("click", function () {
            makeTask();
        });
    });
});

// Функция для получения списка задач
function makeTask() {
    BX24.callMethod("tasks.task.add", {
            fields: {
                TITLE: "test",
                DESCRIPTION: "test description",
                RESPONSIBLE_ID: 1
            }
        }
    );
}