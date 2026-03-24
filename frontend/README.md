# 🎬 Rediflix - Full Stack Circle Project

Welcome to **Rediflix**, a full-stack web application built with React and Node.js! This project is designed to help you understand how modern web applications work by combining frontend and backend technologies.

## 📚 What You'll Learn

This project will teach you:

- **Frontend**: React components, routing, state management, and API calls
- **Backend**: Node.js with Express, REST APIs, and database operations
- **Database**: PostgreSQL with Prisma ORM
- **Full-Stack Integration**: How frontend and backend communicate
- **Modern Development Tools**: TypeScript, Vite, Storybook, and more

## 🏗️ Project Structure

```text
F25-Full-Stack-Circle/
├── frontend/          # React application (what you're looking at!)
├── backend/           # Node.js server with Express and Prisma
└── README.md          # Main project documentation
```

### Frontend Structure (`frontend/` folder)

```text
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components (Home, SignIn)
│   ├── hooks/         # Custom React hooks
│   ├── assets/        # CSS, images
│   └── config/        # Configuration files
├── public/            # Static files (such as fonts)
├── package.json       # Dependencies and scripts
└── vite.config.ts     # Vite build configuration
```

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:

- **Node.js** version 22.0.0 or higher
- **npm** as a package manager
- Basic understanding of HTML, CSS, and JavaScript

### Step 1: Install Dependencies

Open your terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

This will install all the packages listed in `package.json`, including:

- **React 19**: The main UI library
- **React Router**: For navigation between pages
- **TypeScript**: For type-safe JavaScript
- **Vite**: For fast development and building

### Step 2: Start the Development Server

```bash
npm run dev
```

This command starts the development server. You should see output like:

```bash
  VITE v7.1.2  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and go to `http://localhost:5173/` to see your app!

> [!NOTE]
> Make sure you run the backend server before running the frontend server so you can see the data in the frontend. [See Backend README here](../backend/README.md)

## 🎯 How the App Works

### 1. **Entry Point** (`src/main.tsx`)

This is where your React app starts. Think of it as the "main door" to your application:

```tsx
// main.tsx - The starting point of your app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Enables routing */}
      <Layout>
        {/* Wraps all pages */}
        <Routes>
          {/* Defines available routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
```

**What this means:**

- `<StrictMode>`: Helps catch potential problems during development
- `<BrowserRouter>`: Enables navigation between pages using URLs
- `<Layout>`: Provides a consistent structure for all pages
- `<Routes>`: Defines which component to show for each URL path

### 2. **Routing System**

The app has two main pages:

- **Home page** (`/`): Shows the main content and a list of users
- **Sign In page** (`/signin`): A form for user authentication

When you click the "Sign In" button on the home page, React Router navigates you to `/signin`.

### 3. **Components** (`src/components/`)

Components are like building blocks for your UI. Let's look at the Button component:

```tsx
// Button.tsx - A reusable button component
const Button = ({ children, onClick, stretch = false, disabled = false }) => {
  return (
    <button className={styledButton({ stretch })} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

**What this means:**

- `children`: The text or content inside the button
- `onClick`: What happens when the button is clicked
- `stretch`: Whether the button should stretch to fill its container
- `disabled`: Whether the button is clickable

### 4. **Pages** (`src/pages/`)

Pages are full-screen components that represent different views in your app.

#### Home Page (`src/pages/Home/Home.tsx`)

The home page demonstrates several important React concepts:

```tsx
const Home = () => {
  // State management - data that can change
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

  // Custom hook for configuration
  const { config, loadingConfig } = useConfig();

  // Navigation hook
  const navigate = useNavigate();

  // Event handler - what happens when button is clicked
  const handleSignIn = () => {
    navigate('/signin'); // Navigate to sign-in page
  };

  // Side effect - fetch data when component loads
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${config?.apiUrl}/users`);
      const data = await response.json();
      setUsers(data.users);
    };

    fetchUsers();
  }, [config, loadingConfig, loadingUsers]);

  return (
    <div className={styles.home}>
      <img src={logo} alt="Rediflix Logo" width={500} />

      {/* Conditional rendering based on loading state */}
      {loadingUsers ? (
        <div>Loading users...</div>
      ) : (
        <>
          {/* Conditional rendering based on data */}
          {users.length > 0 ? (
            users.map((user) => <div key={user.id}>{user.email}</div>)
          ) : (
            <div>No users found</div>
          )}
        </>
      )}

      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};
```

**Key Concepts Demonstrated:**

- **State**: `useState` manages data that can change (users, loading states)
- **Effects**: `useEffect` runs code when the component loads or when dependencies change
- **Conditional Rendering**: Different content shows based on conditions
- **Event Handling**: Button clicks trigger functions
- **API Calls**: Fetching data from a backend server

### 5. **Styling** (`src/assets/css/`)

The app uses CSS modules for styling:

- `reset.css`: Removes default browser styles
- `global.css`: Applies styles across the entire app
- Component-specific CSS files (e.g., `Button.module.css`)

### 6. **Configuration** (`src/config/`)

The app uses a configuration system to manage settings like API URLs. This makes it easy to switch between development and production environments.

## 🔧 Available Scripts

In the `frontend` folder, you can run these commands:

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run format       # Format code with Prettier
npm run storybook    # Open Storybook (component library)
```

## 📖 Understanding the Backend

The backend is a Node.js server that provides:

- **REST API endpoints** for user management
- **Database operations** using PostgreSQL and Prisma
- **User authentication** (you will implement this ❤️)

> [!NOTE]
> [See Backend README here](../backend/README.md)

### How Frontend and Backend Connect

1. **Frontend makes a request**: When the Home page loads, it calls `fetch(`${config?.apiUrl}/users`)`
2. **Backend receives the request**: The Express server handles the `/users` endpoint
3. **Database query**: Prisma queries the PostgreSQL database
4. **Response**: Data is sent back to the frontend
5. **Frontend updates**: The `setUsers(data.users)` updates the UI with the received data

## 🎨 Styling and Design

The app uses a Netflix-inspired design with:

- **Custom fonts**: Netflix Sans font family
- **Modern UI**: Clean, responsive design
- **CSS Modules**: Scoped styling to prevent conflicts
- **Responsive design**: Works on different screen sizes

## 🧪 Testing and Development Tools

### Storybook

Storybook lets you develop and test components in isolation so you don't have to add the components to the a page to see how they look.

```bash
npm run storybook
```

This opens a component library where you can see all your components and test them individually.

> [!NOTE]
> [See Storybook documentation here](https://storybook.js.org/docs/react/get-started/introduction)

### ESLint and Prettier

- **ESLint**: Finds and fixes code quality issues
- **Prettier**: Automatically formats your code

### TypeScript

TypeScript adds type safety to JavaScript, helping catch errors before they happen.

## 🚀 Next Steps

Once you're comfortable with the basics, try:

1. **Add a new page**: Create a new route and component
2. **Modify the Button component**: Add new variants or styles
3. **Create new components**: Build reusable UI elements
4. **Connect to the backend**: Add more API calls
5. **Add user authentication**: Implement login/logout functionality

## 🆘 Getting Help

If you get stuck:

1. Check the browser console for error messages
2. Look at the terminal where you ran `npm run dev`
3. Check the Network tab in browser DevTools to see API calls
4. Review the React and TypeScript documentation

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/)

---

**Happy coding! 🎉**

This project is designed to grow with you. Start simple, experiment, and don't be afraid to break things - that's how you learn!
