const express = require("express");
const app = express();
app.use(express.json());

// API สำหรับทดสอบ
app.get("/hello", (req, res) => {
  res.json({ message: "สวัสดี Back-End!" });
});

// ข้อมูลสมาชิกทีม (แก้เป็นข้อมูลจริงของทีม)
const members = [
  { id: 1, name: "กิตธนาวัฒน์ พิกุล", role: "Developer A" },
  { id: 2, name: "ธันวา เฟื่องนคร", role: "Developer B" },
];

// ข้อมูลโครงงาน (แก้เป็นข้อมูลจริงของทีม)
const project = {
  team: "ไม่เสร็จไม่นอนไม่จบ",
  topic: "ส่งใบลาป่วยและลากิจ",
  problem: "นักศึกษาติดต่ออาจารย์ที่ปรึกษาเพื่อแจ้งการลาได้ไม่สะดวก",
  users: ["นักเรียน/นักศึกษา", "อาจารย์ที่ปรึกษา", "เจ้าหน้าที่"],
  members,
};

// API ข้อมูลโครงงาน
app.get("/project", (req, res) => {
  res.json(project);
});

// ข้อมูลตั้งต้นของ resource หลัก (เก็บในหน่วยความจำ)
let students = [
  {
    id: 1,
    name: "คนดำ ตัวข่าว",
    major: "ช่างไฟ",
    level: "ปวส 1",
    status: "graduated",
  },
  {
    id: 2,
    name: "โปรเจกเตอร์ห้อง เปิดไม่ติด",
    major: "สารสนเทศ",
    level: "ปวส 1",
    status: "sick_leave",
  },
];
let nextId = 3;

// R: ดูทั้งหมด (รองรับ ?status=สถานะ)
app.get("/students", (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(students.filter((s) => s.status === status));
  }
  res.json(students);
});

// R: ดู 1 รายการ
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "ไม่พบรายการนักศึกษา" });
  }
  res.json(student);
});

// C: เพิ่ม
app.post("/students", (req, res) => {
  const { name, major, level, status } = req.body;
  if (!name || !major || !level || !status) {
    return res
      .status(400)
      .json({ message: "ต้องส่ง name, major, level และ status" });
  }
  const student = { id: nextId++, name, major, level, status };
  students.push(student);
  res.status(201).json(student);
});

// U: แก้ไข
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "ไม่พบรายการนักศึกษา" });
  }
  // กำหนดสถานะที่อนุญาตให้ใช้งาน (รวมถึงเรื่องการลา)
  const allowed = ["active", "sick_leave", "personal_leave", "graduated"];
  if (req.body.status && !allowed.includes(req.body.status)) {
    return res.status(400).json({
      message:
        "status ต้องเป็น active, sick_leave, personal_leave หรือ graduated",
    });
  }
  student.name = req.body.name ?? student.name;
  student.major = req.body.major ?? student.major;
  student.level = req.body.level ?? student.level;
  student.status = req.body.status ?? student.status;
  res.json(student);
});

// D: ลบ
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "ไม่พบรายการนักศึกษา" });
  }
  students.splice(index, 1);
  res.status(204).send();
});
// ไม่ตรงกับ route ใดเลย
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, (err) => {
  if (err) {
    return console.log("เปิดเซิร์ฟเวอร์ไม่ได้:", err.message);
  }
  console.log("Server running on http://localhost:3000");
});
