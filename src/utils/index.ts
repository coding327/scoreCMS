export const getWeekYear = () => {
  var time = new Date();
  var a = time.getFullYear();
  var b: any = time.getMonth() + 1;
  var c = time.getDate();

  var date1 = new Date(a, parseInt(b) - 1, c),
    date2 = new Date(a, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
};

export const AnnoTypes = [
  {
    label: "普通公告",
    value: 1,
    id: 1,
    color: "#123456",
  },
  {
    label: "紧急公告",
    value: 2,
    id: 2,
    color: "#f50",
  },
  {
    label: "重要公告",
    value: 3,
    id: 3,
    color: "#0f0",
  },
  {
    label: "置顶公告",
    value: 4,
    id: 4,
    color: "#bbbbbb",
  },
];
