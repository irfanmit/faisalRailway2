import * as yup from "yup";

export const validSchemas = yup.object({
  start: yup.string().required("Please enter your starting journey"),
  end: yup.string().required("Please enter your destination"),
});

export const validSchemas2 = yup.object({
  email: yup.string().email().required("Please enter your valid email"),
  password: yup.string().required("Please enter your password"),
  theUser : yup.string().required("please enter your username"),
});

export const validSchemas3 = yup.object({
  start2: yup.string().required("Please enter your starting journey"),
  end2: yup.string().required("Please enter your destination"),
})
