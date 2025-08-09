import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import { Link, useNavigate } from "react-router-dom";
import Inputs from '../../components/Inputs/Inputs';
import { validateEmail, validatePassword, validFullName } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstace';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImage = "";

    if (!validFullName(fullName)) {
      setError("Name should contain only letters and spaces");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters with letters and numbers");
      return;
    }
    setError("");

    //Signup API Call

    try {

      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImage = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: profileImage,
      })
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again")
      }
    }

  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-sm text-slate-800 mt-[5px] mb-6'>Join us today entering details below</p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Inputs
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Inputs
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              type="text"
              label="Email Address"
              placeholder='john123@gmail.com'
            />
            <div className='col-span-2'>
              <Inputs
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                type="password"
                label="Password"
                placeholder='Min 8 characters'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-sm font-medium pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>SIGN UP</button>

          <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}
            <Link className='font-medium text-primary underline' to="/login">SignIn</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp;
