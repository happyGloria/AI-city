/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/ 
//�ռ����෽��
function lineSpace(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_lineSpace",paCallBack);	
}
//��ֱ���෽��
function lineVer(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_lineVer",paCallBack);
}
//ˮƽ���෽��
function lineHor(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_lineHor",paCallBack);
}
//�����������
function areaHor(paCallBack){
	var paCallBackAndColor = '{"paCallBack":"'+paCallBack+'","Color":{"r":"255","g":"0","b":"0","a":"180"}}';
	u.getUnity().SendMessage("Main Camera","U_areaHor",paCallBackAndColor);
}

//�����ʾ���TextToU3d���󷽷�
function clear3DTextObj(paName){ 
	u.getUnity().SendMessage("Main Camera","U_clear3DTextObj",paName);
}

//�������
function clearAll(){ 
	u.getUnity().SendMessage("Main Camera","U_clearAll","");
}
//GL ˮƽ����
function GH_horizontal(){
	u.getUnity().SendMessage("Main Camera","GL_horizontal","");
}

//GL ��ֱ����
function GH_verticle(){
	u.getUnity().SendMessage("Main Camera","GL_verticle","");
}

//GL �ռ�����
function GH_space(){
	u.getUnity().SendMessage("Main Camera","GL_space","");
}
//GL �������
function GH_area(){
	u.getUnity().SendMessage("Main Camera","GL_area","");
}
//GL ���������
function GH_clearSum(){
	u.getUnity().SendMessage("Main Camera","GL_clear","");
}