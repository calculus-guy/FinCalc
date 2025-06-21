import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Input = ({value, onChange, placeholder, label, type}) => {
  const[showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <label className='text-[13px] text-slate-800'>
        {label}
      </label>

      <div className='input-box'>
        <input
        type={type == 'password' ? showPassword ? 'text' : 'password' : type}
        placeholder={placeholder}
        className='w-full bg-transparent outline-none'
        value={value}
        onChange={onChange}
        />
      {type ==="password" && (
        <>
        {showPassword ? (
          <FaEye
          size={22}
          className='text-primary cursor-pointer'
          onClick={toggleShowPassword}
          />
        ) : (
          <FaEyeSlash
          size = {22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword}
          />
        )}
        </>
      )}
      </div>
    </div>

  )
}

export default Input