import React, { ChangeEventHandler } from "react";
import styles from "./Select.module.scss";

type Option = {
  [key: string]: string | number;
};

type PropTypes = {
  label?: string;
  name: string;
  defaultValue?: string | number;
  disabled?: boolean;
  options: Option[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  labelKey: string;
  valueKey: string;
  placeholder?: string;
  [key: string]: any;
};

const Select: React.FC<PropTypes> = ({
  label,
  name,
  defaultValue,
  disabled,
  options,
  className,
  onChange,
  labelKey,
  valueKey,
  placeholder = "-",
  ...props
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
        onChange={onChange}
        {...props}
      >
        <option value="">Select {placeholder}</option>
        {options.map((option) => (
          <option value={option[valueKey]} key={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
