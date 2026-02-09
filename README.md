Projects & Expenses Tracker (Tool for tracking project expenses)
Tech stack : React,experss,postgreSQL, TypeORM

Setup Instructions
#Backend
- Step 1. navigate to backend folder
        cd backend
- Step 2. install dependencies
        npm i
- Step 3. Create .env file by copying the example
        cp .env.example .env
- Step 4. Ensure the database exists
         CREATE DATABASE kea_db
- Step 5. Start the server
        npm run dev
        API runs on http://localhost:3001

#Frontend
- Step 1. navigate to frontend folder
        cd frontend
- Step 2. install dependencies
        npm i
- Step 3. Start the server
        npm run dev
        App runs on http://localhost:5173

Database Schema Explanation:
The app has two tables: Projects and Expenses.

- Projects store the project’s name, client, and estimated budget.

- Expenses store the description, amount, and category of each expense, and each expense belongs to a project.

- A project can have many expenses, forming a one-to-many relationship.

- Totals like total expenses and remaining budget are calculated dynamically and not stored in the database.

#What I would improve with more time
- Make the UI more responsive for tabs and mobiles
- add proper form validation
- add pagination
- show toasts instead of browser alerts

        



