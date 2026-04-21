# 💳 Full-Stack Subscription Payment System

Full-stack subscription billing system built with React (Vite), Node.js, and Supabase. 

This project features a custom-built **Bogus Payment Gateway** (inspired by Shopify's testing environment) that allows developers to simulate successful, failed, and error-state transactions without needing third-party API keys.


## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* React Router v6
* CSS (Custom Design)
* Axios 

**Backend:**
* Node.js & Express
* Supabase JS Client (Service Role for secure DB writes)
* CORS & Dotenv

**Database:**
* Supabase (PostgreSQL)

## 🚀 Testing the Bogus Gateway

When clicking "Subscribe" on any plan, a mock payment modal will appear. Use the following inputs to test the system's response:

* Type **`1`** -> Simulates a **Successful** payment (Redirects to Success Page).
* Type **`2`** -> Simulates a **Declined** payment (Redirects to Cancel Page).
* Type **`3`** -> Simulates a **System Error** (Redirects to Cancel Page).

## Live Deployment
*  **Frontend Hosted on:** Netlify

*  **Backend Hosted on:**  Render

*  **Database Hosted on:** Supabase
