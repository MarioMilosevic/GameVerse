export const baseUrl = "http://localhost:3000/api/v1";

export const passwordMessage = {
  message: "Password must be at least 8 characters",
};

export const loginInputs = [
  {
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    label: "Email Address",
  },
  {
    name: "password",
    placeholder: "••••••••",
    type: "password",
    label: "Password",
  },
];

export const signUpInputs = [
  {
    name: "fullName",
    placeholder: "John Doe",
    type: "text",
    label: "Your Full Name",
  },
  {
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    label: "EmailAddress",
  },
  {
    name: "password",
    placeholder: "••••••••",
    type: "password",
    label: "Password",
  },
  {
    name: "confirmPassword",
    placeholder: "••••••••",
    type: "password",
    label: "Confirm Password",
  },
];
