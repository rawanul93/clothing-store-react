import React from "react";
import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
        alert("passwords don't match")
        return;
    }

    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password) //it is an auth method that creates a user for us and signs them in with the passed on email and password.
   
        await createUserProfileDocument(user, { displayName }) //display name goes in as an object.
        this.setState({ //if sigining up is successfull we want to clear our state.
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

    } catch (error) {
        console.log('error signing up', error.message)
    }

  };

  handleChange = (event) => {
    const { name, value } = event.target; //it will get the name and value from the input tags which we assign and update the required state based on which input field we're dealing with.

    this.setState({
        [name]: value
    });
  }


  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
