
const express = require('express');
const app = express();

// API สำหรับทดสอบ
app.get('/hello', (req, res) => {
  res.json({ message: 'สวัสดี Back-End!' });
});

// ข้อมูลสมาชิกทีม (แก้เป็นข้อมูลจริงของทีม)
const members = [
  { id: 1, name: 'กิตธนาวัฒน์ พิกุล', role: 'Developer A' },
  { id: 2, name: 'ธันวา เฟื่องนคร', role: 'Developer B' },
];

// ข้อมูลโครงงาน (แก้เป็นข้อมูลจริงของทีม)
const project = {
  team: 'ไม่เสร็จไม่นอนไม่จบ',
  topic: 'ส่งใบลาป่วยและลากิจ',
  problem: 'นักศึกษาติดต่ออาจารย์ที่ปรึกษาเพื่อแจ้งการลาได้ไม่สะดวก',
  users: ['นักเรียน/นักศึกษา', 'อาจารย์ที่ปรึกษา', 'เจ้าหน้าที่'],
  members,
};

// API ข้อมูลโครงงาน
app.get('/project', (req, res) => {
  res.json(project);
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, (err) => {
  if (err) {
    return console.log('เปิดเซิร์ฟเวอร์ไม่ได้:', err.message);
  }
  console.log('Server running on http://localhost:3000');
});
