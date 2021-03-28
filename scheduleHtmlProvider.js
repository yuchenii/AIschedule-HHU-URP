function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //除函数名外都可编辑
    //以下为示例，您可以完全重写或在此基础上更改
    
    //let courseTable = (document.getElementById("mainDIV")).querySelector("#courseTableBody");
    let courseTable = document.querySelector("#courseTableBody");
    let result = courseTable.outerHTML;
    console.info(result);
    return result;
}