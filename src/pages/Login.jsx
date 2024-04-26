import React, { useContext } from 'react';
import Input from '../components/UI/input/Input';
import Button from '../components/UI/button/Button';
import { AuthContext } from '../context';

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = e => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }

  return (
    <div>
      <h1>Авторизация</h1>
      <form action="" onSubmit={login}>
        <Input type="text" placeholder='Логин' />
        <Input type="password" placeholder='Password' />
        <Button>Войти</Button>
      </form>
    </div>
  );
}

export default Login;
