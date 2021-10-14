// str_sectionTimes 第1节(08:00-08:45)
function getSectionTimes(str_sectionTimes, index) {
    let sectionTimes = {};
    str_sectionTimes = (str_sectionTimes.replace("第", "")).replace("节(", " ");
    str_sectionTimes = (str_sectionTimes.replace("-", " ")).replace(")", "");
    let sec = str_sectionTimes.split(" ");
    // sectionTimes.section = Number(sec[0]);
    sectionTimes.section = index + 1;
    sectionTimes.startTime = sec[1];
    sectionTimes.endTime = sec[2];
    return sectionTimes;
}

// str_weeks
// 1-8周
// 1-9,11-18周
// 1-5,7,10,13-18周 可能会有
// 1-8周单/双 其他学校有这样的
function getWeeks(str_weeks) {
    let weeks = [];

    // 逗号分隔遍历周次
    str_weeks.split(',').forEach(function (item) {
        // 单双周
        let flag = 0;
        if (item.search("单") != -1) {
            flag = 1;
            item = item.replace("单", "");
        } else if (item.search("双") != -1) {
            flag = 2;
            item = item.replace("双", "");
        }

        item = item.replace("周", "");

        let startWeek = 1;
        let endWeek = 0;

        // 单周
        if (item.split('-').length > 1) {
            startWeek = Number(item.split('-')[0]);
            endWeek = Number(item.split('-')[1]);
        } else {
            weeks.push(Number(item))
        }

        for (let i = startWeek; i <= endWeek; i++) {
            if (flag == 0) {
                weeks.push(i);
            } else if (flag == 1 && i % 2 == 1) {
                weeks.push(i);
            } else if (flag == 2 && i % 2 == 0) {
                weeks.push(i);
            }

        }
    });
    return weeks;
}

// str_sections 1-2节
function getSections(str_sections) {
    let sections = [];
    str_sections = str_sections.replace("节", "");
    let startSection = Number(str_sections.split("-")[0]);
    let endSection = Number(str_sections.split("-")[1]);
    for (let i = startSection; i <= endSection; i++) {
        sections.push({
            section: i
        });
    }
    return sections;
}

// 解析课表
function parseHtml(html) {
    let sectionTimes = [];
    let courseInfos = [];

    // 遍历 tr
    $(html).find("tr").each(function (i) {
        // 每节课的时间
        let str_sectionTimes = $(this).find("th").last().text();
        sectionTimes.push(getSectionTimes(str_sectionTimes, i));

        // 遍历 td
        $(this).find("td").each(function (j) {
            // 一个 td 里可能有多节课
            let class_divs = $(this).find("div.class_div");
            // 遍历每一节课
            for (let k = 0; k < class_divs.length; k++) {
                let td_context = $(class_divs[k]).find("p");
                if (td_context.length != 0) {
                    let result = {};
                    // 课程名
                    result.name = td_context.eq(0).text();
                    // 名字太长，简写
                    if (result.name.search("毛泽东思想和中国特色社会主义理论体系概论") != -1)
                        result.name = result.name.replace("毛泽东思想和中国特色社会主义理论体系概论", "毛概")
                    // 老师
                    result.teacher = td_context.eq(1).text();
                    // 周次
                    let str_weeks = td_context.eq(2).text();
                    result.weeks = getWeeks(str_weeks);
                    // 节次
                    let str_sections = td_context.eq(3).text();
                    result.sections = getSections(str_sections);
                    // 教室
                    result.position = td_context.eq(4).text();
                    // 星期
                    result.day = j + 1;
                    courseInfos.push(result);
                }
            }
        })
    })

    return {
        sectionTimes: sectionTimes,
        courseInfos: courseInfos
    }
}

function scheduleHtmlParser(html) {

    let result = parseHtml(html);
    console.info(result);
    return result;
}