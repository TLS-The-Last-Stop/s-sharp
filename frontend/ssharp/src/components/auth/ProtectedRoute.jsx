import React, { useState } from 'react';
import { getCookie } from '../../utils/authUtils';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const accessToken = getCookie('accessToken');
  const [showModal, setShowModal] = useState(false);

  if (!accessToken) {
    return (
        <>
          <LoginModal />
        </>
    );
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
