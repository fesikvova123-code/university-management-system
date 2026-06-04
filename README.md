# University Management System

A full-featured platform for managing students, faculty, courses, attendance, and academic records.

## Features

- **Student Management** - CRUD operations, registration, records
- **Faculty Management** - Faculty profiles, schedules, and performance tracking
- **Course Management** - Create and manage courses with enrollment
- **Course Registration** - Calendar view with schedule and conflict detection
- **Attendance Tracking** - Real-time attendance monitoring and analytics
- **Grade Management** - Grade entry and GPA calculations
- **Fee Management** - Student fee submissions and tracking
- **Reports & Analytics** - Dashboard with charts and statistics
- **Search Functionality** - Find students, courses, and faculty by ID
- **User Authentication** - Secure login for students and faculty

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Recharts
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB Atlas
- **Tools**: Axios, Mongoose, JWT, Bcrypt

## Project Structure

```
university-management-system/
├── server/                 # Backend (Node.js + Express)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── middleware/        # Authentication & validation
│   ├── config/            # Database config
│   └── index.js           # Server entry point
├── client/                # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom hooks
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main app
│   └── package.json
└── package.json           # Root package.json
```

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/fesikvova123-code/university-management-system.git
   cd university-management-system
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Setup environment variables**
   - Create `.env` in `server/` folder:
   ```
   MONGODB_URI=mongodb+srv://your-user:your-password@cluster.mongodb.net/university
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## API Documentation

### Student Routes
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Course Routes
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Faculty Routes
- `GET /api/faculty` - Get all faculty
- `GET /api/faculty/:id` - Get faculty by ID
- `POST /api/faculty` - Create new faculty
- `PUT /api/faculty/:id` - Update faculty
- `DELETE /api/faculty/:id` - Delete faculty

### Enrollment Routes
- `POST /api/enrollments` - Enroll student in course
- `GET /api/enrollments/student/:studentId` - Get student enrollments
- `DELETE /api/enrollments/:id` - Drop course

### Attendance Routes
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/:studentId` - Get student attendance
- `GET /api/attendance/course/:courseId` - Get course attendance

## Features in Detail

### Dashboard
- Overview of total students, faculty, and courses
- Revenue and expense tracking
- Attendance rate analytics
- Recent activities

### Student Management
- View, create, update, and delete student records
- Search students by ID or name
- View enrollment history
- Track attendance and grades

### Course Registration
- Calendar view of available courses
- Schedule conflict detection
- Easy enrollment and course dropping
- Display of course information (time, location, instructor)

### Faculty Dashboard
- View assigned courses
- Track student attendance
- Enter and manage grades
- View analytics and reports

### Reports & Analytics
- Student enrollment statistics
- Course popularity charts
- Attendance trends
- Grade distribution reports

## Screenshots

### Dashboard
![Dashboard](./images/dashboard.png)

### Students Management
![Students](./images/students.png)

### Course Registration
![Courses](./images/courses.png)

### Analytics
![Analytics](./images/analytics.png)

## Testing

The application has been tested for:
- ✅ Student CRUD operations
- ✅ Course enrollment and registration
- ✅ Attendance tracking
- ✅ Grade management
- ✅ Search functionality
- ✅ Schedule conflict detection
- ✅ Authentication and authorization
- ✅ Data validation
- ✅ Error handling

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

MIT License - feel free to use this project for educational purposes.

## Support

For issues and questions, please open an issue on GitHub.

---

**Created with ❤️ by fesikvova123-code**
