# Настройка деплоя на reg.ru

## 1. Настройка секретов GitHub

В репозитории GitHub перейдите в **Settings → Secrets and variables → Actions** и добавьте:

| Секрет | Значение |
|--------|----------|
| `SSH_PASSWORD` | Ваш пароль от SSH |

Хост, порт (22) и имя пользователя уже вшиты в workflow.

### Как добавить секрет:
1. Нажмите **New repository secret**
2. Введите имя: `SSH_PASSWORD`
3. Введите ваш пароль
4. Нажмите **Add secret**

## 2. Проверка работы

Сделайте push в ветку `main` или `master`:

```bash
git add .
git commit -m "Deploy: обновить сайт"
git push origin main
```

Workflow автоматически запустится и задеплоит файлы на сервер.

## 3. Что делает workflow

1. Очищает старые файлы в `/var/www/u3416467/data/www/valkor.evgpol.ru/` (кроме скрытых и `cgi-bin/`)
2. Загружает новые: `index.html`, `styles.css`, `script.js`

## 4. Troubleshooting

### Ошибка подключения
- Проверьте пароль в секрете `SSH_PASSWORD`
- Убедитесь, что SSH-доступ включён в тарифе reg.ru

### Файлы не обновляются
- Проверьте логи во вкладке **Actions** на GitHub
