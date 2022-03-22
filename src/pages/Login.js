import React from "react";
import axios from "Helper/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login(props) {

  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = async (data) => {

    // 3.處理登陸邏輯
    try {
      const {email, password} = data;
      const res = await axios.post('/auth/login', {email, password});
      const jwToken = res.data;
      console.log(jwToken);
      global.auth.setToken(jwToken);
      toast.success('Login Success');

    //跳轉首頁
      props.history.push('/');

    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data.message;
      toast.error(message);

    }


    // 4.跳轉首頁畫面
    // this.props.history.push('/');
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Email</label>
          <div className="control">
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: 'this field is required',
                pattern: {
                  value:/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                  message:'invalid email'
                }
              })}
            />
            {errors.email && <p className="helper has-text-danger">{errors.email.message}</p>}
          </div>
        </div>
        <div className="field">
          <label>PassWord</label>
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              placeholder="PassWord"
              {...register("password", {
                required: 'this field is required',
                minLength: {
                  value: 6,
                  message: 'can not be less then 6 digits'
                }
              })}
            />
            {errors.password && <p className="helper has-text-danger">{errors.password.message}</p>}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Login</button>
        </div>
      </form>
    </div>
  );
}
