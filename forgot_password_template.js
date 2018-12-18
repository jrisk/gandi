function pass_reset_html(reset_key) {

	var site = process.env.TERM_PROGRAM != 'iTerm.app' ? 'jarisk.com' : 'localhost:8080';

	var m_html = '<div style="padding:5px;text-align:center;background-color:#06f;">'
	m_html += '<img src="http://www.jarisk.com/public/img/skoolia_logo.png" style="width:163px;height:32px;"/>'; 
	m_html += '</div>';
	m_html += '<br/>';
	m_html += '<span style="color:black;">Hi</span>'; ////$this->get_dict(110, '', '', $lang;
	m_html += ',';
	m_html += '<br/><br/>';
	m_html += '<span style="color:black;">We\'ve received a request to reset your password. If you didn\'t make the request, just ignore this email. Otherwise, you can reset your password using this link</span>';//$this->get_dict(111, '', '', $lang);
	m_html += '<br/><br/>';
	m_html += '<span style="display:none;">' + Math.random() + '</span>'; //assures wont be folded as unoriginal in gmail
	//reset link code
	m_html += '<a href="http://' + site +'/reset-password/'+reset_key+'" style="margin:0;font-family:"Helvetica Neue","Helvetica","Arial","sans-serif";border:1px solid;display:block;padding:10px 16px;text-decoration:none;border-radius:2px;text-align:center;vertical-align:middle;font-weight:bold;white-space:nowrap;background:white;border-color:#ff5a5f;background-color:#ff5a5f;color:white;border-top-width:1px;">';// . $this->get_dict(112, '', '', $lang) . '</a><br><br>';
	m_html += 'Click here to reset your password';
	m_html += '</a>';
	m_html += '<br/><br/>';
	m_html += 'Regards';//$this->get_dict(113, '', '', $lang);
	m_html += ',';
	m_html += '<br/>';
	m_html += 'The Skoolia Team';//$this->get_dict(114, '', '', $lang)

	return m_html;
}
module.exports = pass_reset_html;
