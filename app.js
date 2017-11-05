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

app.post('/send', (req, res) => {
    const output = `
        <p>Você recebeu um e-mail de Contato do seu currículo</p>
        <h3>Detalhes do contato</h3>
        <ul>
            <li>Nome: ${req.body.name}</li>
            <li>Telefone: ${req.body.telefone}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Messagem</h3>
        <p>${req.body.message}</p>
    `;

    var api_key = 'key-3284371bff298913e515e707bb2ec6da';
    var domain = 'sandbox4362b072f356473ba2b2446e35719a6a.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    var data = {
      from: '"MailGun Curriculo" <postmaster@sandbox4362b072f356473ba2b2446e35719a6a.mailgun.org>',
      to: 'filipe.483313@alunosatc.edu.br',
      subject: 'Contato Curriculum',
      html: output
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      if(!error){
        res.render('curriculo', {msg:"E-mail enviado com sucesso!"});
      }else{
        res.render('curriculo', {msg:"E-mail não pôde ser enviado. Tente mais tarde."});
      } 
    });
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port '+ app.get('port'));
});