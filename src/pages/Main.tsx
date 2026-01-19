import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>DOKA APP</h1>
      <div className="card">
        <button onClick={() => navigate('/login', { replace: true })}>
          Авторизация
        </button>
      </div>
    </>
  )
}

export default MainPage
