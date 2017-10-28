const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser Muddleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('curriculo');
});

<<<<<<< HEAD
app.post('/send', (req, res) => {
    const output = `
        <p>Você recebeu um e-mail de Contato do seu currículo</p>
        <h3>Detalhes do contato</h3>
        <ul>
            <li>Nome: ${req.body.name}</li>
            <li>Nome: ${req.body.email}</li>
        </ul>
        <h3>Messagem</h3>
        <p>${req.body.message}</p>
    `;
    

     
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      if(!error){
        res.render('curriculo', {msg:"E-mail enviado com sucesso!"});
      }else{
        res.render('curriculo', {msg:"E-mail não pôde ser enviado. Tente mais tarde."});
      } 
    });
});

=======
>>>>>>> parent of 8c45fac... Ajustes no formulário para montagem da saída.
app.listen(8080, () => console.log('Server Iniciou...'));