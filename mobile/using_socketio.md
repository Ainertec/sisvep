## usando o socketio

- instale a dependência socket.io.client
- siga o codigo abaixo:




## Atenção!

<div>
<p>
eu testei no react native,usei o useMemo para  só refazer a conexão se o usuário logado mudar,o useEffect serve para  executar o codigo .

No javaScript puro, vai ser quase igual, só tirar essas funções, se possivel usar algo do js puro que substitua, caso não tenha sem problemas, não afeta no funcionamento, o que mais faz sentido é o useMemo, que com ele o código só é executado quando necessário.

<strong>Qualquer duvida da uma olhada na documantação do socketio ou me pergunta</strong>
</p>

</div>

### Código utilizado no react native

<p> 
import socketio from 'socket.io-client'; 

const socket = useMemo(() => {
    return socketio(api.defaults.baseURL, {
      query: { userId: user._id }, // esse user._id é o id o usuário logado.
    });
  }, [user._id]);

  useEffect(() => {
    socket.on('barcode', (barcode) => {
      console.log(barcode);
    });
  }, []);
</p>


