/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/
//��־��¼
function Logger(paString){
 
} 
//�õ���ǰ�ӽǵ�ֵ
function getPos(paCallback){
	u.getUnity().SendMessage("Main Camera","U_GetView",paCallback);
}
//���е�
function FlyToPoint(paPX,paPY,paPZ,paRX,paRY,paRZ,paRW,paDis){
	var json = '{"px":"'+paPX+'","py":"'+paPY+'","pz":"'+paPZ+'","rx":"'+paRX+'","ry":"'+paRY+'","rz":"'+paRZ+'","rw":"'+paRW+'","dis":"'+paDis+'"}';
	//var json = '{"px":"233.2309","py":"16","pz":"270.0734","rx":"-0.3816651","ry":"0.1756544","rz":"-0.04879199","rw":"-0.9061438","dis":"121.2363"}';
	u.getUnity().SendMessage("Main Camera","U_FlyTo",json); 	
}

//���е�Obj
function FlyToObj(paName,paDis){
	var json = '{"paName":"'+paName+'","paDis":"'+paDis+'"}';
	u.getUnity().SendMessage("Main Camera","U_FlyToObj",json); 	
} 
//����
function drawPoint(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawPoint",paCallBack); 	
}
//����
function drawLine(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawLine",paCallBack);
}
//�»���
function drawLinenew(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawLinenew",paCallBack);
}
//ɾ���µĻ���
function clear_line(){
	u.getUnity().SendMessage("Main Camera","clear_Line","");
}
//����
function drawPolygon(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawPolygon",paCallBack);
}
//��Բ
function drawCircle(){

}
//����
function drawSector(){

}
//ͨ��X,Y�����ȡ�õ����ײ����X,Y
function getHitPos(paX,paY,paCallBack){
	var json = '{"x":"'+paX+'","y":"'+paY+'","callback":"'+paCallBack+'"}';
	u.getUnity().SendMessage("Main Camera","U_GetClickPos",json);
} 
//������� ,���ø����߲�		//15����
function setFzPoy(paString){
	u.getUnity().SendMessage("Main Camera","U_SetFzPoy",paString);
}
//����滮��
function clearGHM(){
	u.getUnity().SendMessage("Main Camera","U_clearArea","");
}

//��ʾ����͸���ȹ�����
function showBlockScroll(paShow){ 
	u.getUnity().SendMessage("Main Camera","U_showHorizontalSlider",paShow);
}
//�޸ĵ���͸���ȵ�ֵ
function controlBlockTMD(paColornum){ 
	u.getUnity().SendMessage("Main Camera","SetAlahValue",paColornum);
}
//��ӱ���
function addBaoG(paX,paY,paZ,paHeight,paName,paId,paCallBack){ 
	var json = '{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'","id":"'+paId+'","height":"'+paHeight+'","callback":"'+paCallBack+'"}';
	//alert(json);
	u.getUnity().SendMessage("Main Camera","U3D_LoadBaoguan",json);
}
//ˮ�ͷ���
function ShowWaterSlider(paShow){
	u.getUnity().SendMessage("Main Camera","showWaterSlider",paShow);
}
//����ͨ��
function SetStartHeight(paStartHeight){    //�趨���ĸ߳�     
	u.getUnity().SendMessage("Main Camera","U_SetStartHeight",paStartHeight);
}
function SetEndHeight(paEndHeight){    //�趨�յ�ĸ߳�      
	u.getUnity().SendMessage("Main Camera","U_SetEndHeight",paEndHeight);
}
function VisibleAnas(){    //��ʼͨ�ӷ���
	u.getUnity().SendMessage("Main Camera","U_VisibAnas","");
}
function DeleteResult(){   //ɾ�����  
    u.getUnity().SendMessage("Main Camera","U_DeleteResult","");
} 
//����Ѳ���� 
function CreateOfXGLine(paString){   
    u.getUnity().SendMessage("Main Camera","createLine",paString);
} 
//����Ƿ���������
function isAbsorb(pastate){   
    u.getUnity().SendMessage("Main Camera","U_IsAdsorb",pastate);
}
//�����豸������ʽ
function setFontS(paString){   
    u.getUnity().SendMessage("Main Camera","setSBFontStyle",paString);
}
//����ˮ��Ч������
function SetWaterEffectControll(){   
    u.getUnity().SendMessage("Main Camera","AddControllerToWater","");
}


