# NexDesk

NexDesk is a full stack internal IT asset and support management system built as a portfolio project. It simulates the kind of internal tool an organization's IT department would use to track computers and equipment, manage support tickets, and maintain troubleshooting documentation.

## Overview

NexDesk lets IT staff:

- Track IT assets (laptops, desktops, monitors, printers, scanners, docking stations, network equipment) with assignment, status, and location details
- Create, assign, and update support tickets from request through resolution
- Search and filter both assets and tickets
- Browse a knowledge base of troubleshooting articles
- View employee and location records
- See live dashboard statistics calculated directly from the database

The project was built incrementally, backend and frontend connected end to end, with a real PostgreSQL database behind it rather than static or mock data.

## Screenshots

**Dashboard**
![Dashboard](screenshots/dashboard.png)

**Assets**
![Dashboard](screenshots/assets.png)

**Tickets**
![Dashboard](screenshots/tickets.png)

**Knowledge Base**
![Dashboard](screenshots/knowledge-base.png)

**Mobile view**
![Dashboard](screenshots/mobile-view.png)

## Features

- **Dashboard** — live stats (total assets, active devices, under repair, available, open tickets, resolved this month), recent tickets, assets by type, tickets by status
- **Assets** — full CRUD, search, filter by type and status, assignment to users and locations
- **Tickets** — full CRUD, category/priority/status tracking, technician assignment, inline quick status updates
- **Knowledge Base** — searchable troubleshooting articles with step by step guides, filterable by category
- **Users** — employee directory with department, role, and location
- **Locations** — office locations with live asset and ticket counts
- **Responsive design** — full sidebar navigation on desktop, collapsible slide out menu on mobile/tablet, card based layouts replacing tables on small screens
- **Form validation** — required field checks with inline error messages on all create/edit forms
- **Error handling** — consistent loading, empty, and error states (with retry) across every page

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Lucide React (icons)

**Backend**
- Node.js
- Express.js (REST API)

**Database**
- PostgreSQL
- Prisma ORM

**Tooling**
- Git / GitHub (GitHub Desktop)
- Postman / Thunder Client for API testing
- Prisma Studio for database inspection

## Architecture

NexDesk is split into two independent projects that communicate over a REST API:

```
NexDesk/
├── client/          React frontend (Vite)
│   └── src/
│       ├── components/   Reusable UI pieces (Modal, Badge, StatCard, forms, etc.)
│       ├── pages/         One component per route
│       ├── layouts/       Shared page shell (sidebar + content area)
│       ├── services/      API call functions, one file per resource
│       └── data/          Small fixed reference lists (dropdown options)
│
└── server/          Express backend
    └── src/
        ├── routes/        URL path definitions per resource
        ├── controllers/   Request handling and Prisma queries
        ├── middleware/     Error handling, 404 handling
        └── lib/            Shared Prisma Client instance
```

The frontend never talks to the database directly. It calls the Express API over HTTP, which uses Prisma to query PostgreSQL and returns JSON.

## Database Design

Five related tables, managed with Prisma:

- **Location** — offices (name, country); has many Assets and Tickets
- **User** — employees and technicians; can be assigned Assets, can request Tickets, can be assigned Tickets as a technician, can author Knowledge Articles
- **Asset** — IT equipment; belongs to one Location and one assigned User (both optional), has many Tickets
- **Ticket** — support requests; belongs to one Location and one Asset (optional), has one requester and one technician (both User relationships, connected via named Prisma relations since a Ticket references User in two different roles)
- **KnowledgeArticle** — troubleshooting articles with an author (User)

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | API health check |
| GET | `/api/assets` | List all assets |
| GET | `/api/assets/:id` | Get one asset by asset tag |
| POST | `/api/assets` | Create an asset |
| PUT | `/api/assets/:id` | Update an asset |
| DELETE | `/api/assets/:id` | Delete an asset |
| GET | `/api/tickets` | List all tickets |
| GET | `/api/tickets/:id` | Get one ticket by ticket number |
| POST | `/api/tickets` | Create a ticket |
| PUT | `/api/tickets/:id` | Update a ticket |
| DELETE | `/api/tickets/:id` | Delete a ticket |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get one user by employee ID |
| GET | `/api/locations` | List all locations with asset/ticket counts |
| GET | `/api/knowledge-base` | List all knowledge base articles |
| GET | `/api/knowledge-base/:id` | Get one article |
| GET | `/api/dashboard` | Aggregated dashboard statistics |

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL installed and running locally

### Installation

Clone the repository:

```bash
git clone https://github.com/SkavAngr0/it-asset-support-management-system.git
cd it-asset-support-management-system
```

**Backend setup**

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

```
PORT=5000
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/nexdesk?schema=public"
```

Run migrations and seed the database:

```bash
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

Start the backend:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

**Frontend setup**

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Sample Data

The seed script generates realistic sample data:

- 4 locations
- 21 users (employees and IT technicians)
- 55 assets
- 25 support tickets
- 10 knowledge base articles

## Future Improvements

- Authentication and role based access control (Admin / Technician / Employee)
- Full CRUD for Users and Locations from the UI
- Pagination for large asset and ticket lists
- File attachments on tickets
- Email notifications on ticket updates

## What I Learned

Building NexDesk was my first time connecting a React frontend to a real Express and PostgreSQL backend end to end, rather than working with mock data. Along the way I worked through relational database design and foreign key relationships with Prisma, building a REST API with proper error handling and validation, and adapting to breaking changes between Prisma major versions (including the move to explicit driver adapters). I also learned to design with responsiveness in mind from the start rather than as an afterthought, after testing the app across phone, tablet, and desktop screen sizes and fixing what didn't hold up.

## License

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.

---

This is a portfolio project built for learning purposes and to demonstrate practical full stack development skills. It uses reasonable, beginner appropriate security practices (environment variables, input validation, Prisma's built in protection against SQL injection) but has not been hardened for production use.
