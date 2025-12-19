# Техническая Документация

### 1. Стратегия Управления Состоянием (State Management Strategy)

В проекте применен **гибридный подход**, разделяющий данные на два типа:

#### A. Server State (SWR)
Данные, которые приходят с бэкенда (список постов, детали поста, комментарии).
*   **Почему SWR?**
    *   Автоматическое кэширование и дедупликация запросов.
    *   Ревалидация при фокусе окна (актуальность данных).
    *   Упрощение кода (отказ от `useEffect` + `useState` для загрузки данных).

#### B. Client State (Zustand)
Данные, живущие только в браузере (значение строки поиска, состояние модальных окон).
*   **Почему Zustand?**
    *   Минималистичный API (нет boilerplate как в Redux).
    *   Легкость создания атомарных сторов.

### 2. Слой Данных (Firebase Firestore)

Используется NoSQL база данных Firestore.
*   **Коллекция `posts`:** Хранит документы постов.
*   **Коллекция `comments`:** Хранит комментарии (связаны через `postId`).

**Пример модели поста (TypeScript Interface):**
```typescript
export interface IPost {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: number; // Timestamp
}

3. Валидация (Zod)
Для гарантии целостности данных используется Zod схема:
code
TypeScript
export const postSchema = z.object({
  title: z.string().min(3, "Too short").max(100),
  body: z.string().min(10, "Content must be at least 10 chars"),
  author: z.string().min(2, "Author name required"),
});
Это предотвращает отправку "битых" данных в Firestore.

---

### **Файл 4: `docs/DocDev.md` (Гайд для Разработчика)**

Показывает, что ты думаешь о чистоте кода.

```markdown
# Руководство по Разработке

### 1. Структура Проекта

Проект организован по функциональному признаку, стремясь к модульности:

```text
src/
├── api/             # Сервисы Firebase (CRUD методы)
├── components/      # UI компоненты (PostCard, Layout, Navbar)
├── hooks/           # Кастомные хуки (usePosts, usePost) - обертки над SWR
├── pages/           # Страницы роутера (Home, PostDetails, CreatePost)
├── store/           # Глобальные сторы Zustand (useSearchStore)
├── types/           # TypeScript интерфейсы
└── lib/             # Утилиты и конфигурации (firebase.ts, validation.ts)

### 2. Принципы Кода
DRY (Don't Repeat Yourself): Логика фетчинга вынесена в кастомные хуки.
Separation of Concerns: Компоненты отвечают за отображение, хуки за данные, сервисы за API.
Strict Typing: Все пропсы и ответы API типизированы.