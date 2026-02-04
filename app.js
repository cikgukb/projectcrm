const students = [
  {
    id: 1,
    name: "Amirul Hakim",
    program: "Kelas Automasi",
    status: "Aktif",
    progress: 82,
    notes: "Sedang menyiapkan portfolio digital.",
    lastContact: "2 hari lepas",
    mentor: "CikguKB",
  },
  {
    id: 2,
    name: "Nur Aisyah",
    program: "Bootcamp Kreator Kandungan",
    status: "Perlu Susulan",
    progress: 64,
    notes: "Perlu dorongan untuk konsisten posting mingguan.",
    lastContact: "Semalam",
    mentor: "CikguKB",
  },
  {
    id: 3,
    name: "Daniel Lee",
    program: "Kelas Freelance",
    status: "Prospek",
    progress: 40,
    notes: "Bertanya tentang struktur yuran dan jadual kelas.",
    lastContact: "4 hari lepas",
    mentor: "CikguKB",
  },
];

const interactions = [
  {
    id: 1,
    summary: "Sesi orientasi pelajar baharu",
    channel: "Zoom",
    time: "Isnin, 10:00 pagi",
  },
  {
    id: 2,
    summary: "Follow-up tugasan mingguan",
    channel: "WhatsApp",
    time: "Rabu, 4:30 petang",
  },
];

const tasks = [
  {
    id: 1,
    title: "Sediakan modul TikTok marketing",
    owner: "CikguKB",
    due: "Jumaat",
  },
  {
    id: 2,
    title: "Semak tugasan portfolio Amirul",
    owner: "Mentor Aina",
    due: "Isnin",
  },
  {
    id: 3,
    title: "Hantar survey kepuasan kelas",
    owner: "CikguKB",
    due: "Rabu",
  },
];

const totalStudentsEl = document.getElementById("total-students");
const weeklyInteractionsEl = document.getElementById("weekly-interactions");
const openTasksEl = document.getElementById("open-tasks");
const studentListEl = document.getElementById("student-list");
const studentProfileEl = document.getElementById("student-profile");
const studentFormEl = document.getElementById("student-form");
const interactionListEl = document.getElementById("interaction-list");
const interactionFormEl = document.getElementById("interaction-form");
const taskListEl = document.getElementById("task-list");

const statusClass = (status) => {
  if (status === "Aktif") return "active";
  if (status === "Perlu Susulan") return "followup";
  return "";
};

const renderMetrics = () => {
  totalStudentsEl.textContent = students.length;
  weeklyInteractionsEl.textContent = interactions.length;
  openTasksEl.textContent = tasks.length;
};

const renderStudents = () => {
  studentListEl.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("button");
    row.className = "table-row";
    row.type = "button";
    row.innerHTML = `
      <span>${student.name}</span>
      <span>${student.program}</span>
      <span class="status ${statusClass(student.status)}">${student.status}</span>
      <span>${student.progress}%</span>
    `;
    row.addEventListener("click", () => renderProfile(student));
    studentListEl.appendChild(row);
  });
};

const renderProfile = (student) => {
  studentProfileEl.innerHTML = `
    <div>
      <h4>${student.name}</h4>
      <span class="tag">${student.status}</span>
    </div>
    <div>
      <p><strong>Program:</strong> ${student.program}</p>
      <p><strong>Mentor:</strong> ${student.mentor}</p>
      <p><strong>Hubungan Terakhir:</strong> ${student.lastContact}</p>
    </div>
    <div>
      <p><strong>Nota:</strong></p>
      <p>${student.notes}</p>
    </div>
    <div>
      <p><strong>Skor Kemajuan:</strong> ${student.progress}%</p>
      <progress value="${student.progress}" max="100"></progress>
    </div>
  `;
};

const renderInteractions = () => {
  interactionListEl.innerHTML = "";
  interactions.forEach((interaction) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${interaction.summary}</strong>
      <span>${interaction.channel} · ${interaction.time}</span>
    `;
    interactionListEl.appendChild(item);
  });
};

const renderTasks = () => {
  taskListEl.innerHTML = "";
  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "task";
    card.innerHTML = `
      <div>
        <p><strong>${task.title}</strong></p>
        <span>Penanggungjawab: ${task.owner}</span>
      </div>
      <span>Jangka akhir: ${task.due}</span>
    `;
    taskListEl.appendChild(card);
  });
};

studentFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(studentFormEl);
  const newStudent = {
    id: students.length + 1,
    name: formData.get("name"),
    program: formData.get("program"),
    status: formData.get("status"),
    progress: Number(formData.get("progress")),
    notes: formData.get("notes") || "Tiada catatan tambahan.",
    lastContact: "Hari ini",
    mentor: "CikguKB",
  };
  students.unshift(newStudent);
  renderMetrics();
  renderStudents();
  renderProfile(newStudent);
  studentFormEl.reset();
});

interactionFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(interactionFormEl);
  interactions.unshift({
    id: interactions.length + 1,
    summary: formData.get("summary"),
    channel: formData.get("channel"),
    time: "Hari ini",
  });
  renderMetrics();
  renderInteractions();
  interactionFormEl.reset();
});

renderMetrics();
renderStudents();
renderProfile(students[0]);
renderInteractions();
renderTasks();
