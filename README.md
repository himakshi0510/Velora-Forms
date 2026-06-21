# Velora Forms

Velora Forms is a modern form builder application developed using React and Supabase. It enables users to create customizable forms, share them publicly, collect responses, and analyze submissions through an interactive dashboard.

## Features

### Authentication

* Google Sign-In using Supabase Authentication
* Protected routes for authenticated users

### Form Builder

* Create and manage unlimited forms
* Supported field types:

  * Text
  * Email
  * Number
  * Password
  * Date
  * URL
  * File
  * Textarea
  * Radio Buttons
  * Checkboxes
  * Select Dropdowns
* Required field validation
* Edit existing forms
* Duplicate forms
* Delete forms

### Form Sharing

* Publicly accessible form links
* Form submission without authentication
* Dedicated Thank You page after successful submission

### Response Management

* View submitted responses
* Search responses
* Sort responses by latest or oldest
* Export responses to CSV format
* Delete responses

### Notifications

* Notifications for newly received responses
* Chronological ordering of notifications

### Analytics

* Total forms created
* Total responses received
* Average responses per form
* Empty forms count
* Most active form
* Pie Chart and Bar Chart visualizations using Recharts

### User Interface

* Light and Dark themes
* Responsive layout
* Collapsible sidebar navigation
* Dashboard overview of forms and responses

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Recharts
* Lucide React

### Backend

* Supabase

  * Authentication
  * PostgreSQL Database
  * Row Level Security (RLS)

### Deployment

* Netlify

---

## Database Schema

### forms

| Column     | Type        |
| ---------- | ----------- |
| id         | uuid        |
| title      | text        |
| fields     | jsonb       |
| user_id    | uuid        |
| created_at | timestamptz |

### responses

| Column       | Type        |
| ------------ | ----------- |
| id           | uuid        |
| form_id      | uuid        |
| answers      | jsonb       |
| submitted_at | timestamptz |

---

## Installation

Clone the repository:

```bash
git clone <https://github.com/himakshi0510/Velora-Forms>
```

Navigate to the project directory:

```bash
cd velora-forms
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

---

## Live Demo

https://veloraforms.netlify.app/

---

## Author

Himakshi Bansal

B.Tech in Robotics and Artificial Intelligence
CGC University, Mohali

---

## Future Enhancements

* Cloud storage support for uploaded files
* Form templates
* Email notifications
* AI-assisted form generation
* Advanced response filtering
* Multi-step forms
