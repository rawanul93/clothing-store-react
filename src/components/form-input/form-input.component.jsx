import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps}>
        
      </input>
      {label ? ( //some authors dont pass in a label. Since we have some added styling for ours, we wanna make sure that they did have label before we start styling it
        <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}> {/*we're giving it the shrink property based on whether the user has actually typed in anything i.e. if value.length > 1, then it will have the shrink className which will give it the animation that we want */}
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
