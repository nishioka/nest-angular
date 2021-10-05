import * as dayjs from 'dayjs';
import 'dayjs/locale/ja'
dayjs.locale('ja')

export const userData = {
  createDatas: [{
    name: '岡崎 真里',
    employeeNo: '0003',
    email: 'm.okazaki@test.co.jp',
    password: 'test',
  }, {
    name: '後藤 兵吉',
    employeeNo: '0004',
    email: 'h.gotou@test.co.jp',
    password: 'test',
  }, {
    name: '五十嵐 一典',
    employeeNo: '0001',
    email: 'k.igarashi@test.co.jp',
    password: 'test',
  }, {
    name: '広田 亜里香',
    employeeNo: '0002',
    email: 'a.hirota@test.co.jp',
    password: 'test',
  }, {
    name: '管理者',
    employeeNo: '9999',
    email: 'admin@test.co.jp',
    password: 'admin',
  }],

  resultDatas: [{
    id: null,
    employeeNo: "0001",
    name: "五十嵐 一典",
    email: "k.igarashi@test.co.jp",
  }, {
    id: null,
    employeeNo: "0002",
    name: "広田 亜里香",
    email: "a.hirota@test.co.jp",
  }, {
    id: null,
    employeeNo: "0003",
    name: "岡崎 真里",
    email: "m.okazaki@test.co.jp",
  }, {
    id: null,
    employeeNo: "0004",
    name: "後藤 兵吉",
    email: "h.gotou@test.co.jp",
  }, {
    id: null,
    employeeNo: "9999",
    name: "管理者",
    email: "admin@test.co.jp",
  }]

}
