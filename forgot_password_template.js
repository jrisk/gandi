var m_html = '<div style="padding: 5px; text-align: center; background-color: #06f;">';
m_html += '<img src="http://www.jarisk.com/public/img/skoolia_logo.png" style="width: 163px; height: 32px;">';
m_html += '</div>';
m_html += '<div style="padding: 10px;">';
m_html += 'Hi'; ////$this->get_dict(110, '', '', $lang;
m_html += ',<br><br>';
m_html += 'We\'ve received a request to reset your password. If you didn\'t make the request, just ignore this email. Otherwise, you can reset your password using this link';//$this->get_dict(111, '', '', $lang);
m_html += '<br><br>';
//reset link code
m_html += '<a href="http://jarisk.com/reset/key" style="margin:0;font-family:"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif;border:1px solid;display:block;padding:10px 16px;text-decoration:none;border-radius:2px;text-align:center;vertical-align:middle;font-weight:bold;white-space:nowrap;background:white;border-color:#ff5a5f;background-color:#ff5a5f;color:white;border-top-width:1px;">';// . $this->get_dict(112, '', '', $lang) . '</a><br><br>';
m_html += 'Click here to reset your password</a><br><br>';
m_html += 'Regards';//$this->get_dict(113, '', '', $lang);
m_html += ',<br><br>';
m_html += 'The Skoolia Team';//$this->get_dict(114, '', '', $lang);

module.exports = m_html;
