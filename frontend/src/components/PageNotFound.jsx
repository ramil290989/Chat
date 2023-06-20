import React from 'react';
import { useTranslation } from 'react-i18next';
import pageNotFoundImage from '../img/404.svg';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img src={pageNotFoundImage} className="img-fluid h-25"></img>
      <h1 class="h4 text-muted">{t('headers.404')}</h1>
      <p class="text-muted">{t('texts.404')} <a href="/">{t('links.toMain')}</a></p>
    </div>
  );
};

export default PageNotFound;
