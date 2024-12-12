import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange", // Hataları kullanıcı yazarken kontrol eder
    reValidateMode: "onChange", // Hataları her değişiklikte yeniden kontrol eder
  });
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('customer');
  const [storeName, setStoreName] = useState('');
  const [storeNameError, setStoreNameError] = useState(null);

  const [storeFieldsVisible, setStoreFieldsVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roles");
        setRoles(response.data || []);
        
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    try {
      const { role_id } = data;
      let postData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: selectedRole,
      };

      if (role_id === "store") {
        postData.store = {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxNo,
          bank_account: data.storeBankAccount,
        };
      }

      await axiosInstance.post("/signup", postData);
      history.push("/");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
      setStoreFieldsVisible(selectedRole === "store");
    
    
  };
  return (
    <div className="bg-Primary w-screen h-screen flex flex-col justify-center items-center">
    <form
      className="flex flex-col gap-4 w-500px h-100px justify-center items-center rounded-md bg-lightGray2 p-10" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label className="text-textColor h5">Name *</label>
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
          {...register("role_id", { required: true })}
          onChange={handleRoleChange}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
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

      {storeFieldsVisible && (
        <>
          <div className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md">
            <label className="text-textColor h5">Store Name</label>
            <input
              {...register("storeName", { required: true, minLength: 3 })}
            />
            <span className={errors.storeName ? "text-red-700" : "text-black"}>
              Store Name is required and must be at least 3 characters.
            </span>
          </div>

          <div className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md">
            <label className="text-textColor h5">Store Phone</label>
            <input
              {...register("storePhone", {
                required: true,
                pattern: /^(\+90|0)?5\d{2}\d{7}$/,
              })}
            />
            <span className={errors.storePhone ? "text-red-700" : "text-black"}>
              Store Phone is required and must be a valid Türkiye phone number.
            </span>
          </div>

          <div className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md">
            <label className="text-textColor h5">Store Tax ID</label>
            <input
              {...register("storeTaxNo", {
                required: true,
                pattern: /^T\d{4}V\d{6}$/,
              })}
            />
            <span className={errors.storeTaxNo ? "text-red-700" : "text-black"}>
              Store Tax ID is required and must match the pattern
              "TXXXXVXXXXXX".
            </span>
          </div>

          <div className="w-[450px] h-[50px] p-5 h7 text-SecondaryTextColor rounded-md">
            <label className="text-textColor h5">Store Bank Account</label>
            <input
              {...register("storeBankAccount", {
                required: true,
                pattern: /^TR\d{2}[0-9]{5}[0-9]{1,16}$/,
              })}
            />
            <span
              className={
                errors.storeBankAccount ? "text-red-700" : "text-black"
              }
            >
              Store Bank Account is required and must be a valid IBAN.
            </span>
          </div>
        </>
      )}

      <button
        className="bg-Primary text-lightTextColor text-3xl h7 font-bold w-[450px] h-[50px] rounded-md flex justify-center items-center"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
    </div>
  );
};

export default SignupForm;
