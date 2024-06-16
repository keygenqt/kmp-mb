import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { useEffect } from "react";
import shared from "shared";


const HttpClient = new shared.mb.shared.service.ServiceRequestJS('http://localhost:3001/api/')

function App() {

  const [list, setList] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setList((await HttpClient.get.experts()).toArray());
    }
    fetchData().catch(console.error);
  }, []);

  const items = []

  list.forEach((item) => {
    items.push(item.name);
  })

  return (
    <div className='App'>
      <div className='Table'>
        <div className='Table-Row'>
          <div className='Table-Cell'>
            <div className='Title'>
              Mobile Broadcast
            </div>
            <div className='Subtitle'>
              Admin Panel
            </div>
            {items.length ?
              <div className='Experts'>
                Experts: {items.join(', ')}
              </div>
              :
              <div className='Loading'>
                Loading...
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
