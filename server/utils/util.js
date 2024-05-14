import moment from "moment";

// Parses the current datetime using the moment library
export const getCurrentDateTime = () => {
  return moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
};

export const isValidEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
