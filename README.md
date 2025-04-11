# BLOG_API_REPOS

A full-stack blogging platform featuring user authentication, post creation, and comment management.

## Features

- **JWT Authentication**: Secure user login with token-based authentication.
- **Token Expiry Handling**: Alerts users upon token expiration and redirects to the home page.
- **Post Management**: Create, edit, and delete personal blog posts.
- **Comment Management**:
  - Edit and delete own comments on any post.
  - Delete comments on personal posts via the "My Posts" page.

## Live Demo

Access the live application here: [blog-api-repos.vercel.app]([https://blog-api-repos.vercel.app](https://blog-api-repos-y592.vercel.app/))

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Beliver12/BLOG_API_REPOS.git
   ```


2. **Navigate to the project directory**:

   ```bash
   cd BLOG_API_REPOS
   ```


3. **Install dependencies for both frontend and backend**:

   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```


4. **Set up environment variables**:

   Create a `.env` file in both `backend` and `frontend` directories with the necessary configurations.

5. **Run the application**:

   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server
   cd ../frontend
   npm start
   ```


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` further to match your project's specifics. 
