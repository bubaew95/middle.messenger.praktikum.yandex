import { HomePage } from './Pages/TestPage';
import './Components'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const homePage = new HomePage({ 
    title: 'Test page'
  });

  root.append(homePage.getContent()!);

  homePage.dispatchComponentDidMount();
});
