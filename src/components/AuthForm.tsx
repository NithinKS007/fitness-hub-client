import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SignState } from "../types/authTypes";
import useAuthForm from "../hooks/useAuthForm";
import GoogleAuth from "./GoogleAuth";

const AuthForm: React.FC = () => {
  const [signState, setSignState] = useState<SignState>("sign in");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formik = useAuthForm(signState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white border border-gray-300 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {signState === "sign in"
            ? "Sign in to your account"
            : "Create your account"}
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {signState === "sign up" && (
            <div className="flex space-x-4">
              <div className="flex-1">
                <TextField
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  name="fname"
                  label="First Name"
                  variant="standard"
                  fullWidth
                  error={formik.touched.fname && Boolean(formik.errors.fname)}
                  helperText={formik.touched.fname && formik.errors.fname}
                />
              </div>
              <div className="flex-1">
                <TextField
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  name="lname"
                  label="Last Name"
                  variant="standard"
                  fullWidth
                  error={formik.touched.lname && Boolean(formik.errors.lname)}
                  helperText={formik.touched.lname && formik.errors.lname}
                />
              </div>
            </div>
          )}

          <div>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>

          <div>
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          {signState === "sign up" && (
            <div>
              <TextField
                value={formik.values.cPassword}
                onChange={formik.handleChange}
                name="cPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                variant="standard"
                fullWidth
                error={
                  formik.touched.cPassword && Boolean(formik.errors.cPassword)
                }
                helperText={formik.touched.cPassword && formik.errors.cPassword}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          )}

          {signState === "sign in" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                <span className="text-blue-600 cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            </>
          )}
          <GoogleAuth />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-700 text-white rounded-md"
          >
            {formik.isSubmitting
              ? signState === "sign in"
                ? "Signing In..."
                : "Signing Up..."
              : signState === "sign in"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <div className="text-gray-600 flex justify-center mt-4">
          {signState === "sign up" ? (
            <>
              Already have an account?
              <span
                onClick={() => setSignState("sign in")}
                className="ml-2 font-medium cursor-pointer text-blue-600"
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Dont have an account ?
              <span
                onClick={() => setSignState("sign up")}
                className="ml-2 font-medium cursor-pointer text-blue-600"
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
