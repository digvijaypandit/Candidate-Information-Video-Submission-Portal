import "./FormInput.css";

export default function FormInput({ 
  label, 
  name, 
  type = "text", 
  onChange, 
  required, 
  placeholder,
  value,
  ...rest 
}) {
  return (
    <div className="form-input-wrapper">
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-input"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
    </div>
  );
}