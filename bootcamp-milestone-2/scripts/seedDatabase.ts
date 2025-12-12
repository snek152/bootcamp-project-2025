/**
 * Database Seeding Script
 *
 * This script populates your MongoDB database with dummy data for blogs and projects.
 * Run with: npx tsx scripts/seedDatabase.ts
 *
 * It will:
 * 1. Clear existing data (optional - comment out if you want to keep existing data)
 * 2. Add sample blog posts with comments
 * 3. Add sample projects with comments
 */

import mongoose from "mongoose";
import Blog from "../src/database/blogSchema";
import Project from "../src/database/projectSchema";

// MongoDB connection string - make sure MONGO_URI is set in your .env.local
const MONGO_URI =
  "mongodb+srv://dbuser:dbuserpwd@cluster0.3js5aqs.mongodb.net/?appName=Cluster0";

// Sample blog data
const sampleBlogs = [
  {
    title: "Getting Started with Next.js 15",
    slug: "getting-started-nextjs-15",
    date: new Date("2025-12-01"),
    description:
      "Learn about the exciting new features in Next.js 15 and how to get started with the App Router.",
    content: `Next.js 15 brings incredible improvements to the React framework. The App Router has matured significantly, offering better performance and developer experience.

Key features include:
- Improved server components
- Enhanced routing capabilities
- Better TypeScript support
- Optimized build times

In this post, we'll explore how to set up a new Next.js 15 project and leverage these powerful features. Whether you're new to Next.js or upgrading from an older version, this guide will help you understand the core concepts and best practices.

The App Router introduces a new paradigm for building React applications, with improved data fetching patterns and better code organization. Let's dive in and see what makes Next.js 15 the best version yet!`,
    image: "/photos/nextjs-logo.jpg",
    image_alt: "Next.js logo",
    comments: [
      {
        user: "Sarah Chen",
        comment:
          "Great introduction! The App Router is a game changer for React development.",
        time: new Date("2025-12-02T10:30:00"),
      },
      {
        user: "Mike Johnson",
        comment:
          "Thanks for this guide. Can't wait to try out Next.js 15 on my next project!",
        time: new Date("2025-12-03T14:15:00"),
      },
    ],
  },
  {
    title: "Building RESTful APIs with MongoDB",
    slug: "building-restful-apis-mongodb",
    date: new Date("2025-11-15"),
    description:
      "A comprehensive guide to creating robust REST APIs using Node.js, Express, and MongoDB.",
    content: `Building APIs is a fundamental skill for modern web developers. In this tutorial, we'll create a RESTful API using MongoDB as our database.

We'll cover:
- Setting up MongoDB with Mongoose
- Creating schema models
- Implementing CRUD operations
- Error handling and validation
- Best practices for API design

MongoDB's flexible schema design makes it perfect for rapid development. Combined with Mongoose, we get powerful validation and type safety. We'll build an API that handles user authentication, data relationships, and complex queries.

By the end of this guide, you'll have a production-ready API that follows industry best practices. Let's get started building something amazing!`,
    image: "/photos/mongodb-logo.jpg",
    image_alt: "MongoDB logo",
    comments: [
      {
        user: "Alex Rodriguez",
        comment:
          "This helped me understand MongoDB relationships much better. Thank you!",
        time: new Date("2025-11-16T09:20:00"),
      },
      {
        user: "Emily Watson",
        comment:
          "Clear and concise explanation. The code examples are really helpful.",
        time: new Date("2025-11-17T16:45:00"),
      },
      {
        user: "David Kim",
        comment: "Would love to see a follow-up on authentication with JWT!",
        time: new Date("2025-11-18T11:30:00"),
      },
    ],
  },
  {
    title: "Mastering TypeScript in 2025",
    slug: "mastering-typescript-2025",
    date: new Date("2025-10-20"),
    description:
      "Essential TypeScript patterns and techniques every developer should know in 2025.",
    content: `TypeScript has become the de facto standard for building scalable JavaScript applications. In this comprehensive guide, we'll explore advanced TypeScript patterns that will level up your development game.

Topics covered:
- Advanced type inference
- Utility types and generics
- Discriminated unions
- Type guards and narrowing
- Conditional types

TypeScript's type system is incredibly powerful when you know how to use it effectively. We'll look at real-world examples and practical patterns you can apply immediately to your projects.

The TypeScript ecosystem continues to evolve, with new features and improvements landing in every release. Understanding these core concepts will make you a more effective developer and help you write safer, more maintainable code.`,
    image: "/photos/typescript-logo.jpg",
    image_alt: "TypeScript logo",
    comments: [
      {
        user: "Jessica Lee",
        comment:
          "The generics explanation finally made it click for me. Awesome post!",
        time: new Date("2025-10-21T13:00:00"),
      },
    ],
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Each",
    slug: "css-grid-vs-flexbox",
    date: new Date("2025-09-10"),
    description:
      "Understanding the differences between CSS Grid and Flexbox, and when to use each layout system.",
    content: `Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Understanding when to use each will make you a better frontend developer.

Flexbox is ideal for:
- One-dimensional layouts
- Navigation menus
- Card layouts
- Centering items

CSS Grid excels at:
- Two-dimensional layouts
- Complex page structures
- Magazine-style layouts
- Responsive designs

In practice, you'll often use both together. Flexbox for component-level layouts and Grid for page-level structure. Let's explore practical examples of each and see how they complement each other.

Modern CSS gives us unprecedented control over layouts. Mastering these tools will make your designs more flexible and maintainable.`,
    image: "/photos/css-layout.jpg",
    image_alt: "CSS Grid and Flexbox comparison",
    comments: [
      {
        user: "Chris Parker",
        comment:
          "I always wondered when to use which. This cleared it up perfectly!",
        time: new Date("2025-09-11T10:15:00"),
      },
      {
        user: "Nina Patel",
        comment: "Great visual examples. Would love more real-world use cases!",
        time: new Date("2025-09-12T15:30:00"),
      },
    ],
  },
];

// Sample project data
const sampleProjects = [
  {
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    subtitle: "Full-stack online shopping experience",
    description:
      "A comprehensive e-commerce platform built with Next.js, MongoDB, and Stripe. Features include product catalog, shopping cart, user authentication, order management, and payment processing. Implements responsive design and optimistic UI updates for a smooth user experience.",
    image: "/projects/ecommerce.jpg",
    skills: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
      "Redux",
    ],
    link: "https://ecommerce-demo.example.com",
    github: "https://github.com/yourusername/ecommerce-platform",
    comments: [
      {
        user: "Tom Baker",
        comment: "The checkout flow is really smooth! Great work on the UX.",
        time: new Date("2025-12-05T09:00:00"),
      },
      {
        user: "Lisa Anderson",
        comment: "Impressive project! How did you handle inventory management?",
        time: new Date("2025-12-06T14:20:00"),
      },
    ],
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    subtitle: "Collaborative project tracking tool",
    description:
      "A Trello-inspired task management application with drag-and-drop functionality, real-time updates, and team collaboration features. Built with React, Node.js, and Socket.io for instant synchronization across multiple users.",
    image: "/projects/task-manager.jpg",
    skills: [
      "React",
      "Node.js",
      "Socket.io",
      "PostgreSQL",
      "Material-UI",
      "Express",
    ],
    link: "https://taskmanager-demo.example.com",
    github: "https://github.com/yourusername/task-manager",
    comments: [
      {
        user: "Rachel Green",
        comment:
          "The drag-and-drop feature works flawlessly. Nice implementation!",
        time: new Date("2025-11-20T11:45:00"),
      },
    ],
  },
  {
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    subtitle: "Real-time weather visualization",
    description:
      "An interactive weather dashboard that displays current conditions, forecasts, and historical data. Integrates with OpenWeatherMap API and features beautiful data visualizations using Chart.js. Includes location search and geolocation support.",
    image: "/projects/weather-dashboard.jpg",
    skills: [
      "JavaScript",
      "Chart.js",
      "OpenWeatherMap API",
      "HTML5",
      "CSS3",
      "LocalStorage",
    ],
    link: "https://weather-dashboard.example.com",
    github: "https://github.com/yourusername/weather-dashboard",
    comments: [
      {
        user: "Mark Thompson",
        comment:
          "Love the clean UI! The charts make the data easy to understand.",
        time: new Date("2025-10-15T16:30:00"),
      },
      {
        user: "Sophie Martin",
        comment:
          "Could you add a feature to compare weather across multiple cities?",
        time: new Date("2025-10-16T10:00:00"),
      },
    ],
  },
  {
    title: "Social Media Analytics Tool",
    slug: "social-media-analytics",
    subtitle: "Track and analyze social media performance",
    description:
      "A comprehensive analytics dashboard for tracking social media metrics across multiple platforms. Features include engagement tracking, audience insights, content performance analysis, and automated reporting. Built to help content creators and marketers make data-driven decisions.",
    image: "/projects/analytics-tool.jpg",
    skills: [
      "Python",
      "Django",
      "React",
      "D3.js",
      "PostgreSQL",
      "Celery",
      "Redis",
    ],
    link: "https://analytics-tool.example.com",
    github: "https://github.com/yourusername/social-analytics",
    comments: [
      {
        user: "Kevin White",
        comment:
          "This would be so useful for my marketing team. Great insights!",
        time: new Date("2025-09-25T13:15:00"),
      },
    ],
  },
  {
    title: "Portfolio Website Generator",
    slug: "portfolio-generator",
    subtitle: "Create beautiful portfolios in minutes",
    description:
      "A web application that allows users to create professional portfolio websites without coding. Features customizable templates, drag-and-drop editor, and automatic responsive design. Exports to static HTML/CSS for easy hosting.",
    image: "/projects/portfolio-generator.jpg",
    skills: ["Vue.js", "Nuxt.js", "MongoDB", "AWS S3", "Sass", "Node.js"],
    link: "https://portfolio-gen.example.com",
    github: "https://github.com/yourusername/portfolio-generator",
    comments: [
      {
        user: "Amanda Foster",
        comment:
          "This is exactly what junior developers need! Super helpful tool.",
        time: new Date("2025-08-30T12:00:00"),
      },
      {
        user: "Brian Cooper",
        comment:
          "The templates are really professional. How many are available?",
        time: new Date("2025-09-01T09:30:00"),
      },
    ],
  },
  {
    title: "Recipe Sharing Platform",
    slug: "recipe-sharing-platform",
    subtitle: "Community-driven cooking platform",
    description:
      "A social platform for sharing and discovering recipes. Users can post recipes, rate dishes, save favorites, and create meal plans. Includes advanced search with dietary filters, ingredient substitution suggestions, and nutritional information.",
    image: "/projects/recipe-platform.jpg",
    skills: ["React", "Firebase", "TypeScript", "Styled Components", "Algolia"],
    link: "https://recipes.example.com",
    github: "https://github.com/yourusername/recipe-platform",
    comments: [],
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Optional: Clear existing data (comment out if you want to keep existing data)
    console.log("🗑️  Clearing existing data...");
    await Blog.deleteMany({});
    await Project.deleteMany({});
    console.log("✅ Existing data cleared");

    // Insert blog posts
    console.log("📝 Inserting blog posts...");
    const insertedBlogs = await Blog.insertMany(sampleBlogs);
    console.log(`✅ Inserted ${insertedBlogs.length} blog posts`);

    // Insert projects
    console.log("🚀 Inserting projects...");
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\nSummary:");
    console.log(`- ${insertedBlogs.length} blog posts`);
    console.log(`- ${insertedProjects.length} projects`);
    console.log(
      `- ${insertedBlogs.reduce(
        (acc, blog) => acc + blog.comments.length,
        0
      )} blog comments`
    );
    console.log(
      `- ${insertedProjects.reduce(
        (acc, project) => acc + project.comments.length,
        0
      )} project comments`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
  }
}

// Run the seeding function
seedDatabase();
