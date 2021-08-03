import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'

import { Button }   from '../components/Button'
import { useAuth } from '../hooks/userAuth'

import '../styles/auth.scss'


export function Home(){
  
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth()

  async function handleCreateRoom(){
    if(!user){
      await singInWithGoogle()
    }

      history.push('/rooms/new');
    }
  
    return(
      <div id="page-auth">
        <aside>
          <img src={illustrationImg} alt="Ilustração simbilizando perguntas e respostas" /> 
          <strong>Crie salas de Q&amp;A ao-vivo</strong>  
          <p>Tire as dúvidas da sua galera em tempo-real</p>
        </aside>
        <main>
          <div className="main-content">
            <img src={logoImg} alt="LetMeAsk"/>
            <button onClick={ handleCreateRoom } className="create-room">
                <img src={googleIconImage} alt="logo do google" />
                Crie sua sala com o Google
            </button>
            <div className="separator">ou entre em uma sala</div>
            <form>
                <input 
                  type="text"
                  placeholder="Digite o código da sala"
                />
                <Button type="submit">
                  Entrar na sala
                </Button>
            </form>
          </div>
        </main>
      </div>
    )

}