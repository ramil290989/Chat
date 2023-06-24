import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthorizationData } from '../contexts/AuthorizationData.js';

const LogOutButton = () => {
  const [authorizationData, setAuthorizationData] = useContext(AuthorizationData);
  const { t } = useTranslation();

  return (
    authorizationData.token
      ? (
        <Button
          variant="primary"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setAuthorizationData({ username: null, token: null });
          }}
        >
          {t('buttons.logOut')}
        </Button>
      )
      : null
  );
};

export default LogOutButton;
