import React, {useEffect, useState} from 'react';
import './App.css';


function App() {

    let [message, setMessage] = useState('');
    let [socket, setSocket] = useState(null);
    let [messages, setMessages] = useState([]);


    useEffect(() => {
        const socket = new WebSocket("wss://social-network.samuraijs.com/handlers/chatHandler.ashx");
        setSocket(socket);
        window.socket = socket;
        socket.onmessage = (e) => {
            let messagesFromServer = JSON.parse(e.data);
            setMessages((messages) => [...messagesFromServer.reverse(), ...messages]);
        }
    }, []);


    let onMessageChange = (e) => {
        setMessage(e.currentTarget.value);
    };

    const onMessageSendClick = () => {
        socket.send(message);
        setMessage('');
    };

    const onKeyPress = (e) => {
        if(e.ctrlKey && e.charCode === 13){
            onMessageSendClick();
        }
    };

    return (
        <div className="App">
            <div className='formSendMessage'>
                <textarea onChange={onMessageChange} value={message} onKeyPress={onKeyPress} autoFocus={true}></textarea>
                <button onClick={onMessageSendClick}>sendMessage</button>
            </div>
            <hr/>
            <div className='messenger'>
                {messages.map((m) => {
                    return <div key={Math.random() * 1000000000} className='messages'>
                        <div className='userInfo'>
                            <img src={m.photo} alt="photo"/>
                            <span style={{color: 'red'}}>{m.userName}:</span>
                        </div>
                        <div>
                            {m.message}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default App;
