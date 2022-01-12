async function scheduleHtmlProvider() {

    // 此步为必须，用于加载这个工具，后续会增加更多方法
    await loadTool('AIScheduleTools')
    const { AIScheduleAlert } = AIScheduleTools()

    let courseTable;

    try {
        // 抓取课表
        courseTable = document.querySelector("#courseTableBody").outerHTML;

    } catch (e) {

        console.log(e);
        // 使用时务必带上await，否则没有系统alert的时停效果
        await AIScheduleAlert('未发现课程信息，请在课表页面点开始导入')
        return "do not continue";
    }

    return courseTable;
}