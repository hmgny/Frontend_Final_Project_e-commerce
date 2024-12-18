import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setRoles,
  setSelectedRole,
  setFetchState,
  setLoading,
} from "../store/actions/clientActions";

// Axios instance
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const { roles, selectedRole, fetchState, loading } = useSelector(
    (state) => state.client
  );
  const history = useHistory();

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      role_id: "customer",
    },
  });

  const role_id = watch("role_id", "customer");

  useEffect(() => {
    async function fetchRoles() {
      if (fetchState === "NOT_FETCHED") {
        dispatch(setFetchState("FETCHING"));
        try {
          const response = await api.get("/roles");
          dispatch(setRoles(response.data));
          dispatch(setFetchState("FETCHED"));

          if (response.data.length > 0) {
            dispatch(setSelectedRole("customer"));
          }
        } catch (error) {
          console.error("Roles could not be loaded:", error);
          dispatch(setFetchState("FAILED"));
        }
      }
    }
    fetchRoles();
  }, [dispatch, fetchState]);

  useEffect(() => {
    setValue("role_id", selectedRole);
  }, [selectedRole, setValue]);

  const onSubmit = async (data) => {
    dispatch(setLoading(true)); // Start loading
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        // Add other fields as necessary
      };
      const response = await api.post("/signup", payload);
      if (response.data?.message) {
        alert(response.data.message);
        history.push("/");
      }
    } catch (error) {
      setError("api", {
        type: "manual",
        message:
          error.response?.data?.message || "An unexpected error occurred",
      });
    } finally {
      dispatch(setLoading(false)); // Stop loading
    }
  };

  return (
    <div className="bg-Primary w-screen h-screen flex flex-col justify-center items-center ">
      <h1 className="h3 font-bold text-lightTextColor">SIGN UP</h1>
      <form
        className="flex flex-col gap-4 w-500px h-100px justify-center items-center rounded-md bg-lightBackground p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label className="text-textColor h5">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md border border-Primary"
            {...register("name", { required: true, minLength: 3 })}
          />
          <p
            className={`px-5 h8 text-SecondaryTextColor border border-black ${
              errors.name ? "text-red-700" : "hidden"
            }`}
          >
            Name is required and must be at least 3 characters.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-textColor h5">Email</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md border border-Primary"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <p
            className={`px-5 h8 text-SecondaryTextColor ${
              errors.email ? "text-red-700" : "hidden"
            }`}
          >
            Email is required and must be valid.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-textColor h5">Password</label>
          <input
            type="password"
            placeholder="Enter your name"
            className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md  border border-Primary"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
          <p
            className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
              errors.password ? "text-red-700" : "hidden"
            }`}
          >
            Password must be at least 8 characters, including numbers, upper and
            lower case letters, and special characters.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-textColor h5 ">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your name"
            className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md border border-Primary"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
          />
          <p
            className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
              errors.confirmPassword ? "text-red-700" : "hidden"
            }`}
          >
            {errors.confirmPassword && errors.confirmPassword.message}
          </p>
        </div>

        <div className="">
          <div className="flex w-[450px] h7 rounded-md h-[50px] text-SecondaryTextColor">
            <label className="rounded-l-md w-10/12 p-5 flex items-center border border-Primary ">
              Role
            </label>
            <select
              className=" rounded-r-md p-2 focus:ring-2 focus:ring-blue-500 border border-Primary"
              {...register("role_id", {
                required: "Role selection is required",
              })}
              onChange={(e) => dispatch(setSelectedRole(e.target.value))}
              value={selectedRole}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.code}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {errors.role_id && (
            <p
              className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
                errors.role_id ? "text-red-700" : "hidden"
              }`}
            >
              Role is required.
            </p>
          )}
        </div>

        {selectedRole === "store" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-textColor h5">Store Name</label>
              <input
                placeholder="Enter your store name"
                className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md border border-Primary"
                {...register("store_name", { required: true, minLength: 3 })}
              />
              <span
                className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
                  errors.store_name ? "text-red-700" : "hidden"
                }`}
              >
                Store Name is required and must be at least 3 characters.
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-textColor h5">Store Phone</label>
              <input
                placeholder="Enter your phone number"
                className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md border border-Primary"
                {...register("store_phone", {
                  required: true,
                  pattern: /^(\+90|0)?5\d{2}\d{7}$/,
                })}
              />
              <span
                className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
                  errors.store_phone ? "text-red-700" : "hidden"
                }`}
              >
                Store Phone is required and must be a valid Türkiye phone
                number.
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-textColor h5">Store Tax ID</label>
              <input
                placeholder="Enter your Tax ID"
                className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md border border-Primary"
                {...register("tax_no", {
                  required: true,
                  pattern: /^T\d{4}V\d{6}$/,
                })}
              />
              <span
                className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
                  errors.tax_no ? "text-red-700" : "hidden"
                }`}
              >
                Store Tax ID is required and must match the pattern
                "TXXXXVXXXXXX".
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-textColor h5">Store Bank Account</label>
              <input
                placeholder="Enter your bank account number"
                className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md border border-Primary"
                {...register("bank_account", {
                  required: true,
                  pattern: /^TR\d{2}[0-9]{5}[0-9]{1,16}$/,
                })}
              />
              <span
                className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
                  errors.bank_account ? "text-red-700" : "hidden"
                }`}
              >
                Store Bank Account is required and must be a valid IBAN.
              </span>
            </div>
          </>
        )}

        <button
          className="bg-Primary text-lightTextColor text-3xl h7 font-bold w-[450px] h-[50px] rounded-md flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
        <p>
          {" "}
          Already have an account?{" "}
          <Link className="text-Primary font-bold" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
