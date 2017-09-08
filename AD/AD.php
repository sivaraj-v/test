<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 0');
header('Content-Length: 0');
header('Content-Type: text/plain');
$data = json_decode(file_get_contents('php://input'), true);
$json_string = json_encode($data, JSON_PRETTY_PRINT);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		$fileR = "AD_Valid.json";
		$jsonR = json_decode(file_get_contents($fileR),TRUE);
		file_put_contents($fileR, json_encode($jsonR,TRUE));
		$headers = array('http'=>array('method'=>'GET','header'=>'Content: type=application/json \r\n'.'$agent \r\n'.'$hash'));
		$context=stream_context_create($headers);
		$str = file_get_contents("AD_Valid.json",FILE_USE_INCLUDE_PATH,$context);
		echo json_encode(json_decode($str), JSON_PRETTY_PRINT);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	if($data['user'] == 12345){
		$fileR = "AD_Valid.json";
		$jsonR = json_decode(file_get_contents($fileR),TRUE);
		file_put_contents($fileR, json_encode($jsonR,TRUE));
		$headers = array('http'=>array('method'=>'GET','header'=>'Content: type=application/json \r\n'.'$agent \r\n'.'$hash'));
		$context=stream_context_create($headers);
		$str = file_get_contents("AD_Valid.json",FILE_USE_INCLUDE_PATH,$context);
		echo json_encode(json_decode($str), JSON_PRETTY_PRINT);
	}
	if($data['user'] == 56789){
		$fileR = "AD_inValid.json";
		$jsonR = json_decode(file_get_contents($fileR),TRUE);
		file_put_contents($fileR, json_encode($jsonR,TRUE));
		$headers = array('http'=>array('method'=>'GET','header'=>'Content: type=application/json \r\n'.'$agent \r\n'.'$hash'));
		$context=stream_context_create($headers);
		$str = file_get_contents("AD_inValid.json",FILE_USE_INCLUDE_PATH,$context);
		echo json_encode(json_decode($str), JSON_PRETTY_PRINT);
	}
}
//{"user":12345}
?>