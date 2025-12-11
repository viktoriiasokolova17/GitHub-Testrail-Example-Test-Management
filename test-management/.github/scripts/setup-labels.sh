#!/bin/bash

# Скрипт створення міток для системи тестування
# Використання: ./setup-labels.sh
# Вимоги: GitHub CLI (gh) встановлено та авторизовано

set -e

echo "🏷️  Створення міток для системи тестування..."
echo ""

# Основні мітки
echo "📌 Основні мітки..."
gh label create "test-case" --color "1D76DB" --description "Тест-кейс" --force
gh label create "test-run" --color "5319E7" --description "Тестовий прогін" --force
gh label create "bug" --color "D73A4A" --description "Баг" --force
gh label create "from-test" --color "FBCA04" --description "Знайдено під час тестування" --force

# Мітки тестових наборів
echo "📁 Мітки тестових наборів..."
gh label create "suite:auth" --color "C5DEF5" --description "Тести автентифікації" --force
gh label create "suite:payments" --color "C5DEF5" --description "Тести платежів" --force
gh label create "suite:users" --color "C5DEF5" --description "Тести користувачів" --force
gh label create "suite:api" --color "C5DEF5" --description "API тести" --force
gh label create "suite:performance" --color "C5DEF5" --description "Тести продуктивності" --force

# Мітки пріоритету
echo "🎯 Мітки пріоритету..."
gh label create "priority:critical" --color "B60205" --description "Критичний пріоритет" --force
gh label create "priority:high" --color "D93F0B" --description "Високий пріоритет" --force
gh label create "priority:medium" --color "FBCA04" --description "Середній пріоритет" --force
gh label create "priority:low" --color "0E8A16" --description "Низький пріоритет" --force

# Мітки типу тестів
echo "🔬 Мітки типу тестів..."
gh label create "type:functional" --color "BFD4F2" --description "Функціональний тест" --force
gh label create "type:regression" --color "BFD4F2" --description "Регресійний тест" --force
gh label create "type:smoke" --color "BFD4F2" --description "Димовий тест" --force
gh label create "type:e2e" --color "BFD4F2" --description "End-to-end тест" --force
gh label create "type:performance" --color "BFD4F2" --description "Тест продуктивності" --force
gh label create "type:security" --color "BFD4F2" --description "Тест безпеки" --force

# Мітки статусу
echo "📊 Мітки статусу..."
gh label create "status:passed" --color "0E8A16" --description "Тест пройдено" --force
gh label create "status:failed" --color "B60205" --description "Тест не пройдено" --force
gh label create "status:blocked" --color "FEF2C0" --description "Тест заблоковано" --force
gh label create "status:skipped" --color "D4C5F9" --description "Тест пропущено" --force
gh label create "status:retest" --color "F9D0C4" --description "Потрібно перетестувати" --force

# Мітки автоматизації
echo "🤖 Мітки автоматизації..."
gh label create "automated" --color "006B75" --description "Автоматизований тест" --force
gh label create "manual" --color "E99695" --description "Ручний тест" --force
gh label create "to-automate" --color "D4C5F9" --description "Планується автоматизація" --force

# Мітки середовища
echo "🌍 Мітки середовища..."
gh label create "Development" --color "EDEDED" --description "Середовище розробки" --force
gh label create "Staging" --color "EDEDED" --description "Staging середовище" --force
gh label create "UAT" --color "EDEDED" --description "UAT середовище" --force
gh label create "Production" --color "EDEDED" --description "Production середовище" --force

# Мітки серйозності багів
echo "🐛 Мітки серйозності..."
gh label create "severity:critical" --color "B60205" --description "Критична - система не працює" --force
gh label create "severity:major" --color "D93F0B" --description "Висока - функціонал зламаний" --force
gh label create "severity:minor" --color "FBCA04" --description "Середня - є обхідний шлях" --force
gh label create "severity:trivial" --color "0E8A16" --description "Низька - косметична" --force

echo ""
echo "✅ Мітки створено успішно!"
echo ""
echo "Наступні кроки:"
echo "1. Створіть GitHub Project для управління тестами"
echo "2. Додайте custom fields: Статус тесту, Пріоритет, Набір"
echo "3. Створіть views для різних станів тестів"
