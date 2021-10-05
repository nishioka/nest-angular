import * as dayjs from 'dayjs';
import 'dayjs/locale/ja'
dayjs.locale('ja')

export const announcementData = {
  createDatas: [{
    authorEmployeeNo: '0001',
    content: '現在テスト中です(1)',
    date: dayjs('2021-10-01T00:00:00+09:00').toISOString(),
  }, {
    authorEmployeeNo: '9999',
    content: '現在テスト中です(2)',
    date: dayjs('2021-10-02T00:00:00+09:00').toISOString(),
  }],

  resultDatas: [{
    id: null,
    content: '現在テスト中です(1)',
    author: {
      employeeNo: '0001',
      name: '五十嵐 一典',
    },
    authorId: null,
    date: dayjs('2021-10-01T00:00:00+09:00').toISOString(),
  }, {
    content: '現在テスト中です(2)',
    author: {
      employeeNo: '9999',
      name: '管理者',
    },
    authorId: null,
    date: dayjs('2021-10-02T00:00:00+09:00').toISOString(),
  }]

}
