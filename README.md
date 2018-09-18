        
        文档详细地址请移步：http://www.danyuanblog.com/blog/app/tools/resDetail.html?id=5b9ba8c3d4c6515776bca70f
        
        随着H5的应用领域逐渐拓展，由于原生JavaScript的精简、自由以及灵活性，使得很多中小型研发团队无法迅速搭建一套可靠好用的应用框架。
      因此，很多大公司和牛人都自研了一些前端框架，应用比较广泛的就有requirejs、seajs，当然也有一些打包工具grunt、webpack之类的也
      提供了部分类似功能，从这些框架和工具的使用后，虽然解决了我很多的问题，但是仍然非常繁琐，比如说requirejs推崇的是预加载、而seajs
      推荐的是懒加载，而其他工具只是打包合并支援而已，而且requirejs和seajs的配置是相当繁琐的。
        故此，本人决心要研发一套方便好用的H5前端模块化工具，他的目标是：支持预加载、延迟加载、模块加载、资源加载、模块依赖自动管理、
      轻量、简单。经过半个多月的思考及摸索，我终于完成了loaderJs的首个版本，功能大致都实现了，于是乎，我将此框架应用到了我手头上的项目，
      也就是“淡远文摘”博客平台项目中，期间也发现了不少loaderJs的小bug，不过这些都被解决了，目前用起来还是非常的得心应手，模块依赖管理，
      配置都非常方便，大家有空可以查阅本博客的前端代码，很多服务模块都未压缩，用这个框架极大的压缩了我的开发时间，整个博客平台从由我个人
      开始构建到初版构建完成耗时一个月左右，还包括后端服务器的搭建、编码，以及第三方平台的接入、例如微信公众号、新浪微博、腾讯qq互联的接入。
      所以我从一个开发者的角度，是极力推荐该框架的。
        该框架从设计之初，我便决心免费提供给大家使用，希望与大家一同进步，让我们拥有越来越好用的开发工具，解决我们程序员的痛苦，我为此框架取名为
    “LoaderJs”，希望大家喜欢。
  以下是使用示例：
    1、引入模块示例：   

<script src="../loaderJs.min.js"></script>
    2、模块配置信息示例：
    

loaderJs.config({
    openVersion:true,//打开版本控制，用于生产清理缓存文件
    version:'1.0.7',//资源版本号
    baseDir:"moduleLoader/test",//站点根路径
    debug:true,//调试开关，用于跟踪模块加载清空
   // logLevel:LOG_LEVELS.DEBUG,
    preload:{//预加载配置信息
        //syncLoad:false,//是否串行加载，默认异步，效率高,只对非标准模块脚本生效
        modules:[//需要预加载的模块名列表,自动解析模块之前依赖关系，按其依赖关系顺序引入相关模块
            "user","jq"
        ],
        urls:[//其他非标准文件加载，不能省略后缀名
            //非标准模块css脚本的预加载
            "base/bootstrap.min.js"
            //,"base/wow.min.js"
            //非标准模块js脚本的预加载
            //,"base/bootstrap.min.css"
            ,"base/animate.min.css"
            //非标准模块图片、字体等其他资源的预加载
            ,"base/dream.png"
            ,"base/winner.png"
        ]
    },
    modules:[//约定为文件名和模块名一致,后缀.js可以省略
        "admin/login",
        "admin/a.js",
        "user.js",
        "regist/regist.js"
    ],
    moduleBundles:[//打包后的模块集合压缩脚本文件
            {
                includes:["a","b"],//包含的模块声明
                url:"test.bundle.js"
            }
    ],
    resolves:{
        "useraa":{//给模块起别名
            url:"user1.js"
        },
        "jq":{//加载非标准模块
            url:"base/jquery.min.js",
            exports:"jQuery"
        }
    }
});
    3、模块预初始化    

loaderJs.config(function($user){//为模块设置初始化参数
    $user.setNickName("小明");
});
    4、模块的定义

//1、此方式定义模块，不影响生产代码压缩处理
loaderJs.define("$user",["$log","$event"],function($log,$event){
    var self=this;
    self.setNickName=function(tNickName){
        this.nickName=tNickName;
    };
    var service={
        login:function(account){
            account=account||self.nickName;
            $log.debug("user {0} login success !",account);
            $event.broadcast("login",{account:account});
        },
        logout:function(){
            $log.debug("user {0} logout success !",self.nickName);
        }
    };
    return service;
});
//2、此方式定义模块，书写简单，但不可压缩，因为压缩后形参名有变化
loaderJs.define("$user",["$log","$event"],function($log,$event){
    var self=this;
    self.setNickName=function(tNickName){
        this.nickName=tNickName;
    };
    var service={
        login:function(account){
            account=account||self.nickName;
            $log.debug("user {0} login success !",account);
            $event.broadcast("login",{account:account});
        },
        logout:function(){
            $log.debug("user {0} logout success !",self.nickName);
        }
    };
    return service;
});
    5、模块的使用

//1、此方式引用模块，不影响生产代码压缩处理
loaderJs.require(["$user","$jq","$loader","$log"],function($user,$,$loader,$log){
    $.get("login.json",function(data){
        $user.login(data.name);
        $loader.load(["base/wow.min.js"
            //非标准模块js脚本的预加载
            //,"base/bootstrap.min.css"
        ],function(){
            $log.debug("$loader load urls success !");
        });
    });
 
});
//2、此方式引用模块，书写简单，但不可压缩，因为压缩后形参名有变化
loaderJs.require(function($user,$jq,$loader,$log){
    $jq.get("login.json",function(data){
        $user.login(data.name);
        $loader.load(["base/wow.min.js"
            //非标准模块js脚本的预加载
            //,"base/bootstrap.min.css"
        ],function(){
            $log.debug("$loader load urls success !");
        });
    });
});
    6、框架预置模块

    （1、$log服务

        提供方法有：trace、debug、info、warn、error

        示例：

loaderJs.config({
    baseDir:"",//站点根路径
    debug:true,//是否打印trace日志,loaderJs框架模块加载日志都是以trace方式打印的
    logLevel:LOG_LEVELS.DEBUG//日志打印级别,DEBUG,INFO, WARN,ERROR共四个级别
});
loaderJs.require(["$log"],function($log){
    var name='loaderJs';
    //可以传参替换占位符
    $log.trace("hello {0} , {1} .",name,"pretty good");
    $log.debug("hello {0} .",name);
    $log.info("hello {0} .",name);
    $log.warn("hello LoaderJs .");
    $log.error("hello LoaderJs .");
});
    结果如下：

image.png

    （2、$utils服务
        提供的方法有：        

        extend //对象继承

        testType //类型检查

        isBaseType //基本类型检查

        isObjectType //是否是对象类型

        isArrayType //是否是数组类型

        isFunctionType //是否是方法类型

        getFnArgumentsList //获取方法形参名列表

        timestamp           //获取当前时间或者传入时间字符串的时间戳，不传参默认返回当前时间的时间戳

        parseTimestampDay   //格式化时间字符串 'yyyy-MM-dd'

        parseTimestampSecond //同上 'yyyy-MM-dd hh:mm:ss'

        parseTimestampMillis //同上 'yyyy-MM-dd hh:mm:ss `SSS'

  (3、$event事件服务,可以用来广播事件或监听事件

      提供的方法有

/**
 * 添加事件监听器
 * @param eventName 事件名
 * @param fn 回调方法
 * @param once 监听次数,默认为空代表一直监听
 */
on:function(eventName,fn,once){}
/**
 * 移除事件监听器
 * @param eventName 事件名
 * @param fn 回调方法引用
 */
off:function(eventName,fn){}
/**
 * 广播事件
 * @param eventName 事件名
 * @param data 需要传递的数据
 * @returns {loaderJs}
 */
broadcast:function(eventName,data){}
    （4、$loader服务,用来加载
        提供的方法有

/**
 * 用来加载脚本和资源
 * @param urls 脚本url地址或者URL地址数组
 * @param callback 加载完成后的回调方法
 * @param seq 是否要求按序加载，默认为无序，bool类型
 */
load:function(urls,callback,seq){}
    7、loaderJs暴露的接口如下
    (1、配置系统参数或模块初始化参数：   

    eg.配置系统参数:
     loaderJs.config({
        baseDir:"moduleLoader/test",//站点根路径
        debug:true,
       // logLevel:LOG_LEVELS.DEBUG,
        preload:{//预加载配置信息
            //syncLoad:false,//是否串行加载，默认异步，效率高,只对非标准模块脚本生效
            modules:[//需要预加载的模块名列表,自动解析模块之前依赖关系，按其依赖关系顺序引入相关模块
                "user","jq"
            ],
            urls:[//其他非标准文件加载，不能省略后缀名
                //非标准模块css脚本的预加载
                "base/bootstrap.min.js"
                //,"base/wow.min.js"
                //非标准模块js脚本的预加载
                //,"base/bootstrap.min.css"
                ,"base/animate.min.css"
                //非标准模块图片、字体等其他资源的预加载
                ,"base/dream.png"
                ,"base/winner.png"
            ]
        },
        modules:[//约定为文件名和模块名一致,后缀.js可以省略
            "admin/login",
            "admin/a.js",
            "user.js",
            "regist/regist.js"
        ],
        moduleBundles:[//打包后的模块集合压缩脚本文件
                {
                    includes:["a","b"],//包含的模块声明
                    url:"test.bundle.js"
                }
        ],
        resolves:{
            "useraa":{//给模块起别名
                url:"user1.js"
            },
            "jq":{//加载非标准模块
                url:"base/jquery.min.js",
                exports:"jQuery"
            }
        }
    });
    eg.配置模块初始化参数
    loaderJs..config(function($user){//为模块设置初始化参数
        $user.setNickName("小明");
    });
        (2、预加载模块和资源初始化成功后回调success        

    /**    
     * 系统模块预加载完毕后调用，在所有require调用之前执行
     * @param dependencies 需要哪些模块
     * @param init 初始化成功回调方法
     * @returns {loaderJs}
     */
    success:function(dependencies,init){}
        (3、js对象继承方法：extend        

    /**    
     * 对象继承
     * @param obj 原参数对象
     * @param opts 新参数对象
     * @returns {*}
     */
    extend:function(obj,opts){}
        （4、定义模块方法：define        

    /**    
     * 定义模块方法
     * @param moduleId 模块id 必填
     * @param dependencies 模块需要引用的依赖模块Id数组，eg.["$config","$user"]，可选(如果不需要压缩，可根据形参名确定引用模块)
     * @param init 模块初始化方法
     */
    define:function(moduleId,dependencies,init){}
        (5、引用模块方法        

    /**    
     * 引用模块，框架会自动注入需要引用的模块到回调方法里
     * @param dependencies 需要引用的模块名数组列表，可选(如果不需要压缩，可根据形参名确定引用模块)
     * @param init 回调方法
     * @returns {loaderJs}
     */
    require:function(dependencies,init){}
