"use client";
import React from "react";
import "./sign-in.styles.scss";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
/* import {FaMobile,FaApple, FaLinkedin, FaTwitter, FaYahoo, FaGithub} from 'react-icons/fa'
 */
import { FaFacebook } from "react-icons/fa";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth } from "../../firebase/firebase.utils";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "../../firebase/firebase.utils";
//import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      // const user =  userCredential.user;
      this.setState({ email: "", password: "" });
      //  window.location.href = '/';
    } catch (error) {
      //  console.log(error);
      this.setState({
        email: "",
        password: "",
      });
      alert("Email Or Password is Incorrect");

      //return ;
    }
  };
  handlechange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    //  console.log(this.state);
    return (
      <div className="sign-in">
        <div>
          <h2 className="sm:text-5xl text-md text-center text-bold">
            {" "}
            Welcome Back
          </h2>
        </div>
        <div>
          <span className="sm:text-xl text-sm text-center ">
            Please enter your details to sign in.
          </span>
        </div>
        <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
          <FormInput
            type="email"
            name="email"
            handelchange={this.handlechange}
            value={this.state.email}
            label="email"
            required
          />

          <FormInput
            type="password"
            name="password"
            handelchange={this.handlechange}
            value={this.state.password}
            label="password"
            required
          />

          <div className="sign-in-buttons">
            <div className="button">
              <CustomButton type="submit">sign in </CustomButton>
            </div>

            <div className="signInOptions">
              <div className="line"></div>
              <div className="signInIcons">
                <CustomButton onClick={signInWithGoogle} className="button-1">
                  <FcGoogle /> <span>Google</span>
                </CustomButton>
                <CustomButton onClick={signInWithFacebook} className="button-1">
                  <FaFacebook /> <span>facebook</span>
                </CustomButton>
                {/* <FcGoogle onClick={signInWithGoogle} className='hoverIcons'/> 
                                <FaFacebook onClick={signInWithFacebook} className='hoverIcons'/>  */}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default SignIn;
