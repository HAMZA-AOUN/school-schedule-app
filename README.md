# School Weekly Schedule Application

A React application that allows users to create, edit, and save a weekly school schedule. Users can input materials and times for lessons, view the schedule in both desktop and mobile views, and persist data using local storage.

---

## Table of Contents

- [Features](#features)
- [Key Component](#key-component)
- [Technologies Used](#technologies-used)
- [Schedule Data Storage](#schedule-data-storage)

---

## Features

- Responsive Design:

  - Desktop view shows all lessons for each weekday.
  - Mobile view displays two lessons at a time, with navigation buttons to view others.

- Data Persistence:

  - Save schedule data to local storage manually with a "Save" button.
  - Retrieve saved data automatically on page load.

- Editable Fields:

  - Each cell includes two input fields: one for the material (e.g., "Math") and another for the time (e.g., "08:00 - 08:45").

- User-Friendly Interface:
  - Styled using TailwindCSS for a clean and modern appearance.
  - Buttons with hover effects for intuitive navigation.

---

## Key Component

Schedule.tsx

- Description: The core component of the app. Contains logic for managing and displaying the schedule.
- Key Functions:
  1- useEffect: Loads saved schedule from local storage on mount.
  2- handleChange: Updates the schedule state for material or time inputs.
  3- handleSave: Saves the current schedule to local storage.
  4- lessonsInMobileView: Dynamically slices the lessons array for mobile view.

### Schedule Data Storage

The app uses a `useState` hook to manage the schedule data, which is structured as an object. Each entry in the object uses a unique key combining the day and lesson (e.g., `"Sun-Lesson 1"`), and the value is an object containing:

- material: The subject or lesson material (e.g., "Math").
- time: The timing for the lesson (e.g., "08:00 - 08:45").

Example Structure

```json
{
  "Sun-Lesson 1": { "material": "Math", "time": "08:00 - 08:45" },
  "Sun-Lesson 2": { "material": "English", "time": "09:00 - 09:45" }
}
```

Key Features

1. Scalable: Easily handles multiple days and lessons using the "Day-Lesson" key format.
2. Efficient Updates: Updates specific entries in the schedule via the `handleChange` function.
3. Persistent Storage:
   - Saves the schedule to local storage on clicking the "Save" button.
   - Automatically loads saved data on app startup via the `useEffect` hook.

This structure ensures that the schedule is flexible, user-friendly, and persists across sessions.

## Technologies Used

1- React: JavaScript library for building the user interface.
2- TypeScript: Ensures type safety and better development experience.
3- TailwindCSS: For styling the components with a modern, utility-first approach.
4- Local Storage: For persisting user data across sessions.
