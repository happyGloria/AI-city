/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/ 
var gs_ZLUrl = ""; // �Խ�������Ϣ�ģգң�
var gs_FDUrl = ""; // �Խӷֶ���Ϣ�ģգң�
var gs_JSUrl = ""; // �Խ���Ƶ�豸��Ϣ�ģգң�
var gs_GNUrl = ""; // �Խӹ�ů�豸��Ϣ�ģգң�
var gs_SBUrl = ""; // �Խ��豸��Ϣ�ģգң� 
var gs_LHUrl = ""; // �Խ��̻���Ϣ�ģգң� 
var gs_CurrSys ="";//��ǰϵͳ����
var gs_CurrScreen ="";//��ǰ��Ļ��С
var gi_LeftKeyModel = 0;//���ò������� 200�豸����,201�滮���������,202�������Բ�ѯ 203��ӱ���
var gi_RightKeyModel = 0;//���ò�������  100Ϊ�ֶ�Ѳ��ȡ���Ҽ��������� 102Ϊ�༭���������һ��¼�
var gs_SBID = "";//����豸ID
var gi_ToolStauts = 0;   //����ҵ��״̬     0Ϊ��ʼ״̬
var gi_TocCount = 0;  //ͼ���Ƿ��ȡ�����һ������ж�����
var gi_tocjd = 0;//��ȡͼ�����Ľ���
var gs_toctag = "";//��ȡͼ�����
var gar_TocList = new Array();  //��������ͼ������
var gs_success = "";  //��ʾ����ɹ�
var gs_PolygonVectors = "";  //�洢�滮��ĵ㼯
var gs_PolygonSum = "";  //�洢�������
var gs_GHMC = "";  //�滮������
var gar_SBStatute = new Array();  //���豸ID,����Ӳ�����ʱ��һ�����,��ɾ��������ʱ��Ҳһ��ɾ
var gs_ZLBH = "";  //������
var gs_DWDM = "";  //��λ����
var gs_ZLNBBH = "";  //�����ڲ����
var gs_SSZLDWDM = ""//ȡ����ǰ����������λ����
var gs_DWNBBH = "";  //��λ�ڲ����
var gbln_Ischeck = false; // ��¼�Ƿ�ѡ�豸΢��
var gar_points = new Array(); //����ƶ�����ת��������
var gs_GHMWin;  //��Ź滮�洰�ڣ�����ʧȥ�������ʾ�ô���;
var gs_TextPoints = ""; //��ŵ�������������ֵ
var gbln_checkdiv = false;  //����Ӫ��������Ϣ��div��ʾ�ж�
var gbln_savebutton = false;  //ͼ������ύ�������Ϊdisable
var gs_showFrame = "";   //showInfoFrame��src
var gar_checksb = new Array();//�汨���豸
var gobj_inter;  //�汨����setInterval
var gs_sbbjid = "";//�汨���豸��ID ���ڽ�������Ļ���
var gi_jb = 0;//���������ĵ�һ����¼
var gar_xglx = new Array();//Ѳ��·�߼�¼
var gi_XGCount = 0;//Ѳ�������
var gs_XGLX = "";//Ѳ��·�����Ƽ�¼
var gf_maxHeight = 0;//�洢�滮������Yֵ
var gs_qjid = ""; //�洢ȫ�����32λID
var gar_QJStatute = new Array();  //��ȫ����
//��ʱ����gi_ToolStauts��ֵ
function setToolStautsTimeOut(paNum){
	var Num = paNum;
	setTimeout(function (){gi_ToolStauts =Num; },500);
}
