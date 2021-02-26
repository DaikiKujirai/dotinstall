'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();　// 今年
  let month = today.getMonth();　// 今月

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    // 前月の末日
    const n = new Date(year, month, 1).getDay();
    // 前月の末日の曜日

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
      // 前月の末日の曜日から日曜日までループして遡る
    }
    return dates;
  }

  function getCalendarBody() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() -  1].isToday = true;
    };
    // 今日だけ太字

    return dates;
  }
  
  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();
    // 今月の末日

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
        // 薄くするかどうか
      });
      // 今月の末日から次の土曜日までのループ
    }
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
     // tbodyの最初の要素がある限り、tbodyの最初の要素を削除する
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
    // 年/月(month + 1)
    // padStartは文字列にしか使えない
    // 2ケタで表示してね、それに満たなかったら'0'をつけてね
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;
    // １週間　１ヶ月の日にち/７日

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0,7));
      // １週間を日付があるだけループを回す
      // １週間とったら配列からその分削除しながら
    }
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });

  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });

  createCalendar();

}