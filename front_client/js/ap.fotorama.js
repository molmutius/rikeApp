'use strict';

angular.module('ap.fotorama', [])

    .value('apFotoramaConfig',{
        id:      'id',
        thumb:   'thumb',
        img:     'img',
        full:    'full',
        caption: 'caption',
        active:  'active',
        domain:  '', 
        show:            null,
        showend:         null,
        fullscreenenter: null,
        fullscreenexit:  null,
        loadvideo:       null,
        unloadvideo:     null,
        stagetap:        null,
        ready:           null,
        error:           null,
        load:            null,
        stopautoplay:    null,
        startautoplay:   null
    })
    .directive('apFotorama', ['apFotoramaConfig', function (apFotoramaConfig) {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {

                var opts = {},
                    collection,
                    events = 'show showend fullscreenenter fullscreenexit loadvideo unloadvideo stagetap ready error load stopautoplay startautoplay'.split(' ');

                angular.extend(opts, apFotoramaConfig);

                element.bind('fotorama:showend', function (e, fotorama, extra) {
                    if (collection !== undefined && typeof scope[attrs.ngModel] === 'object') {
                        setActive(collection.activeIndex);
                        scope.$$phase || scope.$apply();
                    }
                });

                function makeFotoramaArray (res, update) {
                    var n = typeof res === 'object' ? res.length : 0,
                        activeIndex;
                    
                    for (var i = 0, nn = n, arr = [], ci; i < nn; i++) {
                        if (res[i].id !== undefined) {
                            ci = arr.push({}) - 1;
                            arr[ci].id       = res[i][opts.id];
                            arr[ci].thumb    = res[i][opts.thumb] !== undefined ? opts.domain + res[i][opts.thumb] : res[i][opts.thumb];
                            arr[ci].img      = res[i][opts.img]   !== undefined ? opts.domain + res[i][opts.img]   : res[i][opts.thumb];
                            arr[ci].full     = res[i][opts.full]  !== undefined ? opts.domain + res[i][opts.full]  : res[i][opts.thumb];
                            arr[ci].html     = res[i][opts.html];
                            arr[ci].caption  = res[i][opts.caption];

                            if (res[ci][opts.active]) activeIndex = ci;
                            
                            if (update && collection.data) collection.splice(i, 1, arr[i]);
                            
                        } else {
                            n--;
                        }
                    }
                    return {arr: arr, arrLength: n, activeIndex: activeIndex}
                }
                
                function setActive (index) {
                    index = index === undefined && this !== undefined && this.$index !== undefined ? this.$index : index;

                    for (var i = 0, n = scope[attrs.ngModel].length; i < n; i++) {
                        scope[attrs.ngModel][i][opts.active] = index == i ? true : false;
                    }
                }
                scope.setActive = setActive;

                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    
                    if (oldVal !== newVal) {
                    
                        var oKeys = {}, nKeys = {}, i, oi, temp;

                        var oArr           = collection.data ? collection.data : [];
                        var o              = oArr.length,
                            oldActiveIndex = collection.activeIndex;

                        temp = makeFotoramaArray(newVal);
                        var nArr        = temp.arr,
                            n           = temp.arrLength,
                            activeIndex = temp.activeIndex;

                        if (o) {

                            for (i = 0; i < o; i++) {
                                oKeys[oArr[i].id] = i;
                            }
                            for (i = 0; i < n; i++) {
                                nKeys[nArr[i].id] = i;
                            }
                            for (i = 0, oi = 0; i < n; i++, oi++) {
                                
                                if (oArr[oi] === undefined) oArr[oi] = {id: null};
                                
                                if (nArr[i].id !== oArr[oi].id) {
                                
                                    if (oKeys[nArr[i].id] === undefined) {
                             
                                        collection.splice(i, 0, nArr[i]);
                                        oi--;
                                        console.log('+add')
                                    }
                                    
                                    if (oi >= 0 && nKeys[oArr[oi].id] === undefined) {

                                        if (oldActiveIndex == oi && activeIndex === undefined) activeIndex = i !== n ? i : i-2;
                                        collection.splice(i, 1);
                                        i--;
                                        console.log('-del')
                                    }

                                    if (i >= 0 && oKeys[nArr[i].id] !== undefined && nKeys[oArr[oi].id] !== undefined) {
                                    
                                        if ((oKeys[nArr[i].id] - oKeys[oArr[oi].id]) > (nKeys[oArr[oi].id] - nKeys[nArr[i].id])) {

                                            collection.splice(i, 0, nArr[i]);
                                            delete nKeys[nArr[i].id];
                                            oi--;
                                            console.log('add')
                                        } else {
                                
                                            collection.splice(i, 1);
                                            delete oKeys[oArr[oi].id];
                                            i--;
                                            console.log('del')
                                        }
                                    }
                                } else if (nArr[i].img !== oArr[oi].img) {
                              
                                    collection.splice(i, 1, nArr[i]);
                                    console.log('change')
                                }
                            }
                            
                            if (o > oi) collection.splice(n, o-(oi));
                            if (oldActiveIndex >= n && activeIndex === undefined) activeIndex = n-1;
      
                        } else if (n) {
                            collection.setOptions(opts).load(nArr).setOptions(scope[attrs.apFotorama]);
                        } 

                        if (n) activeIndex !== undefined ? collection.show(activeIndex) : collection.show(0);
                    }
                    
                }, true);

                scope.$watch(attrs.apFotorama, function (newVal, oldVal) {
                    angular.extend(opts, apFotoramaConfig, newVal);
                    collection.setOptions(opts)

                    angular.forEach(events, function (event) {
                        if (typeof opts[event] === 'function') {
                            element.bind('fotorama:' + event, function (e, fotorama, extra) {
                                opts[event](e, extra);
                            });
                        }
                    });
                  
                    if (newVal.thumb || newVal.img || newVal.full) {
                        makeFotoramaArray(scope[attrs.ngModel], true);
                    }
                }, true);

                collection = element.fotorama(opts).data('fotorama');
                
                scope[attrs.apFotorama] = angular.extend({}, collection.options, scope[attrs.apFotorama]);
            }
        };
      }
    ]);