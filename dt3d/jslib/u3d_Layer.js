/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/ 
function getLayersByTagName(paTagName,paCallBack){
	var paString ='{"tagname":"'+paTagName+'","callback":"'+paCallBack+'"}';
	u.getUnity().SendMessage("Main Camera","U_GetLayersByTagName",paString);
}
//����Name��״̬����ͼ��
function setLayerState_simple(paName,paState){
	var paString ='{"name":"'+paName+'","state":"'+paState+'"}';
	u.getUnity().SendMessage("Main Camera","U_SetLayerState",paString);
}
function cLayersByTagName(paName,paState){
    var paString ='{"name":"'+paName+'","stat":"'+paState+'"}';
    //alert(paString);
    u.getUnity().SendMessage("Main Camera","U_CLayersByTagName",paString);
}
//����Name��״̬����ͼ�� ���Կ��Ƶ�����ͼ��
function setLayerState(paName,paState){
	var paString ='{"name":"'+paName+'","state":"'+paState+'"}';
	u.getUnity().SendMessage("Main Camera","U_SetChirdLayerState",paString);
}
//�������ƺͻص������õ�ͼ��״̬
function getLayerState(paName,paCallBack){
	var paString ='{"name":"'+paName+'","callback":"'+paCallBack+'"}';
	u.getUnity().SendMessage("Main Camera","U_GetLayerState",paString);
}
//��������ͼ�����ƻ����ͼ��״̬
function getAllLayerState(paName){
	u.getUnity().SendMessage("Main Camera","U_GetAllLayerState",paName);
}
//�������п��Ƶ���ͼ��NAME��״̬
function setAllLayerState(paNameState){
	u.getUnity().SendMessage("Main Camera","U_SetLayerAllState",paNameState);
}

