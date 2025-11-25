export const validateUsername = (username: string) => {
if (!username) return "Username is required";
if (username.length < 5 || username.length > 20)
return "Username must be between 5 and 20 characters";
if (!/^[A-Za-z0-9!@#$%^&*()]*$/.test(username))
return "Username can include letters, numbers, and !@#$%^&*()";
return "";
};

export const validateEmail = (email: string) => {
if (!email) return "Email is required";
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
if (!emailRegex.test(email)) return "Invalid email address";
return "";
};

export const validatePassword = (password: string) => {
if (!password) return "Password is required";
if (password.length < 6 || password.length > 20)
return "Password must be 6–20 characters";
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])/;
if (!strongPassword.test(password))
return "Password must have uppercase, lowercase, number & special character";
return "";
};

export const validateName = (name: string) => {
if (name.length > 50) return "Name cannot exceed 50 characters";
if (!/^[A-Za-z\s]*$/.test(name)) return "Name can only contain letters and spaces";
return "";
};
