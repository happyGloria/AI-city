/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/ 
//左键点击
function u_onLeftBtd(pVal){
	var obj = jQuery.parseJSON(pVal);
	var x = obj.x;
	var y = obj.y;
    $("#leftbuttonvalue").val("x="+x+",y="+y);
	//var str = '{"x":"'+x+'","y":"'+y+'","z":"'+0+'","name":"'+www+'"}';
	//U_AddIcon(str);
	//alert("this onleft-mouse-button-down:hitpointx  is "+x+",hitpointy is "+y);
}