(() => {
  if (window.__studyDashboardV2Loaded) return;
  window.__studyDashboardV2Loaded = true;

  const STORAGE_KEY = "hexo-study-dashboard-v2";
  const DAY_COUNT = 70;

  const roadmap = [
    { week: 1, title: "Agent 和 LLM 基础", goal: "建立对 LLM、Prompt、Agent、Tool、Memory 的整体理解。", output: "能讲清楚 Tutor Agent 的最小闭环。" },
    { week: 2, title: "ReAct、Planning、Reflection", goal: "理解 Agent 如何思考、规划和反思。", output: "写出一个最小推理流程示例。" },
    { week: 3, title: "Dify、n8n、低代码 Agent", goal: "体验低代码工作流和 Python 开发的差异。", output: "完成一个低代码 Agent 体验记录。" },
    { week: 4, title: "LangGraph 和 Python Agent 开发", goal: "开始用状态流组织自己的 Agent。", output: "能画出或写出基本状态流。" },
    { week: 5, title: "RAG 和 Memory", goal: "理解检索增强和会话记忆的边界。", output: "跑通 paper_reader_agent 的最小版本。" },
    { week: 6, title: "论文阅读 Agent", goal: "把摘要、问答、检索整合成一个可演示小工具。", output: "形成论文阅读 Agent 第一版。" },
    { week: 7, title: "家教智能客服 Agent 完善", goal: "完善业务规则、角色回复和质检逻辑。", output: "形成 Tutor Agent 第一版。" },
    { week: 8, title: "Agent 工程化", goal: "补充结构、日志、README、测试思路。", output: "让项目更像可展示作品。" },
    { week: 9, title: "算法和面试补强", goal: "强化 Python、算法、项目表达和常见问答。", output: "整理一版面试备忘录。" },
    { week: 10, title: "简历、项目包装、实习投递", goal: "把项目讲法、简历表达和投递节奏做好。", output: "形成可投递版本。" },
  ];

  const weekOneTasks = [
    {
      title: "认识 LLM、Agent 和暑期总目标",
      theme: "把方向校准，知道自己为什么学、学什么、怎么学。",
      duration: 2.5,
      tasks: [
        "复盘自己暑假的实习目标，写出三类岗位方向。",
        "回顾 Hello-Agents 前三章，列出已经学过的概念和仍然模糊的点。",
        "用自己的话写一段：LLM 和 Agent 的区别是什么。",
        "补充你最想投的岗位关键词。",
      ],
      output: "能用自己的话区分 LLM、Agent、LLM 应用。",
    },
    {
      title: "Prompt 基础与提示词实验",
      theme: "理解提示词为什么会改变模型表现。",
      duration: 2.5,
      tasks: [
        "学习 Prompt 的基本结构：角色、任务、约束、输出格式。",
        "对比一个随意提问和一个结构化 Prompt 的输出差异。",
        "改写一个自己的学习总结提示词。",
        "记录哪些 Prompt 更适合做代码检查和项目包装。",
      ],
      output: "写出 2-3 个更清晰的 Prompt 示例。",
    },
    {
      title: "Agent 的基本组成模块",
      theme: "理解一个 Agent 系统最小要有哪些积木。",
      duration: 2.5,
      tasks: [
        "理解输入、模型、Prompt、工具、记忆、输出这几个模块。",
        "阅读 tutor_agent/main.py，写出每一步在做什么。",
        "阅读 tutor_agent/graph.py，理解为什么后面会过渡到 LangGraph。",
        "把 Tutor Agent 的流程用 5 句话讲清楚。",
      ],
      output: "能画出 tutor_agent 的最小流程图。",
    },
    {
      title: "Tool Calling 的直觉理解",
      theme: "理解为什么 Agent 不应该什么都靠模型猜。",
      duration: 2.5,
      tasks: [
        "运行 tutor_agent，观察输入如何变成结构化订单。",
        "阅读 order_parser、teacher_search、fee_calculator 三个文件。",
        "思考哪些工作适合用规则函数，哪些才适合交给模型。",
        "尝试新增一个城市或科目关键词。",
      ],
      output: "能解释 parser、search、calculator 三个工具的分工。",
    },
    {
      title: "Memory 和多轮对话基础",
      theme: "理解 Agent 为什么需要记住历史。",
      duration: 2.5,
      tasks: [
        "阅读 conversation_memory.py，理解 add_message 和 get_history。",
        "连续运行 tutor_agent 两次，观察历史记录变化。",
        "思考为什么真实系统里 Memory 往往不止一个 JSON 文件。",
        "写一段 Memory 在客服、论文问答、个人助理里的作用。",
      ],
      output: "能区分短期记忆和外部知识检索。",
    },
    {
      title: "角色 Agent 与回复质检",
      theme: "理解角色化输出和合规检查。",
      duration: 2.5,
      tasks: [
        "阅读三个 agent 文件，比较它们的输出目标。",
        "思考为什么对家长和老师的回复不能完全一样。",
        "自己举一个不合规回复例子，观察质检规则是否能识别。",
        "写下后续可以怎样把质检模块做得更像真实系统。",
      ],
      output: "能说清 parent_agent、teacher_agent、quality_agent 的职责。",
    },
    {
      title: "第 1 周复盘与项目讲解练习",
      theme: "把这一周学过的内容变成能表达的成果。",
      duration: 2.5,
      tasks: [
        "填写 weekly_review.md，写出本周收获和卡点。",
        "更新 progress.md，第 1 周标记阶段性完成情况。",
        "练习用 3-5 分钟讲清 tutor_agent 的流程。",
        "列出下周 ReAct 学习前必须补清楚的 3 个问题。",
      ],
      output: "形成 1 份周复盘和 1 段项目讲解稿。",
    },
  ];

  const questionBank = {
    agent: [
      {
        title: "Agent 和普通 Chatbot 有什么区别？",
        answer: "普通 Chatbot 更偏对话输出，Agent 更强调目标驱动、工具调用、状态管理和任务执行。Agent 通常会拆步骤、调用工具、记忆上下文，并对结果做检查。"
      },
      {
        title: "什么是 ReAct？它的 Thought、Action、Observation 分别是什么？",
        answer: "ReAct 是一种让模型交替推理和行动的范式。Thought 是当前推理想法，Action 是调用工具或采取动作，Observation 是动作返回的结果。"
      }
    ],
    llm: [
      {
        title: "什么是模型幻觉？怎么缓解？",
        answer: "模型幻觉是模型在没有可靠依据时仍然生成看似合理但不真实的内容。缓解方法包括更清晰的 Prompt、加入检索、要求引用依据、设置拒答策略和结果校验。"
      },
      {
        title: "Agent 项目如何写进简历？",
        answer: "不要只写做了一个聊天机器人，而要写成目标、模块、技术点和结果，例如：基于 Tool Calling 与状态流设计了多模块 Agent，支持任务拆解、规则校验与结果输出。"
      }
    ],
    rag: [
      {
        title: "RAG 能缓解什么问题？",
        answer: "RAG 主要缓解大模型知识时效性不足、事实错误和上下文缺失问题，通过从外部知识源检索相关信息再交给模型生成答案。"
      },
      {
        title: "Memory 和 RAG 的区别是什么？",
        answer: "Memory 偏向保存用户会话和系统状态，解决连续对话上下文问题；RAG 偏向从外部知识库找资料，解决事实知识和文档问答问题。"
      }
    ],
    python: [
      {
        title: "为什么要把逻辑拆成多个 Python 文件，而不是全写在 main.py？",
        answer: "拆文件能让职责更清晰，便于维护、测试和扩展。尤其在 Agent 项目里，工具、记忆、角色回复、流程控制通常属于不同层次。"
      },
      {
        title: "什么情况下适合用类，什么情况下函数就够了？",
        answer: "如果逻辑需要封装状态、复用实例方法或者维护对象生命周期，适合用类；如果只是单一的无状态处理过程，函数通常更简单。"
      }
    ],
    algorithm: [
      {
        title: "双指针适合解决什么问题？",
        answer: "双指针常用于有序数组、滑动窗口、区间收缩、链表环检测等问题，本质是用两个位置协同减少重复遍历。"
      },
      {
        title: "哈希表为什么常用于优化查找复杂度？",
        answer: "因为哈希表平均能在 O(1) 时间完成插入和查询，适合处理去重、计数、映射关系和是否存在等问题。"
      }
    ],
    interview: [
      {
        title: "Tool Calling 在 Agent 中有什么作用？",
        answer: "它让模型把更稳定、结构化、可验证的工作交给外部函数或系统，比如搜索、解析、计算、查询数据库，而不是全靠模型猜。"
      },
      {
        title: "LangGraph 为什么适合做 Agent 状态流？",
        answer: "因为它天然适合表达节点、状态、分支、回路和多步骤任务，方便把复杂 Agent 从线性 prompt 调用升级成可维护的工作流。"
      }
    ]
  };

  const defaultState = {
    settings: {
      startDate: new Date().toISOString().slice(0, 10),
      dailyHours: 2.5,
      themeMode: "dark",
      reminderTime: "20:00",
      reminderMessage: "该开始今天的 AI Agent 学习了。",
      reminderEnabled: false
    },
    timer: {
      focusMinutes: 25,
      breakMinutes: 5,
      preset: "25-5",
      remainingSeconds: 25 * 60,
      mode: "focus",
      running: false,
      completedPomodoros: 0
    },
    ui: {
      activeTab: "theme-panel",
      expandedWeeks: [1],
      lastQuestionCategory: "agent",
      currentQuestion: null,
      answerVisible: false
    },
    dailyRecords: {},
    weeklyReviews: {},
    activityFeed: [],
    questionHistory: [],
    lastReminderDate: ""
  };

  let state = loadState();
  let timerHandle = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : clone(defaultState);
      const merged = deepMerge(clone(defaultState), parsed);
      ensureSeedData(merged);
      return merged;
    } catch (error) {
      console.error("读取学习仪表盘数据失败", error);
      const fallback = clone(defaultState);
      ensureSeedData(fallback);
      return fallback;
    }
  }

  function ensureSeedData(targetState) {
    if (!targetState.activityFeed.length) {
      targetState.activityFeed.push(
        createFeedItem("system", "欢迎来到 AI Agent 学习打卡页。先完成今天的任务，再留下一条打卡记录。"),
        createFeedItem("tip", "建议先点“开始今日学习”，再按任务顺序推进。")
      );
    }
    if (!targetState.ui.currentQuestion) {
      const first = questionBank.agent[0];
      targetState.ui.currentQuestion = { category: "agent", index: 0, title: first.title, answer: first.answer };
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function deepMerge(target, source) {
    Object.keys(source || {}).forEach((key) => {
      const value = source[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== "object") {
          target[key] = {};
        }
        deepMerge(target[key], value);
      } else {
        target[key] = value;
      }
    });
    return target;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getRoot() {
    return document.getElementById("study-dashboard-page");
  }

  function getTodayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function getDateByOffset(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().slice(0, 10);
  }

  function createFeedItem(type, content, date = new Date().toLocaleString("zh-CN")) {
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      content,
      date
    };
  }

  function getTodayInfo() {
    const start = new Date(`${state.settings.startDate}T00:00:00`);
    const today = new Date();
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = Math.floor((currentDay - start) / 86400000);
    const dayNumber = Math.max(1, Math.min(DAY_COUNT, diff + 1));
    const week = Math.ceil(dayNumber / 7);
    const dayInWeek = ((dayNumber - 1) % 7) + 1;
    const weekConfig = roadmap[week - 1];
    const specific = week === 1 ? weekOneTasks[dayInWeek - 1] : buildGenericDay(weekConfig, dayNumber);
    return {
      dateKey: getTodayKey(),
      dayNumber,
      week,
      dayInWeek,
      title: specific.title,
      theme: specific.theme,
      duration: specific.duration,
      tasks: specific.tasks,
      output: specific.output,
      summaryPath: `Agent_Summer_Internship_Plan/notes/week${String(week).padStart(2, "0")}/Day${String(dayNumber).padStart(2, "0")}_xxx.md`
    };
  }

  function buildGenericDay(weekConfig, dayNumber) {
    return {
      title: `${weekConfig.title} · Day ${String(dayNumber).padStart(2, "0")}`,
      theme: `本周重点是：${weekConfig.goal}`,
      duration: state.settings.dailyHours,
      tasks: [
        `先回顾本周主题：${weekConfig.title}`,
        `完成一个核心任务：${weekConfig.goal}`,
        `写下今天的阶段产出：${weekConfig.output}`,
        "学习结束后，把理解和问题整理成 Markdown 日报。"
      ],
      output: weekConfig.output
    };
  }

  function getTodayRecord() {
    const info = getTodayInfo();
    if (!state.dailyRecords[info.dateKey]) {
      state.dailyRecords[info.dateKey] = {
        dayNumber: info.dayNumber,
        week: info.week,
        status: "not_started",
        studyMinutes: 0,
        taskChecks: Array(info.tasks.length).fill(false),
        progressSavedAt: "",
        checkin: null,
        summaryDraft: "",
        biggestWin: "",
        blocker: "",
        nextPlan: ""
      };
    }
    if (!Array.isArray(state.dailyRecords[info.dateKey].taskChecks) || state.dailyRecords[info.dateKey].taskChecks.length !== info.tasks.length) {
      const current = state.dailyRecords[info.dateKey].taskChecks || [];
      state.dailyRecords[info.dateKey].taskChecks = info.tasks.map((_, index) => !!current[index]);
    }
    return state.dailyRecords[info.dateKey];
  }

  function getTaskProgress(record) {
    if (!record.taskChecks.length) return 0;
    const done = record.taskChecks.filter(Boolean).length;
    return Math.round((done / record.taskChecks.length) * 100);
  }

  function getWeeklyProgress(week) {
    const startDay = (week - 1) * 7 + 1;
    const endDay = startDay + 6;
    let completed = 0;
    for (const record of Object.values(state.dailyRecords)) {
      if (record.dayNumber >= startDay && record.dayNumber <= endday && record.status="==" "done") { completed +="1;" } return math.round((completed 7) * 100); function getoverallprogress() const => item.status === "done").length;
    return Math.round((completed / DAY_COUNT) * 100);
  }

  function getTotalStudyMinutes() {
    return Object.values(state.dailyRecords).reduce((sum, item) => sum + (item.studyMinutes || 0), 0);
  }

  function calculateStreak() {
    const checkedDates = Object.entries(state.dailyRecords)
      .filter(([, record]) => record.checkin && record.checkin.checked)
      .map(([date]) => date)
      .sort()
      .reverse();
    if (!checkedDates.length) return 0;

    let streak = 0;
    let cursor = new Date(getTodayKey());
    while (true) {
      const key = cursor.toISOString().slice(0, 10);
      if (checkedDates.includes(key)) {
        streak += 1;
        cursor = new Date(cursor.getTime() - 86400000);
      } else {
        break;
      }
    }
    return streak;
  }

  function render() {
    const root = getRoot();
    if (!root) return;
    const today = getTodayInfo();
    const record = getTodayRecord();
    applyTheme();
    renderHero(today);
    renderOverview(today, record);
    renderTodayPanel(today, record);
    renderProgress(today, record);
    renderCheckin(record);
    renderReminder();
    renderRecentData();
    renderReview(today.week);
    renderQuestionModule();
    renderRoadmap(today.week);
    renderModal(false);
  }

  function applyTheme() {
    document.body.setAttribute("data-study-mode", state.settings.themeMode);
    const toggle = document.getElementById("study-theme-toggle");
    if (!toggle) return;
    const isDark = state.settings.themeMode === "dark";
    toggle.setAttribute("aria-label", isDark ? "切换到浅色主题" : "切换到深色主题");
    toggle.setAttribute("title", isDark ? "切换到浅色主题" : "切换到深色主题");
    toggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i><span class="study-visually-hidden">切换到浅色主题</span>'
      : '<i class="fas fa-moon"></i><span class="study-visually-hidden">切换到深色主题</span>';
  }

  function renderHero(today) {
    setText("study-hero-week", `第 ${today.week} 周`);
    setText("study-hero-day", `Day ${String(today.dayNumber).padStart(2, "0")}`);
    setText("study-hero-streak", `${calculateStreak()} 天`);
  }

  function renderOverview(today, record) {
    setText("study-metric-week", `第 ${today.week} 周`);
    setText("study-metric-day", `Day ${String(today.dayNumber).padStart(2, "0")}`);
    setText("study-metric-streak", `${calculateStreak()} 天`);
    setText("study-metric-total", `${getTotalStudyMinutes()} 分钟`);
    setText("study-metric-week-trend", roadmap[today.week - 1].goal);
    setText("study-metric-day-trend", `今日完成度 ${getTaskProgress(record)}%`);
    setText("study-metric-streak-trend", calculateStreak() > 0 ? "保持节奏，连续性正在积累" : "今天完成打卡就会开始累计");
    setText("study-metric-total-trend", getTotalStudyMinutes() > 0 ? `相比昨日多累计了学习痕迹` : "先保存一次学习进度开始累计");
  }

  function renderTodayPanel(today, record) {
    setText("study-today-title", `Day ${String(today.dayNumber).padStart(2, "0")}：${today.title}`);
    setText("study-today-hours", `建议学习时长 ${today.duration} 小时`);
    setText("study-today-theme", today.theme);
    setText("study-today-output", today.output);
    setText("study-summary-path", today.summaryPath);
    document.getElementById("study-summary-template").value = record.summaryDraft || "";

    renderTabs();
    renderTaskList(today, record);
    renderTimerCard();
  }

  function renderTimerCard() {
    const remaining = state.timer.remainingSeconds;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const modeText = state.timer.mode === "focus" ? "学习阶段" : "休息阶段";
    const modeDesc = state.timer.mode === "focus" ? "当前专注学习中" : "当前进入短休息";

    setText("study-timer-mode", modeText);
    setText("study-timer-display", `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
    setText("study-pomodoro-count", String(state.timer.completedPomodoros));
    setText("study-focus-minutes", `${state.timer.focusMinutes} 分钟`);
    document.getElementById("study-focus-input").value = state.timer.focusMinutes;
    document.getElementById("study-break-input").value = state.timer.breakMinutes;
    document.querySelectorAll(".study-preset").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.preset === state.timer.preset);
    });
    const startButton = document.getElementById("study-timer-start");
    if (startButton) {
      startButton.innerHTML = state.timer.running
        ? '<i class="fas fa-bolt"></i><span>专注进行中</span>'
        : '<i class="fas fa-play"></i><span>开始番茄钟</span>';
      startButton.disabled = state.timer.running;
    }
    const pauseButton = document.getElementById("study-timer-pause");
    if (pauseButton) {
      pauseButton.disabled = !state.timer.running;
      pauseButton.title = modeDesc;
    }
  }

  function renderTabs() {
    const active = state.ui.activeTab;
    document.querySelectorAll(".study-tab").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tabTarget === active);
    });
    document.querySelectorAll(".study-tab-panel").forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === active);
    });
  }

  function renderTaskList(today, record) {
    const list = document.getElementById("study-task-list");
    list.innerHTML = "";
    today.tasks.forEach((task, index) => {
      const checked = !!record.taskChecks[index];
      const item = document.createElement("label");
      item.className = `study-task${checked ? " is-done" : ""}`;
      item.innerHTML = `
        <input type="checkbox" data-task-index="${index}" ${checked ? "checked" : ""}>
        <span class="study-task__box"></span>
        <div class="study-task__content">
          <strong>任务 ${index + 1}</strong>
          <p>${escapeHtml(task)}</p>
        </div>
      `;
      list.appendChild(item);
    });
    const doneCount = record.taskChecks.filter(Boolean).length;
    const percent = getTaskProgress(record);
    setText("study-task-progress-text", `${doneCount} / ${record.taskChecks.length}`);
    document.getElementById("study-task-progress-bar").style.width = `${percent}%`;
  }

  function renderProgress(today, record) {
    const dailyPercent = getTaskProgress(record);
    const weeklyPercent = getWeeklyProgress(today.week);
    const overallPercent = getOverallProgress();

    setText("study-progress-daily-label", `${dailyPercent}%`);
    setText("study-progress-weekly-label", `${weeklyPercent}%`);
    setText("study-progress-overall-label", `${overallPercent}%`);
    document.getElementById("study-progress-daily-bar").style.width = `${dailyPercent}%`;
    document.getElementById("study-progress-weekly-bar").style.width = `${weeklyPercent}%`;
    document.getElementById("study-progress-overall-bar").style.width = `${overallPercent}%`;
    document.getElementById("study-progress-minutes").value = record.studyMinutes || "";
    document.getElementById("study-progress-status").value = record.status || "not_started";
  }

  function renderCheckin(record) {
    const checkin = record.checkin || {};
    document.getElementById("study-checkin-done").checked = !!checkin.checked;
    document.getElementById("study-checkin-minutes").value = checkin.minutes || record.studyMinutes || "";
    document.getElementById("study-checkin-win").value = checkin.biggestWin || "";
    document.getElementById("study-checkin-blocker").value = checkin.blocker || "";
    document.getElementById("study-checkin-next").value = checkin.nextPlan || "";
    setText(
      "study-checkin-banner-text",
      checkin.checked
        ? `今天已打卡，连续打卡 ${calculateStreak()} 天。`
        : "今天还没有打卡，完成后会自动累计连续天数。"
    );
  }

  function renderReminder() {
    document.getElementById("study-reminder-time").value = state.settings.reminderTime;
    document.getElementById("study-reminder-message").value = state.settings.reminderMessage;
    setText("study-reminder-status", state.settings.reminderEnabled ? "已开启" : "未开启");
    setText(
      "study-reminder-hint",
      "Notification" in window
        ? "浏览器支持提醒。开启后页面打开时会按本地时间触发提醒演示。"
        : "当前浏览器不支持 Notification API，只能保留本地设置。"
    );
  }

  function renderRecentData() {
    const activity = document.getElementById("study-record-list");
    const feed = state.activityFeed.slice().reverse().slice(0, 8);
    activity.innerHTML = "";
    setText("study-record-count", `${feed.length} 条`);
    if (!feed.length) {
      activity.innerHTML = `<div class="study-empty">还没有记录，保存一次进度后这里会自动追加。</div>`;
    } else {
      feed.forEach((item) => {
        const card = document.createElement("article");
        card.className = "study-record-card";
        card.innerHTML = `
          <div class="study-record-card__meta">
            <span>${escapeHtml(item.type)}</span>
            <time>${escapeHtml(item.date)}</time>
          </div>
          <p>${escapeHtml(item.content)}</p>
        `;
        activity.appendChild(card);
      });
    }

    const logs = document.getElementById("study-checkin-log");
    const checkins = Object.entries(state.dailyRecords)
      .filter(([, item]) => item.checkin && item.checkin.checked)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 8);
    logs.innerHTML = "";
    setText("study-checkin-log-count", `${checkins.length} 条`);
    if (!checkins.length) {
      logs.innerHTML = `<div class="study-empty">今天打卡后，日志会自动出现在这里。</div>`;
    } else {
      checkins.forEach(([date, item]) => {
        const card = document.createElement("article");
        card.className = "study-log-card";
        card.innerHTML = `
          <div class="study-log-card__meta">
            <strong>${date}</strong>
            <span>${item.checkin.minutes || item.studyMinutes || 0} 分钟</span>
          </div>
          <p>最大收获：${escapeHtml(item.checkin.biggestWin || "未填写")}</p>
          <p>明天计划：${escapeHtml(item.checkin.nextPlan || "未填写")}</p>
        `;
        logs.appendChild(card);
      });
    }
  }

  function renderReview(currentWeek) {
    const select = document.getElementById("study-review-week");
    if (!select.dataset.ready) {
      select.innerHTML = roadmap
        .map((item) => `<option value="${item.week}">第 ${item.week} 周 · ${escapeHtml(item.title)}</option>`)
        .join("");
      select.dataset.ready = "true";
      select.value = String(currentWeek);
    }
    const week = Number(select.value || currentWeek);
    const review = state.weeklyReviews[week] || {};
    setText("study-review-week-badge", `第 ${week} 周`);
    document.getElementById("study-review-learned").value = review.learned || "";
    document.getElementById("study-review-win").value = review.win || "";
    document.getElementById("study-review-blockers").value = review.blockers || "";
    document.getElementById("study-review-next").value = review.next || "";
  }

  function renderQuestionModule() {
    const current = state.ui.currentQuestion;
    document.getElementById("study-question-category").value = state.ui.lastQuestionCategory;
    document.getElementById("study-question-title").textContent = current ? current.title : "点击“随机题目”开始";
    const answer = document.getElementById("study-question-answer-reference");
    answer.textContent = current ? current.answer : "";
    answer.classList.toggle("is-hidden", !state.ui.answerVisible);

    const historyWrap = document.getElementById("study-question-history");
    historyWrap.innerHTML = "";
    const history = state.questionHistory.slice().reverse().slice(0, 5);
    if (!history.length) {
      historyWrap.innerHTML = `<div class="study-empty">保存题目记录后，这里会展示最近回答。</div>`;
      return;
    }
    history.forEach((item) => {
      const card = document.createElement("article");
      card.className = "study-record-card";
      card.innerHTML = `
        <div class="study-record-card__meta">
          <span>${escapeHtml(item.category)}</span>
          <time>${escapeHtml(item.date)}</time>
        </div>
        <p><strong>${escapeHtml(item.title)}</strong></p>
        <p>${escapeHtml(item.response)}</p>
      `;
      historyWrap.appendChild(card);
    });
  }

  function renderRoadmap(currentWeek) {
    const wrap = document.getElementById("study-roadmap-list");
    wrap.innerHTML = "";
    roadmap.forEach((item) => {
      const status = item.week < currentWeek ? "done" : item.week === currentWeek ? "current" : "todo";
      const expanded = state.ui.expandedWeeks.includes(item.week);
      const weeklyProgress = getWeeklyProgress(item.week);
      const card = document.createElement("article");
      card.className = `study-roadmap-card is-${status}${expanded ? " is-open" : ""}`;
      card.innerHTML = `
        <button class="study-roadmap-card__head" type="button" data-roadmap-week="${item.week}">
          <span class="study-roadmap-card__dot"></span>
          <div class="study-roadmap-card__summary">
            <strong>第 ${item.week} 周：${escapeHtml(item.title)}</strong>
            <em>${status === "done" ? "已完成" : status === "current" ? "进行中" : "未开始"}</em>
          </div>
          <span class="study-roadmap-card__chevron"><i class="fas fa-chevron-down"></i></span>
        </button>
        <div class="study-roadmap-card__body" ${expanded ? "" : " hidden"}>
          <p>周目标：${escapeHtml(item.goal)}</p>
          <p>阶段产出：${escapeHtml(item.output)}</p>
          <div class="study-progress is-green">
            <span style="width:${weeklyProgress}%"></span>
          </div>
        </div>
      `;
      wrap.appendChild(card);
    });
  }

  function renderModal(open) {
    const modal = document.getElementById("study-confirm-modal");
    modal.hidden = !open;
    modal.classList.toggle("is-open", open);
  }

  function setText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
  }

  function generateSummaryTemplate() {
    const today = getTodayInfo();
    const record = getTodayRecord();
    const checkedTasks = today.tasks
      .map((task, index) => (record.taskChecks[index] ? `- [x] ${task}` : `- [ ] ${task}`))
      .join("\n");

    const template = `# Day ${String(today.dayNumber).padStart(2, "0")} 学习总结：${today.title}

## 1. 今天学习了什么

${checkedTasks}

## 2. 我用自己的话解释

今天最重要的概念是：

> 

小朋友版解释：

> 

## 3. 和 Agent 开发的关系

这个知识点在 Agent 系统里有什么用？

- 
- 

## 4. 今天写了什么代码

文件路径：

\`\`\`text

\`\`\`

实现功能：

- 

## 5. 今天遇到的问题

问题 1：

问题 2：

## 6. 明天要做什么

- 
- 
- 

## 7. 今日自评分

理解程度：/10
代码完成度：/10
实习相关度：/10
`;

    record.summaryDraft = template;
    saveState();
    document.getElementById("study-summary-template").value = template;
    state.ui.activeTab = "summary-panel";
    renderTabs();
    showToast("今日总结模板已生成。");
  }

  function updateTaskCheck(index, checked) {
    const record = getTodayRecord();
    record.taskChecks[index] = checked;
    if (checked && record.status === "not_started") {
      record.status = "in_progress";
    }
    saveState();
    render();
  }

  function saveTaskProgress() {
    const today = getTodayInfo();
    const record = getTodayRecord();
    record.progressSavedAt = new Date().toLocaleString("zh-CN");
    state.activityFeed.push(createFeedItem("任务进度", `Day ${String(today.dayNumber).padStart(2, "0")} 的任务进度已保存，完成度 ${getTaskProgress(record)}%。`));
    saveState();
    renderRecentData();
    showToast("今日任务进度已保存。");
  }

  function saveLearningProgress() {
    const today = getTodayInfo();
    const record = getTodayRecord();
    const minutes = Number(document.getElementById("study-progress-minutes").value) || 0;
    record.studyMinutes = minutes;
    record.status = document.getElementById("study-progress-status").value;
    record.progressSavedAt = new Date().toLocaleString("zh-CN");
    state.activityFeed.push(createFeedItem("学习进度", `Day ${String(today.dayNumber).padStart(2, "0")} 保存了学习进度：${minutes} 分钟，状态为 ${progressStatusText(record.status)}。`));
    saveState();
    render();
    showToast("学习进度已保存。");
  }

  function progressStatusText(value) {
    return {
      not_started: "未开始",
      in_progress: "学习中",
      done: "已完成",
      catch_up: "需要补学"
    }[value] || "未开始";
  }

  function saveCheckin() {
    const key = getTodayKey();
    const record = getTodayRecord();
    if (record.checkin && record.checkin.checked) {
      showToast("今天已经打卡过了。");
      return;
    }

    const minutes = Number(document.getElementById("study-checkin-minutes").value) || record.studyMinutes || 0;
    const biggestWin = document.getElementById("study-checkin-win").value.trim();
    const blocker = document.getElementById("study-checkin-blocker").value.trim();
    const nextPlan = document.getElementById("study-checkin-next").value.trim();
    record.studyMinutes = Math.max(record.studyMinutes || 0, minutes);
    record.checkin = {
      checked: true,
      checkedDate: key,
      minutes,
      biggestWin,
      blocker,
      nextPlan
    };
    record.biggestWin = biggestWin;
    record.blocker = blocker;
    record.nextPlan = nextPlan;
    if (record.status === "not_started") {
      record.status = "in_progress";
    }

    state.activityFeed.push(createFeedItem("今日打卡", `完成 ${key} 的学习打卡，记录了 ${minutes} 分钟、最大收获和明天计划。`));
    saveState();
    render();
    showToast(`打卡成功，当前连续 ${calculateStreak()} 天。`);
  }

  function toggleReminder() {
    if (!("Notification" in window)) {
      showToast("当前浏览器不支持通知提醒。");
      return;
    }

    const nextState = !state.settings.reminderEnabled;
    state.settings.reminderTime = document.getElementById("study-reminder-time").value;
    state.settings.reminderMessage = document.getElementById("study-reminder-message").value.trim() || defaultState.settings.reminderMessage;

    if (nextState && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          showToast("浏览器通知权限未开启。");
          return;
        }
        state.settings.reminderEnabled = true;
        saveState();
        renderReminder();
        showToast("本地学习提醒已开启。");
      });
      return;
    }

    if (nextState && Notification.permission !== "granted") {
      showToast("请先允许浏览器通知权限。");
      return;
    }

    state.settings.reminderEnabled = nextState;
    saveState();
    renderReminder();
    showToast(nextState ? "本地学习提醒已开启。" : "本地学习提醒已关闭。");
  }

  function testReminder() {
    if (!("Notification" in window)) {
      showToast("当前浏览器不支持 Notification API。");
      return;
    }
    if (Notification.permission !== "granted") {
      showToast("请先开启浏览器通知权限。");
      return;
    }
    const message = document.getElementById("study-reminder-message").value.trim() || state.settings.reminderMessage;
    new Notification("学习提醒测试", { body: message });
    showToast("测试提醒已触发。");
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ai-study-dashboard-${getTodayKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("本地学习数据已导出。");
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state = deepMerge(clone(defaultState), JSON.parse(reader.result));
        ensureSeedData(state);
        saveState();
        render();
        showToast("学习数据导入成功。");
      } catch (error) {
        showToast("导入失败，请确认 JSON 文件有效。");
      }
    };
    reader.readAsText(file, "utf-8");
  }

  function clearData() {
    state = clone(defaultState);
    ensureSeedData(state);
    saveState();
    stopTimer();
    render();
    renderModal(false);
    showToast("本地学习数据已清空。");
  }

  function saveReview() {
    const week = Number(document.getElementById("study-review-week").value);
    state.weeklyReviews[week] = {
      learned: document.getElementById("study-review-learned").value.trim(),
      win: document.getElementById("study-review-win").value.trim(),
      blockers: document.getElementById("study-review-blockers").value.trim(),
      next: document.getElementById("study-review-next").value.trim()
    };
    state.activityFeed.push(createFeedItem("周复盘", `第 ${week} 周复盘已保存。`));
    saveState();
    renderReview(week);
    renderRecentData();
    showToast("周复盘已保存。");
  }

  function randomQuestion() {
    const category = document.getElementById("study-question-category").value;
    const list = questionBank[category];
    const index = Math.floor(Math.random() * list.length);
    const item = list[index];
    state.ui.lastQuestionCategory = category;
    state.ui.currentQuestion = { category, index, title: item.title, answer: item.answer };
    state.ui.answerVisible = false;
    saveState();
    renderQuestionModule();
  }

  function toggleReferenceAnswer() {
    state.ui.answerVisible = !state.ui.answerVisible;
    saveState();
    renderQuestionModule();
  }

  function saveQuestionRecord() {
    const current = state.ui.currentQuestion;
    if (!current) {
      showToast("请先生成一道题目。");
      return;
    }
    const response = document.getElementById("study-question-response").value.trim();
    if (!response) {
      showToast("先写下你的回答，再保存。");
      return;
    }
    state.questionHistory.push({
      category: current.category,
      title: current.title,
      response,
      answer: current.answer,
      date: new Date().toLocaleString("zh-CN")
    });
    state.activityFeed.push(createFeedItem("题库记录", `保存了一道 ${current.category.toUpperCase()} 分类题目的回答。`));
    saveState();
    document.getElementById("study-question-response").value = "";
    renderQuestionModule();
    renderRecentData();
    showToast("题目记录已保存。");
  }

  function toggleTheme() {
    state.settings.themeMode = state.settings.themeMode === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
    showToast(state.settings.themeMode === "dark" ? "已切换到深色主题。" : "已切换到浅色主题。");
  }

  function toggleRoadmapWeek(week) {
    const set = new Set(state.ui.expandedWeeks);
    if (set.has(week)) {
      set.delete(week);
    } else {
      set.add(week);
    }
    state.ui.expandedWeeks = Array.from(set).sort((a, b) => a - b);
    saveState();
    renderRoadmap(getTodayInfo().week);
  }

  function activateTab(target) {
    state.ui.activeTab = target;
    saveState();
    renderTabs();
  }

  function showToast(message) {
    const toast = document.getElementById("study-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  function startTimer() {
    if (timerHandle) return;
    state.timer.running = true;
    saveState();
    timerHandle = window.setInterval(() => {
      if (state.timer.remainingSeconds > 0) {
        state.timer.remainingSeconds -= 1;
        renderTodayPanel(getTodayInfo(), getTodayRecord());
        return;
      }

      if (state.timer.mode === "focus") {
        const record = getTodayRecord();
        record.studyMinutes += state.timer.focusMinutes;
        if (record.status === "not_started") {
          record.status = "in_progress";
        }
        state.timer.completedPomodoros += 1;
        state.timer.mode = "break";
        state.timer.remainingSeconds = state.timer.breakMinutes * 60;
        state.activityFeed.push(createFeedItem("番茄钟", `完成了一个 ${state.timer.focusMinutes} 分钟的学习番茄。`));
        showToast("一个学习番茄已完成。");
      } else {
        state.timer.mode = "focus";
        state.timer.remainingSeconds = state.timer.focusMinutes * 60;
        showToast("休息结束，继续下一轮。");
      }
      saveState();
      render();
    }, 1000);
  }

  function pauseTimer() {
    if (!timerHandle) return;
    clearInterval(timerHandle);
    timerHandle = null;
    state.timer.running = false;
    saveState();
    renderTodayPanel(getTodayInfo(), getTodayRecord());
  }

  function stopTimer() {
    if (timerHandle) {
      clearInterval(timerHandle);
      timerHandle = null;
    }
    state.timer.running = false;
  }

  function resetTimer() {
    stopTimer();
    state.timer.remainingSeconds = state.timer.focusMinutes * 60;
    state.timer.mode = "focus";
    saveState();
    render();
  }

  function setPreset(preset) {
    if (preset === "25-5") {
      state.timer.focusMinutes = 25;
      state.timer.breakMinutes = 5;
    }
    if (preset === "50-10") {
      state.timer.focusMinutes = 50;
      state.timer.breakMinutes = 10;
    }
    if (preset === "90-15") {
      state.timer.focusMinutes = 90;
      state.timer.breakMinutes = 15;
    }
    state.timer.preset = preset;
    state.timer.remainingSeconds = state.timer.focusMinutes * 60;
    saveState();
    render();
  }

  function applyCustomTimerValues() {
    const focus = Number(document.getElementById("study-focus-input").value) || 25;
    const rest = Number(document.getElementById("study-break-input").value) || 5;
    state.timer.focusMinutes = focus;
    state.timer.breakMinutes = rest;
    state.timer.preset = "custom";
    if (!state.timer.running) {
      state.timer.remainingSeconds = focus * 60;
      state.timer.mode = "focus";
    }
    saveState();
    renderTimerCard();
  }

  function checkReminder() {
    if (!state.settings.reminderEnabled || !("Notification" in window) || Notification.permission !== "granted") return;
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const todayKey = getTodayKey();
    if (currentTime === state.settings.reminderTime && state.lastReminderDate !== todayKey) {
      new Notification("AI Agent 学习提醒", { body: state.settings.reminderMessage });
      state.lastReminderDate = todayKey;
      saveState();
      showToast(state.settings.reminderMessage);
    }
  }

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;") .replaceall(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function bindEvents(root) {
    if (!root || root.dataset.bound === "true") return;
    root.dataset.bound = "true";

    root.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-tab-target]");
      if (tab) activateTab(tab.dataset.tabTarget);

      const roadmapButton = event.target.closest("[data-roadmap-week]");
      if (roadmapButton) toggleRoadmapWeek(Number(roadmapButton.dataset.roadmapWeek));

      const modalClose = event.target.closest("[data-modal-close]");
      if (modalClose) renderModal(false);
    });

    root.addEventListener("change", (event) => {
      if (event.target.matches("[data-task-index]")) {
        updateTaskCheck(Number(event.target.dataset.taskIndex), event.target.checked);
      }
      if (event.target.id === "study-review-week") {
        renderReview(Number(event.target.value));
      }
    });

    document.getElementById("study-start-session").addEventListener("click", () => {
      applyCustomTimerValues();
      scrollToSection("study-today-panel");
      startTimer();
      showToast("已开始今日学习。");
    });
    document.getElementById("study-view-roadmap").addEventListener("click", () => scrollToSection("study-roadmap"));
    document.getElementById("study-theme-toggle").addEventListener("click", toggleTheme);
    document.getElementById("study-export-top").addEventListener("click", exportData);
    document.getElementById("study-import-top").addEventListener("change", (event) => {
      if (event.target.files?.[0]) importData(event.target.files[0]);
    });
    document.getElementById("study-export-data").addEventListener("click", exportData);
    document.getElementById("study-import-data").addEventListener("change", (event) => {
      if (event.target.files?.[0]) importData(event.target.files[0]);
    });

    document.getElementById("study-save-tasks").addEventListener("click", saveTaskProgress);
    document.getElementById("study-generate-summary").addEventListener("click", generateSummaryTemplate);
    document.getElementById("study-save-progress").addEventListener("click", saveLearningProgress);
    document.getElementById("study-save-checkin").addEventListener("click", saveCheckin);
    document.getElementById("study-reminder-toggle").addEventListener("click", toggleReminder);
    document.getElementById("study-reminder-test").addEventListener("click", testReminder);
    document.getElementById("study-save-review").addEventListener("click", saveReview);
    document.getElementById("study-random-question").addEventListener("click", randomQuestion);
    document.getElementById("study-toggle-answer").addEventListener("click", toggleReferenceAnswer);
    document.getElementById("study-save-question").addEventListener("click", saveQuestionRecord);

    document.getElementById("study-timer-start").addEventListener("click", () => {
      applyCustomTimerValues();
      startTimer();
    });
    document.getElementById("study-timer-pause").addEventListener("click", pauseTimer);
    document.getElementById("study-timer-reset").addEventListener("click", resetTimer);
    document.querySelectorAll(".study-preset").forEach((button) => {
      button.addEventListener("click", () => setPreset(button.dataset.preset));
    });
    document.getElementById("study-focus-input").addEventListener("change", applyCustomTimerValues);
    document.getElementById("study-break-input").addEventListener("change", applyCustomTimerValues);

    document.getElementById("study-clear-data")?.addEventListener("click", () => renderModal(true));
    document.getElementById("study-cancel-clear").addEventListener("click", () => renderModal(false));
    document.getElementById("study-confirm-clear").addEventListener("click", clearData);
  }

  function init() {
    const root = getRoot();
    if (!root) return;
    bindEvents(root);
    render();
    window.clearInterval(window.__studyReminderTimer);
    window.__studyReminderTimer = window.setInterval(checkReminder, 30000);
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("pjax:complete", init);
})();
</",></=>