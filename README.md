
🎮 Game Review Application:
A full-stack web platform for gamers to explore, manage, and share reviews of their favorite games with ease and style.

  🔗 Live Site: https://coffee-store-auth-1a9a6.web.app/

📖 About the Project:
Game Review Application is a responsive and user-friendly platform designed for gamers to browse, write, and manage game reviews. With features like user authentication, review management, and a personalized game watchlist, it offers a seamless and secure experience across devices.

✨ Key Features:
📝 Game Reviews
Browse all reviews with filters for rating, release year, and genre.

📋 Review Management
Authenticated users can add, edit, or delete their own reviews.

🎮 Game Watchlist
Save favorite games to a personal watchlist for future reference.

🔐 User Authentication
Secure login and registration using email/password or Google sign-in, powered by Firebase.

🌗 Dark/Light Mode
Toggle between themes for a comfortable viewing experience.

🧰 Tech Stack
🔹 Frontend
React.js – Component-based architecture for building dynamic UIs

Tailwind CSS – Utility-first CSS framework for fast and responsive styling

React Router – Declarative routing for SPA navigation

Lottie React – Lightweight, interactive animations

🔹 Backend
Node.js – JavaScript runtime for server-side logic

Express.js – Minimal and flexible web application framework

MongoDB – NoSQL database for scalable, flexible data storage

🔹 Authentication
Firebase – Secure and scalable authentication with email/password and Google OAuth

⚙️ How to Run Locally
Follow these steps to set up and run the project locally on your machine.

1. Prerequisites
Node.js installed

MongoDB (local or cloud instance)

Firebase project set up for authentication

2. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/game-review-app.git
cd game-review-app
3. Install Dependencies
bash
Copy
Edit
npm install
4. Set Up Environment Variables
Create a .env file in the root directory and add your configuration:

env
Copy
Edit
REACT_APP_apiKey=your_firebase_api_key
REACT_APP_authDomain=your_project_id.firebaseapp.com
REACT_APP_projectId=your_project_id
REACT_APP_storageBucket=your_project_id.appspot.com
REACT_APP_messagingSenderId=your_sender_id
REACT_APP_appId=your_app_id
REACT_APP_MONGO_URI=your_mongodb_uri
5. Start the Development Server
bash
Copy
Edit
npm run dev