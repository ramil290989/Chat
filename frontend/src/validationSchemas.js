import * as Yup from 'yup';

const validationSchemaChannelName = (channelNames, t) => Yup.object({
  name: Yup.string()
    .min(3, t('validations.min3max20'))
    .max(20, t('validations.min3max20'))
    .notOneOf(channelNames, t('validations.notOneOf'))
    .required(t('validations.required')),
});

const validationSchemaSignUp = (t) => Yup.object({
  username: Yup.string()
    .min(3, t('validations.min3max20'))
    .max(20, t('validations.min3max20'))
    .required(t('validations.required')),
  password: Yup.string()
    .min(6, t('validations.min6'))
    .required(t('validations.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('validations.oneOf'))
    .required(t('validations.required')),
});

export { validationSchemaChannelName, validationSchemaSignUp };
