var gi_LayerCount = 0;

function LoadPrefab() {
    return ;
    /*    dwr.getUnityPrefab(gs_ZLBH,function (data){
            if(data){
                PrefabLoad(data);
                //gi_LayerCount = jQuery.parseJSON(data).length;
            }
        });*/
    var data = '[' +
        '{"IP":"47.93.174.30", "WEBCONFIG": "diting", "PREFABNAME": "building"},' +
        '{"IP": "47.93.174.30", "WEBCONFIG": "diting", "PREFABNAME": "dixing"},' +
        '{"IP": "47.93.174.30", "WEBCONFIG": "diting", "PREFABNAME": "daolu"},' +
        '{"IP": "47.93.174.30", "WEBCONFIG": "diting", "PREFABNAME": "lvhua"},' +
        '{"IP": "47.93.174.30", "WEBCONFIG": "diting", "PREFABNAME": "tree"},' +
        '{"IP": "47.93.174.30", "WEBCONFIG": "diting", "PREFABNAME": "xiaopin"}' +
        ']';
    //alert(data);
    PrefabLoad(data);
}