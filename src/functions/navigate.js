export const goToDashboard = (user, navigate) => {
  if (!user) return;

  if (user.role === "Admin") {
    navigate("/admin/dashboard");
  } else if (user.role === "Instructor") {
    navigate("/instructor/dashboard");
  } else {
    navigate("/user/dashboard");
  }
};

export const goToProfile = (user, navigate) => {
  if (!user) return;

  if (user.role === "Admin") {
    navigate("/admin/profile");
  } else if (user.role === "Instructor") {
    navigate("/instructor/profile");
  } else {
    navigate("/user/profile");
  }
};
