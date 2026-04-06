import { LayoutDashboard, BookOpen, CreditCard, User } from "lucide-react";

export const userMenu = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    path: "/user/my-courses",
    icon: BookOpen,
  },
  {
    name: "Payment History",
    path: "/user/payment-history",
    icon: CreditCard,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];
