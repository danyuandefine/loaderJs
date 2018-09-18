/**
 * Created by danyuan on 2018/8/3.
 */
loaderJs.define("$regist",function($user,$event,$log){
    var self=this;
    self.setAccount=function(tAccount){
        self.account=tAccount;
    };
    var service={
        regist:function(){
            $log.debug("account[{0}] regist success !",self.account);
            $log.debug("account[{0}] auto login ......",self.account);
            $event.on("login",function(data){
                $log.debug("on login event account[{0}].",data.account);
            });
            $user.login(self.account);
        }
    };
    return service;
});