// 银行卡号省略号 显示前4位 和后4位
const bankFilter = (params) => {
  let reg = /^(.{4})(?:\d+)(.{4})$/;
  if (!params) return;
  return (params + '').replace(reg, '$1 **** **** $2');
};
// 银行卡尾号
const lastfource = (val) => {
  let str = val.toString();
  return str.substring(str.length - 4);
};
//保留两位有效数字
const twozero = (val) => {
  return parseFloat(val).toFixed(2)
};
// 手机号码中间四位数星号表示
const mobileFilter = mobile => {
  let reg = /^(.{3})(?:\d+)(.{4})$/;
  if (!mobile) return;
  return (mobile + '').replace(reg, '$1****$2');
};

// 身份证号前4与后4位星号表示
const personalCardId = id => {
  let reg = /^(.{4})(?:\d+)(.{4})/;
  if (!id) return;
  return (id + '').replace(reg, '$1**********$2');
};

// 两个日期之间的天数
const calcDaysFilter = (end, start) => {
  try {
    let startTime;
    let endTime = new Date(end.replace(/-/g, '/'));
    if (!start) {
      startTime = new Date();
    } else {
      startTime = new Date(start.replace(/-/g, '/'));
    }
    return parseInt((endTime - startTime) / (1000 * 60 * 60 * 24));
  } catch (err) {
  }
};
const statusText = (val) => {
  if(val==1) return '订单审核中，请耐心等待'
  else if(val==2) return '订单未审核，请耐心等待'
  else if(val==3 || val==12) return '很遗憾审核未通过'
  else if(val==4) return '订单已审核，请耐心等待放款'
}

export {
  lastfource,
  twozero,
  bankFilter,
  calcDaysFilter,
  mobileFilter,
  personalCardId,
  statusText
};
