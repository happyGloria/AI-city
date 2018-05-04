/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/ 
function U_AddIcon(paString){
	//alert(paName);
	//var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'"}';
	u.getUnity().SendMessage("Main Camera","U3D_LoadModel",paString);
}
//���뾭γ�ȣ����ɵر�
function setIcon(paX,paY,paZ,paName,paModelName,paRX,paRY,paRZ,paRW,paText){//��ײ������
	//alert(paName);
	var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'","modelname":"'+paModelName+'","rx":"'+paRX+'","ry":"'+paRY+'","rz":"'+paRZ+'","rw":"'+paRW+'","text":"'+paText+'"}';
	//alert(paString);
    u.getUnity().SendMessage("Main Camera","U3D_LoadModel",paString);
}
//
function setIconName(paX,paY,paZ,paName,paModelName,paRX,paRY,paRZ,paRW,paText){//��ײ������
	var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'","modelname":"'+paModelName+'","rx":"'+paRX+'","ry":"'+paRY+'","rz":"'+paRZ+'","rw":"'+paRW+'","text":"'+paText+'"}';
	u.getUnity().SendMessage("Main Camera","setIconImage",paString);
}
function Change3DTextByName(paName,paText){
	var paString ='{"name":"'+paName+'","text":"'+paText+'"}'; 
	u.getUnity().SendMessage("Main Camera","U_Change3DTextByName",paString);
}
//��U3D��д����������
function addTextToU3d(paName,paText,paFontSize,paPx,paPy,paPz,paRx,paRy,paRz,paRw,paColor_R,paColor_G,paColor_B,paColor_A){
	if(paColor_R=="" || paColor_R==null){
		paColor_R = "255";
	}
	if(paColor_G=="" || paColor_G==null){
		paColor_G = "255";
	}
	if(paColor_B=="" || paColor_B==null){
		paColor_B = "255";
	}
	if(paColor_A=="" || paColor_A==null){
		paColor_A = "180";
	}			
	var ls_Json='{"Color":{"r":"'+paColor_R+'","g":"'+paColor_G+'","b":"'+paColor_B+'","a":"'+paColor_A+'"},"name":"'+paName+'","text":"'+paText+'","fontsize":"'+paFontSize+'","px":"'+paPx+'","py":"'+paPy+'","pz":"'+paPz+'","rx":"'+paRx+'","ry":"'+paRy+'","rz":"'+paRz+'","rw":"'+paRw+'"}';	
	//alert(ls_Json);
	u.getUnity().SendMessage("Main Camera","U_AddText",ls_Json);
}
//��U3D��д����������2
function createTextToU3d(paString){
	u.getUnity().SendMessage("Main Camera","U3D_LoadModel",paString);
}
//���ɹ滮������
function showPolygon(paString){
	u.getUnity().SendMessage("Main Camera","U_PointsToPolygon",paString);//��Ⱦ�滮��	
}
//���ɹ滮�������
function showPolygonLine(paString){
	u.getUnity().SendMessage("Main Camera","U_linerenderer",paString);//��Ⱦ�滮�������
}
//���ٶ���
function destoryObj(paName){
	u.getUnity().SendMessage("Main Camera","U_DestoryObj",paName);
}
//��ԭ���������
function hyCamera(){
	u.getUnity().SendMessage("Main Camera","U_InitCamera","");
} 
//ѡ�����
function selectObj(paCallback){
	u.getUnity().SendMessage("Main Camera","U_ClickObj",paCallback);
}
//�ƶ�����
function moveObj(paCallback){
	u.getUnity().SendMessage("Main Camera","U_MoveObj",paCallback);
}
//��ת����
function RotateObj(paCallback){
	u.getUnity().SendMessage("Main Camera","U_RotateObj",paCallback);
}
//�˳��༭
function ExitEdit(){
	u.getUnity().SendMessage("Main Camera","U_ExitControl","");
}
function SetwaterGC(paStr){
	u.getUnity().SendMessage("Main Camera","U_SetWaterFzGc",paStr);
}
//��˸
function flashUserObj(paName,paFlashCount){
	if(paName){
		setLayerState(paName,false);
		//paIconObj.Visibility = false;
		setTimeout(function (){setLayerState(paName,true);},500);
		if(paFlashCount>0){
			setTimeout(function (){flashUserObj(paName,paFlashCount-1);},1000);
		}
	}
}
//���ñ��ܳ�ˮ�ĸ߶�
function SetBaoGuanHeight(paString){
	u.getUnity().SendMessage("Main Camera","U_ChangeVelocity",paString);
}
//��ʼ�ƶ��豸
function StartMove(paStr){
	u.getUnity().SendMessage("Main Camera","U_IsMovement",paStr);
}
//��ȡ�豸����
function GetSBName(paStr){
	u.getUnity().SendMessage("Main Camera","U_SetCallbackMethod1",paStr);
}
//����ģ������
function PrefabLoad(pajson){
   u.getUnity().SendMessage("Main Camera","LoadAsset",pajson);
}
//�������꣬����Ѳ����
function getXGLX(pajson){//��ײ������
	u.getUnity().SendMessage("Main Camera","AddGPSIcon",pajson);
}
//����������ɹ�����˸
function shanshuoP(paStr){
	u.getUnity().SendMessage("Main Camera","U_FindTags",paStr);
}
//�ر���˸
function closeP(){
	u.getUnity().SendMessage("Main Camera","U_closeA","");
}