import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'


export function Home(){
    return(
      <div>
        <aside>
          <img src={illustrationImg} alt="Ilustração simbilizando perguntas e respostas" /> 
          <strong>Crie salas de Q&amp;A ao-vivo</strong>  
          <p>Tire as dúvidas da sua galera em tempo-real</p>
        </aside>
        <main>
          <div>

              <img src={logoImg} alt="LetMeAsk"/>
              <button>
                  <img src={googleIconImage} alt="logo do google" />
                  Crie sua sala com o Google
              </button>

              <div>ou entre em uma sala</div>

              <form action="">
                  <input 
                    type="text"
                    placeholder="Digite o código da sala"
                  />
                  <button type="submit">
                    Entrar na sala
                  </button>
              </form>

          </div>

        </main>
      </div>
    )

}