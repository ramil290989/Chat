import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthorizationData } from '../contexts/AuthorizationData.js';

const HeaderNav = () => {
  const [authorizationData, setAuthorizationData] = useContext(AuthorizationData);
  const { t } = useTranslation();

  const LogOutButton = () => (
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
  );  
  
  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
    <Container>
      <Navbar.Brand href="/">{t('headers.headerNav')}</Navbar.Brand>
      {authorizationData.token ? <LogOutButton /> : null}
    </Container>
    </Navbar>
  )
};

export default HeaderNav;
