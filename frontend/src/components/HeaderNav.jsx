import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LogOutButton from './LogOutButton.jsx';

const HeaderNav = () => {
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
      <Container>
        <Navbar.Brand href="/">{t('headers.headerNav')}</Navbar.Brand>
        <LogOutButton />
      </Container>
    </Navbar>
  );
};

export default HeaderNav;
