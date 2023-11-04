import React, { useState, useCallback } from 'react';
import './itinerary.css';
import { Badge, Calendar, Modal, Form, Input, Button, Switch,Select } from 'antd';
import {GrSubtractCircle} from 'react-icons/gr'

const initialDataList = [
  {
    date: 8,
    data: [
      {
        type: 'success',
        content: 'This is usual event.',
      },
    ],
  },
  {
    date: 10,
    data: [
      {
        type: 'success',
        content: 'This is usual event.',
      },
      {
        type: 'error',
        content: 'This is error event.',
      },
    ],
  },
];

export default function Itinerary() {
  const [dataList, setDataList] = useState([]);//全部數據
  const [selectedDate, setSelectedDate] = useState(null);//選定單個日期的數據(或可以這樣寫const [selectedDate, setSelectedDate] = useState({ date: null, data: [] });)
  const [modalVisible, setModalVisible] = useState(false);//視窗是否顯示
  // const [forceRefresh, setForceRefresh] = useState(false);//是否強制重新渲染
  const [form] = Form.useForm();//這裡的[form]裡的form跟Form組件裡的form={form}的{}裡的form一樣 

  const cellRender = (current) => {
    console.log("1:",current.date());
    const listData = dataList.find((item) => item.date === current.date());
    if (!listData) return null;
    console.log("2:",current.date());
    return (
      <div>
        {listData.map((data, dataIndex) => (
          <div key={dataIndex}>
            {data.data.map((item, itemIndex) => (
              <Badge key={itemIndex} status={item.type} text={item.content} />
            ))}
          </div>
        ))}
      </div>
    );
  };
  

  const handleFormSubmit = (values, form) => {
    console.log(form);
  
    const type = values.priority ? 'error' : 'success';
    const content = values.content;
    const existingDateIndex = dataList.findIndex((item) => item.date === selectedDate.date);

    const payload = {
      account: "h5",
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
        console.log(selectedDate);
        if (existingDateIndex > -1) {
          const updatedDataList = dataList.map((item) =>
            item.date === selectedDate[0].date ? { ...item, data: [...item.data, { type, content }] } : item
          );
          console.log(updatedDataList);
          setDataList(updatedDataList);
          
          const updatedSelectedDate = { ...selectedDate, data: [...selectedDate[0].data, { type, content }] };
          setSelectedDate(updatedSelectedDate); // 更新 selectedDate
        } else {
          
          const newDate = { year: selectedDate[0].year, month: selectedDate[0].month, date: selectedDate[0].date, data: [{ type, content }] };
          console.log(newDate);
          const updatedList = [...dataList, newDate];
          setDataList(updatedList);
          setSelectedDate(newDate); // 更新 selectedDate
        }
  
        //處理成功回應
      })
      .catch(error => {
        // 處理錯誤
      });
      setModalVisible(false);
    //setModalVisible(true);原本預設送出表單後本來就不會關閉
    form.resetFields();
  };
  


  const handleCloseModal = () => {
    setModalVisible(false);
    // setForceRefresh(true);
  };

  //這onSelect函數是當某一日期格被選種後進行相關的處理，跟antd的Select組件無關
  const onSelect = (date, { source }) => {
    let selected = dataList.find((item) => item.date === date.date());
    if (!selected) {
      selected = { date: date.date(), data: [] }; // 如果没有找到匹配的数据，创建一个空对象
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
