import React from 'react'
import HeaderBack from '../../components/global/HeaderBack'
import StepsRegister from '../../components/auth/StepsRegister';
import WrapperSection from '../../components/global/WrapperSection';

const Register = () => {

  return (
    <>
      <HeaderBack title={'Create a New Account'} />
        <WrapperSection>
          <StepsRegister />
        </WrapperSection>
    </>
  )
}

export default Register