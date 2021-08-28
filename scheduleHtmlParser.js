//str_sectionTimes 第1节(08:00-08:45)
function getSectionTimes(str_sectionTimes, index) {
    let sectionTimes = {};
    str_sectionTimes = (str_sectionTimes.replace("第", "")).replace("节(", " ");
    str_sectionTimes = (str_sectionTimes.replace("-", " ")).replace(")", "");
    let sec = str_sectionTimes.split(" ");
    //sectionTimes.section = Number(sec[0]);
    sectionTimes.section = index + 1;
    sectionTimes.startTime = sec[1];
    sectionTimes.endTime = sec[2];
    return sectionTimes;
}

//str_weeks 1-8周(单/双)
function getWeeks(str_weeks) {
    let weeks = [];
    let flag = 0;
    if (str_weeks.search("单") != -1) {
        flag = 1;
        str_weeks = str_weeks.replace("单", "");
    } else if (str_weeks.search("双") != -1) {
        flag = 2;
        str_weeks = str_weeks.replace("双", "");
    }
    str_weeks = str_weeks.replace("周", "");
    let startWeek = Number(str_weeks.split('-')[0]);
    let endWeek = Number(str_weeks.split('-')[1]);
    for (let i = startWeek; i <= endWeek; i++) {
        if (flag == 0) {
            weeks.push(i);
        } else if (flag == 1 && i % 2 == 1) {
            weeks.push[i];
        } else if (flag == 2 && i % 2 == 0) {
            weeks.push(i);
        }

    }
    return weeks;
}

//str_sections 1-2节
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

    $(html).find("tr").each(function (i) {
        let str_sectionTimes = $(this).find("th").last().text();
        sectionTimes.push(getSectionTimes(str_sectionTimes, i));
        $(this).find("td").each(function (j) {
            let class_divs = $(this).find("div.class_div");
            
            for (let k = 0; k < class_divs.length; k++) {
                let td_context = $(class_divs[k]).find("p");
                if (td_context.length != 0) {
                    let result = {};
                    result.name = td_context.eq(0).text();
                    if (result.name.search("毛泽东思想和中国特色社会主义理论体系概论") != -1)
                        result.name = result.name.replace("毛泽东思想和中国特色社会主义理论体系概论", "毛概")
                    result.teacher = td_context.eq(1).text();
                    let str_weeks = td_context.eq(2).text();
                    result.weeks = getWeeks(str_weeks);
                    let str_sections = td_context.eq(3).text();
                    result.sections = getSections(str_sections);
                    result.position = td_context.eq(4).text();
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