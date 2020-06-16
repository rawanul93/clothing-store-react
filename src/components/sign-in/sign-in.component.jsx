import React from "react";
import "./sign-in.styles.scss";
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ email: '', password: '' });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }); //object notation. Matches state property with the name (password or email) and then set it to the value user has entered.
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type="submit"> Sign in </CustomButton> {/*the Sign In here gets passed as children */}
            <CustomButton isGoogleSignIn onClick={signInWithGoogle}> Sign in with Google </CustomButton> {/*the Sign In here gets passed as children */}
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
