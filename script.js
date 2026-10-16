// Простий фронтенд-прототип: fake data + навігація між файлами
const sampleProjects = [
  {id:1,title:"Презентація для стартапу",desc:"Створити 10 слайдів pitch deck",budget:200,deadline:7},
  {id:2,title:"Лендінг для кав'ярні",desc:"Односторінковий сайт з формою замовлення",budget:350,deadline:10},
  {id:3,title:"Дизайн логотипа",desc:"Логотип + гайдлайн",budget:120,deadline:5}
];

function renderProjects(){
  const container = document.getElementById('projects');
  if(!container) return;
  container.innerHTML = '';
  sampleProjects.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h4>${p.title}</h4><div class="meta">€${p.budget} • ${p.deadline} дн.</div><p>${p.desc}</p><div style="margin-top:10px"><a class="btn" href="project.html" onclick="openProject(${p.id})">Переглянути</a></div>`;
    container.appendChild(el);
  });
}

// Передати id проекту через localStorage (швидко для прото��ипу)
function openProject(id){
  localStorage.setItem('selectedProject', id);
}

// Коли відкрита сторінка project.html — підвантажуємо дані
function loadProjectPage(){
  const id = Number(localStorage.getItem('selectedProject') || 1);
  const p = sampleProjects.find(x=>x.id===id) || sampleProjects[0];
  const title = document.getElementById('project-title');
  if(title) title.textContent = p.title;
  const desc = document.getElementById('project-desc');
  if(desc) desc.textContent = p.desc;
  const budget = document.getElementById('project-budget');
  if(budget) budget.textContent = 'Бюджет: €' + p.budget;
  const deadline = document.getElementById('project-deadline');
  if(deadline) deadline.textContent = 'Дедлайн: ' + p.deadline + ' днів';
  const bids = document.getElementById('bids');
  if(bids){
    bids.innerHTML = '';
    // фейкові заявки
    const fake = [
      {name:'Anna',price: p.budget,meta:'3 роки досвіду'},
      {name:'Max',price: p.budget-30,meta:'UI/UX дизайнер'}
    ];
    fake.forEach(b=>{
      const li = document.createElement('li');
      li.textContent = `${b.name} — €${b.price} • ${b.meta}`;
      bids.appendChild(li);
    });
  }
  const applyBtn = document.getElementById('apply-btn');
  if(applyBtn){
    applyBtn.onclick = ()=>{ alert('Заявка відправлена (симуляція). Перейти в чат.'); window.location='chat.html'; };
  }
}

function bindCreateForm(){
  const form = document.getElementById('create-form');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const fd = new FormData(form);
    const title = fd.get('title'), desc = fd.get('desc'), budget = fd.get('budget'), deadline = fd.get('deadline');
    sampleProjects.push({id: sampleProjects.length+1, title, desc, budget: Number(budget), deadline: Number(deadline)});
    document.getElementById('create-feedback').innerHTML = '<p style="color:green">Проєкт опубліковано. Повернутись на головну для перегляду.</p>';
    form.reset();
  });
}

function bindChat(){
  const win = document.getElementById('chat-window');
  const form = document.getElementById('chat-form');
  if(!form || !win) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const input = document.getElementById('chat-input');
    if(!input.value) return;
    const m = document.createElement('div'); m.className='chat-message me'; m.textContent = input.value;
    win.appendChild(m); input.value='';
    win.scrollTop = win.scrollHeight;
    // автоматичний відповідь симуляція
    setTimeout(()=>{ const r = document.createElement('div'); r.className='chat-message they'; r.textContent='Дякую, перевірю і напишу.'; win.appendChild(r); win.scrollTop = win.scrollHeight; },800);
  });
}

function loadProfile(){
  const port = document.getElementById('portfolio');
  if(!port) return;
  const samples = [
    {title:'Pitch deck',img:''},
    {title:'Landing page',img:''},
    {title:'Brand kit',img:''}
  ];
  samples.forEach(s=>{
    const el = document.createElement('div'); el.className='card';
    el.innerHTML = `<h4>${s.title}</h4><div class="meta">Приклад роботи</div>`;
    port.appendChild(el);
  });
}

// init
document.addEventListener('DOMContentLoaded', ()=>{
  renderProjects();
  loadProjectPage();
  bindCreateForm();
  bindChat();
  loadProfile();
});
