define(['controllers/controllers', 'jquery'],function(controllers, $) {
    var coxCtrl = ['$scope',function($scope){
        //检测ocx
        $scope.Browser_hide = true;
        //检测当前的浏览器是chrome
        var userAgent = navigator.userAgent;
        function getChromeVersion() {
            var arr = userAgent.split(' '); 
            var chromeVersion = '';
            for(var i=0;i < arr.length;i++){
                if(/chrome/i.test(arr[i]))
                chromeVersion = arr[i]
            }
            if(chromeVersion){
                return Number(chromeVersion.split('/')[1].split('.')[0]);
            } else {
                return false;
            }
        };
        if(getChromeVersion()) {
            var version = getChromeVersion();
            if(version > 30) {
                $scope.Browser_hide = true;
                return false;
            }
        }
        var html = '<object id="ocx_player" type="applicatin/x-firebreath" style="width:1px;height:1px;">' +
            '<param name="onload" value="pluginLoaded"/>' +
            '</object>';
        $('.ocx_object').append(html);
        var ocx_player = document.getElementById("ocx_player");
        if("GetVersion" in ocx_player){
            var ocx_version = ocx_player.GetVersion();
            if (ocx_version) {
                $scope.Browser_hide = true;
            } else {
                $scope.Browser_hide = false;
            } 
        }else{
            $scope.Browser_hide = false;
        }
        //安装ocx
        $scope.downlodButton = function(){
            window.open("/chajian/ocx.exe");
        };
        $scope.closeBox = function(){
            $scope.Browser_hide = true;
        };
    }]
    return coxCtrl;
});