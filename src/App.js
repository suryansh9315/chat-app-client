import {Routes,Route} from 'react-router-dom'
import Chat from './components/chat/Chat';
import User from './components/user/User';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' exact element={<User />}/>
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
