const members = [
  { id: 1, name: 'นายกิตธนาวัฒน์ พิกุล', role: 'A' },
  { id: 2, name: 'นายสมชาย ใจดี', role: 'B' },
];

const project = {
  team: 'ไม่เสร็จไม่นอนไม่จบ',
  topic: 'เก่งมาก',
  problem: 'ไม่มีปัญหา',
  users: ['ผม', 'คูณ'],
  members: members,
};

app.get('/project', (req, res) => {
  res.json(project);
});
