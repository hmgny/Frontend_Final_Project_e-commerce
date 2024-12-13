import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
// Axios instance
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});
const SignupForm = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Hataları kullanıcı yazarken kontrol eder
    reValidateMode: "onChange", // Hataları her değişiklikte yeniden kontrol eder
    defaultValues: {
      role_id: "customer",
      
    },
  });
  const role_id = watch("role_id", "customer");
  
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
        
        if (response.data.length > 0) {
          setSelectedRole("customer");
        }
      } catch (error) {
        console.error("Roles could not be loaded:", error);
      }
    }
    fetchRoles();
  }, []);
  
  useEffect(() => {
    setValue("role_id", selectedRole);  
  }, [selectedRole, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
     
      const payload =
        data.role_id === "store"
          ? {
              name: data.name,
              email: data.email,
              password: data.password,
              role_id: data.role_id,
              store: {
                name: data.store_name,
                phone: data.store_phone,
                tax_no: data.tax_no,
                bank_account: data.bank_account,
              },
            }
          : {
              name: data.name,
              email: data.email,
              password: data.password,
              role_id: data.role_id,
            };
      const response = await api.post("/signup", payload);
      if (response.data?.message) {
        alert(response.data.message); 
        history.push("/"); 
      }
    } catch (error) {
      setError("api", {
        type: "manual",
        message: error.response?.data?.message || "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-Primary w-screen h-max-screen flex flex-col justify-center items-center">
    <form
      className="flex flex-col gap-4 w-500px h-100px justify-center items-center rounded-md bg-lightBackground p-10" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label className="text-textColor h5">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
          {...register("name", { required: true, minLength: 3 })}
        />
        <p
          className={`px-5 h8 text-SecondaryTextColor ${
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
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
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
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
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
        <label className="text-textColor h5">Confirm Password</label>
        <input
          type="password"
          placeholder="Enter your name"
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
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
        <label className="w-10/12 p-5 flex items-center ">Role</label>
        <select
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          {...register("role_id", { required: "Role selection is required" })}
          onChange={(e) => setSelectedRole(e.target.value)} 
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
          <p className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
            errors.role_id ? "text-red-700" : "hidden"}`}>Role is required.</p>
        )}
      </div>

      {selectedRole === "store" && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-textColor h5">Store Name</label>
            <input
            placeholder="Enter your store name"
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
              {...register("storeName", { required: true, minLength: 3 })}
            />
            <span className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
            errors.store_name ? "text-red-700" : "hidden"
          }`}>
              Store Name is required and must be at least 3 characters.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-textColor h5">Store Phone</label>
            <input
            placeholder="Enter your phone number"
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
              {...register("storePhone", {
                required: true,
                pattern: /^(\+90|0)?5\d{2}\d{7}$/,
              })}
            />
            <span className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
            errors.store_name ? "text-red-700" : "hidden"
          }`}>
              Store Phone is required and must be a valid Türkiye phone number.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-textColor h5">Store Tax ID</label>
            <input
            placeholder="Enter your Tax ID"
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
              {...register("storeTaxNo", {
                required: true,
                pattern: /^T\d{4}V\d{6}$/,
              })}
            />
            <span className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
            errors.store_name ? "text-red-700" : "hidden"
          }`}>
              Store Tax ID is required and must match the pattern
              "TXXXXVXXXXXX".
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-textColor h5">Store Bank Account</label>
            <input
            placeholder="Enter your bank account number"
          className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md"
              {...register("storeBankAccount", {
                required: true,
                pattern: /^TR\d{2}[0-9]{5}[0-9]{1,16}$/,
              })}
            />
            <span
              className={`px-5 h8 text-SecondaryTextColor max-w-[450px] ${
                errors.store_name ? "text-red-700" : "hidden"
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
    </form>
    </div>
  );
};

export default SignupForm;
