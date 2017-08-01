amkTest('[优酷iPad冒烟测试]我的',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        UIALogger.logMessage('进入我的模块');
        target.tap({x:694, y:701});
        target.delay(2.0);
        target.captureScreenWithName('我的模块.png');

        var currentPageElement = UIAPage.currentPageElement();
        currentPageElement.withName('mtoux').tap();
        UIALogger.logMessage('登录游客');
        currentPageElement.withName('游客登录').tap();
        target.delay(2.0);
        target.captureScreenWithName('登录游客.png');
        UIAPage.currentPageElement().withName('退出登录').tap();
        target.delay(2.0);

        var alert = app.alert();
        alert.dismissWithButtonAtIndex(1);
        target.delay(2.0);

        currentPageElement = UIAPage.currentPageElement();
        UIALogger.logMessage('进入记录页');
        currentPageElement.withName('记录').tap();
        target.delay(2.0);
        target.captureScreenWithName('记录.png');

        UIALogger.logMessage('进入收藏页');
        currentPageElement.withName('收藏').tap();
        target.delay(2.0);
        target.captureScreenWithName('收藏.png');
        
        UIALogger.logMessage('进入缓存页');
        currentPageElement.withName('缓存').tap();
        target.delay(2.0);
        target.captureScreenWithName('缓存.png');

        UIALogger.logMessage('进入消息页');
        currentPageElement.withName('消息').tap();
        target.delay(2.0);
        target.captureScreenWithName('消息.png');

        UIALogger.logMessage('进入上传页');
        currentPageElement.withName('上传').tap();
        target.delay(2.0);
        target.captureScreenWithName('上传.png');

        UIALogger.logMessage('进入客服页');
        currentPageElement.withName('客服').tap();
        target.delay(2.0);
        target.captureScreenWithName('客服.png');

        UIALogger.logMessage('进入设置页');
        currentPageElement.withName('设置').tap();
        target.delay(2.0);
        target.captureScreenWithName('设置.png');




        



});
