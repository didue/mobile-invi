import logo from './logo.svg';
import './App.css';
import JSConfetti from 'js-confetti';

const App = () => {

  
  const fnExploreConfetti = () => {
    
    const confetti = new JSConfetti();

    confetti.addConfetti({
      emojis: ['🎉', '👰🏻‍♀️', '🤵🏻‍♂️', '✨', '💛', '💜', '💞', '🌸'],
      emojiSize: 70,
      confettiNumber: 50,
   })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={fnExploreConfetti}>
          Boom 😈
        </button>
      </header>
    </div>
  );
}

export default App;
