import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';

function App() {
  return (
      <div className="container">
        <Header/>
        <div className="content">
          <Nav/>
          <Main/>
        </div>
      </div>
  );
}

export default App;
