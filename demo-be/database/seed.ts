import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "todo_db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

const mockTodos = [
  {
    title: "Complete project documentation",
    description:
      "Write comprehensive documentation for the Todo List API including all endpoints and examples",
    completed: false,
  },
  {
    title: "Review pull requests",
    description: "Review and provide feedback on open PRs from team members",
    completed: true,
  },
  {
    title: "Update dependencies",
    description:
      "Check and update all npm packages to their latest stable versions",
    completed: false,
  },
  {
    title: "Write unit tests",
    description:
      "Add unit tests for all controller methods to improve code coverage",
    completed: false,
  },
  {
    title: "Deploy to production",
    description:
      "Deploy the latest version to the production server and monitor for issues",
    completed: true,
  },
  {
    title: "Database backup setup",
    description:
      "Configure automated daily backups for the PostgreSQL database",
    completed: false,
  },
  {
    title: "Implement authentication",
    description: "Add JWT-based authentication to secure the API endpoints",
    completed: false,
  },
  {
    title: "Optimize database queries",
    description: "Review and optimize slow queries, add necessary indexes",
    completed: false,
  },
  {
    title: "Setup CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing and deployment",
    completed: true,
  },
  {
    title: "Add error logging",
    description:
      "Integrate error tracking service like Sentry for production monitoring",
    completed: false,
  },
  {
    title: "Create API documentation",
    description: "Use Swagger/OpenAPI to create interactive API documentation",
    completed: false,
  },
  {
    title: "Implement rate limiting",
    description: "Add rate limiting to prevent API abuse and ensure fair usage",
    completed: false,
  },
  {
    title: "Setup monitoring dashboard",
    description:
      "Create a Grafana dashboard to monitor application metrics and performance",
    completed: false,
  },
  {
    title: "Add data validation",
    description:
      "Implement comprehensive input validation using a library like Joi or Zod",
    completed: true,
  },
  {
    title: "Configure CORS properly",
    description:
      "Update CORS settings to only allow specific domains in production",
    completed: true,
  },
  {
    title: "Implement caching",
    description: "Add Redis caching layer to improve API response times",
    completed: false,
  },
  {
    title: "Security audit",
    description:
      "Perform a thorough security audit and fix any vulnerabilities",
    completed: false,
  },
  {
    title: "Add pagination",
    description:
      "Implement pagination for GET /todos endpoint to handle large datasets",
    completed: true,
  },
  {
    title: "Create admin dashboard",
    description:
      "Build an admin interface to manage users and monitor system health",
    completed: false,
  },
  {
    title: "Write integration tests",
    description: "Add end-to-end integration tests for critical user flows",
    completed: false,
  },
  {
    title: "Optimize bundle size",
    description:
      "Analyze and reduce the frontend bundle size for faster page loads",
    completed: false,
  },
  {
    title: "Add email notifications",
    description: "Implement email notifications for important todo deadlines",
    completed: false,
  },
  {
    title: "Mobile app development",
    description:
      "Start development of React Native mobile app for iOS and Android",
    completed: false,
  },
  {
    title: "Performance testing",
    description:
      "Conduct load testing to ensure the app can handle expected traffic",
    completed: false,
  },
  {
    title: "Add dark mode",
    description: "Implement dark mode theme option for better user experience",
    completed: true,
  },
  {
    title: "Internationalization",
    description:
      "Add i18n support for multiple languages (English, Spanish, French)",
    completed: false,
  },
  {
    title: "Implement search feature",
    description: "Add full-text search capability to find todos quickly",
    completed: false,
  },
  {
    title: "Add tags/categories",
    description:
      "Allow users to organize todos with custom tags and categories",
    completed: false,
  },
  {
    title: "Calendar integration",
    description: "Integrate with Google Calendar and Outlook for syncing todos",
    completed: false,
  },
  {
    title: "Export/Import feature",
    description:
      "Allow users to export todos to CSV/JSON and import from external sources",
    completed: false,
  },
  {
    title: "Add due dates",
    description: "Implement due date functionality with reminders",
    completed: false,
  },
  {
    title: "Collaborative features",
    description: "Allow users to share todos and collaborate with team members",
    completed: false,
  },
  {
    title: "Add attachments",
    description: "Enable users to attach files and images to their todos",
    completed: false,
  },
  {
    title: "Priority levels",
    description:
      "Add priority levels (High, Medium, Low) for better task management",
    completed: true,
  },
  {
    title: "Recurring todos",
    description:
      "Implement recurring task functionality for daily/weekly/monthly todos",
    completed: false,
  },
  {
    title: "Accessibility audit",
    description: "Ensure the app is fully accessible and WCAG 2.1 compliant",
    completed: false,
  },
  {
    title: "Add shortcuts",
    description: "Implement keyboard shortcuts for power users",
    completed: false,
  },
  {
    title: "Analytics integration",
    description: "Add Google Analytics or similar to track user engagement",
    completed: true,
  },
  {
    title: "Optimize images",
    description: "Compress and optimize all images for faster loading",
    completed: true,
  },
  {
    title: "Add progress tracking",
    description: "Show visual progress indicators for project completion",
    completed: false,
  },
  {
    title: "Implement subtasks",
    description: "Allow users to break down todos into smaller subtasks",
    completed: false,
  },
  {
    title: "Add comments",
    description: "Enable users to add comments and notes to their todos",
    completed: false,
  },
  {
    title: "Time tracking",
    description: "Add time tracking feature to monitor how long tasks take",
    completed: false,
  },
  {
    title: "Create templates",
    description:
      "Allow users to create and use todo templates for recurring projects",
    completed: false,
  },
  {
    title: "Add notifications",
    description: "Implement browser and mobile push notifications",
    completed: false,
  },
  {
    title: "Offline support",
    description: "Add PWA features and offline support using service workers",
    completed: false,
  },
  {
    title: "Social sharing",
    description: "Allow users to share their accomplishments on social media",
    completed: false,
  },
  {
    title: "Add rewards/gamification",
    description: "Implement a point system and achievements to motivate users",
    completed: false,
  },
  {
    title: "Integration testing",
    description:
      "Set up automated integration tests with Playwright or Cypress",
    completed: false,
  },
  {
    title: "API versioning",
    description: "Implement proper API versioning strategy for future updates",
    completed: true,
  },
];

async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  try {
    // Clear existing todos
    console.log("🗑️  Clearing existing todos...");
    await pool.query("DELETE FROM todos");

    // Insert mock todos
    console.log("📝 Inserting mock todos...");
    for (const todo of mockTodos) {
      await pool.query(
        "INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3)",
        [todo.title, todo.description, todo.completed]
      );
    }

    console.log(`✅ Successfully seeded ${mockTodos.length} todos!`);

    // Display summary
    const stats = await pool.query(
      "SELECT COUNT(*) as total, SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed, SUM(CASE WHEN NOT completed THEN 1 ELSE 0 END) as active FROM todos"
    );
    const { total, completed, active } = stats.rows[0];
    console.log(`\n📊 Summary:`);
    console.log(`   Total: ${total}`);
    console.log(`   Completed: ${completed}`);
    console.log(`   Active: ${active}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log("\n🏁 Seeding completed!");
  }
}

// Run the seed function
seedDatabase();
