import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import firebase from 'firebase';
import { fire } from '../../utils/firebase';
import { useContextValue } from '../../state/state';
import './Chat.scss';

interface IMessage {
  photoURL: string;
  uid: string;
  createdAt: Date;
  message: string;
  displayName: string;
}

export const Chat = () => {
  const { currentUser, setLoader } = useContextValue();
  const { uid, displayName, photoURL } = currentUser!;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isMessageValid, setIsMessageValid] = useState(false);
  const messagesEl = useRef<HTMLUListElement | null>(null);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('');
    setLoader(false);

    await fire.firestore().collection('messages').add({
      uid,
      displayName,
      photoURL,
      message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setLoader(false);
  };

  useEffect(() => {
    fire
      .firestore()
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const currentMessages = snapshot.docs.map(doc => doc.data());
        setMessages(currentMessages as any);
      });
  }, []);

  useEffect(() => {
    messagesEl.current!.scrollTop = messagesEl.current!.scrollHeight;
  }, [messages]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const messageText = e.target.value;
    setMessage(messageText);

    if (messageText.trim()) {
      setIsMessageValid(true);
    } else {
      setIsMessageValid(false);
    }
  };

  return (
    <div className="chat">
      <div className="chat__body">
        <ul className="chat__messages" ref={messagesEl}>
          {messages.map(({ message, displayName, photoURL, uid }, idx) => (
            <li
              key={idx}
              className={`chat__message ${
                currentUser!.uid === uid ? 'chat__message_other' : ''
              }`}>
              <div className="chat__avatar">
                <img src={photoURL} alt="avatar" />
              </div>
              <div className="chat__info">
                <div className="chat__name">{displayName}</div>
                <div className="chat__text">{message}</div>
              </div>
            </li>
          ))}
        </ul>
        <form className="chat__form" onSubmit={sendMessage}>
          <input
            className="chat__input"
            type="text"
            autoComplete="off"
            value={message}
            onChange={changeHandler}
          />
          <button
            className="chat__button"
            type="submit"
            disabled={!isMessageValid}>
            send
          </button>
        </form>
      </div>
    </div>
  );
};
