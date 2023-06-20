export default {
  translation: {
    toastifyNotify: {
      channelAdded: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удален',
    },
    headers: {
      headerNav: 'Hexlet Chat',
      login: 'Войти',
      signUp: 'Регистрация',
      addChannel: 'Добавить канал',
      removeChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      404: 'Страница не найдена',
    },
    titles: {
      channels: 'Каналы',
      sure: 'Уверены?',
      messagesInfo: {
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
    },
    texts: {
      noAccount: 'Нет аккаунта?',
      404: 'Но вы можете перейти',
    },
    inputs: {
      login: {
        label: 'Ваш ник',
        placeholder: 'Ваш ник',
      },
      username: {
        label: 'Имя пользователя',
        placeholder: 'Имя пользователя',
      },
      password: {
        label: 'Пароль',
        placeholder: 'Пароль',
      },
      confirmPassword: {
        label: 'Подтвердите пароль',
        placeholder: 'Подтвердите пароль',
      },
      message: {
        placeholder: 'введите текст сообщения',
      },
    },
    buttons: {
      logIn: 'Войти',
      logOut: 'Выйти',
      signUp: 'Зарегистрироваться',
      remove: 'Удалить',
      rename: 'Переименовать',
      send: 'Отправить',
      cancel: 'Отменить',
    },
    links: {
      signUp: 'Регистрация',
      toMain: 'на главную страницу',
    },
    loadingStatus: {
      loading: 'Загрузка',
      failed: 'Ошибка',
    },
    validations: {
      min3: 'От 3 символов',
      min6: 'Не менее 6 символов',
      max20: 'До 20 символов',
      oneOf: 'Пароли должны совпадать',
      notOneOf: 'Должно быть уникальным',
      required: 'Обязательное поле',
    },
    errors: {
      401: 'Неверный логин или пароль',
      409: 'Такой пользователь уже существует',
      connectionError: 'Ошибка соединения',
    },
  },
};
