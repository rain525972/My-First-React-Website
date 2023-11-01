import React, { useState,useEffect } from 'react';
import stargazer from '../../assets/stargazer.jpg';
import './perferCard.css';
// import { nanoid } from 'nanoid';
import { Row,Switch,Rate, Upload, Button,Modal } from 'antd';
import {FcLike,FcLikePlaceholder} from 'react-icons/fc'
import {GoBookmarkFill} from 'react-icons/go'
import {HeartTwoTone,UploadOutlined} from '@ant-design/icons'
import uploadImage from '../../assets/images.png';
import {FaArrowLeft} from 'react-icons/fa'

export default function PerferCard() {
  const [gameComments, setGameComments] = useState([
    {
      id: 1,
      title: '傳說對決',
      comment: '二次元罪惡都市PPG手遊大作！在罪惡都市收容禁閉者展開冒險。',
      star: 5,
      like: true,
      img: stargazer,
    },
    {
      id: 2,
      title: '無期迷途',
      comment: '二次元罪惡都市PPG手遊大作《無期迷途》火熱上市中！在罪惡都市收容禁閉者展開冒險。',
      star: 5,
      like: false,
      img: stargazer,
    },
    {
      id: 3,
      title: '服從我',
      comment: '123456789',
      star: 5,
      like: false,
      img: stargazer,
    },
  ]);
  const [showLiked, setShowLiked] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    const filtered = showLiked ? gameComments.filter(comment => comment.like) : gameComments;
    setFilteredComments(filtered);
  }, [showLiked, gameComments]);

  const handleRateChange = (value, id) => {
    const updatedGameComments = gameComments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, star: value };
      }
      return comment;
    });
    setGameComments(updatedGameComments);
  };

  const handleLike = (id) =>{
    return ()=>{
      const updatedGameComments = gameComments.map((item) => {
        if (item.id === id) {
          return { ...item, like: !item.like };
        }
        return item;
      });
      setGameComments(updatedGameComments);
    }
  }

  const props = {
    name: 'file',
    action: '',
    onChange(info) {
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   console.log(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   console.log(`${info.file.name} file upload failed.`);
      // }
    },
  };

  /*新增評論的視窗數據 */
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const [like, setLike] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleModalOk = () => {
    if (uploadedImage === null) {
      alert('請上傳圖片');
      return;
    }
    const newComment = {
      id: gameComments.length + 1,
      title: title,
      comment: comment,
      star: stars,
      like: like,
      img: uploadedImage ,
    };
    setGameComments([...gameComments, newComment]);
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };


  return (
    <div className='prefer__cards'>
       <div className='together' onClick={() => setShowLiked(!showLiked)} >
        <HeartTwoTone  className='prefer__title' style={{ color: '#ffffff' }} />
        <GoBookmarkFill className='bookmark'/>
       </div>
      {filteredComments.map((item, _) => (
        <div key={item.id} className='prefer__card' >
          <div className="image">
            <img src={item.img} alt="Card" />
          </div>
          <div className="content">
            <h3>{item.title}</h3>
            <p title={item.comment}>{item.comment}</p>
            <div className="rating">
              <Rate allowClear={false} value={item.star} onChange={(value) => handleRateChange(value, item.id)} />
            </div>
            <div className='game_like' onClick={handleLike(item.id)}>{item.like ? <FcLike/>:<FcLikePlaceholder/>}</div>
          </div>
        </div>
      ))}
      {/* <hr></hr>有空加水平線分開+有空整理這頁程式碼，看需不需要拆成不同組件 */}
       <div className='prefer__card'>
        <div className='image'>
            <img src={uploadImage} alt='Card' />
        </div>
        <div className='content'>
          <button onClick={() => setModalVisible(true)}>新增評論</button>
          <p><FaArrowLeft/>點擊上傳圖檔</p>
        </div>
        </div>
        <Modal
        title='新增評論'
        okText="確定"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ disabled: !title || !comment || !stars }}
      >
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='標題'
          style={{ marginBottom: '10px' }}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='評論內容'
        />
        <div style={{ display: 'flex',  marginBottom: 20,marginTop:20 }}>
          <p style={{ marginRight: 10, fontSize: 16 }}>收藏</p>
          <Switch checked={like} onChange={(checked) => setLike(checked)} />
        </div>
        <Row>
        <Rate style={{marginBottom: 20}} value={stars} onChange={(value) => setStars(value)} />
        </Row>
        <Upload {...props}
        listType="picture"
        maxCount={1}
        onChange={(info) => {  
          console.log(info)
            const test = URL.createObjectURL(info.file.originFileObj);
            setUploadedImage(test); // 將上傳的圖片設置為狀態中的值
        }}>
          <Button icon={<UploadOutlined />}>上傳圖片</Button>
        </Upload>
      </Modal>
    </div>
  );
}
