import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

interface ForgotPasswordProps {
  formik: any;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ formik }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Forgot Password?
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              label="Enter your email address"
              type="email"
              id="email"
              name="email"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-700 text-white rounded-md"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending Link..." : "Send Link"}
          </button>
        </form>

        <div className="text-center text-gray-600 mt-4">
          <span>
            <Link to="/" className="text-blue-600 ">
              Back to website
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
