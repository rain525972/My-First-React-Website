import React, { useState, useEffect } from 'react';
import './itinerary.css';
import { Badge, Calendar, Modal, Form, Input, Button, Switch,Select } from 'antd';
import {GrSubtractCircle} from 'react-icons/gr'
import axios from 'axios';

const authToken = "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwZSI6IkpXRSIsInppcCI6IkRFRiJ9.ijocHdaGockvKJRVum0YpVMzWFWxGjoL787q2K9lvLGFLcYT4MnlJL8SomFHewQ--L4D1VmyiM7UrFja9zH6zZrJgLpHeQn0nP39woTAeVZhQNj_89dOrmojw-Ac-gie0wnOBIankkpLXy_ixljss0gq5PwXpx9VdV4RNNr2YCv-TFAqBJ2Yv2BYUrTqTCb0Oi8fvmua3wpwa33KcU6YIn3_7FD7akhrH9bVV516A0XWWQ2gDyapLHnJD2fc9xYp0oi7rrDH9P-HqdEt2JMpuTv9C73LpcSy49l8NCpYqhCfDzBo6yGBCKnRzPpV4Xrq76nhYGjvUulg9p7n1b9Wtg.isV-b1eWvt1w3tA5VfMZEg.u8nOslJTT--LTRdl2YDQj002Kkl5D27aACQOADsgmmtrwrRCVnL6f3PBHc4n6B3yH-To-yYwE0QyF-ihFd2MxOkQ-WiIYbA5G36S3ajzwVa4uHQqXgWh-fAlDWLgq2W3q0Dt4sb6SSQaFxpM54mCBB1eIM_urg226YQunMZR3TEfCDryFY12o3o_Evq4wLlY.1DSlPM6HzirEv8Yol17LoEJPWrZNBuAx4Svf-xRmVAQ";
    localStorage.setItem("authToken", authToken);
    const storedAuthToken = localStorage.getItem("authToken");

export default function Itinerary() {
  const [dataList, setDataList] = useState([]);//全部數據
  const [selectedDate, setSelectedDate] = useState(null);//選定單個日期的數據(或可以這樣寫const [selectedDate, setSelectedDate] = useState({ date: null, data: [] });)
  const [modalVisible, setModalVisible] = useState(false);//視窗是否顯示
  // const [forceRefresh, setForceRefresh] = useState(false);//是否強制重新渲染
  const [form] = Form.useForm();//這裡的[form]裡的form跟Form組件裡的form={form}的{}裡的form一樣 

  const change = () => {
    axios
      .get('http://localhost:8080/mom/web/v1.0/account?limit=20&page=1', {
        headers: {
          Authorization: storedAuthToken,
        },
      })
      .then((response) => {
        const updatedDataList = response.data.body.accounts.map((account) => ({
          id: account.account_id,
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
        console.log(response);
        console.log(updatedDataList);
        setDataList(updatedDataList);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    change();
  }, []);
  
  const cellRender = (current) => {
    const listData = dataList.filter((item) => item.year === current.year() && item.month === current.month() + 1 && item.date === current.date());
    if (listData.length === 0) return null;
    return (
      <div>
        {listData.map((data) => (
          data.data.map((item, itemIndex) => (
            <Badge key={itemIndex} status={item.type} text={item.content} />
          ))
        ))}
      </div>
    );
  };

  const handleFormSubmit = (values, form) => {
    console.log(form);
  
    const type = values.priority ? 'error' : 'success';
    const content = values.content;

    const payload = {
      account: "r0",
      name: "小黑",
      password: "123456",
      year: selectedDate[0].year,
      month: selectedDate[0].month,
      date: selectedDate[0].date,
      type: type,
      content: content
    };
 
    axios.post('http://localhost:8080/mom/web/v1.0/account', payload, {
      headers: {
        'Authorization': storedAuthToken,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        change()//當創建成功調用change函數，從後端重新取的最新資料
      })
      .catch(error => {
        console.log(error);
      });
      setModalVisible(false);//原本預設送出表單後不會關閉
    form.resetFields();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // setForceRefresh(true);
  };

  //這onSelect函數是當某一日期格被選種後進行相關的處理，跟antd的Select組件無關
  const onSelect = (date, { source }) => {
  const selected = dataList.filter((item) => item.year === date.year() && item.month === date.month() + 1 && item.date === date.date());
  if (selected.length === 0) {
    setSelectedDate([{ year: date.year(), month: date.month() + 1, date: date.date(), data: [] }]);
  } else {
    setSelectedDate(selected);
  }
  setModalVisible(true);
  };

  const handleDelete = (itemIndex) => {
  const itemIdToDelete = selectedDate[itemIndex].id;

  axios.delete(`http://localhost:8080/mom/web/v1.0/account/${itemIdToDelete}`, {
      headers: {
          'Authorization': storedAuthToken,
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
    change()//當刪除成功調用change函數，從後端重新取的最新資料
    setModalVisible(false)
    // let tmp =dataList.filter((item) => item.year === selectedDate.year && item.month === selectedDate.month && item.date === selectedDate.date);
    // setSelectedDate(tmp)
    // setModalVisible(true)
  })
  .catch(error => {
      console.error(error);
  });
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
            {Array.isArray(selectedDate) ? (
            selectedDate.map((date, index) => (
              <div key={index}>
                {date.data.map((item, itemIndex) => (
                  <p key={itemIndex} style={{ color: item.type === 'error' ? '#2c2c6c' : null }}>
                    {item.content} <GrSubtractCircle onClick={() => handleDelete(itemIndex)} />
                  </p>
                ))}
              </div>
              ))
            ) : null}
            <Form.Item label="New Item" name="content" style={{marginTop:'20px'}}>
              <Input style={{width:'90%'}}/>
            </Form.Item>
            <Form.Item label="Priority" name="priority" valuePropName='checked'>
              <Switch checkedChildren="開" unCheckedChildren="關" style={{ backgroundColor: '#2c2c6c' }}/>
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
