interface User {
  id: string;
  name: string;
  email: string;
}

export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
