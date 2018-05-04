/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/
//组织信息框
function showModelGui(paJson){
	u.getUnity().SendMessage("Main Camera","drawTable",paJson);
}
//关闭信息框
function Un_showModelGui(){
  	u.getUnity().SendMessage("Main Camera","U_Closexinxik","");
}
//弹出管线图例
function showGuanxianTuli(pastring){
    u.getUnity().SendMessage("Main Camera","U_TuLi",pastring);
}
//关闭管线图例
function Un_showGuanxianTuli(){
  	u.getUnity().SendMessage("Main Camera","U_closeTuLi","");
}
 //添加气泡gz
function Un_showBubble(pajson){
	u.getUnity().SendMessage("Main Camera","U_DrawBall",pajson);
}
 //删除单个气泡gz
function Un_deleteBubble(pastring){
	u.getUnity().SendMessage("Main Camera","deleteCurrentBall",pastring);
} 
 //添加报警gz
function Un_showBJ(pajson){
	u.getUnity().SendMessage("Main Camera","U_DrawBJ",pajson);
}

 //通过气泡框展示属性
function U_DrawBubbleProperty(pastring){
	u.getUnity().SendMessage("Main Camera","U_DrawBallProperty",pastring);
} 
 //删除属性气泡框
function U_DestryBubbleProperty(){
	u.getUnity().SendMessage("Main Camera","U_DestoryAllBallProperty","");
}	

