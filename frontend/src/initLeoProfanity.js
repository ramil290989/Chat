import leoProfanity from 'leo-profanity';
import { flatWords } from 'russian-bad-words';

const initLeoProfanity = () => {
  leoProfanity.add(flatWords);
};

export default initLeoProfanity;
