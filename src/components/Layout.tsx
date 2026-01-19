import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="layout" style={{ minHeight: '100vh' }}>
      <Header />
      <main
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#ffffff'
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
