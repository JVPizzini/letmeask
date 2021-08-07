
// import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import { database } from '../services/firebase';

import deleteimg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo-nova-geometric.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';

// import { useAuth } from '../hooks/userAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss'


type RoomParams = {
  id: string;
}

export function AdminRoom() {

  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  console.log(questions);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionid: string) {
    if (window.confirm('Tem certeza que você deseja excluir essa perugunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionid}`).remove();
    }
  }

  async function handlecheckQuestionAsAnswered(questionid: string) {
    await database.ref(`rooms/${roomId}/questions/${questionid}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionid: string) {
    await database.ref(`rooms/${roomId}/questions/${questionid}`).update({
      isHighlighted: true,
    });
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handlecheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}>
                      <img src={answerImg} alt="Dar destaque para a pergunta" />
                    </button>
                  </>
                )}
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
