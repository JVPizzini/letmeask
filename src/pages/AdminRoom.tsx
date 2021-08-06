import deleteimg from '../assets/images/delete.svg';
// import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode'
// import { useAuth } from '../hooks/userAuth';
import { useRoom } from '../hooks/useRoom';


import '../styles/room.scss'
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({ 
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionid: string) {
    if (window.confirm('Tem certeza que você deseja excluir essa perugunta?')) {
      const questionRef = await database.ref(`rooms/${roomId}/questions/${questionid}`).remove();
    }
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-tittle">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}

        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteimg} alt="Remover pergunta" />
                </button>
              </Question>

            );
          })}
        </div>
      </main>
    </div>
  );
}

function userAuth() {
  throw new Error('Function not implemented.');
}
