import './App.css';
import { Header } from './pages/Header';
import { Intro } from './pages/Intro';
import { Footer } from './pages/Footer';

const App = () => {

  return (
    <div className='container'>
      {/* 헤더 */}
      <Header/>
      {/* 인사말 */}
      <Intro/>
      {/* 예약일시 */}
      {/* 갤러리 */}
      {/* 오시는길 안내 */}
      {/* 마음 전하실 곳 */}
      {/* 안내사항 */}
      {/* 방명록/참석여부 */}
      {/* 푸터 */}
      <Footer/>
    </div>
  );
}

export default App;
