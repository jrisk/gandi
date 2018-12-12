var MailComposer = require('nodemailer/lib/mail-composer');
var html = require('./forgot_password_template');

function MailSender(mailgun, addr) {

  var subj = 'Password Reset Request';

  var m_data = {
    from: 'Skoolia <admin@jarisk.com>',
    to: 'joeyrsk@gmail.com',
    subject: subj,
    text: 'Testing out MailSender method',
    html: html
  };

  var mail = new MailComposer(m_data);

  mail.compile().build( function(err, msg) {

    console.log(addr);

      if (err) {
        console.log(err);
        throw err;
      }

      var data_send = {
        to: addr,
        message: msg.toString('ascii')
      }

      mailgun.messages().sendMime(data_send, function (error, body) {
        if (error) {
          console.log(error);
          throw error;
        }
        console.log(body);
      });
      console.log('end mail compile');
    });
}

module.exports = MailSender;