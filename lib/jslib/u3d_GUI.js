/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/
//��֯��Ϣ��
function showModelGui(paJson){
	u.getUnity().SendMessage("Main Camera","drawTable",paJson);
}
//�ر���Ϣ��
function Un_showModelGui(){
  	u.getUnity().SendMessage("Main Camera","U_Closexinxik","");
}
//��������ͼ��
function showGuanxianTuli(pastring){
    u.getUnity().SendMessage("Main Camera","U_TuLi",pastring);
}
//�رչ���ͼ��
function Un_showGuanxianTuli(){
  	u.getUnity().SendMessage("Main Camera","U_closeTuLi","");
}
 //�������gz
function Un_showBubble(pajson){
	u.getUnity().SendMessage("Main Camera","U_DrawBall",pajson);
}
 //ɾ����������gz
function Un_deleteBubble(pastring){
	u.getUnity().SendMessage("Main Camera","deleteCurrentBall",pastring);
} 
 //��ӱ���gz
function Un_showBJ(pajson){
	u.getUnity().SendMessage("Main Camera","U_DrawBJ",pajson);
}

 //ͨ�����ݿ�չʾ����
function U_DrawBubbleProperty(pastring){
	u.getUnity().SendMessage("Main Camera","U_DrawBallProperty",pastring);
} 
 //ɾ���������ݿ�
function U_DestryBubbleProperty(){
	u.getUnity().SendMessage("Main Camera","U_DestoryAllBallProperty","");
}	

