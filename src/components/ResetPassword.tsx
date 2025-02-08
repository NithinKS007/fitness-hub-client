import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

interface ResetPasswordProps {
  formik: any;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ formik }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Reset Your Password
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              value={formik.values.password}  
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="New Password"
              type="password"
              id="password"
              name="password"  
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              value={formik.values.cPassword}  
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cPassword && Boolean(formik.errors.cPassword)}
              helperText={formik.touched.cPassword && formik.errors.cPassword}
              label="Confirm Password"
              type="password"
              id="cPassword"
              name="cPassword"  
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
            {formik.isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center text-gray-600 mt-4">
          <span>
            <Link to="/auth" className="text-blue-600 hover:underline">
              Back to Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
