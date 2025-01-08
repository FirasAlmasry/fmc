import React from 'react'
import HeaderBack from '../../components/global/HeaderBack'
import MainHeader from '../../components/global/MainHeader';
import iconLogin from './../../assets/auth/LoginNew.png'
import FormLogin from '../../components/auth/FormLogin';
import WrapperSection from '../../components/global/WrapperSection';

const Login = () => {

  return (
    <>
        <HeaderBack title={'Log In'} />
      <MainHeader image={iconLogin} title={"Log In"} description={"If you already have an account, please enter your registered phone number and password to log in to your account."} />
        <WrapperSection>
          <FormLogin />
        </WrapperSection>
    </>
  )
}

export default Login