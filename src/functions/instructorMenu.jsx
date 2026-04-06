import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  GraduationCap,
  UserCircle,
} from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    path: "/instructor/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "My Courses",
    path: "/instructor/my-courses",
    icon: <BookOpen size={20} />,
  },
  {
    name: "Create Course",
    path: "/instructor/create-course",
    icon: <PlusCircle size={20} />,
  },
  {
    name: "Students",
    path: "/instructor/students",
    icon: <GraduationCap size={20} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <UserCircle size={20} />,
  },
];
