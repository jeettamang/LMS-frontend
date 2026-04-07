import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayouts";

// Public Pages
import Login from "../pages/auth/Login";
import Home from "../pages/nav/Home";
import Register from "../pages/auth/Register";
import Courses from "../pages/course/Courses";
import CourseDetails from "../pages/course/CourseDetails";
import About from "../pages/nav/About";
import Contact from "../pages/nav/Contact";
import EnrollCourse from "../pages/course/EnrollCourse";
import Footer from "../components/common/Footer";

// For admin
import AdminDashboard from "../features/admin/AdminDashboard";
import CourseManagement from "../features/admin/CourseManagement";
import CreateCourse from "../features/admin/CreateCourse";
import InstructorManagement from "../features/admin/InstructorManagement";
import CreateInstructor from "../features/admin/CreateInstructor";
import EditCourse from "../features/admin/EditCourse";
import EditInstructor from "../features/admin/EditInstructor";
import UserManagement from "../features/admin/UserManagement";
import FundHistory from "../features/admin/FundHistory";
import EditUser from "../features/admin/EditUser";
import BlogManagement from "../features/admin/BlogManagement";
import CreateBlog from "../features/admin/CreateBlog";
import EditBlog from "../features/admin/EditBlog";

// For user
import Dashboard from "../features/user/Dashboard";
import MyCourses from "../features/user/MyCourses";
import PaymentHistory from "../features/user/PaymentHistory";
import Blogs from "../pages/blogs/Blogs";
import BlogDetails from "../pages/blogs/BlogDetails";
import Profile from "../pages/profile/Profile";
import PaymentApi from "../payment/PaymentApi";
import Success from "../payment/Success";
import Failure from "../payment/Failure";
import AllEnrollments from "../features/admin/AllEnrollments";
import EditProfile from "../pages/profile/EditProfile";

//Instructor
import InstructorLayout from "../layouts/InstructorLayout";
import InstrucorDashboard from "../features/instructor/InstrucorDashboard";
import Students from "../features/instructor/Students";
import InstructorCreateCourse from "../features/instructor/InstructorCreateCourse";
import InstructorMyCourses from "../features/instructor/InstructorMyCourses";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/enroll/:id" element={<EnrollCourse />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/getBySlug/:slug" element={<BlogDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/payment" element={<PaymentApi />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failure" element={<Failure />} />
      </Route>

      {/* Student/User Dashboard Area */}
      <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="payment-history" element={<PaymentHistory />} />
        </Route>
      </Route>

      {/**Instructor */}
      <Route element={<ProtectedRoute allowedRoles={["Instructor"]} />}>
        <Route path="/instructor" element={<InstructorLayout />}>
          <Route path="dashboard" element={<InstrucorDashboard />} />
          <Route path="create-course" element={<InstructorCreateCourse />} />
          <Route path="my-courses" element={<InstructorMyCourses />} />
          <Route path="students" element={<Students />} />
        </Route>
      </Route>

      {/* Admin Dashboard Area */}
      <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route
            path="instructor-management"
            element={<InstructorManagement />}
          />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="create-instructor" element={<CreateInstructor />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
          <Route path="edit-instructor/:id" element={<EditInstructor />} />

          <Route path="fund-history" element={<FundHistory />} />
          <Route path="blogs" element={<BlogManagement />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="edit-blog/:slug" element={<EditBlog />} />
          <Route path="all-enrollments" element={<AllEnrollments />} />
        </Route>
      </Route>

      {/* Error page */}
      <Route
        path="*"
        element={
          <div className="p-20 text-center font-bold text-gray-500">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
