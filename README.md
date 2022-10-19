Работа с файловой системой в Node.js, парсинг аргументов командной строки на примере работы со списком контактов (в формате JSON)

# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list

Скрин: https://ibb.co/KqL7zdX

# Получаем контакт по id

node index.js --action get --id 5

Скрин: https://ibb.co/y6yL0Jq

# Добавляем контакт и выводим новый список контактов в виде таблицы (console.table). Добавлена проверка, не позволяющая сохранить контакт с именем уже существующего в базе

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

Скрин: https://ibb.co/V2qQ7D9

# Удаляем контакт и выводим новый список контактов в виде таблицы (console.table). Добавлена проверка наличия в базе контакта с введенным id

node index.js --action remove --id=3

Скрин: https://ibb.co/HKWTMqM
