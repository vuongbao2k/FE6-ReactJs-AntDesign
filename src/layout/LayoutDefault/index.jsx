import Footer from './Footer';
import Header from './Header';
import './LayoutDefault.scss'
import Main from './Main';

import { useSelector } from 'react-redux';

function LayoutDefault() {
  // eslint-disable-next-line no-unused-vars
  const isLogin = useSelector(state => state.loginReducer);
  // console.log(isLogin);

  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default LayoutDefault;