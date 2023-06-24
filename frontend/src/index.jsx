import ReactDOM from 'react-dom';
import init from './init.jsx';

init().then((vdom) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    vdom,
  );
});
