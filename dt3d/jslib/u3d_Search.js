/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/ 
//�������¼�
function pick(paCallBackMethod){
	u.getUnity().SendMessage("Main Camera","U_Pick",paCallBackMethod); 
}
//����x y �ͻص���������ȡ������λ�õĶ���paJsonString: ��������(x ,y, callback)  
function doSearchObj(paX,paY,paCallBack){
	var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"0","callback":"'+paCallBack+'"}'; 
	u.getUnity().SendMessage("Main Camera","U_DoSearchModel",paString); 
}
//��������
function highObjLight(paObjName){
	var paString = '{"Name":"'+paObjName+'","Color":{"r":"255","g":"0","b":"0","a":"100"}}';
	u.getUnity().SendMessage("Main Camera","U_HighObj",paString); 	
}
//ȡ������
function hideHightLight(paObjName){
	var paString = '{"Name":"'+paObjName+'","Color":{"r":"255","g":"0","b":"0","a":"100"}}';
	u.getUnity().SendMessage("Main Camera","U_HideLight",paString);
}

//������˸�ķ���
function FlashingCurrentObject(paObjName){
	var paString = '{"Name":"'+paObjName+'","Color":{"r":"255","g":"0","b":"0","a":"100"}}';
	u.getUnity().SendMessage("Main Camera","U_FlashClickObject",paString);
}
