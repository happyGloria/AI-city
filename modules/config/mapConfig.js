/**
 * Created by lihouhua on 2016/5/20.
 * for map parameters configuration
 * notice: only support map online right now
 */
/**tianditu天地图在线地图
 * {
 Category: 'tiandi_online',
 MinZoom: 5,
 MaxZoom: 18,
 RestrictedExtent: [118.369429, 31.235331, 119.247036, 32.618713],
 CenterPoint: [118.8082325, 31.927022],
 DefaultZoom: 11,
 VectorUrl: 'Y',
 SatelliteUrl: 'Y'
 * }
 *
 *
 * baidu百度在线地图
 * {
   Category: 'baidu',
   MinZoom: 5,
   MaxZoom: 18,
   CenterPoint: [118.78972179128985, 32.06224469328993],
   DefaultZoom: 11,
   Projection: 'EPSG:900913'
 * }
 *
 * gaode高德在线地图
 * {
   Category: 'gaode',
   MinZoom: 5,
   MaxZoom: 18,
   RestrictedExtent: [13176824.5599363, 3663349.21375141, 13274519.3242793, 3844803.16269019],
   CenterPoint: [13225671.9421078, 3754076.1882208],
   DefaultZoom: 11,
   Projection: "EPSG:900913",
 * }
 *
 *
 * {
   Category: 'QQ',QQ在线地图
   MinZoom: 5,
   MaxZoom: 18,
   CenterPoint: [118.79260987686017, 32.066100192614705],
   DefaultZoom: 11,
   Projection: "EPSG:900913",
   DisplayProjection: "EPSG:4326",
 * }
 *
 *
 * {
   Category: 'superMap',超图
   MinZoom: 5,
   MaxZoom: 18,
   CenterPoint: [118.86678243981378, 32.03326958137503],
   DefaultZoom: 11,
   Projection: "EPSG:900913",
   DisplayProjection: "EPSG:4326"
 * }
 *
 * //高德在线地图
 * {
   Category: 'gaode',
   MinZoom: 5,
   MaxZoom: 18,
   //RestrictedExtent: [13176824.5599363, 3663349.21375141, 13274519.3242793, 3844803.16269019],
   CenterPoint: [13225671.9421078, 3754076.1882208],
   DefaultZoom: 11,
   Projection: "EPSG:900913"
   //VectorUrl: http://10.173.2.20/PGIS_S_TileMapServer/Maps/V,
   //SatelliteUrl:
 }
 */
define([], function(){
   return {
       config: {
           Category: "npgis",
           SatelliteUrl: "",
           //DefaultUrl: 'http://172.16.61.246:8888/netposa/NPGIS/services/gaode_vector/MapServer',
           //VectorUrl: 'http://172.16.61.246:8888/netposa/NPGIS/services/gaode_vector/MapServer',
           DefaultUrl: "http://15.128.16.107:6080/arcgis/rest/services/xh_pgis/MapServer",
           VectorUrl: "http://15.128.16.107:6080/arcgis/rest/services/xh_pgis/MapServer",
           DarkUrl: "http://15.128.16.107:6080/arcgis/rest/services/xh_pgis/MapServer"
       }
       /*config: {
           //Category: 'npgis',
           //VectorUrl: "http://172.16.61.237:8080/netposa/NPGIS/services/gaode/MapServer"
           Category: 'gaode',
           MinZoom: 5,
           MaxZoom: 18,
           //RestrictedExtent: [13176824.5599363, 3663349.21375141, 13274519.3242793, 3844803.16269019],
           CenterPoint: [13225671.9421078, 3754076.1882208],
           DefaultZoom: 11,
           Projection: "EPSG:900913"
       }*/
   }
});
