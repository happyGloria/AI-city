MapPlatForm = {}, MapPlatForm.Base = {}, MapPlatForm.ModdleMarker = 0, MapPlatForm.BottomMarker = 1, MapPlatForm.CustomMarker = 2, MapPlatForm.VERSIONNUMBER = "v1.2.1", function () {
    var a = MapPlatForm.Base.MapConfig = function () {
        this.CLASS_NAME = "MapConfig", this.dataServiceURL = "/map/netposa/", this.mapServiceURL = "", this.mapInfo = null, this._mapJson = null
    };
    a.prototype._addLayerToMap = function (a, b) {
        var c = [];
        if (b && b.length > 0) {
            for (var d, e, f, g = 0, h = b.length; h > g; g++)d = b[g], f = d.layerType.split("."), e = new NPMapLib.Layers[f[f.length - 1]](d.layerOpt.url, d.layerName, d.layerOpt), c.push(e);
            a.addLayers(c)
        }
        return c
    }, a.prototype.createMap = function (a, b) {
        this.mapInfo = b;
        for (var c = new NPMapLib.Map(a, b.mapOpts), d = this._addLayerToMap(c, b.vectorLayer), e = this._addLayerToMap(c, b.sattilateLayer), f = e.length - 1; f >= 0; f--)e[f].hide();
        return this._mapJson = {map: c, vectorLayer: d, sattilateLayer: e}, this._mapJson
    }, a.prototype.showVectorLayer = function () {
        if (this._mapJson && this._mapJson.vectorLayer) {
            if (this._mapJson.vectorLayer.length > 1)for (var a = 0; a < this._mapJson.vectorLayer.length; a++)this._mapJson.vectorLayer[a].show(), this._mapJson.vectorLayer[a].setZIndex(this._mapJson.vectorLayer[0].getZIndex() + a + 1);
            if (this._mapJson.sattilateLayer.length > 1)for (var a = this._mapJson.sattilateLayer.length - 1; a >= 1; a--)this._mapJson.sattilateLayer[a].hide();
            this._mapJson.vectorLayer.length > 0 && this._mapJson.map.setBaseLayer(this._mapJson.vectorLayer[0])
        }
    }, a.prototype.showSattilateLayer = function () {
        if (this._mapJson && this._mapJson.sattilateLayer) {
            if (this._mapJson.sattilateLayer.length > 1)for (var a = this._mapJson.sattilateLayer.length - 1; a >= 1; a--)this._mapJson.sattilateLayer[a].show(), this._mapJson.sattilateLayer[a].setZIndex(this._mapJson.sattilateLayer[0].getZIndex() + a + 1);
            if (this._mapJson.vectorLayer.length > 1)for (var a = this._mapJson.vectorLayer.length - 1; a >= 1; a--)this._mapJson.vectorLayer[a].hide();
            this._mapJson.sattilateLayer.length > 0 && this._mapJson.map.setBaseLayer(this._mapJson.sattilateLayer[0])
        }
    }
}(), function () {
    var a = MapPlatForm.Base.MapGeometry = function (a) {
        this.CLASS_NAME = "MapPlatForm.Base.MapGeometry", this.map = a
    };
    a.prototype.getGeometryByGeoJson = function (a) {
        var b = GeoJSON.read(a);
        return b
    }, a.prototype.getGeometryByWKT = function (a) {
        var b = WKT.read(a);
        return b
    }, a.prototype.getFGeoJsonByGeometry = function (a) {
        var b = GeoJSON.write(a, this.map);
        return b
    }, a.prototype.getGGeoJsonByGeometry = function (a) {
        var b = GeoJSON.write(a, this.map), c = JSON.parse(b), a = JSON.stringify(c.geometry);
        return a
    }, a.prototype.getWKTByGeometry = function (a) {
        var b = WKT.write(a, this.map);
        return b
    }, a.prototype.getExtent2Polygon = function (a) {
        var b = [];
        b.push(new NPMapLib.Geometry.Point(a.sw.lon, a.sw.lat)), b.push(new NPMapLib.Geometry.Point(a.ne.lon, a.sw.lat)), b.push(new NPMapLib.Geometry.Point(a.ne.lon, a.ne.lat)), b.push(new NPMapLib.Geometry.Point(a.sw.lon, a.ne.lat)), b.push(new NPMapLib.Geometry.Point(a.sw.lon, a.sw.lat));
        var c = new NPMapLib.Geometry.Polygon(b);
        return c
    }, a.prototype.createMarker = function (a, b) {
        markerType = b.markerType ? b.markerType : MapPlatForm.ModdleMarker;
        var c = new NPMapLib.Symbols.Icon(b.url, new NPMapLib.Geometry.Size(b.size.width, b.size.height));
        markerType == MapPlatForm.ModdleMarker && c.setAnchor(new NPMapLib.Geometry.Size(-b.size.width / 2, -b.size.height / 2)), markerType == MapPlatForm.CustomMarker && c.setAnchor(new NPMapLib.Geometry.Size(-b.iconOffset.width, -b.iconOffset.height));
        var d = new NPMapLib.Symbols.Marker(a);
        if (d.setIcon(c), b.text) {
            label = new NPMapLib.Symbols.Label(b.text), label.setStyle({Color: "#ffffff"}), b.labelOffset = b.labelOffset ? b.labelOffset : {
                width: 0,
                height: 0
            };
            var e = new NPMapLib.Geometry.Size(b.labelOffset.width, b.labelOffset.height);
            label.setOffset(e), d.setLabel(label)
        }
        return d
    }, a.prototype.getIconByParam = function (a) {
        markerType = a.markerType ? a.markerType : MapPlatForm.ModdleMarker;
        var b = new NPMapLib.Symbols.Icon(a.url, new NPMapLib.Geometry.Size(a.size.width, a.size.height));
        return markerType == MapPlatForm.ModdleMarker && b.setAnchor(new NPMapLib.Geometry.Size(-a.size.width / 2, -a.size.height / 2)), markerType == MapPlatForm.CustomMarker && b.setAnchor(new NPMapLib.Geometry.Size(-markerParam.iconOffset.width, -markerParam.iconOffset.height)), b
    }, a.prototype.getExtentByOverlays = function (a) {
        for (var b, c, d, e, f = a.length - 1; f >= 0; f--) {
            var g = a[f].getExtent();
            b && c && d && e ? (b > g.left && (b = g.left), c > g.bottom && (c = g.bottom), d < g.right && (d = g.right), e < g.top && (e = g.top)) : (b = g.left, c = g.bottom, d = g.right, e = g.top)
        }
        return new NPMapLib.Geometry.Extent(b, c, d, e)
    }, a.prototype.sortingResourceByLine = function (a, b, c) {
        c = c || 50;
        for (var d = [], e = this._getLinePoints(b, c), f = this._getShortPointsInLine(a, b), g = 0; g < e.length; g++) {
            var h = null;
            h = g < e.length - 1 ? e[g + 1] : new NPMapLib.Geometry.Point(e[g].lon + (e[g].lon - e[g - 1].lon) / 2, e[g].lat + (e[g].lat - e[g - 1].lat) / 2);
            for (var i = this._findShortestMarker(f, e[g], h, c), j = i.length - 1; j >= 0; j--) {
                for (var k = !1, l = 0; l < d.length; l++)d[l] && d[l].id === i[j].id && (k = !0);
                !k && i[j] && d.push(i[j])
            }
        }
        for (var g = 0; g < a.length; g++) {
            for (var k = !1, l = 0; l < d.length; l++)d[l].id === a[g].id && (k = !0);
            k || d.push(a[g])
        }
        return d
    }, a.prototype._getLinePoints = function (a, b) {
        for (var c = a.getPath(), d = [], e = 0; e < c.length - 1; e++) {
            s_points = this._splitPoints(c[e], c[e + 1], b);
            for (var f = 0; f < s_points.length; f++)d.push(s_points[f])
        }
        return d
    }, a.prototype._splitPoints = function (a, b, c) {
        var d = [a], e = this.map.getDistance(a, b, "4326"), f = 0;
        c > 0 && (f = Math.ceil(e / c));
        for (var g, h, i = 1; f > i; i++) {
            g = i / f;
            var j = parseFloat((b.lon - a.lon) * g) + parseFloat(a.lon), k = parseFloat((b.lat - a.lat) * g) + parseFloat(a.lat);
            h = new NPMapLib.Geometry.Point(j, k), d.push(h)
        }
        return d
    }, a.prototype._getShortPointsInLine = function (a, b) {
        for (var c = [], d = 0; d < a.length; d++) {
            var e = null;
            e = a[d].longitude && a[d].latitude ? new NPMapLib.Geometry.Point(a[d].longitude, a[d].latitude) : a[d].getPosition();
            var f = b.getPath(), g = 999999, h = null;
            sline = null;
            for (var i = 0; i < f.length - 1; i++) {
                var j = this._getSibgleShortPointInLine(e.lon, e.lat, f[i].lon, f[i].lat, f[i + 1].lon, f[i + 1].lat), k = this._calculateEuclideanDistance(j.lon, j.lat, e.lon, e.lat);
                g > k && (g = k, h = j, sline = new NPMapLib.Geometry.Polyline([f[i], f[i + 1]]))
            }
            c.push({key: d, shortPoint: h, data: a[d]})
        }
        return c
    }, a.prototype._findShortestMarker = function (a, b, c, d) {
        for (var e = [], f = 0; f < a.length; f++) {
            var g = a[f].shortPoint, h = this.map.getDistance(g, b, "4326"), i = this.map.getDistance(g, c, "4326"), j = this.map.getDistance(b, c, "4326");
            d / 2 > h && (i * i > h * h + j * j && (h = 0 - h), e.push({distance: h, marker: a[f].data}))
        }
        e = e.sort(function (a, b) {
            return a.distance - b.distance
        });
        for (var k = [], f = e.length - 1; f >= 0; f--)k.push(e[f].marker);
        return k
    }, a.prototype._getSibgleShortPointInLine = function (a, b, c, d, e, f) {
        var g, h, i;
        if (g = this._calculateEuclideanDistance(c, d, e, f), h = this._calculateEuclideanDistance(c, d, a, b), i = this._calculateEuclideanDistance(e, f, a, b), g === h + i)return new NPMapLib.Geometry.Point(a, b);
        if (1e-6 >= g)return new NPMapLib.Geometry.Point(c, d);
        if (i * i >= g * g + h * h)return new NPMapLib.Geometry.Point(c, d);
        if (h * h >= g * g + i * i)return new NPMapLib.Geometry.Point(e, f);
        var j = (f - d) / (e - c), k = (a + (b - d) * j + j * j * c) / (j * j + 1), l = j * k - j * c + d;
        return new NPMapLib.Geometry.Point(k, l)
    }, a.prototype._calculateEuclideanDistance = function (a, b, c, d) {
        var e = Math.sqrt((a - c) * (a - c) + (b - d) * (b - d));
        return e
    }
}(), function () {
    var e = MapPlatForm.Base.MapService = function (a) {
        this.CLASS_NAME = "MapService", this._currentService = null, this.map = a, this.mapConfig = new MapPlatForm.Base.MapConfig, this.mapGeometry = new MapPlatForm.Base.MapGeometry(this.map), this.routeService = null
    };
    e.prototype.queryRoadByName = function (roadName, callBack) {
        var url = this.mapConfig.dataServiceURL + "query/getRoadsByName", service = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), params = new NPMapLib.Services.queryParams;
        params = {roadName: roadName}, this.queryRoadByNameService && (this.queryRoadByNameService.abort(), this.queryRoadByNameService = null), this.queryRoadByNameService = service.query(url, params, function (result) {
            for (var lines = [], i = result.length - 1; i >= 0; i--) {
                var geometry = eval("(" + result[i].feature + ")"), line = GeoJSON.read(geometry);
                if (line instanceof Array)for (var j = line.length - 1; j >= 0; j--)line[j].data = result[i], lines.push(line[j]); else line.data = result[i], lines.push(line)
            }
            callBack instanceof Function && callBack(lines)
        })
    }, e.prototype.getGeometryBuffer = function (a, b, c) {
        var d = this.mapConfig.dataServiceURL + "gis/buffer", e = new NPMapLib.Services.bufferParams;
        e.projection = this.map.getProjection(), e.distance = b, e.units = "m", e.geometry = a;
        var f = new NPMapLib.Services.BufferService(this.map, NPMapLib.MAPTYPE_NPGIS);
        this.geometryBufferService && (this.geometryBufferService.abort(), this.geometryBufferService = null), this.geometryBufferService = f.buffer(d, e, c)
    }, e.prototype.queryPOIByName = function (name, callBack, maxResult, rowIndex) {
        var url = this.mapConfig.dataServiceURL + "query/poiname", service = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), params = new NPMapLib.Services.queryParams;
        params.keyWord = name, params.maxResult = maxResult, params.rowIndex = rowIndex, this.queryPOIByNameService && (this.queryPOIByNameService.abort(), this.queryPOIByNameService = null), this.queryPOIByNameService = service.query(url, params, function (result) {
            for (var points = [], i = 0; i < result.features.length; i++) {
                var geometry = eval("(" + result.features[i].geometry + ")");
                if ("Point" === geometry.type || "point" === geometry.type) {
                    var point = new NPMapLib.Geometry.Point(geometry.coordinates[0], geometry.coordinates[1]);
                    point.data = result.features[i], points.push(point)
                }
            }
            callBack instanceof Function && callBack(points, result)
        })
    }, e.prototype.queryPOIByCoord = function (point, callBack) {
        var url = this.mapConfig.dataServiceURL + "query/poicoord", service = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), params = new NPMapLib.Services.queryParams;
        params = {coord: point.lon + "," + point.lat}, this.queryPOIByCoordService && (this.queryPOIByCoordService.abort(), this.queryPOIByCoordService = null), this.queryPOIByCoordService = service.query(url, params, function (result) {
            var point;
            if (result && result.geometry) {
                var geometry = eval("(" + result.geometry + ")");
                ("Point" === geometry.type || "point" === geometry.type) && (point = new NPMapLib.Geometry.Point(geometry.coordinates[0], geometry.coordinates[1]), point.data = result)
            }
            callBack instanceof Function && callBack(point)
        })
    }, e.prototype.addPOI = function (a, b) {
        var c = this.mapConfig.dataServiceURL + "query/addPoi", d = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), e = new NPMapLib.Services.queryParams;
        e = {
            name: a.data.name,
            poiType: a.data.type,
            address: a.data.address,
            x: a.lon,
            y: a.lat
        }, this.addPOIService && (this.addPOIService.abort(), this.addPOIService = null), this.addPOIService = d.updata(c, e, function (c) {
            c ? (a.data = c, b instanceof Function && b(a)) : b instanceof Function && b(null)
        })
    }, e.prototype.updataPOI = function (a, b) {
        var c = this.mapConfig.dataServiceURL + "query/updataPoi", d = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), e = new NPMapLib.Services.queryParams;
        e = {
            gid: a.data.gid,
            name: a.data.name,
            poiType: a.data.type,
            address: a.data.address,
            x: a.lon,
            y: a.lat
        }, this.updataPOIService && (this.updataPOIService.abort(), this.updataPOIService = null), this.updataPOIService = d.updata(c, e, function (c) {
            c ? (a.data = c, b instanceof Function && b(a)) : b instanceof Function && b(null)
        })
    }, e.prototype.queryPOIByGeometry = function (geometry, callBack, maxResult, rowIndex) {
        var url = this.mapConfig.dataServiceURL + "query/searchInBounds", wktGeo = this.mapGeometry.getWKTByGeometry(geometry), service = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), params = new NPMapLib.Services.queryParams;
        params.wkt = wktGeo, params.maxResult = maxResult, params.rowIndex = rowIndex, this.queryPOIByGeometryService && (this.queryPOIByGeometryService.abort(), this.queryPOIByGeometryService = null), this.queryPOIByGeometryService = service.query(url, params, function (result) {
            for (var points = [], i = 0; i < result.data.length; i++) {
                var geometry = eval("(" + result.data[i].geometry + ")");
                if ("Point" === geometry.type || "point" === geometry.type) {
                    var point = new NPMapLib.Geometry.Point(geometry.coordinates[0], geometry.coordinates[1]);
                    point.data = result.data[i], points.push(point)
                }
            }
            callBack instanceof Function && callBack(points, result.pageCount, result.totalCount)
        })
    }, e.prototype.queryPOIByFilter = function (filter, callBack, maxResult, rowIndex) {
        var url = this.mapConfig.dataServiceURL + "query/poiname", service = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), params = new NPMapLib.Services.queryParams;
        params.maxResult = maxResult, params.rowIndex = rowIndex;
        var fs = filter.split("=");
        params.type = fs[0], params.keyWord = fs[1], this.queryPOIByFilterService && (this.queryPOIByFilterService.abort(), this.queryPOIByFilterService = null), this.queryPOIByFilterService = service.query(url, params, function (result) {
            for (var points = [], i = 0; i < result.features.length; i++) {
                var geometry = eval("(" + result.features[i].geometry + ")");
                if ("Point" === geometry.type || "point" === geometry.type) {
                    var point = new NPMapLib.Geometry.Point(geometry.coordinates[0], geometry.coordinates[1]);
                    point.data = result.features[i], points.push(point)
                }
            }
            callBack instanceof Function && callBack(points, result.pageCount, result.totalCount)
        })
    }, e.prototype.queryPOIByGeometryAndFilter = function (geometry, filter, callBack, maxResult, rowIndex) {
        var url = this.mapConfig.dataServiceURL + "query/searchInBounds", wktGeo = this.mapGeometry.getWKTByGeometry(geometry), service = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), params = new NPMapLib.Services.queryParams;
        params.wkt = wktGeo, params.maxResult = maxResult, params.rowIndex = rowIndex;
        var fs = filter.split("=");
        params.type = fs[0], params.keyWord = fs[1], this.queryPOIByGeometryAndFilterService && (this.queryPOIByGeometryAndFilterService.abort(), this.queryPOIByGeometryAndFilterService = null), this.queryPOIByGeometryAndFilterService = service.query(url, params, function (result) {
            for (var points = [], i = 0; i < result.data.length; i++) {
                var geometry = eval("(" + result.data[i].geometry + ")");
                if ("Point" === geometry.type || "point" === geometry.type) {
                    var point = new NPMapLib.Geometry.Point(geometry.coordinates[0], geometry.coordinates[1]);
                    point.data = result.data[i], points.push(point)
                }
            }
            callBack instanceof Function && callBack(points, result.pageCount, result.totalCount)
        })
    }, e.prototype.queryRoadCrossByName = function (a, b) {
        var c = this.mapConfig.dataServiceURL + "query/getRoadCrossByName", d = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), e = new NPMapLib.Services.queryParams;
        e.roadName = a, this.queryRoadCrossByNameService && (this.queryRoadCrossByNameService.abort(), this.queryRoadCrossByNameService = null), this.queryRoadCrossByNameService = d.query(c, e, function (a) {
            for (var c = [], d = 0; d < a.length; d++) {
                var e = new NPMapLib.Geometry.Point(a[d].lon, a[d].lat);
                e.data = a[d], c.push(e)
            }
            b instanceof Function && b(c)
        })
    }, e.prototype.queryRoadCrossByGeometry = function (a, b) {
        var c = this.mapGeometry.getWKTByGeometry(a), d = this.mapConfig.dataServiceURL + "query/searchRoadCrossInBounds", e = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), f = new NPMapLib.Services.queryParams;
        f.wkt = c, this.queryRoadCrossByGeometryService && (this.queryRoadCrossByGeometryService.abort(), this.queryRoadCrossByGeometryService = null), this.queryRoadCrossByGeometryService = e.query(d, f, function (a) {
            for (var c = [], d = 0; d < a.data.length; d++) {
                var e = new NPMapLib.Geometry.Point(a.data[d].lon, a.data[d].lat);
                e.data = a.data, c.push(e)
            }
            b instanceof Function && b(c)
        })
    }, e.prototype.addRoadCross = function (a) {
        var b = this.mapConfig.dataServiceURL + "query/addRoadCross", c = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), d = new NPMapLib.Services.queryParams;
        d = {
            name: a.data.name,
            x: a.lon,
            y: a.lat
        }, this.addRoadCrossService && (this.addRoadCrossService.abort(), this.addRoadCrossService = null), this.addRoadCrossService = c.updata(b, d, function (a) {
            var b;
            a ? (b.data = a, callBack instanceof Function && callBack(b)) : callBack instanceof Function && callBack(null)
        })
    }, e.prototype.updataRoadCross = function (a) {
        var b = this.mapConfig.dataServiceURL + "query/updataRoadCross", c = new NPMapLib.Services.QueryService(NPMapLib.MAPTYPE_NPGIS), d = new NPMapLib.Services.queryParams;
        d = {
            gid: a.data.gid,
            name: a.data.name,
            x: a.lon,
            y: a.lat
        }, this._updataRoadCrossService && (this._updataRoadCrossService.abort(), this._updataRoadCrossService = null), this._updataRoadCrossService = c.updata(b, d, function (a) {
            var b;
            a ? (b.data = a, callBack instanceof Function && callBack(b)) : callBack instanceof Function && callBack(null)
        })
    }, e.prototype.searchRouteByCoor = function (a, b) {
        var c = new NPMapLib.Services.RouteService(this.map, 7), d = new NPMapLib.Services.routeParams;
        d.service = "na", d.request = "getroute", d.networkName = "shanghai_roadnet_supermap", d.startStop = a.startStop, d.endStop = a.endStop, d.trafficModel = a.trafficModel, d.planRoadType = a.planRoadType, d.geoBarriers = [], d.algorithm = "Dijkstra", this.routeService && (this.routeService.abort(), this.routeService = null), this.routeService = c.route(this.mapConfig.dataServiceURL + "/gis/na", d, b)
    }, e.prototype.cancelService = function () {
        this.queryPOIByFilterService && (this.queryPOIByFilterService.abort(), this.queryPOIByFilterService = null), this.addRoadCrossService && (this.addRoadCrossService.abort(), this.addRoadCrossService = null), this.queryPOIByGeometryService && (this.queryPOIByGeometryService.abort(), this.queryPOIByGeometryService = null), this.updataPOIService && (this.updataPOIService.abort(), this.updataPOIService = null), this._updataRoadCrossService && (this._updataRoadCrossService.abort(), this._updataRoadCrossService = null), this.addPOIService && (this.addPOIService.abort(), this.addPOIService = null), this.queryRoadByNameService && (this.queryRoadByNameService.abort(), this.queryRoadByNameService = null), this.queryRoadCrossByGeometryService && (this.queryRoadCrossByGeometryService.abort(), this.queryRoadCrossByGeometryService = null), this.queryPOIByGeometryAndFilterService && (this.queryPOIByGeometryAndFilterService.abort(), this.queryPOIByGeometryAndFilterService = null), this.queryRoadCrossByNameService && (this.queryRoadCrossByNameService.abort(), this.queryRoadCrossByNameService = null), this.routeService && (this.routeService.abort(), this.routeService = null)
    }
}(), function () {
    var a = MapPlatForm.Base.MapTag = function (a, b) {
        this.CLASS_NAME = "MapTag", this.layer = b, this.map = a, this._activeMarker, this.callback = null, this._mapGeometry = new MapPlatForm.Base.MapGeometry(a), this.markerParam = null, this.layer || (this.layer = this.map.getDefaultLayer()), self = this
    };
    a.prototype._clickCallBack = function () {
        var a = self._mapGeometry.createMarker(self._activeMarker.getPosition(), self.markerParam);
        self.layer.addOverlay(a), a.enableEditing(), self.delAdrawMarker(), self.callback && self.callback instanceof Function && self.callback(a)
    }, a.prototype.adrawMarker = function (a, b) {
        this.markerParam = a, this.delAdrawMarker(), this.callback = b, this.layer.removeOverlay(this._activeMarker), this._activeMarker = null, this.map.activateMouseContext("点击添加标注,右键取消"), self = this;
        var c = this.map.getMouseContextStyle();
        c.height = "20px", this.map.addEventListener(NPMapLib.MAP_EVENT_MOUSE_MOVE, function (a) {
            self._activeMarker ? self._activeMarker.setPosition(a) : (self._activeMarker = self._mapGeometry.createMarker(a, self.markerParam), self.layer.addOverlay(self._activeMarker), self._activeMarker.addEventListener("click", self._clickCallBack))
        }), this.map.addEventListener(NPMapLib.MAP_EVENT_RIGHT_CLICK, function () {
            self._activeMarker && self.delAdrawMarker()
        }), this.map.addEventListener(NPMapLib.MAP_EVENT_CLICK, self._clickCallBack), this.map.getContainer().onmouseenter = function () {
            self._activeMarker && self._activeMarker.show()
        }, this.map.getContainer().onmouseleave = function () {
            self._activeMarker && self._activeMarker.hide()
        }
    }, a.prototype.delAdrawMarker = function () {
        this.map && (this.layer.removeOverlay(this._activeMarker), this.map.deactivateMouseContext(), this.map.removeEventListener(NPMapLib.MAP_EVENT_CLICK), this.map.removeEventListener(NPMapLib.MAP_EVENT_MOUSE_OVER), this.map.removeEventListener(NPMapLib.MAP_EVENT_MOUSE_OUT), this.map.removeEventListener(NPMapLib.MAP_EVENT_MOUSE_MOVE))
    }
}(), function () {
    var a = MapPlatForm.Base.MapTools = function (a) {
        this.CLASS_NAME = "MapTools", this.map = a, this.measureTool = null, this.drawTool = null, this.searchCircle = null, this.editMarker = null
    };
    a.prototype._initMeasureTool = function () {
        this.measureTool = new NPMapLib.Tools.MeasureTool(this.map.id, {
            lengthUnit: NPMapLib.MAP_UNITS_METERS,
            areaUnit: NPMapLib.MAP_UNITS_SQUARE_KILOMETERS,
            mode: NPMapLib.MEASURE_MODE_DISTANCE
        })
    }, a.prototype._initDrawTool = function () {
        this.drawTool = new NPMapLib.Tools.DrawingTool(this.map.id), this.map.MapTools = this
    }, a.prototype.measureDistance = function () {
        this.measureTool || this._initMeasureTool(), this.cancelMeasure(), this.cancelDraw(), this.measureTool.startUp(), this.measureTool.setMode(NPMapLib.MEASURE_MODE_DISTANCE)
    }, a.prototype.measureArea = function () {
        this.measureTool || this._initMeasureTool(), this.cancelMeasure(), this.cancelDraw(), this.measureTool.startUp(), this.measureTool.setMode(NPMapLib.MEASURE_MODE_AREA)
    }, a.prototype.cancelMeasure = function () {
        if (this.measureTool)try {
            this.measureTool.stop()
        } catch (a) {
            this.measureTool.cancel()
        }
    }, a.prototype.cancelDraw = function () {
        this.drawTool && this.drawTool.cancel()
    }, a.prototype.drawLine = function (a) {
        this.drawTool || this._initDrawTool(), this.cancelMeasure(), this.cancelDraw(), this.drawTool.startUp(a), this.drawTool.setMode(NPMapLib.DRAW_MODE_POLYLINE, a, {cursor: "crosshair"})
    }, a.prototype.drawRectangle = function (a) {
        this.drawTool || this._initDrawTool(), this.cancelMeasure(), this.cancelDraw(), this.drawTool.startUp(a), this.drawTool.setMode(NPMapLib.DRAW_MODE_RECT, a, {cursor: "crosshair"})
    }, a.prototype.drawCircle = function (a) {
        this.drawTool || this._initDrawTool(), this.cancelMeasure(), this.cancelDraw(), this.drawTool.startUp(a), this.drawTool.setMode(NPMapLib.DRAW_MODE_CIRCLE, a, {cursor: "crosshair"})
    }, a.prototype.drawPolygon = function (a) {
        this.drawTool || this._initDrawTool(), this.cancelMeasure(), this.cancelDraw(), this.drawTool.startUp(a), this.drawTool.setMode(NPMapLib.DRAW_MODE_POLYLGON, a, {cursor: "crosshair"})
    }, a.prototype.drawCircleByDiameter = function (a) {
        this.drawTool || this._initDrawTool(), this.cancelMeasure(), this.cancelDraw(), this.drawTool.startUp(a), this.drawTool.setMode(NPMapLib.DRAW_MODE_CIRCLE_DIAMETER, a, {cursor: "crosshair"})
    }, a.prototype.drawFreehand = function (a) {
        this.drawTool || this._initDrawTool, this.cancelMeasure, this.cancelDraw, this.drawTool.startUp(a), this.drawTool.setMode(NPMapLib.DRAW_MODE_FREEHAND, a, {cursor: "crosshair"})
    }, a.prototype.addCircleSearchControl = function (a, b, c, d) {
        var e = this, f = 1e3;
        c ? f = c : c = 500, d || (d = 5e3);
        var g = b;
        this.searchCircle = new NPMapLib.Geometry.Circle(a, f, {
            color: "#acb9d1",
            fillColor: "#6980bc",
            weight: 2,
            opacity: 1,
            fillOpacity: .2
        });
        var h = this.map.getDefaultLayer();
        h.addOverlay(this.searchCircle);
        var i = new NPMapLib.Geometry.Size(76, 24), j = OpenLayers.Util.getImageLocation("editCircle.png"), k = new NPMapLib.Symbols.Icon(j, i);
        this.editMarker = new NPMapLib.Symbols.Marker(a), this.editMarker.setIcon(k), this.editMarker.setOffset(new NPMapLib.Geometry.Size(20, 0));
        var l = new NPMapLib.Symbols.Label(f + "米", {offset: new NPMapLib.Geometry.Size(15, 9)});
        l.setStyle({fontSize: 12, fontFamily: "宋体", align: "left"}), this.editMarker.setLabel(l);
        var m = this.searchCircle.getCenter();
        m.lon = m.lon + (new NPMapLib.GisToolKit).getDistanceByProjection(f, this.map), this.editMarker.setPosition(m), this.map.enableEditing(), this.editMarker.enableEditing(), this.editMarker.isEnableEdit = !0, h.addOverlay(this.editMarker), this.editMarker.addEventListener("featuremousedown", function () {
            n = !0, o = !0
        });
        var n = !1, o = !1, p = !1;
        this.editMarker.addEventListener("mouseover", function () {
            p || (e.map.enableEditing(), p = !0), o = !0
        }), this.editMarker.addEventListener("mouseout", function () {
            n || p && (e.map.disableEditing(), p = !1), o = !1
        }), this.editMarker.addEventListener("draging", function (a) {
            var b = e.searchCircle.getCenter(), f = a.getPosition().lon - e.searchCircle.getCenter().lon;
            f = (new NPMapLib.GisToolKit).getPlatDistanceByProjection(f, e.map), c > f ? (b.lon = b.lon + (new NPMapLib.GisToolKit).getDistanceByProjection(c, e.map), f = c) : f > d ? (b.lon = b.lon + (new NPMapLib.GisToolKit).getDistanceByProjection(d, e.map), f = d) : b.lon = a.getPosition().lon;
            var g = a.getLabel();
            g.setContent(Math.round(f) + "米"), a.setLabel(g), e.searchCircle.setRadius(f), e.searchCircle.refresh(), a.setPosition(b), a.refresh()
        }), this.editMarker.addEventListener("dragend", function () {
            o || p && (e.map.disableEditing(), p = !1), g && g instanceof Function && g(e.searchCircle);
            var a = e.searchCircle.getExtent();
            e.map.zoomToExtent(a), n = !1
        }), this.map.disableEditing();
        var q = e.searchCircle.getExtent();
        this.map.zoomToExtent(q), g && g instanceof Function && g(e.searchCircle)
    }, a.prototype.removeCircleSearchControl = function () {
        this.editMarker && (this.editMarker.removeEventListener("dragend"), this.editMarker.removeEventListener("draging"), this.editMarker.removeEventListener("mouseout"), this.editMarker.removeEventListener("mouseover"), this.editMarker.removeEventListener("featuremousedown"));
        var a = this.map.getDefaultLayer();
        a.removeOverlay(this.editMarker), a.removeOverlay(this.searchCircle), this.map.disableEditing()
    }
}(), function () {
    var a = MapPlatForm.Base.MapRoutePlan = function (a, b) {
        this.CLASS_NAME = "MapRoutePlan", this.map = a, this.layer = b ? b : this.map.getDefaultLayer(), this.startMarker = null, this._planRoadType = 1, this._currentPolyline = null, this.endMarker = null, this.editMarker = null, this._throughMarkerInfo = {}, this._routes = [], this._throughMarkerNum = 0, this._routeIndex = 0, this._mapService = new MapPlatForm.Base.MapService(a), this._mapGeometry = new MapPlatForm.Base.MapGeometry(a), this.result1 = null, this.result2 = null, this._researchCallback = function () {
        }, this.routeGroup = this.layer.addGroup("route"), this.editGroup = this.layer.addGroup("route_edit"), window.getElementsByClassName = function (a) {
            for (var b = [], c = document.getElementsByTagName("*"), d = 0; d < c.length; d++)c[d].className == a && (b[b.length] = c[d]);
            return b
        }
    };
    a.prototype._addPath = function (a) {
        if (a.features.length < 1 || a.features.length < 1)return void(this.errorCallBack && this.errorCallBack instanceof Function && this.errorCallBack("没有合适的路线，请重新拖动!"));
        var b = a.features[0];
        b.setStyle({color: "red", weight: 5}), this.routeGroup.addOverlay(b), b.setZIndex(0);
        var c = this;
        b.addEventListener("featuremoving", function (a, b) {
            var d = new MapPlatForm.Base.MapGeometry(map);
            c.editMarker ? (c.editMarker.setPosition(b), c.editMarker.show()) : (c.editMarker = d.createMarker(b, {
                url: OpenLayers.Util.getImageLocation("path-edit.png"),
                size: {width: 11, height: 11},
                markerType: 0
            }), c.editGroup.addOverlay(c.editMarker), c.editMarker.isEnableEdit = !0, c.editMarker.enableEditing())
        })
    }, a.prototype.addEidtMarkerEvent = function () {
        this.editMarker && this.editMarker.addEventListener(NPMapLib.MARKER_EVENT_DRAG_END, function (a) {
            _afterDrag(a)
        })
    }, a.prototype._afterDrag = function (a, b, c) {
        var d = null, e = null, f = null;
        b ? (e = b.startPosition, f = b.stopPosition) : (d = _currentPolyline.getPath(), e = d[0], f = d[d.length - 1]);
        var g = {startStop: e, endStop: a, trafficModel: "car", planRoadType: this._planRoadType};
        _mapService.searchRouteByCoor(g, function (d) {
            g = {
                startStop: a,
                endStop: f,
                trafficModel: "car",
                planRoadType: _planRoadType
            }, _mapService.searchRouteByCoor(g, function (g) {
                return d.features.length < 1 || g.features.length < 1 ? void(this.errorCallBack && this.errorCallBack instanceof Function && this.errorCallBack("没有合适的路线，请重新拖动！")) : void _addRoutes(a, {
                    result1: d,
                    result2: g,
                    startPosition: e,
                    stopPosition: f,
                    throughMarkerRelativeInfo: b,
                    key: c
                })
            })
        })
    }, a.prototype._addRoutes = function (a) {
        this.routeGroup.addOverlay(a.features[0])
    }, a.prototype._clearEditInfoOnMap = function () {
        this.editGroup && (this.editGroup.removeAllOverlays(), this.editMarker = null), this.routeGroup && (this.routeGroup.removeAllOverlays(), this.editMarker = null), this.map.closeAllInfoWindows()
    }, a.prototype._queryRoute = function () {
        var a = {
            startStop: this._startMarker.getPosition(),
            endStop: this._endMarker.getPosition(),
            trafficModel: "car",
            planRoadType: this._planRoadType
        }, b = this;
        this._mapService.searchRouteByCoor(a, function (a) {
            if (a.features.length < 1)return void(b.errorCallBack && b.errorCallBack instanceof Function && b.errorCallBack("没有合适的路线，请重新拖动！"));
            var c = a.features[0];
            b._setPolylineStyle([c]), b.routeGroup.addOverlay(c), c.setData({index: b._routeIndex}), b._routeArray = [c], b._addEventToLines([c]), b._routes = [{
                index: b._routeIndex,
                dragIconIndex: {icon1: 0, icon2: 0},
                route: c,
                routeInfo: ""
            }]
        })
    }, a.prototype._addEventToLines = function (a) {
        var b = this;
        if (a && a instanceof Array)for (var c = a.length, d = 0; c > d; d++)a[d].addEventListener("featuremoving", function (a, c) {
            b.editMarker ? (b.editMarker.setPosition(c), b.editMarker.show()) : (b.editMarker = b._mapGeometry.createMarker(c, {
                url: OpenLayers.Util.getImageLocation("path-edit.png"),
                size: {width: 11, height: 11},
                markerType: 0
            }), b.editGroup.addOverlay(b.editMarker), b.editMarker.enableEditing(), b.editMarker.setZIndex(100), b._dragEdit()), b.editMarker.setData({line: a})
        })
    }, a.prototype._removeEventToLines = function (a) {
        if (a && a instanceof Array)for (var b = a.length, c = 0; b > c; c++)a[c].removeEventListener("featuremoving")
    }, a.prototype._dragEdit = function () {
        if (this.editMarker) {
            this.editMarker.isEnableEdit = !0, this.editMarker.addEventListener("featuremousedown", function (a) {
                a.removeEventListener("mouseout")
            });
            var a = this;
            this.editMarker.addEventListener("dragend", function (b) {
                b.hide(), b.addEventListener("mouseout", function (a) {
                    a.hide()
                }), a._currentPolyline = b.getData().line, a._afterDrag(b.getPosition())
            }), this.editMarker.addEventListener(NPMapLib.MARKER_EVENT_DRAG_START, function () {
                for (var b = a.routeGroup.getAllOverlayers(), c = [], d = 0; d < b.length; d++)"NPMapLib.Geometry.Polyline" === b[d].CLASS_NAME && c.push(b[d]);
                a._removeEventToLines(c)
            }), this.editMarker.addEventListener("mouseout", function (a) {
                a.hide()
            })
        }
    }, a.prototype._getRelativeRoute = function (a) {
        for (var b = null, c = null, d = 0, e = this._routes.length; e > d; d++)if (this._routes[d].dragIconIndex.icon1 === parseInt(a, 10) || this._routes[d].dragIconIndex.icon2 === parseInt(a, 10))if (b) {
            if (!c) {
                c = this._routes[d];
                break
            }
        } else b = this._routes[d];
        return {route1: b, route2: c}
    }, a.prototype._afterDrag = function (a, b) {
        var c = null, d = null, e = null, f = "add";
        if (b) {
            var g = this._getRelativeRoute(b), h = g.route1.route.getPath(), i = g.route2.route.getPath();
            d = h[0], e = i[i.length - 1], f = "edit"
        } else c = this._currentPolyline.getPath(), d = c[0], e = c[c.length - 1], f = "add";
        var j, k, l, m = {startStop: d, endStop: a, trafficModel: "car", planRoadType: this._planRoadType}, n = this;
        this._mapService.searchRouteByCoor(m, function (c) {
            j = c, n._searchRouteByDrag(a, f, g, b, j, k, l)
        });
        var o = {
            startStop: a,
            endStop: e,
            trafficModel: "car",
            planRoadType: this._planRoadType
        }, p = new MapPlatForm.Base.MapService(this.map);
        p.searchRouteByCoor(o, function (c) {
            k = c, n._searchRouteByDrag(a, f, g, b, j, k, l)
        });
        var q = new MapPlatForm.Base.MapService(this.map);
        q.queryPOIByCoord(a, function (c) {
            l = c, n._searchRouteByDrag(a, f, g, b, j, k, l)
        })
    }, a.prototype._searchRouteByDrag = function (a, b, c, d, e, f, g) {
        if (e && f && g) {
            for (var h = this.routeGroup.getAllOverlayers(), i = [], j = 0; j < h.length; j++)"NPMapLib.Geometry.Polyline" === h[j].CLASS_NAME && i.push(h[j]);
            return this._addEventToLines(i), e.features.length < 1 || f.features.length < 1 ? void(this._errorCallBack && this._errorCallBack instanceof Function && this._errorCallBack("没有合适的路线，请重新拖动！")) : void this._getAddressByCoor(a, {
                result1: e,
                result2: f,
                type: b,
                relativeRoutes: c,
                key: d
            }, g)
        }
    }, a.prototype._getAddressByCoor = function (a, b, c) {
        "add" === b.type ? this._afteDragAdd(a, b, c) : this._afterDragEdit(a, b, c)
    }, a.prototype._afteDragAdd = function (a, b, c) {
        var d = b.result1.features[0], e = b.result2.features[0];
        this._setPolylineStyle([d, e]), d.setData({index: ++this._routeIndex}), e.setData({index: ++this._routeIndex}), this.routeGroup.addOverlay(d), this.routeGroup.addOverlay(e), d.setZIndex(1), e.setZIndex(1), this._addEventToLines([d, e]);
        var f = OpenLayers.Util.getImageLocation("path-cross.png"), g = this._mapGeometry.createMarker(a, {
            url: f,
            size: {width: 11, height: 11},
            markerType: 0
        });
        this.editGroup.addOverlay(g), g.setZIndex(100);
        var h = c.data.name, i = h ? h : "未知地址";
        this._throughMarkerNum++, g.setData({key: this._throughMarkerNum, name: i});
        var j = this._getRouteByIndex(this._currentPolyline.getData().index), k = this._addInfowin(i, this._throughMarkerNum, a);
        this._throughMarkerInfo[this._throughMarkerNum] = {infoWindow: k, marker: g}, g.isEnableEdit = !0;
        var l = this;
        g.addEventListener("dragend", function (a) {
            var b = parseInt(a.getData().key, 10), c = l._throughMarkerInfo[b];
            c.infoWindow.close(), l._afterDrag(a.getPosition(), b)
        }), this._refreshRouteArray({
            route1: {
                index: d.getData().index,
                dragIconIndex: {icon1: j.dragIconIndex.icon1, icon2: this._throughMarkerNum},
                route: d,
                routeInfo: b.result1.messages.segments
            },
            route2: {
                index: e.getData().index,
                dragIconIndex: {icon1: this._throughMarkerNum, icon2: j.dragIconIndex.icon2},
                route: e,
                routeInfo: b.result2.messages.segments
            },
            key: b.key
        }, b.type), this.routeGroup.removeOverlay(this._currentPolyline)
    }, a.prototype._afterDragEdit = function (a, b, c) {
        var d = b.relativeRoutes;
        this.routeGroup.removeOverlay(d.route1.route), this.routeGroup.removeOverlay(d.route2.route);
        var e = b.result1.features[0], f = b.result2.features[0];
        this._setPolylineStyle([e, f]), e.setData({index: d.route1.route.getData().index}), f.setData({index: d.route2.route.getData().index}), this.routeGroup.addOverlay(e), this.routeGroup.addOverlay(f), e.setZIndex(1), f.setZIndex(1), this._addEventToLines([e, f]);
        var g = c.data.name, h = g ? g : "未知地址";
        this._throughMarkerInfo[b.key].marker.setData({
            key: b.key,
            name: h
        }), d.route1.route = e, d.route1.routeInfo = b.result1.messages.segments, d.route2.route = f, d.route2.routeInfo = b.result2.messages.segments;
        var i = this._addInfowin(h, b.key, a);
        this._throughMarkerInfo[b.key].infoWindow = i, this._refreshRouteArray({
            route1: d.route1,
            route2: d.route2,
            key: b.key
        }, b.type)
    }, a.prototype._getThroughInfo = function (a, b) {
        var c = document.createElement("div");
        c.style.fontSize = "13px", c.style.border = "1px solid #dfdfdf", c.style.borderRadius = "5px", c.style.webkitBorderRadius = "5px", c.style.height = "21px", c.style.backgroundColor = "#fff";
        var d = document.createElement("span");
        d.style.maxWidth = "100px", d.style.overflow = "hidden", d.style.whiteSpace = "nowrap", d.style.textOverflow = "ellipsis", d.style.float = "left", d.style.marginLeft = "2px", d.style.display = "inline-block", d.style.lineHeight = "21px", d.innerText = a;
        var e = document.createElement("i");
        return e.style.width = "14px", e.style.height = "14px", e.style.float = "left", e.style.display = "inline-block", e.style.marginLeft = "5px", e.style.marginTop = "3px", e.style.cursor = "pointer", e.style.background = "url('" + OpenLayers.Util.getImageLocation("close.png") + "') no-repeat", e.className = "infowindow-close", e.setAttribute("key", b), c.appendChild(d), c.appendChild(e), c
    }, a.prototype._addInfowin = function (a, b, c) {
        var d = this._getThroughInfo(a, b), e = new NPMapLib.Symbols.InfoWindow(c, "", d, {
            iscommon: !0,
            isAdaptation: !1,
            offset: new NPMapLib.Geometry.Size(7, -9)
        });
        this.map.addOverlay(e), e.open();
        for (var f = document.getElementsByClassName("infowindow-close"), g = this, h = f.length - 1; h >= 0; h--)f[h].onclick = function () {
            key = this.getAttribute("key");
            var a = g._getRelativeRoute(key), b = a.route1.route.getPath(), c = a.route2.route.getPath(), d = {
                startStop: b[0],
                endStop: c[c.length - 1],
                trafficModel: "car",
                planRoadType: g._planRoadType
            };
            g._mapService.searchRouteByCoor(d, function (b) {
                if (b.features[0]) {
                    var c = g._throughMarkerInfo[key];
                    c.infoWindow.close(), g.editGroup.removeOverlay(c.marker), g.routeGroup.removeOverlay(a.route1.route), g.routeGroup.removeOverlay(a.route2.route);
                    var d = b.features[0], e = ++g._routeIndex;
                    d.setData({index: e}), g._setPolylineStyle([d]), g.routeGroup.addOverlay(d), d.setZIndex(0), g._refreshRouteArray({
                        route: {
                            index: e,
                            dragIconIndex: {icon1: a.route1.dragIconIndex.icon1, icon2: a.route2.dragIconIndex.icon2},
                            route: b.features[0],
                            routeInfo: b.messages.segments
                        }, key: key
                    }, "delete"), g._addEventToLines([b.features[0]])
                } else notify.warn("没有合适的路线！")
            })
        };
        return e
    }, a.prototype._refreshRouteArray = function (a, b) {
        var c, d = null, e = null;
        if ("add" === b) {
            for (var f = this._currentPolyline.getData().index, g = 0, h = this._routes.length; h > g; g++)if (this._routes[g].index === parseInt(f, 10)) {
                c = g;
                break
            }
            this._routes.splice(c, 1, a.route1), this._routes.splice(c + 1, 0, a.route2)
        } else if ("edit" === b) {
            for (var g = 0, h = this._routes.length; h > g; g++)if (this._routes[g].dragIconIndex.icon1 === parseInt(a.key, 10) || this._routes[g].dragIconIndex.icon2 === parseInt(a.key, 10))if (d) {
                if (!e) {
                    e = this._routes[g], this._routes.splice(g, 1, a.route2);
                    break
                }
            } else d = this._routes[g], this._routes.splice(g, 1, a.route1)
        } else for (var g = 0, h = this._routes.length; h > g; g++)if (this._routes[g].dragIconIndex.icon1 === parseInt(a.key, 10) || this._routes[g].dragIconIndex.icon2 === parseInt(a.key, 10))if (d) {
            if (!e) {
                e = this._routes[g], this._routes.splice(g, 1);
                break
            }
        } else d = this._routes[g], this._routes.splice(g, 1, a.route);
        this._researchCallback(this._routes)
    }, a.prototype._setPolylineStyle = function (a) {
        if (a && a instanceof Array)for (var b = a.length, c = 0; b > c; c++)a[c].setStyle({
            color: "#0080c0",
            weight: 10,
            lineStyle: "1px solid #0080c0",
            opacity: .7
        }), a[c].setZIndex(0)
    }, a.prototype._getRouteByIndex = function (a) {
        for (var b = null, c = 0, d = this._routes.length; d > c; c++)if (this._routes[c].index === parseInt(a, 10)) {
            b = this._routes[c];
            break
        }
        return b
    }, a.prototype._refreshRelativeThroughInfo = function (a, b) {
        var c = b.startPosition, d = b.stopPosition;
        for (var e in this._throughMarkerInfo)if (a !== parseInt(e)) {
            var f = this._throughMarkerInfo[e].startPosition, g = this._throughMarkerInfo[e].stopPosition, h = this._throughMarkerInfo[e].crossPoint;
            c.lat === f.lat && c.lon === f.lon && (this._throughMarkerInfo[e].startPosition = b.crossPoint, this._throughMarkerInfo[e].route1 = b.route2), d.lat === g.lat && d.lon === g.lon && (this._throughMarkerInfo[e].stopPosition = b.crossPoint, this._throughMarkerInfo[e].route2 = b.route1), c.lat === h.lat && c.lon === h.lon && (this._throughMarkerInfo[e].stopPosition = b.crossPoint, this._throughMarkerInfo[e].route2 = b.route1), d.lat === h.lat && d.lon === h.lon && (this._throughMarkerInfo[e].startPosition = b.crossPoint, this._throughMarkerInfo[e].route1 = b.route2)
        }
    }, a.prototype._refreshRelativeThroughInfoDel = function (a, b, c) {
        var d = b.crossPoint;
        for (var e in _throughMarkerInfo)if (a !== parseInt(e)) {
            var f = this._throughMarkerInfo[e].startPosition, g = this._throughMarkerInfo[e].stopPosition;
            d.lat === f.lat && d.lon === f.lon && (this._throughMarkerInfo[e].startPosition = b.startPosition, this._throughMarkerInfo[e].route1 = c), d.lat === g.lat && d.lon === g.lon && (this._throughMarkerInfo[e].stopPosition = b.stopPosition, this._throughMarkerInfo[e].route2 = c)
        }
    }, a.prototype.addRoutePlanControl = function (a, b, c) {
        this._planRoadType = a.planRoadType, this._startMarker = a.startMarker, this._endMarker = a.endMarker, this._clearEditInfoOnMap(), this._researchCallback = b, this._errorCallBack = c, this._queryRoute()
    }
}();