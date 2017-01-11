/**
 * Created by huqiwen on 16/9/5.
 *  index Js
 */

//requireJs 设置
require.config({
    paths: {
        "jquery": "../../bower_components/jquery/dist/jquery.min",
        "bootstrap": "../../bower_components/bootstrap/dist/js/bootstrap.min",
        "vue": "../../bower_components/vue/dist/vue",
        "Util": "../../common/js/util",
        "tmp" : "../../common/js/tmp"
    },
    shim : {
        bootstrap : {
            deps : [ 'jquery' ],
            exports : 'bootstrap'
        }
    }
});


//学校信息
var schoolUrl = "common/json/school.json";

//统计
//var tongji = "http://xx.com/index.php?app=Pufinance&mod=SchoolVote&act=pv";

//数据
//var info = "http://xx.com/index.php?app=Pufinance&mod=SchoolVote&act=stat";
var info = "common/json/data.json";

//投票
var voteUrl = "common/json/vote.json";

//搜索结果
var SearchResult = "common/json/SearchResult.json";

//requireJs
require(['jquery' ,'vue', 'Util','bootstrap'], function ($, Vue, util,bootstrap) {
    var index = new Vue({
        el: '#beautiful',
        data: {
            school : [],
            info : {},
            vote:{},
            search: [],
            searchRecord: [],
            isSearch: false,
            Searched: false,
            isEmpty: false,
            inputValue: '',
            error:""
        },
        methods: {
            init: function () {
            	var _self = this;
                
                //统计
//              new util.Ajax(tongji, {}, false, {}).get();

                //统计的数据
               this.info = new util.AjaxVue(info, {}, false, {}).getobj();

                //学校列表
                var schoolList = new util.PullToRefresh(schoolUrl);
                //获取首页list
                schoolList.initList(this.school, {});
                //绑定滚动事件
                schoolList.scrollBottom(this.school, $(".index_loading_flag"));
            },
            goSchool : function (sid) {
                window.location.href = 'school.html?sid=' + sid;
            },
            follow : function(dom){
                console.log($(".footer_Follow").data("client"));
                if($(".footer_Follow").data("client") =="app"){
                    $("#Followtips").modal('show');
                }else if($(".footer_Follow").data("client") =="wechat"){
                    window.location.href = 'follow.html';
                }

            },
             clearRecord: function () {
                this.searchRecord = [];
            },
            clear: function () {
                this.inputValue = '';
                this.isSearch = false;
                this.Searched = false;
                this.isEmpty = false;
            },
            getFocus: function () {
                this.isSearch = true;
                this.Searched = false;
                this.isEmpty = false;
            },
            SearchFromRecord: function (id, name, index) {
                this.inputValue = name;
                this.Searched = true;
                doSearch({content: ''});
            },
            SearchEnter: function () {
                if(this.inputValue==''){

                }else{
                    this.Searched = true;
                    doSearch({content: ''});
                }

            },
            voteSchool : function (sId,index) {
                var _self = this.school;
                $.ajax({
                    dataType:"json",
                    type: 'get',
                    url: voteUrl,
                    data: {sid:sId },
                    async: false,
                    success: function (data) {
                        if(data.status == 0 && data.info==""){
                            $(".two").show();$(".success").hide();$(".error").hide();
                            $('#tips').modal('show');
                        }else if(data.status == 1){
                            _self[index].votes = data.data.votes;
                            $(".two").hide();$(".success").show();$(".error").hide();
                            $('#tips').modal('show');
                            setTimeout(function () {
                                $('#tips').modal('hide');
                            },1500);
                        }else if(data.status == 0 && data.info != ""){
                            $(".error").html(data.info);
                            $(".two").hide();$(".success").hide();$(".error").show();
                            $('#tips').modal('show');
                            setTimeout(function () {
                                $('#tips').modal('hide');
                            },1500);
                        }
                    },
                    beforeSend: function () {
                    },
                    complete: function () {
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                        console.log(errorThrown + "  " + textStatus + "  " + XMLHttpRequest);
                    }
                });
            }
        },
        computed: {},
        watch: {
        }
    });
    
     //input输入监听
    $('#searchInput').bind('input propertychange', function() {
        index.inputValue = $(this).val().trim();
        if (index.inputValue == '') {
            index.isSearch = false;
            index.Searched = false;
            index.isEmpty = false;
        } else {
            index.isSearch = true;
            index.Searched = false;
            index.isEmpty = false;
        }
    });

    function doSearch(data) {
        index.search = [];
        $.ajax({
            type: "GET",
            url: SearchResult,
            data: data,
            async: false,
            success: function (data) {
                var _length = data.data.list.length;
                if (!_length > 0) {
                    for (var i = 0; i < _length; i++) {
                        index.search.push(data.data[i]);
                    }
                } else {
                    index.isEmpty = true;
                }

                if (index.searchRecord.length !== 0) {
                    if (index.searchRecord[0].Record !== 'index.inputValue') {
                        if (index.searchRecord.length < 8) {
                            index.searchRecord.unshift({"Id": "2", "Record": index.inputValue});
                        } else {
                            index.searchRecord.pop();
                            index.searchRecord.unshift({"Id": "2", "Record": index.inputValue});
                        }
                    }
                } else {
                    index.searchRecord.unshift({"Id": "2", "Record": index.inputValue});
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    
    //页面初始化
    index.init();
    
});

