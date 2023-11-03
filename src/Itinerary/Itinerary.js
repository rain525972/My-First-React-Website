import React, { useState, useEffect, useCallback } from 'react';
import './itinerary.css';
import { Badge, Calendar, Modal, Form, Input, Button, Switch,Select } from 'antd';
import {GrSubtractCircle} from 'react-icons/gr'
import axios from 'axios';

// const initialDataList = [
//   {
//     year: 2021,
//     month: 9,
//     date: 8,
//     data: [
//       {
//         type: 'success',
//         content: 'This is usual event.',
//       },
//     ],
//   },
//   {
//     year: 2021,
//     month: 9,
//     date: 10,
//     data: [
//       {
//         type: 'success',
//         content: 'This is usual event.',
//       },
//       {
//         type: 'error',
//         content: 'This is error event.',
//       },
//     ],
//   },
//   {
//     year: 2022,
//     month: 3,
//     date: 8,
//     data: [
//       {
//         type: 'success',
//         content: 'This is usual event.',
//       },
//     ],
//   },
//   {
//     year: 2022,
//     month: 3,
//     date: 10,
//     data: [
//       {
//         type: 'success',
//         content: 'This is usual event.',
//       },
//       {
//         type: 'error',
//         content: 'This is error event.',
//       },
//     ],
//   },
// ];



export default function Itinerary() {
  const [dataList, setDataList] = useState([]);//全部數據
  const [selectedDate, setSelectedDate] = useState(null);//選定單個日期的數據(或可以這樣寫const [selectedDate, setSelectedDate] = useState({ date: null, data: [] });)
  const [modalVisible, setModalVisible] = useState(false);//視窗是否顯示
  // const [forceRefresh, setForceRefresh] = useState(false);//是否強制重新渲染
  const [form] = Form.useForm();//這裡的[form]裡的form跟Form組件裡的form={form}的{}裡的form一樣 

  useEffect(() => {
    const authToken = "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwZSI6IkpXRSIsInppcCI6IkRFRiJ9.ecNmUM_1j57qtFwKNAGe9DeEVwvQBUTEFdT5M8sASNVrqoUw5sUG1QkhEvw86Wt-WMzkxf9FCoR2VJ8oYbkstRLc8itZuzfMqyHYEnCpOoO7nPfNxHJ243NLDGT3LmdTbCAO0TKHHZA1S5iFhlrUTRfOXlJWkLyE1DvWQG_l8Y_T5J-1A9QHg5Hx_bOEyKVBQ0nqr8-yXJbGyp6NrG8WtPhfb1T9M_pT3Kx0wjKTMYpFoYz1stQkZtb-tT0OFMLuLyXeM1sKmqd5EqJr8b8NmIJBDtFWDki9F1R-oFXMqg3AkczTQBnhRgysh6qLtT5nwQaNhdaSOa4kXCKRRvQCcQ.hr4FiWpNlipejVypbj_-dw.pXmqKasbNyFwccDAcxEvvoZjbwqWIVnkFf8xfiCGFIgXWso9C-FjbetVrRmsZWc-nxYNh9k6eAtEtQJJ7wJyN144yaqIb_knMS4Tvtdv-GAG32VtOIKcvbVJfIOTRXq_Qg603rtf8lVsPUzng6wSC744bdKjq9AcVLXnvY7hiACvydyIEy7xvPkTjOc2YVfK.MTAG2MFMySHKEiDUvroyBc9Um1e74p2NXpFbg372HLA";
    localStorage.setItem("authToken", authToken);
    const storedAuthToken = localStorage.getItem("authToken");
  
    axios.get('http://localhost:8080/mom/web/v1.0/account?limit=20&page=1', {
      headers: {
        'Authorization': storedAuthToken
      }
    })
    .then(response => {
      console.log(response.data);
      const accounts = response.data.body.accounts;
      accounts.forEach(account => {
        Object.keys(account).forEach(key => {
          // Do something with the account data here
          console.log(`${key}: ${account[key]}`);
        });
      });
      const updatedDataList = response.data.body.accounts.map(account => ({
        year: account.year,
        month: account.month,
        date: account.date,
        data: [
          {
            type: account.type,
            content: account.content,
          },
        ],
      }));
      console.log(updatedDataList);
      setDataList(updatedDataList);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const cellRender = (current) => {
    const listData = dataList.find((item) => item.year === current.year() && item.month === current.month() + 1 && item.date === current.date());
    if (!listData) return null;
    return (
      <div>
        {listData.data.map((item, index) => (
          <Badge key={index} status={item.type} text={item.content} />
        ))}
      </div>
    );
  };

  const handleFormSubmit = useCallback((values, form) => {
    console.log(form)
    const type = values.priority ? 'error' : 'success';
    const content = values.content;
    const existingDateIndex = dataList.findIndex((item) => item.date === selectedDate.date);
    if (existingDateIndex > -1) {
        const updatedDataList = dataList.map((item) =>
            item.date === selectedDate.date ? { ...item, data: [...item.data, { type, content }] } : item
        );
        setDataList(updatedDataList);
        const updatedSelectedDate = { ...selectedDate, data: [...selectedDate.data, { type, content }] };
        setSelectedDate(updatedSelectedDate);
    } else {
        const updatedList = [...dataList, { date: selectedDate.date, data: [{ type, content }] }];
        setDataList(updatedList);
        setSelectedDate({ date: selectedDate.date, data: [{ type, content }] });
    }
    //setModalVisible(true);原本預設送出表單後本來就不會關閉
    form.resetFields();
}, [dataList, selectedDate]);


  const handleCloseModal = () => {
    setModalVisible(false);
    // setForceRefresh(true);
  };

  const onSelect = (date, { source }) => {
    let selected = dataList.find((item) => item.year === date.year() && item.month === date.month() + 1 && item.date === date.date());
    if (!selected) {
      selected = { year: date.year(), month: date.month() + 1, date: date.date(), data: [] }; // 如果没有找到匹配的数据，创建一个空对象
    }
    setSelectedDate(selected);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const updatedList = selectedDate.data.filter((item, i) => i !== index);
    const updatedDataList = dataList.map((item) =>
        item.date === selectedDate.date ? { ...item, data: updatedList } : item
    );
    setDataList(updatedDataList);
    const updatedSelectedDate = { ...selectedDate, data: updatedList };
    setSelectedDate(updatedSelectedDate);
};

  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const year = value.year();
    const month = value.month() + 1;
    const yearOptions = [];
    for (let i = year - 5; i <= year + 5; i++) {
      yearOptions.push(
        <Select.Option key={i} value={String(i)}>
          {i}
        </Select.Option>
      );
    }
  
    const monthOptions = [];
    for (let i = 1; i <= 12; i++) {
      monthOptions.push(
        <Select.Option key={i} value={String(i)}>
          {i}
        </Select.Option>
      );
    }
  
    return (
      <div style={{ padding: 8 }}>
        {/* <div style={{ marginBottom: 20 }}>Custom header</div> */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem',marginTop: '20px' }}>
          <Select
            size="small"
            value={String(year)}
            onChange={(newYear) => {
              const now = value.clone().year(parseInt(newYear));
              onChange(now);
              setModalVisible(false); // 在更改日期时关闭模态窗口
            }}
          >
            {yearOptions}
          </Select>
          <Select 
            size="small"
            value={String(month)}
            onChange={(newMonth) => {
              const now = value.clone().month(parseInt(newMonth) - 1);
              onChange(now);
              setModalVisible(false); // 在更改日期时关闭模态窗口
            }}
          >
            {monthOptions}
          </Select>
        </div>
      </div>
    );
  };
  
  return (
    <section id="calendar">
      <div className="calendar__container">
        <Calendar cellRender={cellRender} onSelect={onSelect}  headerRender={headerRender}/>
        {/*Calendar組件少用key={forceRefresh}，因為暫時不用強制重新渲染 */}
        {/*使用{selectedDate && (...)}的语法是一种条件渲染的方式。这表示只有当selectedDate存在且非空时，后面的内容才会被渲染*/}
        {selectedDate && (
        <Modal className='modal' open={modalVisible} onCancel={handleCloseModal} footer={null}>
            <Form style={{fontSize: 'medium',marginTop:'30px'}} form={form} initialValues={{ content: '' }} onFinish={(values) => handleFormSubmit(values, form)}>
              {selectedDate.data.map((item, index) => (
                <p key={index} style={{ color: item.type === 'success' ? '#2c2c6c' : null }}>
                  {item.content} <GrSubtractCircle onClick={() => handleDelete(index)} />
                </p>
              ))}
              <Form.Item label="New Item" name="content" style={{marginTop:'20px'}}>
                <Input style={{width:'90%'}}/>
              </Form.Item>
              <Form.Item label="Priority" name="priority" valuePropName='checked'>
                <Switch checkedChildren="開"
  unCheckedChildren="關" style={{ backgroundColor: '#2c2c6c' }}/>
              </Form.Item>
              <Form.Item>
                <Button  style={{ backgroundColor: '#2c2c6c' }} type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
        </Modal>
        )}
      </div>
    </section>
  );
}
