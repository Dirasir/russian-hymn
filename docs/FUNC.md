# Описание функций и примеры вызова

## Функция activate(context)

**Назначение:** Активирует расширение при его запуске в VS Code

**Параметры:**
- `context` (vscode.ExtensionContext) - контекст расширения VS Code

**Возвращает:**
- void

**Пример вызова:**
```typescript
// Автоматически вызывается VS Code при нажатии ctrl+shift+z ctrl+shift+v
activate(context);