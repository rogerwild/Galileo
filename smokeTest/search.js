amkTest('[优酷iPad冒烟测试]搜索',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        var currentPageElement = UIAPage.currentPageElement();
        UIALogger.logMessage('获取&点击搜索框');
        var searchTextField = currentPageElement.withName('searchLeft@2x');
        searchTextField.tap();
        target.delay(2.0);
        UIALogger.logMessage('输入 小猪佩奇');
        app.keyboard().typeString('小猪佩奇');
        UIALogger.logMessage('点击键盘 搜索');
        app.keyboard().tapReturnKey();
        target.delay(2.0);

        currentPageElement = UIAPage.currentPageElement();
        var siftButton = currentPageElement.withName('筛选');
        assertTrue(siftButton.isVisible(), '没有发现搜索结果页的[筛选]按钮');
        UIALogger.logMessage('成功进入搜索结果页');
        target.captureScreenWithName('搜索结果页.png');

        
});

