const STORAGE_KEY = "users";

export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// export const saveUser = (user) => {
//   const users = getUsers();
//   users.push(user);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
// };

export const findUser = (email, password) => {
  const users = getUsers();
  return users.find((u) => u.email === email && u.password === password);
};

// export const setCurrentUser = (user) => {
//   localStorage.setItem("currentUser", JSON.stringify(user));
// };

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};
