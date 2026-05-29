window.addEventListener("error", function (event) {
  const stack = document.getElementById("toast-stack");
  if (!stack) return;
  const toast = document.createElement("div");
  toast.className = "toast toast--error";
  toast.textContent = `脚本错误：${event.message}`;
  stack.appendChild(toast);
});

(function () {
  const STORAGE_KEY = "agent_learning_dashboard_v1";
  const TOTAL_DAYS = 70;
  const DEFAULT_START_HOUR = 2.5;
  const WEEK_TOPICS = [
    "Agent 和 LLM 基础",
    "ReAct、Planning、Reflection",
    "Dify、n8n、低代码 Agent",
    "LangGraph 和 Python Agent 开发",
    "RAG 和 Memory",
    "论文阅读 Agent",
    "家教智能客服 Agent 完善",
    "Agent 工程化",
    "算法和面试补强",
    "简历、项目包装、实习投递"
  ];
  const WEEK_GOALS = [
    "建立对 LLM、Prompt、Agent、Tool、Memory 的整体理解。",
    "理解 Agent 如何思考、规划和反思。",
    "体验低代码工作流和代码开发的差异。",
    "用状态流组织自己的 Agent。",
    "理解检索增强和 Memory 的边界。",
    "整合摘要、问答和检索能力。",
    "完善规则、角色回复和质检逻辑。",
    "补齐日志、README 和工程结构。",
    "加强算法、Python 和项目表达。",
    "打磨简历、项目包装和投递节奏。"
  ];
  const WEEK_OUTPUTS = [
    "能讲清 tutor_agent 的最小闭环。",
    "完成一个最小推理流程演示。",
    "形成低代码 Agent 体验记录。",
    "产出基础状态流图和代码。",
    "跑通 paper_reader_agent 最小版本。",
    "形成论文阅读 Agent 第一版。",
    "形成 Tutor Agent 第一版。",
    "把项目整理成更像正式作品的形态。",
    "整理一版面试备忘录。",
    "形成可投递版本。"
  ];
  const QUIZ_BANK = [
    { category: "Agent", question: "Agent 和普通 Chatbot 有什么区别？", answer: "普通 Chatbot 更偏向对话输出，Agent 更强调目标驱动、工具调用、状态管理和任务执行。Agent 会拆步骤、调工具并检查结果。" },
    { category: "Agent", question: "什么是 ReAct？Thought、Action、Observation 分别是什么？", answer: "ReAct 让模型在推理和行动之间交替前进。Thought 是当前思考，Action 是调用工具或执行动作，Observation 是动作返回的结果。" },
    { category: "RAG", question: "RAG 能缓解什么问题？", answer: "RAG 能缓解模型知识过时、事实错误和文档问答缺少依据的问题。它先检索，再让模型基于资料生成答案。" },
    { category: "Agent", question: "Tool Calling 在 Agent 中有什么作用？", answer: "Tool Calling 让 Agent 把稳定、结构化、可验证的工作交给工具完成，比如检索、计算、解析和查询，而不是全靠模型猜。" },
    { category: "RAG", question: "Memory 和 RAG 的区别是什么？", answer: "Memory 保存用户上下文、偏好和任务状态；RAG 从外部知识源补充事实和资料。一个偏向记住过程，一个偏向补充知识。" },
    { category: "Agent", question: "LangGraph 为什么适合做 Agent 状态流？", answer: "因为它天然适合表达节点、状态、分支和回路，方便把复杂 Agent 从线性 prompt 调用升级成可维护的状态流。" },
    { category: "LLM", question: "什么是模型幻觉？怎么缓解？", answer: "模型幻觉是指模型在没有可靠依据时仍生成看似合理但不真实的内容。可以通过结构化提示、RAG、引用依据和结果校验来缓解。" },
    { category: "面试", question: "Agent 项目如何写进简历？", answer: "不要只写做了一个聊天机器人，而要写清目标、模块、技术点和结果，比如 Tool Calling、状态流、结果校验以及具体业务场景。" },
    { category: "Agent", question: "为什么 Agent 需要长期记忆？", answer: "长期记忆能保存用户偏好、任务历史和关键上下文，让 Agent 在多轮或长期任务里更稳定，不用每次都从零开始。" },
    { category: "面试", question: "如何评估一个 Agent 的效果？", answer: "可以从任务成功率、工具调用正确率、回答质量、稳定性、成本、时延和用户满意度等维度进行评估，并建立回归测试。" }
  ];
  const DAY_ONE = {
    title: "认识 LLM、Agent 和暑期总目标",
    hours: 2.5,
    theme: "先把这个暑假的目标和学习路径校准清楚，能用自己的话说清楚什么是 LLM、什么是 Agent，以及为什么 LLM 可以成为 Agent 的大脑。",
    tasks: [
      "阅读 Hello-Agents 前三章相关内容",
      "用自己的话解释 Agent 是什么",
      "理解 LLM 为什么能作为 Agent 大脑",
      "运行 tutor_agent 项目骨架",
      "补全 Day01 学习总结"
    ],
    outputs: [
      "能区分 LLM、Agent、普通 Chatbot 的差别。",
      "能本地运行一次 tutor_agent 项目骨架并理解主流程。",
      "完成 Day01 学习总结模板，形成第一天的学习资产。"
    ]
  };

  const defaultState = {
    startDate: null,
    currentWeek: 1,
    currentDay: 1,
    streakDays: 0,
    totalMinutes: 0,
    todayTasks: [false, false, false, false, false],
    dailyStatus: "未开始",
    checkins: [],
    quizRecords: [],
    weeklyReviews: [],
    recentLogs: [],
    theme: "dark",
    activeTab: "theme",
    summaryTemplate: "",
    expandedWeeks: [1],
    currentQuestion: null,
    reminder: {
      enabled: false,
      time: "20:00",
      message: "该开始今天的 AI Agent 学习了",
      lastFiredDate: ""
    },
    timer: {
      preset: "25-5",
      focusMinutes: 25,
      breakMinutes: 5,
      remainingSeconds: 25 * 60,
      mode: "focus",
      running: false
    },
    dailyProgress: {}
  };

  const refs = {};
  let memoryState = null;
  let state = loadState();
  let timerHandle = null;
  let reminderHandle = null;

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    try {
      const raw = readStorage();
      const parsed = raw ? JSON.parse(raw) : clone(defaultState);
      const merged = deepMerge(clone(defaultState), parsed);
      migrateLegacyState(merged);
      syncCurrentCalendar(merged);
      return merged;
    } catch (error) {
      const fallback = clone(defaultState);
      fallback.startDate = todayKey();
      syncCurrentCalendar(fallback);
      return fallback;
    }
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

  function migrateLegacyState(target) {
    if (!target.startDate) {
      target.startDate = target.checkins.length ? target.checkins[0].date : todayKey();
    }

    if (!target.dailyProgress || typeof target.dailyProgress !== "object") {
      target.dailyProgress = {};
    }

    if (target.todayTasks && target.todayTasks.some(Boolean)) {
      const key = dayStorageKey(target.currentDay || 1);
      const dayState = ensureDayState(target, target.currentDay || 1);
      dayState.tasks = target.todayTasks.slice();
      dayState.summaryTemplate = target.summaryTemplate || dayState.summaryTemplate;
      dayState.status = target.dailyStatus || dayState.status;
    }

    target.checkins.forEach((entry) => {
      const dayState = ensureDayState(target, entry.day || 1);
      dayState.checkin = Object.assign(
        {
          date: entry.date,
          started: true,
          finished: false,
          minutes: entry.minutes || 0,
          pomodoros: entry.pomodoros || 0,
          win: entry.win || "",
          blocker: entry.blocker || "",
          plan: entry.plan || ""
        },
        dayState.checkin || {}
      );
      dayState.date = entry.date || dayState.date;
      dayState.status = dayState.status === "未开始" ? "学习中" : dayState.status;
    });

    recalcAggregates(target);
  }

  function saveState() {
    recalcAggregates(state);
    writeStorage(JSON.stringify(state));
  }

  function readStorage() {
    try {
      return window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : memoryState;
    } catch (error) {
      return memoryState;
    }
  }

  function writeStorage(value) {
    memoryState = value;
    try {
      if (window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, value);
      }
    } catch (error) {
      return false;
    }
    return true;
  }

  function recalcAggregates(target) {
    target.totalMinutes = target.checkins.reduce((sum, item) => sum + (item.minutes || 0), 0);
    target.streakDays = computeStreak(target.checkins);
  }

  function computeStreak(checkins) {
    if (!checkins.length) return 0;
    const dates = [...new Set(checkins.map((item) => item.date))].sort().reverse();
    let streak = 0;
    let cursor = new Date(todayKey());

    for (const date of dates) {
      const normalized = cursor.toISOString().slice(0, 10);
      if (date === normalized) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  function syncCurrentCalendar(target) {
    if (!target.startDate) target.startDate = todayKey();
    const start = new Date(target.startDate);
    const now = new Date(todayKey());
    const dayDiff = Math.max(0, Math.floor((now - start) / 86400000));
    const currentDay = Math.min(TOTAL_DAYS, dayDiff + 1);
    target.currentDay = currentDay;
    target.currentWeek = Math.min(10, Math.ceil(currentDay / 7));
    ensureDayState(target, currentDay);
  }

  function dayStorageKey(dayNumber) {
    return `day-${String(dayNumber).padStart(2, "0")}`;
  }

  function weekFromDay(dayNumber) {
    return Math.min(10, Math.ceil(dayNumber / 7));
  }

  function buildGenericDay(dayNumber) {
    const week = weekFromDay(dayNumber);
    const topic = WEEK_TOPICS[week - 1];
    return {
      title: `${topic} 实战推进`,
      hours: DEFAULT_START_HOUR,
      theme: `围绕“${topic}”继续推进今天的学习任务，确保概念、代码和输出都能留下可复用痕迹。`,
      tasks: [
        `回顾本周主题：${topic}`,
        "补充 1 个核心概念的自己的解释",
        "推进 1 个代码任务或项目模块",
        "完成 1 次表达练习或题库训练",
        `整理 Day ${String(dayNumber).padStart(2, "0")} 学习总结`
      ],
      outputs: [
        "留下今天的学习总结和关键代码痕迹。",
        "把本周主题转化成可讲述的项目表达。",
        "完成一次对项目、概念或面试问题的结构化输出。"
      ]
    };
  }

  function getDayMeta(dayNumber) {
    if (dayNumber === 1) return DAY_ONE;
    return buildGenericDay(dayNumber);
  }

  function createSummaryTemplate(dayNumber, meta) {
    const taskLines = meta.tasks.map((task) => `- ${task}`).join("\n");
    return `# Day ${String(dayNumber).padStart(2, "0")} 学习总结：${meta.title}

## 1. 今天学习了什么
${taskLines}

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
实习相关度：/10`;
  }

  function ensureDayState(target, dayNumber) {
    const key = dayStorageKey(dayNumber);
    if (!target.dailyProgress[key]) {
      const meta = getDayMeta(dayNumber);
      target.dailyProgress[key] = {
        dayNumber,
        week: weekFromDay(dayNumber),
        date: "",
        title: meta.title,
        hours: meta.hours,
        theme: meta.theme,
        tasks: meta.tasks.map(() => false),
        outputs: meta.outputs.slice(),
        status: "未开始",
        summaryTemplate: createSummaryTemplate(dayNumber, meta),
        pomodoros: 0,
        checkin: null
      };
    }
    return target.dailyProgress[key];
  }

  function currentDayState() {
    syncCurrentCalendar(state);
    return ensureDayState(state, state.currentDay);
  }

  function currentDayMeta() {
    return getDayMeta(state.currentDay);
  }

  function dayLabel(dayNumber = state.currentDay) {
    return `Day ${String(dayNumber).padStart(2, "0")}`;
  }

  function weekLabel(weekNumber = state.currentWeek) {
    return `第 ${weekNumber} 周`;
  }

  function summaryPath(dayNumber = state.currentDay) {
    const week = weekFromDay(dayNumber);
    return `week${String(week).padStart(2, "0")}/Day${String(dayNumber).padStart(2, "0")}_xxx.md`;
  }

  function getTodayProgress() {
    const dayState = currentDayState();
    return Math.round((dayState.tasks.filter(Boolean).length / dayState.tasks.length) * 100);
  }

  function getWeekProgress() {
    const currentWeek = state.currentWeek;
    let totalTasks = 0;
    let doneTasks = 0;
    for (let day = (currentWeek - 1) * 7 + 1; day <= Math.min(currentWeek * 7, TOTAL_DAYS); day += 1) {
      const dayState = ensureDayState(state, day);
      totalTasks += dayState.tasks.length;
      doneTasks += dayState.tasks.filter(Boolean).length;
    }
    return totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  }

  function getSummerProgress() {
    return Math.min(100, Math.round((state.currentDay / TOTAL_DAYS) * 100));
  }

  function getCompletedDaysThisWeek() {
    const week = state.currentWeek;
    return state.checkins.filter((item) => item.week === week).length;
  }

  function getPromptMessage() {
    if (state.streakDays >= 7) return `你已经连续学习 ${state.streakDays} 天，状态很好。`;
    if (state.streakDays > 0) return `你已经连续学习 ${state.streakDays} 天，继续保持。`;
    return "今天先完成一次扎实学习";
  }

  function addLog(type, content) {
    state.recentLogs.unshift({
      type,
      content,
      time: new Date().toLocaleString("zh-CN")
    });
    state.recentLogs = state.recentLogs.slice(0, 20);
  }

  function showToast(message, tone) {
    const toast = document.createElement("div");
    toast.className = `toast toast--${tone || "success"}`;
    toast.textContent = message;
    refs.toastStack.appendChild(toast);
    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-8px)";
      window.setTimeout(() => toast.remove(), 220);
    }, 2600);
  }

  function renderMetrics() {
    refs.navDayPill.textContent = dayLabel();
    refs.navWeekPill.textContent = weekLabel();
    refs.metricWeek.textContent = weekLabel();
    refs.metricDay.textContent = dayLabel();
    refs.metricStreak.textContent = `${state.streakDays} 天`;
    refs.metricTotal.textContent = `${state.totalMinutes} 分钟`;
    refs.heroStreak.textContent = `${state.streakDays} 天`;
    refs.heroTotalMinutes.textContent = `${state.totalMinutes} 分钟`;
    refs.reviewWeekBadge.textContent = weekLabel();
    refs.encouragePill.textContent = getPromptMessage();
    refs.metricWeekTrend.textContent = WEEK_GOALS[state.currentWeek - 1];
    refs.metricDayTrend.textContent = `今天主线：${currentDayMeta().title}`;
    refs.metricStreakTrend.textContent = state.streakDays > 0 ? "连续性正在帮助你沉淀长期能力。" : "先完成今天的第一次稳定打卡。";
    refs.metricTotalTrend.textContent = state.totalMinutes > 0 ? "学习时长会随着每日打卡持续累积。" : "现在开始积累你的暑期学习时间。";
  }

  function renderHeroRing() {
    const summer = getSummerProgress();
    refs.summerProgressText.textContent = `${summer}%`;
    const circumference = 2 * Math.PI * 72;
    const offset = circumference - (summer / 100) * circumference;
    refs.summerProgressRing.style.strokeDasharray = `${circumference}`;
    refs.summerProgressRing.style.strokeDashoffset = `${offset}`;
  }

  function renderTodayPanel() {
    const dayState = currentDayState();
    const meta = currentDayMeta();
    refs.todayTitle.textContent = `${dayLabel()}：${meta.title}`;
    refs.todayThemeTitle.textContent = `${dayLabel()}：${meta.title}`;
    refs.todayThemeText.textContent = meta.theme;
    refs.todayHours.textContent = `建议学习时长：${meta.hours} 小时`;
    refs.summaryPath.textContent = summaryPath();
    refs.todayPomodorosBadge.textContent = `${dayState.pomodoros || 0} 个`;
    refs.todayStatusBadge.textContent = dayState.status;
    refs.summaryTemplate.value = dayState.summaryTemplate;
    refs.todayOutputList.innerHTML = "";
    meta.outputs.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      refs.todayOutputList.appendChild(li);
    });

    refs.taskList.innerHTML = "";
    meta.tasks.forEach((task, index) => {
      const checked = !!dayState.tasks[index];
      const item = document.createElement("label");
      item.className = `task-item${checked ? " is-done" : ""}`;
      item.innerHTML = `
        <input type="checkbox" data-task-index="${index}" ${checked ? "checked" : ""}>
        <span class="task-item__check"></span>
        <div>
          <strong class="task-item__title">任务 ${index + 1}</strong>
          <p class="task-item__desc">${task}</p>
        </div>
      `;
      refs.taskList.appendChild(item);
    });
  }

  function renderTabs() {
    document.querySelectorAll(".tab").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === state.activeTab);
    });
  }

  function renderProgress() {
    const today = getTodayProgress();
    const week = getWeekProgress();
    const summer = getSummerProgress();
    refs.todayTaskProgressText.textContent = `${today}%`;
    refs.progressTodayLabel.textContent = `${today}%`;
    refs.progressWeekLabel.textContent = `${week}%`;
    refs.progressSummerLabel.textContent = `${summer}%`;
    refs.todayTaskProgressBar.style.width = `${today}%`;
    refs.progressTodayBar.style.width = `${today}%`;
    refs.progressWeekBar.style.width = `${week}%`;
    refs.progressSummerBar.style.width = `${summer}%`;
    refs.weeklyCompletedDays.textContent = `${getCompletedDaysThisWeek()} / 7 天`;
    refs.weeklyMissedDays.textContent = `${7 - getCompletedDaysThisWeek()} 天`;
  }

  function renderFormValues() {
    const dayState = currentDayState();
    const checkin = dayState.checkin || {};
    refs.dailyStatus.value = dayState.status;
    refs.startedLearning.checked = !!checkin.started;
    refs.finishedLearning.checked = !!checkin.finished;
    refs.checkinMinutes.value = checkin.minutes || "";
    refs.checkinPomodoros.value = typeof checkin.pomodoros === "number" ? checkin.pomodoros : dayState.pomodoros || "";
    refs.checkinWin.value = checkin.win || "";
    refs.checkinBlocker.value = checkin.blocker || "";
    refs.checkinPlan.value = checkin.plan || "";

    const review = state.weeklyReviews.find((item) => item.week === state.currentWeek) || {};
    refs.weeklyLearned.value = review.learned || "";
    refs.weeklyWin.value = review.win || "";
    refs.weeklyBlocker.value = review.blocker || "";
    refs.weeklyNext.value = review.next || "";

    refs.reminderTime.value = state.reminder.time;
    refs.reminderMessage.value = state.reminder.message;
    refs.reminderStatus.textContent = state.reminder.enabled ? "已开启" : "未开启";
    refs.reminderInlineStatus.textContent = "已支持";
  }

  function renderQuestion() {
    refs.quizCategory.value = refs.quizCategory.value || "全部";
    if (!state.currentQuestion) {
      state.currentQuestion = QUIZ_BANK[0];
    }
    refs.quizQuestion.textContent = state.currentQuestion.question;
    refs.quizAnswer.textContent = state.currentQuestion.answer;
    refs.quizAnswer.classList.add("is-hidden");
    refs.toggleAnswer.textContent = "显示参考答案";
  }

  function renderRecentLogs() {
    refs.recentList.innerHTML = "";
    const logs = state.recentLogs.slice(0, 5);
    if (!logs.length) {
      refs.recentList.innerHTML = '<div class="empty-state">还没有学习记录，完成一次打卡后会出现在这里。</div>';
      return;
    }
    logs.forEach((log) => {
      const item = document.createElement("article");
      item.className = "recent-item";
      item.innerHTML = `
        <div class="recent-item__meta">
          <span class="recent-item__type">${log.type}</span>
          <span class="recent-item__time">${log.time}</span>
        </div>
        <p>${log.content}</p>
      `;
      refs.recentList.appendChild(item);
    });
  }

  function renderProjects() {
    refs.projectTutorStatus.textContent = `当前重点：${state.currentWeek <= 4 ? "理解 tutor_agent 的结构和工具分工。" : "完善规则、角色回复和质检逻辑。"}`;
    refs.projectPaperStatus.textContent = `当前重点：${state.currentWeek <= 4 ? "为第 5-6 周的论文阅读 Agent 做准备。" : "推进切块、检索和摘要闭环。"}`;

    const tutorTasks = state.currentWeek <= 4
      ? ["读懂 main.py 和 graph.py 主流程", "补充 1 个工具函数的理解", "记录一条可讲给面试官的项目表达"]
      : ["增强业务规则和回复逻辑", "检查质量模块的合规输出", "把项目整理成简历项目描述"];
    const paperTasks = state.currentWeek <= 4
      ? ["熟悉 RAG 和 Memory 的区别", "预习 chunker / retriever 结构", "准备论文阅读 Agent 的最小输入输出"]
      : ["跑通文本切块和关键词检索", "补充摘要 Prompt", "整理论文阅读 Agent 的演示说法"];

    refs.projectTutorTasks.innerHTML = tutorTasks.map((item) => `<li>${item}</li>`).join("");
    refs.projectPaperTasks.innerHTML = paperTasks.map((item) => `<li>${item}</li>`).join("");
  }

  function renderTimeline() {
    refs.timeline.innerHTML = "";
    WEEK_TOPICS.forEach((topic, index) => {
      const week = index + 1;
      const isDone = week < state.currentWeek;
      const isCurrent = week === state.currentWeek;
      const isOpen = state.expandedWeeks.includes(week);
      const card = document.createElement("article");
      card.className = `timeline-card${isDone ? " is-done" : ""}${isCurrent ? " is-current" : ""}${isOpen ? " is-open" : ""}`;
      card.innerHTML = `
        <button class="timeline-card__head" type="button" data-week="${week}">
          <span class="timeline-card__dot"></span>
          <div>
            <h4 class="timeline-card__title">第 ${week} 周：${topic}</h4>
            <div class="timeline-card__status">${isDone ? "已完成" : isCurrent ? "进行中" : "未开始"}</div>
          </div>
          <span class="timeline-card__chevron">⌄</span>
        </button>
        <div class="timeline-card__body">
          <p><strong>目标：</strong>${WEEK_GOALS[index]}</p>
          <p><strong>产出：</strong>${WEEK_OUTPUTS[index]}</p>
        </div>
      `;
      refs.timeline.appendChild(card);
    });
  }

  function renderTimer() {
    const timer = state.timer;
    const minutes = Math.floor(timer.remainingSeconds / 60);
    const seconds = timer.remainingSeconds % 60;
    refs.timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    refs.timerModeBadge.textContent = timer.mode === "focus" ? "学习阶段" : "休息阶段";
    refs.focusMinutes.value = timer.focusMinutes;
    refs.breakMinutes.value = timer.breakMinutes;
    refs.timerCount.textContent = `${currentDayState().pomodoros || 0} 个番茄`;
    refs.timerTip.textContent = timer.mode === "focus" ? "先完成 2 个深度番茄" : "休息结束后继续下一轮";
    refs.preset255.classList.toggle("is-active", timer.preset === "25-5");
    refs.preset5010.classList.toggle("is-active", timer.preset === "50-10");
  }

  function applyTheme() {
    document.body.setAttribute("data-theme", state.theme);
    refs.themeToggleIcon.textContent = state.theme === "dark" ? "☾" : "☀";
  }

  function renderAll() {
    syncCurrentCalendar(state);
    renderMetrics();
    renderHeroRing();
    renderTodayPanel();
    renderTabs();
    renderProgress();
    renderFormValues();
    renderQuestion();
    renderRecentLogs();
    renderProjects();
    renderTimeline();
    renderTimer();
    applyTheme();
  }

  function saveTaskProgress() {
    saveState();
    addLog("保存进度", `已保存 ${dayLabel()} 的任务进度，完成度 ${getTodayProgress()}%。`);
    saveState();
    renderProgress();
    renderRecentLogs();
    showToast("今日进度已保存。", "success");
  }

  function generateSummary() {
    const dayState = currentDayState();
    dayState.summaryTemplate = createSummaryTemplate(state.currentDay, currentDayMeta());
    state.activeTab = "summary";
    saveState();
    renderTodayPanel();
    renderTabs();
    addLog("生成总结", `已为 ${dayLabel()} 生成学习总结模板。`);
    saveState();
    renderRecentLogs();
    showToast("今日总结模板已生成。", "success");
  }

  function saveStatus() {
    const dayState = currentDayState();
    dayState.status = refs.dailyStatus.value;
    state.dailyStatus = dayState.status;
    saveState();
    addLog("保存状态", `${dayLabel()} 的学习状态已更新为“${dayState.status}”。`);
    saveState();
    renderAll();
    showToast("学习状态已保存。", "success");
  }

  function saveCheckin() {
    const key = todayKey();
    const dayState = currentDayState();
    const exists = state.checkins.find((item) => item.date === key);
    if (exists) {
      showToast("今天已经打卡过。", "warning");
      return;
    }

    const started = refs.startedLearning.checked;
    const finished = refs.finishedLearning.checked;
    const minutes = Number(refs.checkinMinutes.value) || 0;
    const pomodoros = Number(refs.checkinPomodoros.value) || dayState.pomodoros || 0;
    const win = refs.checkinWin.value.trim();
    const blocker = refs.checkinBlocker.value.trim();
    const plan = refs.checkinPlan.value.trim();

    const entry = {
      date: key,
      week: state.currentWeek,
      day: state.currentDay,
      started,
      finished,
      minutes,
      pomodoros,
      win,
      blocker,
      plan
    };

    state.checkins.push(entry);
    dayState.checkin = entry;
    dayState.date = key;
    dayState.pomodoros = pomodoros;
    dayState.status = finished ? "已完成" : started ? "学习中" : dayState.status;
    state.dailyStatus = dayState.status;
    saveState();
    addLog("完成打卡", `${dayLabel()} 已完成打卡，学习 ${minutes} 分钟，完成 ${pomodoros} 个番茄。`);
    saveState();
    renderAll();
    showToast(`打卡成功，你已经连续学习 ${state.streakDays} 天。`, "success");
  }

  function getQuestionPool() {
    const category = refs.quizCategory.value;
    return category === "全部" ? QUIZ_BANK : QUIZ_BANK.filter((item) => item.category === category);
  }

  function randomQuestion() {
    const pool = getQuestionPool();
    state.currentQuestion = pool[Math.floor(Math.random() * pool.length)];
    saveState();
    renderQuestion();
    showToast("已抽取一道新的练习题。", "success");
  }

  function toggleAnswer() {
    if (!state.currentQuestion) {
      showToast("请先生成一道题目。", "warning");
      return;
    }
    const hidden = refs.quizAnswer.classList.contains("is-hidden");
    refs.quizAnswer.classList.toggle("is-hidden", !hidden);
    refs.toggleAnswer.textContent = hidden ? "隐藏参考答案" : "显示参考答案";
  }

  function saveQuizRecord() {
    if (!state.currentQuestion) {
      showToast("请先生成一道题目。", "warning");
      return;
    }
    const response = refs.quizResponse.value.trim();
    if (!response) {
      showToast("请先写下你的回答。", "warning");
      return;
    }
    state.quizRecords.unshift({
      date: new Date().toLocaleString("zh-CN"),
      category: state.currentQuestion.category,
      question: state.currentQuestion.question,
      response
    });
    state.quizRecords = state.quizRecords.slice(0, 30);
    refs.quizResponse.value = "";
    saveState();
    addLog("保存题目", `已保存一条 ${state.currentQuestion.category} 分类题目记录。`);
    saveState();
    renderRecentLogs();
    showToast("题目记录已保存。", "success");
  }

  function saveWeeklyReview() {
    const payload = {
      week: state.currentWeek,
      learned: refs.weeklyLearned.value.trim(),
      win: refs.weeklyWin.value.trim(),
      blocker: refs.weeklyBlocker.value.trim(),
      next: refs.weeklyNext.value.trim()
    };
    state.weeklyReviews = state.weeklyReviews.filter((item) => item.week !== state.currentWeek);
    state.weeklyReviews.unshift(payload);
    saveState();
    addLog("保存周复盘", `${weekLabel()} 的复盘已更新。`);
    saveState();
    renderRecentLogs();
    showToast("周复盘已保存。", "success");
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "agent_learning_dashboard_backup.json";
    link.click();
    URL.revokeObjectURL(url);
    addLog("导出数据", "已导出当前学习仪表盘数据备份。");
    saveState();
    renderRecentLogs();
    showToast("数据导出成功。", "success");
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const parsed = JSON.parse(reader.result);
        state = deepMerge(clone(defaultState), parsed);
        migrateLegacyState(state);
        syncCurrentCalendar(state);
        saveState();
        addLog("导入数据", "已导入一份本地学习备份。");
        saveState();
        renderAll();
        showToast("数据导入成功。", "success");
      } catch (error) {
        showToast("导入失败，请检查 JSON 文件。", "error");
      }
    };
    reader.readAsText(file, "utf-8");
  }

  function openModal() {
    refs.confirmModal.classList.add("is-open");
    refs.confirmModal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    refs.confirmModal.classList.remove("is-open");
    refs.confirmModal.setAttribute("aria-hidden", "true");
  }

  function resetData() {
    stopTimer();
    state = clone(defaultState);
    state.startDate = todayKey();
    syncCurrentCalendar(state);
    saveState();
    renderAll();
    closeModal();
    showToast("本地数据已清空。", "warning");
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
    state.timer.preset = preset;
    state.timer.mode = "focus";
    state.timer.remainingSeconds = state.timer.focusMinutes * 60;
    saveState();
    renderTimer();
  }

  function applyCustomTimerValues() {
    const focus = Math.max(1, Number(refs.focusMinutes.value) || 25);
    const rest = Math.max(1, Number(refs.breakMinutes.value) || 5);
    state.timer.focusMinutes = focus;
    state.timer.breakMinutes = rest;
    state.timer.mode = "focus";
    state.timer.remainingSeconds = focus * 60;
    state.timer.preset = "custom";
    saveState();
    renderTimer();
  }

  function startTimer() {
    if (state.timer.running) return;
    applyCustomTimerValues();
    state.timer.running = true;
    saveState();
    timerHandle = window.setInterval(() => {
      if (state.timer.remainingSeconds > 0) {
        state.timer.remainingSeconds -= 1;
        renderTimer();
        return;
      }

      const dayState = currentDayState();
      if (state.timer.mode === "focus") {
        dayState.pomodoros += 1;
        refs.checkinPomodoros.value = dayState.pomodoros;
        addLog("完成番茄", `${dayLabel()} 完成了 1 个 ${state.timer.focusMinutes} 分钟番茄。`);
        showToast("一个学习番茄已完成。", "success");
        state.timer.mode = "break";
        state.timer.remainingSeconds = state.timer.breakMinutes * 60;
      } else {
        showToast("休息结束，准备进入下一轮专注。", "success");
        state.timer.mode = "focus";
        state.timer.remainingSeconds = state.timer.focusMinutes * 60;
      }
      saveState();
      renderAll();
    }, 1000);
    renderTimer();
  }

  function pauseTimer() {
    if (timerHandle) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }
    state.timer.running = false;
    saveState();
    renderTimer();
  }

  function stopTimer() {
    if (timerHandle) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }
    state.timer.running = false;
  }

  function resetTimer() {
    stopTimer();
    state.timer.mode = "focus";
    state.timer.remainingSeconds = state.timer.focusMinutes * 60;
    saveState();
    renderTimer();
  }

  function saveReminderSettings() {
    state.reminder.time = refs.reminderTime.value || "20:00";
    state.reminder.message = refs.reminderMessage.value.trim() || "该开始今天的 AI Agent 学习了";

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        state.reminder.enabled = true;
        saveState();
        renderFormValues();
        showToast("学习提醒已保存。", "success");
        return;
      }
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          state.reminder.enabled = permission === "granted";
          saveState();
          renderFormValues();
          showToast(permission === "granted" ? "浏览器提醒已开启。" : "浏览器提醒未授权，仍会保留页面内提醒。", permission === "granted" ? "success" : "warning");
        });
        return;
      }
    }

    state.reminder.enabled = false;
    saveState();
    renderFormValues();
    showToast("已保存提醒时间，浏览器通知当前未开启。", "warning");
  }

  function fireReminder(manual) {
    const message = refs.reminderMessage.value.trim() || state.reminder.message;
    showToast(message, "warning");
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("AI Agent 学习提醒", { body: message });
    }
    if (manual) {
      addLog("测试提醒", "已触发一次页面内学习提醒。");
      saveState();
      renderRecentLogs();
    }
  }

  function checkReminder() {
    if (!state.reminder.time) return;
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    if (currentTime === state.reminder.time && state.reminder.lastFiredDate !== todayKey()) {
      state.reminder.lastFiredDate = todayKey();
      saveState();
      fireReminder(false);
    }
  }

  function bindEvents() {
    document.querySelectorAll(".tab").forEach((button) => {
      button.addEventListener("click", function () {
        state.activeTab = this.dataset.tab;
        saveState();
        renderTabs();
      });
    });

    refs.taskList.addEventListener("change", function (event) {
      if (!event.target.matches("[data-task-index]")) return;
      const dayState = currentDayState();
      const index = Number(event.target.dataset.taskIndex);
      dayState.tasks[index] = event.target.checked;
      if (dayState.status === "未开始") {
        dayState.status = "学习中";
      }
      saveState();
      renderTodayPanel();
      renderProgress();
    });

    refs.summaryTemplate.addEventListener("input", function () {
      const dayState = currentDayState();
      dayState.summaryTemplate = refs.summaryTemplate.value;
      saveState();
    });

    refs.focusMinutes.addEventListener("change", applyCustomTimerValues);
    refs.breakMinutes.addEventListener("change", applyCustomTimerValues);
    refs.preset255.addEventListener("click", function () { setPreset("25-5"); });
    refs.preset5010.addEventListener("click", function () { setPreset("50-10"); });
    refs.timerStart.addEventListener("click", startTimer);
    refs.timerPause.addEventListener("click", pauseTimer);
    refs.timerReset.addEventListener("click", resetTimer);

    refs.saveTaskProgress.addEventListener("click", saveTaskProgress);
    refs.generateSummary.addEventListener("click", generateSummary);
    refs.saveStatus.addEventListener("click", saveStatus);
    refs.saveCheckin.addEventListener("click", saveCheckin);
    refs.randomQuestion.addEventListener("click", randomQuestion);
    refs.toggleAnswer.addEventListener("click", toggleAnswer);
    refs.saveQuizRecord.addEventListener("click", saveQuizRecord);
    refs.saveWeeklyReview.addEventListener("click", saveWeeklyReview);
    refs.exportData.addEventListener("click", exportData);
    refs.importData.addEventListener("change", function (event) {
      if (event.target.files && event.target.files[0]) {
        importData(event.target.files[0]);
        event.target.value = "";
      }
    });
    refs.saveReminder.addEventListener("click", saveReminderSettings);
    refs.testReminder.addEventListener("click", function () { fireReminder(true); });

    document.addEventListener("click", function (event) {
      const trigger = event.target.closest("button");
      if (!trigger) {
        if (event.target === refs.confirmModal) {
          closeModal();
        }
        return;
      }
      if (trigger.id === "open-reset-modal") openModal();
      if (trigger.id === "cancel-reset") closeModal();
      if (trigger.id === "confirm-reset") resetData();
    });

    refs.themeToggle.addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      saveState();
      applyTheme();
      showToast(state.theme === "dark" ? "已切换到深色主题。" : "已切换到浅色主题。", "success");
    });

    refs.startLearning.addEventListener("click", function () {
      refs.todayTaskCard.scrollIntoView({ behavior: "smooth", block: "start" });
      const dayState = currentDayState();
      if (dayState.status === "未开始") {
        dayState.status = "学习中";
        saveState();
        renderAll();
      }
      showToast(`开始 ${dayLabel()} 的学习，先完成今天的核心任务。`, "success");
    });

    refs.viewRoadmap.addEventListener("click", function () {
      refs.roadmapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    refs.timeline.addEventListener("click", function (event) {
      const button = event.target.closest("[data-week]");
      if (!button) return;
      const week = Number(button.dataset.week);
      if (state.expandedWeeks.includes(week)) {
        state.expandedWeeks = state.expandedWeeks.filter((item) => item !== week);
      } else {
        state.expandedWeeks.push(week);
      }
      saveState();
      renderTimeline();
    });
  }

  function collectRefs() {
    refs.toastStack = document.getElementById("toast-stack");
    refs.navDayPill = document.getElementById("nav-day-pill");
    refs.navWeekPill = document.getElementById("nav-week-pill");
    refs.themeToggle = document.getElementById("theme-toggle");
    refs.themeToggleIcon = document.getElementById("theme-toggle-icon");
    refs.exportData = document.getElementById("export-data");
    refs.startLearning = document.getElementById("start-learning");
    refs.viewRoadmap = document.getElementById("view-roadmap");
    refs.summerProgressRing = document.getElementById("summer-progress-ring");
    refs.summerProgressText = document.getElementById("summer-progress-text");
    refs.heroStreak = document.getElementById("hero-streak");
    refs.heroTotalMinutes = document.getElementById("hero-total-minutes");
    refs.metricWeek = document.getElementById("metric-week");
    refs.metricDay = document.getElementById("metric-day");
    refs.metricStreak = document.getElementById("metric-streak");
    refs.metricTotal = document.getElementById("metric-total");
    refs.metricWeekTrend = document.getElementById("metric-week-trend");
    refs.metricDayTrend = document.getElementById("metric-day-trend");
    refs.metricStreakTrend = document.getElementById("metric-streak-trend");
    refs.metricTotalTrend = document.getElementById("metric-total-trend");
    refs.todayTaskCard = document.getElementById("today-task-card");
    refs.todayTitle = document.getElementById("today-title");
    refs.todayThemeTitle = document.getElementById("today-theme-title");
    refs.todayThemeText = document.getElementById("today-theme-text");
    refs.todayHours = document.getElementById("today-hours");
    refs.summaryPath = document.getElementById("summary-path");
    refs.todayPomodorosBadge = document.getElementById("today-pomodoros-badge");
    refs.todayStatusBadge = document.getElementById("today-status-badge");
    refs.todayTaskProgressText = document.getElementById("today-task-progress-text");
    refs.todayTaskProgressBar = document.getElementById("today-task-progress-bar");
    refs.taskList = document.getElementById("task-list");
    refs.todayOutputList = document.getElementById("today-output-list");
    refs.summaryTemplate = document.getElementById("summary-template");
    refs.saveTaskProgress = document.getElementById("save-task-progress");
    refs.generateSummary = document.getElementById("generate-summary");
    refs.encouragePill = document.getElementById("encourage-pill");
    refs.startedLearning = document.getElementById("started-learning");
    refs.finishedLearning = document.getElementById("finished-learning");
    refs.checkinMinutes = document.getElementById("checkin-minutes");
    refs.checkinPomodoros = document.getElementById("checkin-pomodoros");
    refs.checkinWin = document.getElementById("checkin-win");
    refs.checkinBlocker = document.getElementById("checkin-blocker");
    refs.checkinPlan = document.getElementById("checkin-plan");
    refs.saveCheckin = document.getElementById("save-checkin");
    refs.weeklyCompletedDays = document.getElementById("weekly-completed-days");
    refs.weeklyMissedDays = document.getElementById("weekly-missed-days");
    refs.reviewWeekBadge = document.getElementById("review-week-badge");
    refs.weeklyLearned = document.getElementById("weekly-learned");
    refs.weeklyWin = document.getElementById("weekly-win");
    refs.weeklyBlocker = document.getElementById("weekly-blocker");
    refs.weeklyNext = document.getElementById("weekly-next");
    refs.saveWeeklyReview = document.getElementById("save-weekly-review");
    refs.projectTutorStatus = document.getElementById("project-tutor-status");
    refs.projectTutorTasks = document.getElementById("project-tutor-tasks");
    refs.projectPaperStatus = document.getElementById("project-paper-status");
    refs.projectPaperTasks = document.getElementById("project-paper-tasks");
    refs.timerModeBadge = document.getElementById("timer-mode-badge");
    refs.timerDisplay = document.getElementById("timer-display");
    refs.preset255 = document.getElementById("preset-25-5");
    refs.preset5010 = document.getElementById("preset-50-10");
    refs.focusMinutes = document.getElementById("focus-minutes");
    refs.breakMinutes = document.getElementById("break-minutes");
    refs.timerCount = document.getElementById("timer-count");
    refs.timerTip = document.getElementById("timer-tip");
    refs.timerStart = document.getElementById("timer-start");
    refs.timerPause = document.getElementById("timer-pause");
    refs.timerReset = document.getElementById("timer-reset");
    refs.progressTodayLabel = document.getElementById("progress-today-label");
    refs.progressWeekLabel = document.getElementById("progress-week-label");
    refs.progressSummerLabel = document.getElementById("progress-summer-label");
    refs.progressTodayBar = document.getElementById("progress-today-bar");
    refs.progressWeekBar = document.getElementById("progress-week-bar");
    refs.progressSummerBar = document.getElementById("progress-summer-bar");
    refs.dailyStatus = document.getElementById("daily-status");
    refs.saveStatus = document.getElementById("save-status");
    refs.reminderTime = document.getElementById("reminder-time");
    refs.reminderMessage = document.getElementById("reminder-message");
    refs.reminderStatus = document.getElementById("reminder-status");
    refs.reminderInlineStatus = document.getElementById("reminder-inline-status");
    refs.saveReminder = document.getElementById("save-reminder");
    refs.testReminder = document.getElementById("test-reminder");
    refs.quizCategory = document.getElementById("quiz-category");
    refs.randomQuestion = document.getElementById("random-question");
    refs.toggleAnswer = document.getElementById("toggle-answer");
    refs.quizQuestion = document.getElementById("quiz-question");
    refs.quizAnswer = document.getElementById("quiz-answer");
    refs.quizResponse = document.getElementById("quiz-response");
    refs.saveQuizRecord = document.getElementById("save-quiz-record");
    refs.recentList = document.getElementById("recent-list");
    refs.importData = document.getElementById("import-data");
    refs.timeline = document.getElementById("timeline");
    refs.roadmapSection = document.getElementById("roadmap-section");
    refs.confirmModal = document.getElementById("confirm-modal");
  }

  function startReminderPolling() {
    if (reminderHandle) {
      window.clearInterval(reminderHandle);
    }
    reminderHandle = window.setInterval(checkReminder, 30000);
  }

  collectRefs();
  bindEvents();
  renderAll();
  startReminderPolling();
})();
