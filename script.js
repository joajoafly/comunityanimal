"use strict";

const STORAGE_KEYS = {
  theme: "mn_theme",
  health: "mn_health",
  posts: "mn_posts",
  questions: "mn_questions",
  bookmarks: "mn_bookmarks",
  recent: "mn_recent",
  bestScore: "mn_best_score"
};

const regions = ["서울", "경기", "인천", "강원", "충청", "전라", "경상", "제주"];

const careGuides = [
  { title: "입양 준비", icon: "home", image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=500&q=80", body: "가족의 생활 패턴, 예산, 병원 접근성, 알레르기 여부를 먼저 확인하세요.", checks: ["초기 비용 산정", "기본 용품 준비", "동물병원 위치 확인"] },
  { title: "사료", icon: "bone", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=500&q=80", body: "연령, 활동량, 알레르기 이력을 기준으로 사료를 고르고 7일 이상 천천히 전환하세요.", checks: ["원재료 확인", "급여량 기록", "간식 10% 이하"] },
  { title: "급수", icon: "droplets", image: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=500&q=80", body: "물그릇은 하루 1회 이상 세척하고, 고양이는 여러 곳에 물그릇을 배치하면 좋습니다.", checks: ["물갈이", "그릇 세척", "음수량 관찰"] },
  { title: "배변훈련", icon: "sparkles", image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=500&q=80", body: "실패를 혼내기보다 성공 순간을 즉시 보상하는 것이 핵심입니다.", checks: ["장소 고정", "성공 보상", "냄새 제거"] },
  { title: "산책", icon: "footprints", image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=500&q=80", body: "산책은 운동뿐 아니라 냄새 탐색을 통한 정서 안정 루틴입니다.", checks: ["목줄 점검", "배변봉투", "귀가 후 발 세척"] },
  { title: "예방접종", icon: "syringe", image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=500&q=80", body: "접종 일정은 수의사와 상담하고 접종 후 컨디션 변화를 관찰하세요.", checks: ["접종수첩", "병원 예약", "이상반응 확인"] },
  { title: "사회화", icon: "users", image: "https://images.unsplash.com/photo-1601758064224-c3c9fb84f707?auto=format&fit=crop&w=500&q=80", body: "낯선 소리, 사람, 장소를 낮은 강도로 천천히 경험하게 해주세요.", checks: ["짧은 노출", "긍정 보상", "무리한 접촉 금지"] },
  { title: "응급처치", icon: "cross", image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&w=500&q=80", body: "응급 상황에서는 임의 처치보다 병원 연락과 이동 준비가 우선입니다.", checks: ["24시 병원 저장", "이동장 준비", "응급키트 확인"] },
  { title: "노령견 관리", icon: "heart-pulse", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80", body: "관절, 치아, 체중, 인지 변화 체크가 중요하며 정기검진 주기를 짧게 잡으세요.", checks: ["미끄럼 방지", "관절 보조", "검진 기록"] },
  { title: "노령묘 관리", icon: "heart", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=500&q=80", body: "신장, 갑상샘, 치아 질환을 주의하고 화장실 접근성을 높여주세요.", checks: ["음수량 체크", "낮은 화장실", "체중 기록"] }
];

const breeds = [
  { name: "말티즈", type: "강아지", size: "소형견", image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=600&q=80", personality: "애교 많고 밝음", shedding: "낮음", exercise: "보통", difficulty: "중간", owner: "실내 생활 집사", life: "12-15년", weight: "2-4kg", disease: "슬개골, 치아" },
  { name: "웰시코기", type: "강아지", size: "중형견", image: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=600&q=80", personality: "활발하고 영리함", shedding: "높음", exercise: "높음", difficulty: "중간", owner: "산책을 즐기는 집사", life: "12-14년", weight: "10-14kg", disease: "디스크, 비만" },
  { name: "골든 리트리버", type: "강아지", size: "대형견", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80", personality: "온순하고 사교적", shedding: "높음", exercise: "높음", difficulty: "중간", owner: "넓은 활동 공간 집사", life: "10-12년", weight: "25-34kg", disease: "고관절, 피부" },
  { name: "러시안 블루", type: "고양이", size: "고양이", image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=600&q=80", personality: "조용하고 신중함", shedding: "보통", exercise: "보통", difficulty: "쉬움", owner: "차분한 환경 집사", life: "13-18년", weight: "3-5kg", disease: "비만, 치주" },
  { name: "랙돌", type: "고양이", size: "고양이", image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=600&q=80", personality: "느긋하고 다정함", shedding: "높음", exercise: "낮음", difficulty: "중간", owner: "빗질 가능한 집사", life: "12-17년", weight: "4-9kg", disease: "심장, 헤어볼" },
  { name: "코리안 숏헤어", type: "고양이", size: "고양이", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80", personality: "호기심 많고 적응력 좋음", shedding: "보통", exercise: "보통", difficulty: "쉬움", owner: "첫 고양이 집사", life: "12-18년", weight: "3-6kg", disease: "구내염, 비만" }
];

const healthTasks = ["오늘 양치", "오늘 산책", "오늘 물갈이", "오늘 목욕", "발톱관리", "귀청소", "예방접종", "심장사상충", "진드기"];

const quizQuestions = Array.from({ length: 20 }, (_, index) => {
  const bank = [
    ["사료 변경 시 가장 좋은 방법은?", ["하루 만에 바꾼다", "7일 이상 섞어 전환한다", "간식만 준다", "물과 섞지 않는다"], 1],
    ["강아지 산책 후 기본 관리로 알맞은 것은?", ["발과 피부 확인", "바로 목욕만 하기", "사료 제한", "물 금지"], 0],
    ["고양이 음수량을 늘리는 방법은?", ["물그릇 여러 곳 배치", "물그릇 숨기기", "건식만 급여", "화장실 옆 배치"], 0],
    ["예방접종 후 해야 할 일은?", ["컨디션 관찰", "격한 운동", "목욕", "새 간식 대량 급여"], 0],
    ["배변훈련의 핵심은?", ["성공 즉시 보상", "실패 후 큰소리", "장소 매일 변경", "보상 금지"], 0]
  ];
  const item = bank[index % bank.length];
  return { question: `${index + 1}. ${item[0]}`, answers: item[1], correct: item[2] };
});

const seedPosts = [
  { id: crypto.randomUUID(), nickname: "몽실집사", region: "서울", petType: "강아지", title: "한강 산책 코스 추천해요", content: "해 질 때 사람이 적은 구간을 골라 천천히 걷기 좋아요.", likes: 12, comments: 3, views: 48, createdAt: Date.now() - 900000, photo: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=700&q=80" },
  { id: crypto.randomUUID(), nickname: "나비언니", region: "경기", petType: "고양이", title: "물그릇 위치 바꾸니 음수량이 늘었어요", content: "밥그릇과 멀리 두고 넓은 그릇으로 바꾸니 확실히 자주 마시네요.", likes: 18, comments: 5, views: 72, createdAt: Date.now() - 1800000, photo: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=700&q=80" }
];

const meetups = regions.map((region, index) => ({
  region,
  title: `${region} ${index % 2 ? "냥이 케어 스터디" : "멍멍 산책 모임"}`,
  body: "초보 집사도 편하게 참여할 수 있는 소규모 모임입니다.",
  date: `7월 ${12 + index}일 토요일`
}));

const notices = [
  { title: "공지: 멍냥라이프 베타 오픈", icon: "megaphone", body: "품종 백과와 건강관리 체크리스트를 먼저 공개했습니다.", checks: ["피드백 환영", "모바일 최적화 완료"] },
  { title: "이벤트: 집사 테스트 공유 챌린지", icon: "party-popper", body: "테스트 결과를 공유하고 커뮤니티에 인증글을 남겨보세요.", checks: ["기간 7월", "우수 후기 선정"] },
  { title: "FAQ: 데이터는 어디에 저장되나요?", icon: "circle-help", body: "커뮤니티 글, 체크리스트, 북마크는 현재 브라우저 LocalStorage에 저장됩니다.", checks: ["브라우저별 저장", "개인 기기 권장"] }
];

class MungNyangApp {
  /** 앱 상태와 DOM 참조를 초기화합니다. */
  constructor() {
    this.state = {
      breedFilter: "전체",
      postLimit: 4,
      quizIndex: 0,
      quizAnswers: Array(quizQuestions.length).fill(null),
      chart: null
    };
    this.posts = this.load(STORAGE_KEYS.posts, seedPosts);
    this.questions = this.load(STORAGE_KEYS.questions, this.createSeedQuestions());
    this.bookmarks = this.load(STORAGE_KEYS.bookmarks, []);
    this.recentViews = this.load(STORAGE_KEYS.recent, []);
    this.cacheElements();
    this.init();
  }

  /** 자주 쓰는 DOM 요소를 한 번만 조회해 보관합니다. */
  cacheElements() {
    this.root = document.documentElement;
    this.loader = document.querySelector("#loader");
    this.toast = document.querySelector("#toast");
    this.modal = document.querySelector("#appModal");
    this.modalTitle = document.querySelector("#modalTitle");
    this.modalBody = document.querySelector("#modalBody");
  }

  /** 전체 앱 기능을 순서대로 실행합니다. */
  init() {
    this.applyTheme();
    this.renderStaticData();
    this.bindEvents();
    this.renderBreeds();
    this.renderHealth();
    this.renderQuiz();
    this.renderPosts();
    this.renderMeetups("서울");
    this.renderQuestions();
    this.renderProfile();
    this.startTyping();
    this.setupObservers();
    this.finishLoading();
    this.refreshIcons();
  }

  /** LocalStorage에서 JSON 데이터를 안전하게 읽습니다. */
  load(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  /** LocalStorage에 JSON 데이터를 저장합니다. */
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /** 초기 Q&A 데이터를 생성합니다. */
  createSeedQuestions() {
    return [
      { id: crypto.randomUUID(), title: "강아지가 산책 중 자꾸 멈춰요", content: "냄새를 오래 맡는데 기다려줘도 될까요?", best: "냄새 탐색은 중요한 활동입니다. 위험한 장소만 피하고 짧게 기다려주세요.", likes: 9 },
      { id: crypto.randomUUID(), title: "고양이 양치 적응 팁이 궁금해요", content: "칫솔만 보면 도망가요.", best: "처음에는 치약 냄새 보상부터 시작하고 손가락 거즈, 칫솔 순서로 천천히 진행하세요.", likes: 14 }
    ];
  }

  /** 아이콘 CDN 로드 이후 Lucide 아이콘을 갱신합니다. */
  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /** 로딩 애니메이션을 자연스럽게 숨깁니다. */
  finishLoading() {
    window.addEventListener("load", () => {
      setTimeout(() => this.loader.classList.add("is-hidden"), 450);
      if (window.AOS) {
        window.AOS.init({ duration: 700, once: true, offset: 80 });
      }
    });
  }

  /** 정적 배열 데이터를 HTML 카드와 옵션으로 렌더링합니다. */
  renderStaticData() {
    this.renderAccordions("#careAccordion", careGuides);
    this.renderAccordions("#noticeAccordion", notices);
    this.renderBreedFilters();
    this.renderRegionOptions();
    this.renderRegionFilters();
  }

  /** 아코디언 UI를 데이터 기반으로 렌더링합니다. */
  renderAccordions(selector, items) {
    const target = document.querySelector(selector);
    target.innerHTML = items.map((item, index) => `
      <article class="accordion__item ${index === 0 ? "is-open" : ""}">
        <button class="accordion__button" type="button" aria-expanded="${index === 0}">
          <span class="accordion__summary"><span class="accordion__icon"><i data-lucide="${item.icon}"></i></span>${item.title}</span>
          <i data-lucide="chevron-down"></i>
        </button>
        <div class="accordion__panel">
          ${item.image ? `<img src="${item.image}" alt="${item.title} 이미지" loading="lazy">` : ""}
          <div>
            <p>${item.body}</p>
            <ul class="accordion__checks">${item.checks.map(check => `<li>${check}</li>`).join("")}</ul>
          </div>
        </div>
      </article>
    `).join("");
  }

  /** 품종 필터 버튼을 생성합니다. */
  renderBreedFilters() {
    const filters = ["전체", "강아지", "고양이", "소형견", "중형견", "대형견"];
    document.querySelector("#breedFilters").innerHTML = filters.map(filter => (
      `<button class="chip ${filter === "전체" ? "is-active" : ""}" type="button" data-filter="${filter}">${filter}</button>`
    )).join("");
  }

  /** 글쓰기 폼의 지역 선택지를 채웁니다. */
  renderRegionOptions() {
    document.querySelector("[name='region']").innerHTML = regions.map(region => `<option>${region}</option>`).join("");
  }

  /** 지역모임 필터 버튼을 렌더링합니다. */
  renderRegionFilters() {
    document.querySelector("#regionFilters").innerHTML = regions.map((region, index) => (
      `<button class="chip ${index === 0 ? "is-active" : ""}" type="button" data-region="${region}">${region}</button>`
    )).join("");
  }

  /** 앱 전역 이벤트를 이벤트 위임 중심으로 연결합니다. */
  bindEvents() {
    document.addEventListener("click", event => this.handleDocumentClick(event));
    document.addEventListener("input", event => this.handleDocumentInput(event));
    document.querySelector("#postForm").addEventListener("submit", event => this.createPost(event));
    document.querySelector("#questionForm").addEventListener("submit", event => this.createQuestion(event));
    document.querySelector("#postSort").addEventListener("change", () => this.renderPosts());
    document.querySelector("#modalClose").addEventListener("click", () => this.modal.close());
    window.addEventListener("scroll", this.throttle(() => this.updateScrollUI(), 80), { passive: true });
  }

  /** 문서 클릭 이벤트를 분기 처리합니다. */
  handleDocumentClick(event) {
    const target = event.target.closest("button, a");
    if (!target) return;
    this.createRipple(event, target);
    if (target.id === "menuToggle") this.toggleMenu();
    if (target.id === "themeToggle") this.toggleTheme();
    if (target.id === "notifyButton") this.showToast("새 알림: 예방접종 체크일이 다가왔어요.");
    if (target.id === "profileButton") document.querySelector("#mypage").scrollIntoView({ behavior: "smooth" });
    if (target.id === "backToTop") window.scrollTo({ top: 0, behavior: "smooth" });
    if (target.id === "resetHealth") this.resetHealth();
    if (target.id === "loadMorePosts") this.loadMorePosts();
    if (target.id === "retryQuiz") this.resetQuiz();
    if (target.id === "shareResult") this.shareResult();
    if (target.matches(".accordion__button")) this.toggleAccordion(target);
    if (target.matches("[data-filter]")) this.setBreedFilter(target);
    if (target.matches("[data-region]")) this.setRegionFilter(target);
    if (target.matches("[data-post-action]")) this.handlePostAction(target);
    if (target.matches("[data-qa-like]")) this.likeQuestion(target.dataset.qaLike);
    if (target.matches("[data-suggest]")) this.applySuggestion(target.dataset.suggest);
    if (target.matches("[data-quiz-nav]")) this.navigateQuiz(target.dataset.quizNav);
  }

  /** 문서 입력 이벤트를 분기 처리합니다. */
  handleDocumentInput(event) {
    if (event.target.id === "breedSearch") this.renderBreeds();
    if (event.target.id === "postSearch") this.renderPosts();
    if (event.target.id === "globalSearch") this.renderSuggestions(event.target.value);
    if (event.target.matches("[data-health]")) this.updateHealth(event.target);
    if (event.target.name === "quizAnswer") this.state.quizAnswers[this.state.quizIndex] = Number(event.target.value);
  }

  /** 버튼 클릭 위치에 맞는 리플 애니메이션을 만듭니다. */
  createRipple(event, target) {
    if (!target.classList.contains("button")) return;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "button__ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    target.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }

  /** 모바일 메뉴 열림 상태를 전환합니다. */
  toggleMenu() {
    const panel = document.querySelector("#navPanel");
    const button = document.querySelector("#menuToggle");
    const opened = panel.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(opened));
  }

  /** 저장된 테마를 문서에 적용합니다. */
  applyTheme() {
    const theme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
    this.root.dataset.theme = theme;
  }

  /** 라이트/다크 테마를 전환하고 저장합니다. */
  toggleTheme() {
    const next = this.root.dataset.theme === "dark" ? "light" : "dark";
    this.root.dataset.theme = next;
    localStorage.setItem(STORAGE_KEYS.theme, next);
    this.showToast(next === "dark" ? "다크모드를 켰어요." : "라이트모드로 돌아왔어요.");
  }

  /** 아코디언 항목을 열고 닫습니다. */
  toggleAccordion(button) {
    const item = button.closest(".accordion__item");
    const opened = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(opened));
  }

  /** 품종 필터를 설정하고 목록을 갱신합니다. */
  setBreedFilter(button) {
    document.querySelectorAll("[data-filter]").forEach(chip => chip.classList.remove("is-active"));
    button.classList.add("is-active");
    this.state.breedFilter = button.dataset.filter;
    this.renderBreeds();
  }

  /** 품종 카드를 검색어와 필터 기준으로 렌더링합니다. */
  renderBreeds() {
    const keyword = document.querySelector("#breedSearch")?.value.trim().toLowerCase() || "";
    const filtered = breeds.filter(breed => {
      const matchesFilter = this.state.breedFilter === "전체" || [breed.type, breed.size].includes(this.state.breedFilter);
      const matchesKeyword = `${breed.name} ${breed.personality} ${breed.owner}`.toLowerCase().includes(keyword);
      return matchesFilter && matchesKeyword;
    });
    document.querySelector("#breedGrid").innerHTML = filtered.map(breed => `
      <article class="breed-card" data-aos="fade-up">
        <img class="breed-card__image" src="${breed.image}" alt="${breed.name}" loading="lazy">
        <h3>${breed.name}</h3>
        <p>${breed.personality}</p>
        <div class="meta-list">
          <span>털빠짐: ${breed.shedding}</span><span>운동량: ${breed.exercise}</span><span>난이도: ${breed.difficulty}</span>
          <span>추천 집사: ${breed.owner}</span><span>평균수명: ${breed.life}</span><span>평균몸무게: ${breed.weight}</span><span>대표 질병: ${breed.disease}</span>
        </div>
        <button class="mini-button" type="button" data-post-action="bookmark" data-title="${breed.name}"><i data-lucide="bookmark"></i>북마크</button>
      </article>
    `).join("") || "<p>조건에 맞는 품종이 없어요.</p>";
    this.refreshIcons();
  }

  /** 건강 체크리스트를 저장값 기준으로 렌더링합니다. */
  renderHealth() {
    const saved = this.load(STORAGE_KEYS.health, {});
    document.querySelector("#healthChecklist").innerHTML = healthTasks.map(task => `
      <label class="check-item"><input type="checkbox" data-health="${task}" ${saved[task] ? "checked" : ""}>${task}</label>
    `).join("");
    this.updateHealthProgress(saved);
  }

  /** 건강 체크 항목 변경을 저장하고 진행률을 갱신합니다. */
  updateHealth(input) {
    const saved = this.load(STORAGE_KEYS.health, {});
    saved[input.dataset.health] = input.checked;
    this.save(STORAGE_KEYS.health, saved);
    this.updateHealthProgress(saved);
  }

  /** 건강 체크리스트 진행률을 원형 UI에 반영합니다. */
  updateHealthProgress(saved) {
    const done = healthTasks.filter(task => saved[task]).length;
    const percent = Math.round((done / healthTasks.length) * 100);
    const ring = document.querySelector("#healthRing");
    ring.textContent = `${percent}%`;
    ring.style.background = `conic-gradient(var(--color-primary) ${percent * 3.6}deg, rgba(180, 190, 187, 0.24) 0deg)`;
  }

  /** 오늘 건강 체크 데이터를 초기화합니다. */
  resetHealth() {
    localStorage.removeItem(STORAGE_KEYS.health);
    this.renderHealth();
    this.showToast("오늘 체크리스트를 리셋했어요.");
  }

  /** 퀴즈 현재 문항을 렌더링합니다. */
  renderQuiz() {
    const item = quizQuestions[this.state.quizIndex];
    const selected = this.state.quizAnswers[this.state.quizIndex];
    const progress = Math.round(((this.state.quizIndex + 1) / quizQuestions.length) * 100);
    document.querySelector("#quizCard").innerHTML = `
      <div class="quiz-progress" aria-label="퀴즈 진행률"><span style="width:${progress}%"></span></div>
      <p>${this.state.quizIndex + 1} / ${quizQuestions.length}</p>
      <h3>${item.question}</h3>
      <div class="answer-list">${item.answers.map((answer, index) => `
        <label class="answer-option"><input type="radio" name="quizAnswer" value="${index}" ${selected === index ? "checked" : ""}>${answer}</label>
      `).join("")}</div>
      <div class="quiz-actions">
        <button class="button button--soft" type="button" data-quiz-nav="prev" ${this.state.quizIndex === 0 ? "disabled" : ""}>이전</button>
        <button class="button button--primary" type="button" data-quiz-nav="${this.state.quizIndex === quizQuestions.length - 1 ? "submit" : "next"}">
          ${this.state.quizIndex === quizQuestions.length - 1 ? "제출" : "다음"}
        </button>
      </div>
    `;
  }

  /** 퀴즈 이전, 다음, 제출 동작을 처리합니다. */
  navigateQuiz(action) {
    if (action === "prev") this.state.quizIndex = Math.max(0, this.state.quizIndex - 1);
    if (action === "next") this.state.quizIndex = Math.min(quizQuestions.length - 1, this.state.quizIndex + 1);
    if (action === "submit") return this.submitQuiz();
    this.renderQuiz();
  }

  /** 퀴즈 점수를 계산하고 결과 카드와 Chart.js 그래프를 표시합니다. */
  submitQuiz() {
    if (this.state.quizAnswers.includes(null)) {
      this.showToast("모든 문항에 답해주세요.");
      return;
    }
    const correct = quizQuestions.filter((question, index) => question.correct === this.state.quizAnswers[index]).length;
    const score = Math.round((correct / quizQuestions.length) * 100);
    const grade = score >= 90 ? "★★★★★ 프로집사" : score >= 75 ? "★★★★ 우수집사" : score >= 55 ? "★★★ 초보집사" : score >= 35 ? "★★ 공부중" : "★ 예비집사";
    localStorage.setItem(STORAGE_KEYS.bestScore, String(Math.max(score, Number(localStorage.getItem(STORAGE_KEYS.bestScore) || 0))));
    document.querySelector("#resultCard").hidden = false;
    document.querySelector("#scoreGrade").textContent = grade;
    document.querySelector("#scoreText").textContent = `${score}점입니다. 맞힌 문항은 ${correct}개예요.`;
    this.drawChart(score);
    this.renderProfile();
    this.showToast("테스트 결과가 나왔어요.");
  }

  /** Chart.js 도넛 그래프를 그립니다. */
  drawChart(score) {
    const ctx = document.querySelector("#scoreChart");
    if (this.state.chart) this.state.chart.destroy();
    this.state.chart = new Chart(ctx, {
      type: "doughnut",
      data: { labels: ["점수", "남은 영역"], datasets: [{ data: [score, 100 - score], backgroundColor: ["#A8E6CF", "rgba(180,190,187,0.24)"], borderWidth: 0 }] },
      options: { cutout: "70%", plugins: { legend: { display: false } } }
    });
  }

  /** 퀴즈 상태를 처음으로 되돌립니다. */
  resetQuiz() {
    this.state.quizIndex = 0;
    this.state.quizAnswers = Array(quizQuestions.length).fill(null);
    document.querySelector("#resultCard").hidden = true;
    this.renderQuiz();
  }

  /** 테스트 결과 공유 API를 호출하거나 클립보드에 복사합니다. */
  async shareResult() {
    const text = document.querySelector("#scoreText").textContent;
    if (navigator.share) {
      await navigator.share({ title: "멍냥라이프 집사 테스트", text });
    } else {
      await navigator.clipboard.writeText(text);
      this.showToast("결과를 클립보드에 복사했어요.");
    }
  }

  /** 커뮤니티 게시글을 생성해 저장합니다. */
  async createPost(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get("photo");
    const photo = file && file.size ? await this.readFile(file) : "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80";
    this.posts.unshift({
      id: crypto.randomUUID(),
      nickname: form.get("nickname"),
      region: form.get("region"),
      petType: form.get("petType"),
      title: form.get("title"),
      content: form.get("content"),
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: Date.now(),
      photo
    });
    this.save(STORAGE_KEYS.posts, this.posts);
    event.currentTarget.reset();
    this.renderPosts();
    this.renderProfile();
    this.showToast("게시글이 등록됐어요.");
  }

  /** 업로드된 이미지 파일을 Data URL로 변환합니다. */
  readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  /** 커뮤니티 게시글 목록을 검색, 정렬, 제한 개수에 맞춰 렌더링합니다. */
  renderPosts() {
    const keyword = document.querySelector("#postSearch")?.value.trim().toLowerCase() || "";
    const sort = document.querySelector("#postSort")?.value || "latest";
    const sorted = [...this.posts]
      .filter(post => `${post.title} ${post.content} ${post.region} ${post.petType}`.toLowerCase().includes(keyword))
      .sort((a, b) => sort === "popular" ? b.likes - a.likes : b.createdAt - a.createdAt)
      .slice(0, this.state.postLimit);
    document.querySelector("#postList").innerHTML = sorted.map(post => `
      <article class="post-card">
        <div class="post-card__head"><strong>${post.title}</strong><span>${post.region} · ${post.petType}</span></div>
        <img class="post-card__image" src="${post.photo}" alt="${post.title}" loading="lazy">
        <p>${post.content}</p>
        <small>${post.nickname} · 조회 ${post.views}</small>
        <div class="post-card__actions">
          <button class="mini-button" type="button" data-post-action="like" data-id="${post.id}"><i data-lucide="heart"></i>${post.likes}</button>
          <button class="mini-button" type="button" data-post-action="comment" data-id="${post.id}"><i data-lucide="message-circle"></i>${post.comments}</button>
          <button class="mini-button" type="button" data-post-action="view" data-id="${post.id}"><i data-lucide="eye"></i>읽기</button>
          <button class="mini-button" type="button" data-post-action="bookmark" data-title="${post.title}"><i data-lucide="bookmark"></i>저장</button>
        </div>
      </article>
    `).join("") || "<p>게시글이 없어요.</p>";
    this.refreshIcons();
  }

  /** 게시글 좋아요, 댓글, 조회, 북마크 액션을 처리합니다. */
  handlePostAction(button) {
    const action = button.dataset.postAction;
    const post = this.posts.find(item => item.id === button.dataset.id);
    if (action === "bookmark") return this.toggleBookmark(button.dataset.title);
    if (!post) return;
    if (action === "like") post.likes += 1;
    if (action === "comment") post.comments += 1;
    if (action === "view") {
      post.views += 1;
      this.addRecent(post.title);
      this.openModal(post.title, `<p>${post.content}</p><p><strong>${post.region}</strong>의 ${post.petType} 이야기입니다.</p>`);
    }
    this.save(STORAGE_KEYS.posts, this.posts);
    this.renderPosts();
    this.renderProfile();
  }

  /** 게시글 추가 로딩 개수를 늘립니다. */
  loadMorePosts() {
    this.state.postLimit += 3;
    this.renderPosts();
  }

  /** 선택한 지역 기준으로 모임 카드를 렌더링합니다. */
  renderMeetups(region) {
    document.querySelector("#meetupGrid").innerHTML = meetups.filter(meetup => meetup.region === region).map(meetup => `
      <article class="meetup-card">
        <p class="eyebrow">${meetup.region}</p>
        <h3>${meetup.title}</h3>
        <p>${meetup.body}</p>
        <strong>${meetup.date}</strong>
      </article>
    `).join("");
  }

  /** 지역 필터 상태를 바꾸고 모임 목록을 갱신합니다. */
  setRegionFilter(button) {
    document.querySelectorAll("[data-region]").forEach(chip => chip.classList.remove("is-active"));
    button.classList.add("is-active");
    this.renderMeetups(button.dataset.region);
  }

  /** Q&A 질문을 생성해 저장합니다. */
  createQuestion(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    this.questions.unshift({ id: crypto.randomUUID(), title: form.get("title"), content: form.get("content"), best: "아직 답변을 기다리는 중입니다. 경험 있는 집사님이 곧 도와줄 거예요.", likes: 0 });
    this.save(STORAGE_KEYS.questions, this.questions);
    event.currentTarget.reset();
    this.renderQuestions();
    this.showToast("질문이 등록됐어요.");
  }

  /** Q&A 목록을 렌더링합니다. */
  renderQuestions() {
    document.querySelector("#qaList").innerHTML = this.questions.map(question => `
      <article class="qa-card">
        <h3>${question.title}</h3>
        <p>${question.content}</p>
        <ul><li><strong>베스트 답변:</strong> ${question.best}</li></ul>
        <div class="qa-card__actions">
          <button class="mini-button" type="button" data-qa-like="${question.id}"><i data-lucide="thumbs-up"></i>${question.likes}</button>
          <button class="mini-button" type="button" data-post-action="bookmark" data-title="${question.title}"><i data-lucide="bookmark"></i>저장</button>
        </div>
      </article>
    `).join("");
    this.refreshIcons();
  }

  /** Q&A 좋아요를 증가시킵니다. */
  likeQuestion(id) {
    const question = this.questions.find(item => item.id === id);
    if (!question) return;
    question.likes += 1;
    this.save(STORAGE_KEYS.questions, this.questions);
    this.renderQuestions();
  }

  /** 즐겨찾기 목록에 항목을 토글합니다. */
  toggleBookmark(title) {
    this.bookmarks = this.bookmarks.includes(title) ? this.bookmarks.filter(item => item !== title) : [title, ...this.bookmarks].slice(0, 12);
    this.save(STORAGE_KEYS.bookmarks, this.bookmarks);
    this.renderProfile();
    this.showToast(this.bookmarks.includes(title) ? "즐겨찾기에 저장했어요." : "즐겨찾기에서 제거했어요.");
  }

  /** 최근 본 글 목록에 항목을 추가합니다. */
  addRecent(title) {
    this.recentViews = [title, ...this.recentViews.filter(item => item !== title)].slice(0, 8);
    this.save(STORAGE_KEYS.recent, this.recentViews);
    this.renderProfile();
  }

  /** 마이페이지 통계와 활동 목록을 렌더링합니다. */
  renderProfile() {
    const myLikeTotal = this.posts.reduce((sum, post) => sum + post.likes, 0);
    document.querySelector("#myPosts").textContent = this.posts.length;
    document.querySelector("#myLikes").textContent = myLikeTotal;
    document.querySelector("#myBestScore").textContent = localStorage.getItem(STORAGE_KEYS.bestScore) || "0";
    document.querySelector("#myBookmarks").textContent = this.bookmarks.length;
    document.querySelector("#recentViews").innerHTML = this.recentViews.map(item => `<li>${item}</li>`).join("") || "<li>최근 본 글이 없습니다.</li>";
    document.querySelector("#bookmarkList").innerHTML = this.bookmarks.map(item => `<li>${item}</li>`).join("") || "<li>즐겨찾기가 없습니다.</li>";
  }

  /** 전역 검색어 기반 자동완성 목록을 렌더링합니다. */
  renderSuggestions(value) {
    const box = document.querySelector("#searchSuggest");
    const keyword = value.trim().toLowerCase();
    if (!keyword) {
      box.classList.remove("is-open");
      return;
    }
    const candidates = [...breeds.map(item => item.name), ...careGuides.map(item => item.title), ...regions];
    const matches = candidates.filter(item => item.toLowerCase().includes(keyword)).slice(0, 6);
    box.innerHTML = matches.map(item => `<button type="button" data-suggest="${item}" role="option">${item}</button>`).join("");
    box.classList.toggle("is-open", matches.length > 0);
  }

  /** 자동완성 선택값을 검색창에 적용하고 관련 섹션으로 이동합니다. */
  applySuggestion(value) {
    document.querySelector("#globalSearch").value = value;
    document.querySelector("#searchSuggest").classList.remove("is-open");
    const target = breeds.some(breed => breed.name === value) ? "#breeds" : regions.includes(value) ? "#meetups" : "#care";
    document.querySelector(target).scrollIntoView({ behavior: "smooth" });
  }

  /** 히어로 타이핑 문구를 반복 재생합니다. */
  startTyping() {
    const phrases = ["입양 준비부터 건강관리까지", "우리 동네 집사들과 함께", "매일 더 다정한 반려생활"];
    const target = document.querySelector("#typingText");
    let phraseIndex = 0;
    let charIndex = 0;
    const type = () => {
      const phrase = phrases[phraseIndex];
      target.textContent = phrase.slice(0, charIndex);
      charIndex += 1;
      if (charIndex > phrase.length + 8) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
      }
      setTimeout(type, charIndex === 0 ? 250 : 85);
    };
    type();
  }

  /** 스크롤 UI와 IntersectionObserver를 설정합니다. */
  setupObservers() {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { rootMargin: "120px" });
    lazyImages.forEach(image => observer.observe(image));
  }

  /** 스크롤 진행률과 맨 위로 버튼 표시를 갱신합니다. */
  updateScrollUI() {
    const max = document.body.scrollHeight - innerHeight;
    const percent = max > 0 ? (scrollY / max) * 100 : 0;
    document.querySelector("#scrollProgress").style.width = `${percent}%`;
    document.querySelector("#backToTop").classList.toggle("is-visible", scrollY > 600);
  }

  /** 모달 제목과 내용을 설정하고 엽니다. */
  openModal(title, html) {
    this.modalTitle.textContent = title;
    this.modalBody.innerHTML = html;
    this.modal.showModal();
  }

  /** 토스트 메시지를 일정 시간 표시합니다. */
  showToast(message) {
    this.toast.textContent = message;
    this.toast.classList.add("is-visible");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.classList.remove("is-visible"), 2200);
  }

  /** 지정한 시간 간격으로 함수 실행 빈도를 제한합니다. */
  throttle(callback, delay) {
    let waiting = false;
    return (...args) => {
      if (waiting) return;
      waiting = true;
      callback(...args);
      setTimeout(() => { waiting = false; }, delay);
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MungNyangApp();
});
