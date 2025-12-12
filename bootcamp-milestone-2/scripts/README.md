# Database Seeding Guide

This guide explains how to automatically populate your MongoDB database with dummy data.

## Prerequisites

- MongoDB connection string set in `.env.local` as `MONGO_URI`
- Node.js and pnpm installed

## Installation

First, install the required dependency:

```bash
pnpm add -D tsx
```

## Running the Seed Script

To populate your database with dummy data, run:

```bash
pnpm seed
```

Or directly with npx:

```bash
npx tsx scripts/seedDatabase.ts
```

## What Gets Seeded

The script will populate your database with:

### Blog Posts (4 sample posts)

- Getting Started with Next.js 15
- Building RESTful APIs with MongoDB
- Mastering TypeScript in 2025
- CSS Grid vs Flexbox: When to Use Each

Each blog post includes:

- Title, slug, date
- Description and full content
- Image and alt text
- 1-3 sample comments

### Projects (6 sample projects)

- E-Commerce Platform
- Task Management App
- Weather Dashboard
- Social Media Analytics Tool
- Portfolio Website Generator
- Recipe Sharing Platform

Each project includes:

- Title, slug, subtitle
- Description and technical details
- Image path
- Skills/technologies used
- Demo and GitHub links
- 0-2 sample comments

## Clearing Existing Data

By default, the script **clears all existing data** before seeding. If you want to keep your existing data and just add the sample data, edit `scripts/seedDatabase.ts` and comment out these lines:

```typescript
// Optional: Clear existing data (comment out if you want to keep existing data)
console.log("🗑️  Clearing existing data...");
await Blog.deleteMany({});
await Project.deleteMany({});
console.log("✅ Existing data cleared");
```

## Customizing the Data

To add your own dummy data:

1. Open `scripts/seedDatabase.ts`
2. Modify the `sampleBlogs` or `sampleProjects` arrays
3. Add/remove items as needed
4. Run `pnpm seed` again

## Troubleshooting

### "Cannot find module 'tsx'"

Run: `pnpm add -D tsx`

### "Cannot connect to MongoDB"

Check that your `MONGO_URI` is set correctly in `.env.local`

### "Duplicate key error"

The script tried to insert data with slugs that already exist. Either:

- Clear your database manually first
- Change the slugs in the seed data
- Or uncomment the deleteMany() calls to clear data automatically

## Next Steps

After seeding, visit:

- http://localhost:3000/blog - See all blog posts
- http://localhost:3000/projects - See all projects
- Click on any item to view details and comments
