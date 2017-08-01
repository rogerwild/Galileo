amkTest('[优酷iPad冒烟测试]播放',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        var currentPageElement = UIAPage.currentPageElement();
        UIALogger.logMessage('获取&点击精选页轮播图');
        var scrollView = currentPageElement.scrollViews()[0];
        scrollView.tap();
        target.delay(2.0);

        currentPageElement = UIAPage.currentPageElement();
        var collectButton = currentPageElement.withLabel('收藏');
        assertTrue(collectButton.isVisible(), '没有发现播放页的[收藏]按钮');
        UIALogger.logMessage('成功进入播放页');

        
});
