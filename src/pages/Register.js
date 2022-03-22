import React from "react";
import axios from "Helper/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login(props) {

  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = async (data) => {

    // 3.處理註冊邏輯
    try {
      const {nickname, email, password} = data;
      const res = await axios.post('/auth/register', {nickname, email, password, type:0});
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success');

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
          <label>Nickname</label>
          <div className="control">
            <input
              name="nickname"
              className="input"
              type="text"
              placeholder="Nickname"
              {...register("nickname", {
                required: 'this field is required',
              })}
            />
            {errors.nickname && <p className="helper has-text-danger">{errors.nickname.message}</p>}
          </div>
        </div>
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
          <button className="button is-fullwidth is-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
