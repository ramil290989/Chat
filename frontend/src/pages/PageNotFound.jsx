import React from 'react';
import { useTranslation } from 'react-i18next';
import route from '../routes';
import pageNotFoundImage from '../img/404.svg';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img src={pageNotFoundImage} alt="" className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('headers.404')}</h1>
      <p className="text-muted">
        {t('texts.404')}
        <a href={route.toMainPage()}>{t('links.toMain')}</a>
      </p>
    </div>
  );
};

export default PageNotFound;
