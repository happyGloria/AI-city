/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/ 
var gs_ZLUrl = ""; // 对接坐落信息的ＵＲＬ
var gs_FDUrl = ""; // 对接分栋信息的ＵＲＬ
var gs_JSUrl = ""; // 对接视频设备信息的ＵＲＬ
var gs_GNUrl = ""; // 对接供暖设备信息的ＵＲＬ
var gs_SBUrl = ""; // 对接设备信息的ＵＲＬ 
var gs_LHUrl = ""; // 对接绿化信息的ＵＲＬ 
var gs_CurrSys ="";//当前系统类型
var gs_CurrScreen ="";//当前屏幕大小
var gi_LeftKeyModel = 0;//设置操作类型 200设备设置,201规划面添加名称,202管线属性查询 203添加爆管
var gi_RightKeyModel = 0;//设置操作类型  100为手动巡视取消右键高亮操作 102为编辑划区屏蔽右击事件
var gs_SBID = "";//存放设备ID
var gi_ToolStauts = 0;   //控制业务状态     0为初始状态
var gi_TocCount = 0;  //图层是否获取到最后一大类的判断条件
var gi_tocjd = 0;//获取图层大类的进度
var gs_toctag = "";//获取图层大类
var gar_TocList = new Array();  //存入所有图层数据
var gs_success = "";  //提示导入成功
var gs_PolygonVectors = "";  //存储规划面的点集
var gs_PolygonSum = "";  //存储划区面积
var gs_GHMC = "";  //规划面名称
var gar_SBStatute = new Array();  //存设备ID,做添加操作的时候一起添加,做删除操作的时候也一起删
var gs_ZLBH = "";  //坐落编号
var gs_DWDM = "";  //单位代码
var gs_ZLNBBH = "";  //坐落内部编号
var gs_SSZLDWDM = ""//取出当前坐落所属单位代码
var gs_DWNBBH = "";  //单位内部编号
var gbln_Ischeck = false; // 记录是否勾选设备微调
var gar_points = new Array(); //存放移动、旋转后的坐标点
var gs_GHMWin;  //存放规划面窗口，用来失去焦点后显示该窗口;
var gs_TextPoints = ""; //存放点击后的文字坐标值
var gbln_checkdiv = false;  //搜索营区基本信息的div显示判断
var gbln_savebutton = false;  //图层别名提交保存后设为disable
var gs_showFrame = "";   //showInfoFrame的src
var gar_checksb = new Array();//存报警设备
var gobj_inter;  //存报警的setInterval
var gs_sbbjid = "";//存报警设备的ID 用于解决汽包的互斥
var gi_jb = 0;//安防报警的第一条记录
var gar_xglx = new Array();//巡更路线记录
var gi_XGCount = 0;//巡更点序号
var gs_XGLX = "";//巡更路线名称记录
var gf_maxHeight = 0;//存储规划面的最高Y值
var gs_qjid = ""; //存储全景点的32位ID
var gar_QJStatute = new Array();  //存全景点
//延时设置gi_ToolStauts的值
function setToolStautsTimeOut(paNum){
	var Num = paNum;
	setTimeout(function (){gi_ToolStauts =Num; },500);
}
