function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //除函数名外都可编辑
    //以下为示例，您可以完全重写或在此基础上更改

    let frs = dom.getElementsByTagName("frame")[1];
    let fr = frs.contentDocument.getElementsByTagName("frame")[2];
    let htl = fr.contentDocument.querySelector("html");
    let tby = htl.getElementsByClassName("displayTag")[1].querySelector("tbody");
    let trs = tby.querySelectorAll("tr");
    let result = [];
    let ke = [0, 1, 3, 6, 8, 10];

    for (let u = 0; u < trs.length; u++) {
        let tds = trs[u].querySelectorAll("td")
        let re = {
            name: null,
            position: null,
            teacher: null,
            weeks: [],
            day: null,
            sections: []
        }
        if (tds[tds.length - 1].innerHTML != "&nbsp;") {

            f1(tds, re);
            re = {
                name: null,
                position: null,
                teacher: null,
                weeks: [],
                day: null,
                sections: []
            }
            for (let i = 0; i < tds[0].rowSpan - 1; i++) {
                u++;
                let tds1 = trs[u].querySelectorAll("td");
                f2(tds, tds1, re);
                re = {
                    name: null,
                    position: null,
                    teacher: null,
                    weeks: [],
                    day: null,
                    sections: []
                }
            }

        }

    }

    function f1(tds, re) {

        re.name = tds[2].innerText.replace(/\s+/g, "");
        re.position = tds[15].innerText.replace(/\s+/g, "") + tds[16].innerText.replace(/\s+/g, "") + tds[17].innerText.replace(/\s+/g, "")
        re.teacher = tds[7].innerText.replace(/\s+/g, "");

        let week = tds[11].innerText.split('周')[0];
        let startweek = Number(week.split('-')[0]);
        let endweek = Number(week.split('-')[1]);
        for (let i = startweek; i <= endweek; i++) {
            re.weeks.push(i);
        }

        re.day = Number(tds[12].innerText.replace(/\s+/g, ""));

        let startsection = ke[Number(tds[13].innerText)];
        let sectimes = Number(tds[14].innerText);
        for (let i = 0; i < sectimes; i++) {
            re.sections.push({
                section: startsection
            });
            startsection++;
        }
        result.push(re);

    }

    function f2(tds, tds1, re) {

        re.name = tds[2].innerText.replace(/\s+/g, "");
        re.position = tds1[4].innerText.replace(/\s+/g, "") + tds1[5].innerText.replace(/\s+/g, "") + tds1[6].innerText.replace(/\s+/g, "")
        re.teacher = tds[7].innerText.replace(/\s+/g, "");

        let week = tds1[0].innerText.split('周')[0];
        let startweek = Number(week.split('-')[0]);
        let endweek = Number(week.split('-')[1]);
        for (let i = startweek; i <= endweek; i++) {
            re.weeks.push(i);
        }

        re.day = Number(tds1[1].innerText.replace(/\s+/g, ""));

        let startsection = ke[Number(tds1[2].innerText)];
        let sectimes = Number(tds1[3].innerText);
        for (let i = 0; i < sectimes; i++) {
            re.sections.push({
                section: startsection
            });
            startsection++;
        }
        result.push(re);
    }



    let sectiontimes = [{
        section: 1,
        startTime: "08:00",
        endTime: "08:45"
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
    }]
    let res = {
        courseInfos: [],
        sectiontimes: []
    }
    res.courseInfos = result
    res.sectiontimes = sectiontimes
    console.info(res);
    return JSON.stringify(res);


}