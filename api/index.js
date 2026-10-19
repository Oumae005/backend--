
const express = require('express');
const app = express();

// API สำหรับทดสอบการเชื่อมต่อ
app.get('/hello', (req, res) => {
  res.json({ message: 'สวัสดี Back-End!' });
});

// API ข้อมูลโครงงาน
app.get('/project', (req, res) => {
  res.json({
    team: 'ไม่เสร็จไม่นอนไม่จบ',
    project: 'ส่งใบลาป่วยและลากิจ',
    problem: 'นักศึกษาติดต่ออาจารย์ที่ปรึกษาเพื่อแจ้งการลาได้ไม่สะดวก',
    users: [
      'นักเรียน/นักศึกษา',
      'อาจารย์ที่ปรึกษา',
      'ผู้ดูแลระบบ'
    ],
    members: [
      'กิตธนาวัฒน์ พิกุล',
      'ธันวา เฟื่องนคร'
    ]
  });
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
