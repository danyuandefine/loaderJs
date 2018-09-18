/**
 * Created by danyuan on 2018/8/3.
 */
loaderJs.define("$user",function($log,$event){
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