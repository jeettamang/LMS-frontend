import {
  LayoutDashboard,
  BookOpen,
  User,
  GraduationCap,
} from "lucide-react";

export const AdminMenu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Courses",
    path: "/admin/course-management",
    icon: BookOpen,
  },
  {
    name: "Students",
    path: "/admin/user-management",
    icon: User,
  },
  {
    name: "Instructor",
    path: "/admin/instructor-management",
    icon: GraduationCap,
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: User,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];
