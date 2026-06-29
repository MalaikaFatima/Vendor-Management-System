# Vendor Management and Quotation System

A full-stack Vendor Management System built with Laravel and React. The system allows administrators to manage vendors, create quotations, compare vendor quotes, and approve or reject submissions. Vendors can submit quotations and track their quote status.

---

## Features

### Admin

- Admin Login
- Dashboard with statistics
- Vendor Management
- Approve / Reject Vendors
- Create, Update and Delete Quotations
- Send Quotations to Vendors
- Compare Vendor Quotes
- Approve / Reject Quotes
- Quote History
- Profile Page

### Vendor

- Vendor Registration
- Vendor Login
- Vendor Dashboard
- View Available Quotations
- Submit Quotes
- View Quote Status (Pending / Approved / Rejected)
- Profile Page

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Hero Icons
- React Hot Toast

### Backend

- Laravel 12
- Laravel Sanctum
- MySQL
- REST API

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan serve
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Features

- Authentication
- Vendor Management
- Quotation Management
- Quote Submission
- Quote Comparison
- Dashboard Statistics
- Quote History
- User Profile

---

## Project Structure

```
backend/
frontend/
README.md
```

---

## Author

**Malaika Fatima**

LinkedIn:
https://www.linkedin.com/in/malaika-fatima-88101b374/