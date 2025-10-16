# Todo List Application

A full-stack todo list application with React frontend, Express backend, and PostgreSQL database. Features a modern, responsive design and complete CRUD functionality.

## 🚀 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete todos
- ✅ **PostgreSQL Database**: Reliable data persistence
- ✅ **RESTful API**: Clean Express.js backend
- ✅ **Modern React UI**: Built with TypeScript and Tailwind CSS v4
- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **Type Safety**: TypeScript throughout the stack
- ✅ **Real-time Updates**: Instant feedback on all operations
- ✅ **Filter System**: View all, active, or completed todos
- ✅ **Apache Ready**: Configuration included for Apache deployment

## 📦 Project Structure

```
demo-deloy-apache/
├── demo-be/               # Backend (Express + PostgreSQL)
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # TypeScript interfaces
│   │   ├── routes/        # API routes
│   │   └── server.ts      # Express server
│   ├── database/
│   │   └── init.sql       # Database schema
│   └── package.json
├── demo-fe/               # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main component
│   └── package.json
└── README.md
```

## 🛠️ Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** v12 or higher
- **npm** or **yarn**
- **Apache** (for deployment)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
cd demo-deloy-apache
```

### 2. Setup Backend

```bash
cd demo-be
npm install

# Create .env file
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 3. Setup Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todo_db;

# Exit and run init script
psql -U postgres -d todo_db -f database/init.sql
```

### 4. Start Backend

```bash
npm run dev
# Backend runs on http://localhost:3000
```

### 5. Setup Frontend

```bash
cd ../demo-fe
npm install

# Create .env file
cp .env.example .env
# Default API URL: http://localhost:3000/api
```

### 6. Start Frontend

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a specific todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| PATCH | `/todos/:id/toggle` | Toggle completion status |
| DELETE | `/todos/:id` | Delete a todo |

### Example Requests

**Create a todo:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn React", "description": "Complete tutorial"}'
```

**Get all todos:**
```bash
curl http://localhost:3000/api/todos
```

**Toggle todo:**
```bash
curl -X PATCH http://localhost:3000/api/todos/1/toggle
```

## 🎨 Frontend Features

### Responsive Design
- **Mobile**: Optimized for small screens (320px+)
- **Tablet**: Enhanced layout for medium screens (768px+)
- **Desktop**: Full-featured layout for large screens (1024px+)

### User Interface
- Clean, modern design with Tailwind CSS
- Smooth animations and transitions
- Loading states and error handling
- Empty state messages
- Confirmation dialogs for destructive actions

### Todo Management
- Add todos with title and optional description
- Edit todos inline
- Mark todos as complete/incomplete
- Delete todos with confirmation
- Filter by all, active, or completed

## 🌐 Apache Deployment

### Backend Deployment

1. **Build the backend:**
   ```bash
   cd demo-be
   npm run build
   ```

2. **Setup as a service or use PM2:**
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name todo-api
   pm2 startup
   pm2 save
   ```

3. **Configure Apache reverse proxy** (optional):
   ```apache
   <VirtualHost *:80>
       ServerName api.yourdomain.com
       
       ProxyPreserveHost On
       ProxyPass / http://localhost:3000/
       ProxyPassReverse / http://localhost:3000/
   </VirtualHost>
   ```

### Frontend Deployment

1. **Update API URL in `.env`:**
   ```env
   VITE_API_URL=http://api.yourdomain.com/api
   # or your production API URL
   ```

2. **Build the frontend:**
   ```bash
   cd demo-fe
   npm run build
   ```

3. **Deploy to Apache:**
   ```bash
   # Copy build files to Apache web root
   sudo cp -r dist/* /var/www/html/
   
   # The .htaccess file is already included in public/
   sudo cp public/.htaccess /var/www/html/
   ```

4. **Enable required Apache modules:**
   ```bash
   sudo a2enmod rewrite
   sudo a2enmod expires
   sudo a2enmod deflate
   sudo systemctl restart apache2
   ```

5. **Configure Apache virtual host:**
   ```apache
   <VirtualHost *:80>
       ServerName yourdomain.com
       DocumentRoot /var/www/html
       
       <Directory /var/www/html>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🧪 Development

### Backend Development
```bash
cd demo-be
npm run dev        # Start with nodemon (auto-reload)
npm run build      # Build TypeScript
npm start          # Run production build
```

### Frontend Development
```bash
cd demo-fe
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 📊 Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🛡️ Security Considerations

For production deployment:
- Use environment variables for sensitive data
- Enable HTTPS/SSL certificates
- Configure CORS appropriately
- Use connection pooling for database
- Implement rate limiting
- Add authentication/authorization if needed
- Regular security updates

## 📚 Technology Stack

### Backend
- **Express** - Web framework
- **PostgreSQL** - Database
- **TypeScript** - Type safety
- **pg** - PostgreSQL client
- **cors** - CORS middleware
- **dotenv** - Environment variables

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **ESLint** - Code linting

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT

## 👨‍💻 Author

Built as a demonstration project for deploying React + Express + PostgreSQL apps on Apache.

## 🐛 Troubleshooting

### Backend won't connect to database
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in `.env`
- Check database exists: `psql -U postgres -l`

### Frontend can't reach API
- Verify backend is running on correct port
- Check `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend

### Apache deployment issues
- Verify `.htaccess` is in place
- Check `AllowOverride All` in Apache config
- Ensure `mod_rewrite` is enabled

## 📞 Support

For issues and questions:
- Check the README files in `demo-be/` and `demo-fe/`
- Review the troubleshooting section
- Check the console for error messages

---

Happy coding! 🎉

