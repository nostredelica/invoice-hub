# Invoice Management System

Take Home Test for Nabitu.id

## 🚀 Overview
This project is a **Next.js 15**-based **Invoice Management System** that allows users to create, view, edit, and delete invoices. It features a clean UI built with **Material UI**, efficient form handling with **React Hook Form** and **Zod**, and data persistence using **local storage**.

---

## 🚀 Getting Started
### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run the Project
```bash
npm run dev
```

### 3️⃣ Open in Browser
```
http://localhost:3000/invoices/list
```

---

## 🛠️ Technical Decisions
### **1️⃣ Next.js 15 with App Router**
- Provides **performance optimizations**, **caching**, and **dynamic routing**.
- Uses `/invoices/[id]/edit` for dynamic invoice editing.

### **2️⃣ Material UI for Styling & Components**
- **Drawer**: Sidebar navigation.
- **Table**: Invoice listing.
- **TextField, Button, DatePicker**: Invoice form.

### **3️⃣ Form Handling with `react-hook-form` & Validation with Zod**
- Optimized form validation using `zodResolver`.
- Uses **Controller** for `DatePicker`.

### **4️⃣ Local Storage for Temporary Data Persistence**
- Stores invoices locally until API integration.
- Uses helper functions to **get/set invoices**.

### **5️⃣ Date Handling with Day.js**
- Efficient date formatting.
- Automatically assigns `createdAt` timestamp.

---

## 📂 Project Structure
```
/app
  ├── invoices
  │   ├── add (Invoice Creation Page)
  │   ├── list (Invoice Listing Page)
  │   ├── [id]/edit (Invoice Editing Page)
  ├── components/invoices
  │   ├── layout (Sidebar, Mobile Drawer, Invoice Table)
  │   ├── navbar (App Navbar)
  │   ├── ui (Reusable UI Components)
  ├── constants
  ├── hooks
  ├── lib (Schemas, Types, Utilities)
  ├── utils (Formatting, Local Storage Helpers)
  ├── themes (Custom Theme Configuration)
```

---

## 🔧 Tech Stack
- **Framework:** Next.js 15
- **UI Library:** Material UI
- **State Management:** useState, useForm (react-hook-form)
- **Validation:** Zod
- **Date Handling:** Day.js
- **Local Storage for Temporary Data Persistence**

---

## ⚙️ Features
### ✅ Add Invoice
- Invoice number auto-prefixed (e.g., `INV29028`).
- Uses **react-hook-form** with **Zod validation**.
- Stores data in **local storage** (temporary backend simulation).
- Automatically adds `createdAt` timestamp.

### ✏️ Edit Invoice
- Pre-fills invoice form based on `id` from URL.
- Updates `createdAt` on every edit.

### 📜 List Invoices
- Displays all invoices in a Material UI table.
- Highlights selected invoice in the sidebar.

### ❌ Delete Invoice
- Confirmation prompt before deletion.
- Shows success message upon deletion.
