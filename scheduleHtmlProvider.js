function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //除函数名外都可编辑
    //以下为示例，您可以完全重写或在此基础上更改

    // 抓取课表
    let courseTable = document.querySelector("#courseTableBody");
    return courseTable.outerHTML;
}