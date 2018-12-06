var mailgun = require('mailgun-js');
var api_key = '';
var DOMAIN = 'jarisk.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

var data = {
  from: 'New User <me@samples.mailgun.org>',
  to: 'joeyrsk@gmail.com, lourzk@hotmail.com',
  subject: 'Hello Test',
  text: 'Testing out Mailgun'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});

$content = '';
/// logo
$content .= '<div style="padding: 5px; text-align: center; background-color: #06f;">';
	$content .= '<img src="https://skoolia.com/img/skoolia_logo.png" style="width: 163px; height: 32px;">';
$content .= '</div>';
$content .= '<div style="padding: 10px;">';
	$content .= $this->get_dict(110, '', '', $lang) . (
		(
			($lang === 'en' || $lang === 'es')
			&& (!empty($fetch['first_nm']))
		) ? ' ' . $fetch['first_nm'] : ''
	) . ',<br><br>';
	$content .= $this->get_dict(111, '', '', $lang) . ':<br><br>';
	$key = '';
	for ($rnx = 0; $rnx < 8; $rnx++) $key .= rand(10000, 99999);
	$params = array(':key' => $key, ':usr_id' => $fetch['id']);
	$stmt_i = $this->pdo->prepare('INSERT INTO `reset_link` (`key`, `usr_id`, `created_on_dt`) VALUES(:key, :usr_id, UTC_TIMESTAMP())');
	$result = $stmt_i->execute($params);
	if ($result === true) {
		$content .= '<a href="http://' . $this->host . $this->get_url(53, true, $lang) . '/' . $key . '" style="margin:0;font-family:"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif;border:1px solid;display:block;padding:10px 16px;text-decoration:none;border-radius:2px;text-align:center;vertical-align:middle;font-weight:bold;white-space:nowrap;background:white;border-color:#ff5a5f;background-color:#ff5a5f;color:white;border-top-width:1px;">' . $this->get_dict(112, '', '', $lang) . '</a><br><br>';
		$content .= $this->get_dict(113, '', '', $lang) . ',<br><br>';
		$content .= $this->get_dict(114, '', '', $lang);
	}
$content .= '</div>';
