import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthorizationContext from '../contexts/AuthorizationContext';

const LogOutButton = () => {
  const { authorizationData, setAuthorizationData } = useContext(AuthorizationContext);
  const { t } = useTranslation();

  return (
    authorizationData.token
      ? (
        <Button
          variant="primary"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setAuthorizationData({});
          }}
        >
          {t('buttons.logOut')}
        </Button>
      )
      : null
  );
};

export default LogOutButton;
