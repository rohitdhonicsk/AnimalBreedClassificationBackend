import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import Upload from './components/UploadImage/upload';
import Header from './components/Header/Header';
// import Detail from './components/ShowDetail/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        {/* <Nav></Nav> */}
        <div style={{ marginBottom: "100px" }}>
          <Header data="5" ></Header>
          {/* <Detail></Detail> */}
        </div>
        {/* <Footer></Footer> */}
      </BrowserRouter>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
