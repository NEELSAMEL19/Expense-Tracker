<a href="https://expense-tracker-one-delta-51.vercel.app"><img align="right" src="./frontend-button.svg" width="140" alt="Live Frontend" /></a>
### Expense Tracker

<em>A responsive personal finance dashboard for recording income and expenses, reviewing trends, and keeping track of your balance.</em>

<p align="left">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
  &nbsp;
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" />
  &nbsp;
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript" />
  &nbsp;
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  &nbsp;
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white" alt="Redux Toolkit" />
  &nbsp;
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white" alt="Axios" />
  &nbsp;
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=flat" alt="Recharts" />
</p>

<hr />

### 🚀 About the project

**Expense Tracker** is a browser-based personal finance application. Create an account, sign in, and manage income and expense entries from a protected dashboard. The interface provides charts and recent transactions to help review financial activity. Data is loaded and saved through the Expense Tracker backend using cookie-based sessions.

### ✨ Features

<table>
  <tr>
    <td valign="top">

- ✅ Register and log in with an email and password
- ✅ Optional avatar upload during registration
- ✅ Restore the signed-in user profile and log out
- ✅ Add income with a source, amount, date, and optional emoji icon
- ✅ Add expenses with a category, amount, date, and optional emoji icon
- ✅ View, chart, and delete income and expense entries

</td>
    <td valign="top">

- ✅ Dashboard totals for income, expenses, and balance
- ✅ Recent transaction list and financial overview chart
- ✅ Income breakdown by source and recent income entries
- ✅ Recent expenses and expense trend chart
- ✅ Download income and expense data as Excel files
- ✅ Responsive navigation with a collapsible sidebar

</td>
  </tr>
</table>

### 🛠️ Tech Stack

|                 Frontend                  |            State & API             |                         UI & Utilities                          |
| :---------------------------------------: | :--------------------------------: | :-------------------------------------------------------------: |
| React, JavaScript, Vite, Tailwind CSS     | Redux Toolkit, Axios, REST API     | React Router, Recharts, Emoji Picker, Lucide React               |

### 📷 Screenshots

Screenshots are not currently included in this repository.

### 🚀 Getting Started

<table>
  <tr>
    <td valign="top" width="40%">

#### Prerequisites

- **Node.js** (20.19+ or 22.13+)
- **npm**
- Access to the Expense Tracker backend (the configured backend URL is shown below)

#### ⚙️ Environment Variables

The API base URL is currently set in `src/Services/ApiPaths.jsx` to `https://expense-tracker-backend-e4gf.onrender.com`. The frontend does not read an environment variable for this URL. To use a different backend, update the `BASEURL` value in that file. The API uses cookies for authenticated requests.

</td>
    <td valign="top" width="60%">

#### Installation

1. Clone the repository and enter the project directory:

```bash
   git clone https://github.com/NEELSAMEL19/Expense-Tracker.git
   cd Expense-Tracker
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

4. Open the local URL printed by Vite in your browser.

5. Create an account or sign in to access the dashboard.

</td>
  </tr>
</table>

### 📁 Project Structure

```text
Expense-Tracker/
├── public/                 # Favicon, icons, and default avatar
├── src/
│   ├── app/                # Redux store
│   ├── assets/             # Frontend assets
│   ├── components/         # Navbar, sidebar, and footer
│   ├── context/            # Authentication context and session actions
│   ├── features/           # Income, expense, and sidebar Redux slices
│   ├── layouts/            # Shared authenticated-page layout
│   ├── Pages/
│   │   ├── Auth/           # Login and registration
│   │   ├── Dashboards/     # Dashboard totals, charts, and transactions
│   │   ├── Expense/        # Expense form, chart, and list
│   │   ├── Income/         # Income form, chart, and list
│   │   └── NotFound.jsx    # Fallback route page
│   ├── Services/           # Axios client and backend API services
│   ├── utils/              # Protected route
│   ├── App.jsx             # Routes and authentication provider
│   ├── index.css           # Tailwind CSS entry point
│   └── main.jsx            # React application entry point
├── index.html
├── package.json
├── package-lock.json
├── vercel.json             # SPA rewrite configuration for Vercel
├── vite.config.js
└── README.md
```

### 🔗 Backend API

The API base URL is `https://expense-tracker-backend-e4gf.onrender.com`. Register and login do not require an existing session; the other endpoints use the cookie-based session sent by the frontend.

|  Method  | Endpoint                  | Description                         | Auth Required |
| :------: | ------------------------- | ----------------------------------- | :-----------: |
|  `POST`  | `/api/auth/register`      | Register an account                 |      No       |
|  `POST`  | `/api/auth/login`         | Log in and start a session          |      No       |
|  `GET`   | `/api/auth/profile`       | Get the current user's profile      |    Session    |
|  `POST`  | `/api/auth/logout`        | Log out and end the session         |    Session    |
|  `POST`  | `/api/income/add`         | Add an income entry                 |    Session    |
|  `GET`   | `/api/income`             | Get income entries                  |    Session    |
| `DELETE` | `/api/income/:id`         | Delete an income entry              |    Session    |
|  `GET`   | `/api/income/download`    | Download income entries as a file   |    Session    |
|  `POST`  | `/api/expense/add`        | Add an expense entry                |    Session    |
|  `GET`   | `/api/expense`            | Get expense entries                 |    Session    |
| `DELETE` | `/api/expense/:id`        | Delete an expense entry             |    Session    |
|  `GET`   | `/api/expense/download`   | Download expense entries as a file  |    Session    |
|  `GET`   | `/api/dashboard`          | Get dashboard totals and activity   |    Session    |

<table>
  <tr>
    <td valign="top" width="50%">

#### 👥 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for bug fixes, improvements, and new expense-tracking features.

</td>
    <td valign="top" width="50%">

#### 📄 License

No `LICENSE` file is currently included in this repository, so reuse and redistribution terms are not specified.

</td>
  </tr>
</table>

Made with ❤️ by [Neel Samel](https://github.com/NEELSAMEL19)
