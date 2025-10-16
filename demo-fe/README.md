# Todo List Frontend

A modern, responsive React application for managing todos, built with TypeScript, Vite, and Tailwind CSS.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Toggle completion status
- ✅ Filter todos (All, Active, Completed)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Real-time updates
- ✅ Beautiful modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Fast development with Vite

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see demo-be folder)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your API URL:

```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
demo-fe/
├── src/
│   ├── components/
│   │   ├── FilterBar.tsx      # Filter buttons component
│   │   ├── TodoForm.tsx       # Form to create todos
│   │   ├── TodoItem.tsx       # Individual todo item
│   │   └── TodoList.tsx       # List of todos
│   ├── services/
│   │   └── api.ts             # API service layer
│   ├── types/
│   │   └── todo.types.ts      # TypeScript interfaces
│   ├── App.tsx                # Main application component
│   ├── App.css                # Application styles
│   ├── index.css              # Global styles
│   └── main.tsx               # Entry point
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Responsive Design

The application is fully responsive and works great on:

- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)

## Features in Detail

### Todo Management
- **Create**: Add new todos with title and optional description
- **Edit**: Update todo title and description inline
- **Toggle**: Mark todos as complete/incomplete
- **Delete**: Remove todos with confirmation
- **Filter**: View all, active, or completed todos

### User Interface
- Clean, modern design with Tailwind CSS
- Smooth transitions and hover effects
- Loading states and error handling
- Responsive layout for all screen sizes
- Accessible UI with ARIA labels

### API Integration
- RESTful API communication
- Error handling with user-friendly messages
- Optimistic UI updates
- Type-safe API calls with TypeScript

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **ESLint** - Code linting

## Connecting to Backend

Make sure the backend API is running on `http://localhost:3000` (or update `VITE_API_URL` in `.env`).

The frontend expects the following API endpoints:
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/toggle` - Toggle completion
- `DELETE /api/todos/:id` - Delete todo

## Deployment

### Apache Configuration

To deploy this app on Apache:

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy the `dist` folder contents to your Apache web root:
   ```bash
   cp -r dist/* /var/www/html/
   ```

3. Create `.htaccess` for SPA routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. Update `.env` with production API URL before building

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
