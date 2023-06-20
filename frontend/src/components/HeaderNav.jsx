import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthorizationData } from '../contexts/AuthorizationData.js';

const HeaderNav = () => {
  const [authorizationData, setAuthorizationData] = useContext(AuthorizationData);
  const { t } = useTranslation();
  
  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
    <Container>
      <Navbar.Brand href="/">{t('headers.headerNav')}</Navbar.Brand>
      {authorizationData.token ? (
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
      ) : null}
    </Container>
    </Navbar>
  )
};

export default HeaderNav;
