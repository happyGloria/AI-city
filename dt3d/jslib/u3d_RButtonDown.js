/**
 *time:2013-1-17
 *creater:liting
 *content:u3d��������
 */ 

//�Ҽ����
var rbtnx;
var rbtny;
function u_onRightBtd(pVal) { 
    //hideHightLight("");//��������
	var obj = jQuery.parseJSON(pVal);
	var x = obj.x;
	var y = obj.y;
    rbtnx = x;
    rbtny = y;
    $("#rightbuttonvalue").val("x="+x+",y="+y);
	//alert("this onright-mouse-button-down:hitpointx  is "+x+",hitpointy is "+y);
   // doSearchObj(rbtnx, rbtny, "cb_rButtonClick");

}
