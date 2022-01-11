/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer() {
    // 内嵌loadTool工具，传入工具名即可引用公共工具函数(暂未确定公共函数，后续会开放)
    // await loadTool('AIScheduleTools')
    // const {
    //     AIScheduleAlert
    // } = AIScheduleTools()
    // 只要大声喊出 liuwenkiii yyds 就可以保你代码不出bug
    // await AIScheduleAlert('请依次点击【选课管理】->【本学期课表】，\n等课表加载出来后再点击右下角一键导入')
    // 支持异步操作 推荐await写法
    // const someAsyncFunc = () => new Promise(resolve => {
    //     setTimeout(() => resolve(), 100)
    // })
    // await someAsyncFunc()

    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return {
        totalWeek: 25, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: false, // 是否显示周末
        forenoon: 5, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 3, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
            section: 1, // 节次：[1, 30]之间的整数
            startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '08:45', // 结束时间：同上
        }, {
            section: 2,
            startTime: "08:50",
            endTime: "09:35"
        }, {
            section: 3,
            startTime: "09:50",
            endTime: "10:35"
        }, {
            section: 4,
            startTime: "10:40",
            endTime: "11:25"
        }, {
            section: 5,
            startTime: "11:30",
            endTime: "12:15"
        }, {
            section: 6,
            startTime: "14:00",
            endTime: "14:45"
        }, {
            section: 7,
            startTime: "14:50",
            endTime: "15:35"
        }, {
            section: 8,
            startTime: "15:50",
            endTime: "16:35"
        }, {
            section: 9,
            startTime: "16:40",
            endTime: "17:25"
        }, {
            section: 10,
            startTime: "18:30",
            endTime: "19:15"
        }, {
            section: 11,
            startTime: "19:20",
            endTime: "20:05"
        }, {
            section: 12,
            startTime: "20:10",
            endTime: "20:55"
        }], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
    // PS: 夏令时什么的还是让用户在夏令时的时候重新导入一遍吧，在这个函数里边适配吧！奥里给！————不愿意透露姓名的嘤某人
}