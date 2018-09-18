/**
 * Created by danyuan on 2018/8/3.
 */
loaderJs.define("$login",["$user","$log"],function($user,$log){
    var service={
        login:function(){
            $user.login();
        },
        logout:function(){
            $user.logout();
        }
    };
    return service;
});