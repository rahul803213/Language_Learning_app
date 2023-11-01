import React, { useState } from "react";
import "./sign-in.styles.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/user/userSlice";
import { setTokenInLocal } from "@/client-helper/authHelper";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/Spinner";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "../../firebase/firebase.utils";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const id = user.uid;
      const documentReference = firestore.doc(`/users/${id}`); // Create a DocumentReference
      const getData = await documentReference.get();

      if (getData.exists) {
        const userData = getData.data();
        userData.id = id;

        setEmail("");
        setPassword("");
        console.log("userData", userData);
        // console.log("user");
        dispatch(setCurrentUser(userData));
        setTokenInLocal(userData);
        router.push("/home/learn");
      } else {
        // Handle the case where the document doesn't exist
        console.log("User document does not exist.");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      alert("Email Or Password is Incorrect");
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="sign-in">
          <div>
            <h2 className="sm:text-5xl text-md text-center text-bold">
              {" "}
              Welcome Back
            </h2>
          </div>
          <div>
            <span className="sm:text-xl text-sm text-center">
              Please enter your details to sign in.
            </span>
          </div>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormInput
              type="email"
              name="email"
              handelchange={handleChange}
              value={email}
              label="email"
              required
            />

            <FormInput
              type="password"
              name="password"
              handelchange={handleChange}
              value={password}
              label="password"
              required
            />

            <div className="sign-in-buttons">
              <div className="button flex flex-col gap-y-2">
                <CustomButton type="submit">sign in </CustomButton>
                <div>
                  {" "}
                  OR{" "}
                  <Link href={"/signup"} className="text-green-500">
                    Signup
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignIn;
