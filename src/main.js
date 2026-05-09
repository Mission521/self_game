import "./styles.css";
import wildernessMark from "./assets/wilderness-mark.svg";

const CHEAT_ALWAYS_ON = false;
const SAVE_KEY = "after_fog_ridge_save_v1";
const CURRENT_SAVE_VERSION = 1;

const gameConfig = {
  title: "雾岭之后",
  subtitle: "荒野求生文字冒险",
  cheatCode: "seltdebug",
  maxRealChapter: 3,
  resources: {
    water: { label: "清水", unit: "份" },
    food: { label: "食物", unit: "份" },
    wood: { label: "木材", unit: "捆" },
    stone: { label: "石料", unit: "块" },
    herbs: { label: "草药", unit: "束" },
    spark: { label: "火种", unit: "枚" },
    clues: { label: "线索", unit: "条" },
    stamina: { label: "体力", unit: "点" },
  },
  initialResources: {
    water: 3,
    food: 3,
    wood: 1,
    stone: 0,
    herbs: 0,
    spark: 1,
    clues: 0,
    stamina: 8,
  },
  recipes: [
    {
      id: "filter",
      label: "简易滤水器",
      description: "溪水行动额外获得清水，并降低夜间缺水风险。",
      timeCost: 1,
      cost: { wood: 1, stone: 2, herbs: 1 },
      flags: { hasFilter: true },
    },
    {
      id: "shelter",
      label: "避雨棚",
      description: "休整恢复更多体力，暴雨事件中减少损失。",
      timeCost: 2,
      cost: { wood: 4, herbs: 1 },
      flags: { hasShelter: true },
    },
    {
      id: "medkit",
      label: "草药包",
      description: "解除伤势，并在危险选择中提供额外选项。",
      timeCost: 1,
      cost: { herbs: 3 },
      flags: { hasMedkit: true, injured: false },
    },
    {
      id: "map",
      label: "临时地图",
      description: "探索更稳定获得线索，并开启山脊捷径。",
      timeCost: 2,
      cost: { stone: 1, wood: 1, clues: 2 },
      flags: { hasMap: true },
    },
    {
      id: "signalFire",
      label: "信号火堆",
      description: "最终章节可尝试救援结局。",
      timeCost: 2,
      cost: { wood: 5, spark: 1, herbs: 1 },
      flags: { hasSignalFire: true },
    },
  ],
  actions: [
    {
      id: "water",
      label: "搜寻水源",
      description: "沿低地寻找溪流和可饮用积水。",
      timeCost: 2,
      changes: { water: 2, stamina: -1 },
      bonus: (state) => (state.flags.hasFilter ? { water: 1 } : {}),
    },
    {
      id: "forage",
      label: "翻找食物",
      description: "在林缘寻找野果、根茎和还能入口的补给。",
      timeCost: 3,
      changes: { food: 2, herbs: 1, stamina: -2 },
    },
    {
      id: "wood",
      label: "收集木石",
      description: "带回可用的枯枝、碎石和搭建材料。",
      timeCost: 2,
      changes: { wood: 2, stone: 1, stamina: -1 },
    },
    {
      id: "scout",
      label: "向雾岭探索",
      description: "离开营地寻找路标、遗留物和离开的方向。",
      timeCost: 4,
      changes: { water: -1, food: -1, clues: 1, stamina: -2 },
      bonus: (state) => (state.flags.hasMap ? { clues: 1 } : {}),
    },
    {
      id: "rest",
      label: "休整营地",
      description: "整理物资、处理伤口，让身体撑过下一段路。",
      timeCost: 6,
      changes: { water: -1, food: -1, stamina: 4 },
      bonus: (state) => (state.flags.hasShelter ? { stamina: 2 } : {}),
    },
  ],
  dailyEvents: [
    {
      title: "夜里有冷雨",
      text: "雨水顺着坡面流进营地，火星几乎熄灭。你必须决定先护住什么。",
      options: [
        {
          label: "护住火种",
          result: "你用身体挡住风口，火种保住了，但一夜没睡好。",
          changes: { stamina: -2 },
        },
        {
          label: "抢修营地",
          result: "你把枝条压成挡雨边，物资少损失了一些。",
          changes: { wood: -1 },
          requireAny: [{ wood: 1 }],
        },
        {
          label: "躲到岩壁下",
          result: "你丢下了一些木材，但清晨身体还算暖。",
          changes: { wood: -2, stamina: 1 },
        },
      ],
    },
    {
      title: "陌生脚印",
      text: "潮湿泥地上出现一串新脚印，方向通往你没探索过的窄谷。",
      options: [
        {
          label: "跟过去",
          result: "你在窄谷找到折断的布条和旧刻痕。",
          timeCost: 2,
          changes: { clues: 1, stamina: -1 },
          flags: { followedTracks: true },
        },
        {
          label: "遮掩营地",
          result: "你把营地入口伪装起来，心里安稳了一些。",
          changes: { wood: -1 },
          flags: { hiddenCamp: true },
          requireAny: [{ wood: 1 }],
        },
        {
          label: "无视脚印",
          result: "你没有冒险离营，但那串脚印一直留在脑子里。",
          changes: { stamina: 1 },
        },
      ],
    },
    {
      title: "灰色鸟群掠过山口",
      text: "一大群鸟突然从北面的山口飞起，像是被什么惊动。",
      options: [
        {
          label: "记录方向",
          result: "你把山口位置记在临时地图边缘。",
          changes: { clues: 1 },
        },
        {
          label: "立刻调查",
          result: "你绕到山口下方，看见远处有一段裸露的石阶。",
          timeCost: 3,
          changes: { clues: 2, water: -1, stamina: -2 },
        },
        {
          label: "加固营地",
          result: "如果山里真有什么在移动，至少营地还能撑住。",
          changes: { wood: -2, stone: -1 },
          flags: { reinforcedCamp: true },
          requireAny: [{ wood: 2, stone: 1 }],
        },
      ],
    },
    {
      title: "伤口发热",
      text: "旧擦伤在潮湿空气里发红，继续拖下去会影响行动。",
      options: [
        {
          label: "用草药处理",
          result: "苦涩的药汁压住了发热，伤口开始收口。",
          changes: { herbs: -2, stamina: 1 },
          flags: { injured: false },
          requireAny: [{ herbs: 2 }, { hasMedkit: true }],
        },
        {
          label: "咬牙继续",
          result: "你没有停下，但每一步都变重了。",
          changes: { stamina: -3 },
          flags: { injured: true },
        },
        {
          label: "长时间休息",
          result: "你耗掉半天时间，状态稍微稳定。",
          timeCost: 6,
          changes: { water: -1, food: -1, stamina: 2 },
        },
      ],
    },
    {
      title: "清晨的回声",
      text: "雾里传来三声短促回响，不像自然声音，也不像风。",
      options: [
        {
          label: "回应三声",
          result: "远处沉默了很久，随后传来一声更低的回响。",
          changes: { clues: 1, spark: -1 },
          flags: { answeredEcho: true },
          requireAny: [{ spark: 1 }],
        },
        {
          label: "保持安静",
          result: "你等到雾散，只在树干上发现一道新鲜刻痕。",
          changes: { clues: 1 },
        },
        {
          label: "转移营地",
          result: "你搬到更高的位置，水和体力都消耗不少。",
          timeCost: 4,
          changes: { water: -1, food: -1, stamina: -2 },
          flags: { movedCamp: true },
        },
      ],
    },
  ],
  storyEvents: [
    {
      id: "bridge",
      chapter: 1,
      title: "断裂木桥",
      text: "通往南坡的旧木桥只剩一半，桥下是被雾吞没的深沟。你需要决定第一条路线。",
      options: [
        {
          label: "修补桥面",
          result: "你用木材和石块压住桥头，南坡路线暂时可走。",
          changes: { wood: -2, stone: -1, clues: 1 },
          flags: { southRoute: true },
          requireAny: [{ wood: 2, stone: 1 }],
          timeCost: 3,
        },
        {
          label: "沿沟底绕行",
          result: "你找到一段更隐蔽的溪谷，水源变得可靠。",
          changes: { water: 2, stamina: -2 },
          flags: { creekRoute: true },
          timeCost: 4,
        },
        {
          label: "冒险跃过断口",
          result: "你越过了断口，却在落地时扭伤脚踝。",
          changes: { stamina: -3, clues: 1 },
          flags: { injured: true, southRoute: true },
          timeCost: 1,
        },
      ],
    },
    {
      id: "watchpost",
      chapter: 2,
      title: "废弃观察站",
      text: "第二个真实日后，雾线退到山腰。你在高处看见一座废弃观察站，里面可能有离开的答案。",
      options: [
        {
          label: "修好旧电台",
          result: "电台只响了几秒，但你听见了断续的坐标回应。",
          changes: { spark: -1, wood: -1, clues: 2 },
          flags: { radioSignal: true },
          requireAny: [{ spark: 1, wood: 1 }],
          timeCost: 3,
        },
        {
          label: "翻找记录本",
          result: "记录本提到山脊背面还有一个旧信标。",
          changes: { clues: 2 },
          flags: { beaconKnown: true },
          timeCost: 2,
        },
        {
          label: "拆走可用材料",
          result: "你带走了木板、镜片和一小包干粮。",
          changes: { wood: 2, stone: 1, food: 1 },
          flags: { strippedWatchpost: true },
          timeCost: 2,
        },
      ],
    },
    {
      id: "beacon",
      chapter: 3,
      title: "山脊信标",
      text: "第三个真实日后，最终路线开放。雾岭最高处露出废弃信标，你必须决定怎么离开这里。",
      options: [
        {
          label: "点燃信号火堆",
          result: "浓烟穿出雾顶，远处传来发动机的声音。",
          flags: { finalChoice: "rescue" },
          requireAny: [{ hasSignalFire: true }],
          timeCost: 2,
          endingCheck: true,
        },
        {
          label: "按地图独自下山",
          result: "你收紧背包，沿着自己标出的路线离开营地。",
          flags: { finalChoice: "solo" },
          requireAny: [{ hasMap: true }],
          timeCost: 4,
          endingCheck: true,
        },
        {
          label: "追查雾岭真相",
          result: "你走向信标背后的石阶，那里有所有回声的源头。",
          flags: { finalChoice: "truth" },
          requireAny: [{ clues: 6 }],
          timeCost: 5,
          endingCheck: true,
        },
        {
          label: "留在营地等待",
          result: "你没有再进入雾里，而是把营地整理成能长期撑下去的地方。",
          flags: { finalChoice: "stay" },
          timeCost: 3,
          endingCheck: true,
        },
      ],
    },
  ],
  endings: {
    rescue: {
      title: "烟柱之上",
      text: "你点燃信号火堆，救援队沿着断续坐标找到雾岭。你带着湿透的记录本离开，知道自己不是第一个困在这里的人。",
    },
    solo: {
      title: "独行出岭",
      text: "临时地图上的每一处记号都派上了用场。你在第三个清晨之后走出山口，再回头时，雾岭已经像从未存在过。",
    },
    truth: {
      title: "雾后的旧信标",
      text: "你没有选择最快的路。石阶尽头的信标仍在发送旧时代的求救码，而你终于明白那些回声从何而来。",
    },
    stay: {
      title: "留守营地",
      text: "你把营地扩成一个能抵御雨和雾的据点。离开的路还在，但你决定等下一位迷路者出现。",
    },
    failure: {
      title: "雾线合拢",
      text: "水和食物见底，体力也被山路耗尽。雾线从营地外合拢，你只能记下最后一条模糊的方向。",
    },
  },
};

const app = document.querySelector("#app");

let state = loadSave();
let cheatBuffer = "";
let cheatVisible = CHEAT_ALWAYS_ON;
let activeTab = "actions";
let toast = "";

function createDefaultSave() {
  return {
    version: CURRENT_SAVE_VERSION,
    startedAtDate: todayKey(),
    realChapterOverride: null,
    gameDay: 1,
    gameHour: 8,
    resources: { ...gameConfig.initialResources },
    craftedItems: [],
    flags: {},
    eventHistory: [],
    resolvedDailyEvents: [],
    activeDailyEvent: null,
    endingId: null,
    log: [
      "你在雾岭边缘醒来。背包还在，指南针失灵，山下的路被白雾吞没。",
    ],
  };
}

function loadSave() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return createDefaultSave();

  try {
    const parsed = JSON.parse(raw);
    return normalizeSave(parsed);
  } catch {
    return createDefaultSave();
  }
}

function normalizeSave(save) {
  const resources = { ...gameConfig.initialResources };
  for (const key of Object.keys(gameConfig.resources)) {
    const value = Number(save.resources?.[key]);
    if (Number.isFinite(value)) resources[key] = Math.max(0, value);
  }
  const defaults = createDefaultSave();
  const realChapterOverride = Number(save.realChapterOverride);
  const knownRecipeIds = gameConfig.recipes.map((item) => item.id);
  const knownStoryIds = gameConfig.storyEvents.map((item) => item.id);
  const activeDailyEvent =
    save.activeDailyEvent &&
    Number.isInteger(Number(save.activeDailyEvent.eventIndex)) &&
    Number(save.activeDailyEvent.eventIndex) >= 0 &&
    Number(save.activeDailyEvent.eventIndex) < gameConfig.dailyEvents.length
      ? {
          key: String(save.activeDailyEvent.key || ""),
          eventIndex: Number(save.activeDailyEvent.eventIndex),
        }
      : null;

  return {
    ...defaults,
    ...save,
    version: CURRENT_SAVE_VERSION,
    startedAtDate: /^\d{4}-\d{2}-\d{2}$/.test(save.startedAtDate || "")
      ? save.startedAtDate
      : defaults.startedAtDate,
    realChapterOverride:
      realChapterOverride >= 1 && realChapterOverride <= gameConfig.maxRealChapter
        ? realChapterOverride
        : null,
    gameDay: Math.max(1, Number(save.gameDay) || 1),
    gameHour: Math.max(0, Math.min(23, Number(save.gameHour) || 8)),
    resources,
    craftedItems: Array.isArray(save.craftedItems)
      ? save.craftedItems.filter((id) => knownRecipeIds.includes(id))
      : [],
    flags: save.flags || {},
    eventHistory: Array.isArray(save.eventHistory)
      ? save.eventHistory.filter((id) => knownStoryIds.includes(id))
      : [],
    resolvedDailyEvents: Array.isArray(save.resolvedDailyEvents)
      ? save.resolvedDailyEvents.map(String)
      : [],
    activeDailyEvent,
    endingId: gameConfig.endings[save.endingId] ? save.endingId : null,
    log: Array.isArray(save.log) ? save.log.map(String).slice(-12) : [],
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / 86400000));
}

function getRealChapter() {
  if (state.realChapterOverride) return state.realChapterOverride;
  return Math.min(
    gameConfig.maxRealChapter,
    daysBetween(state.startedAtDate, todayKey()) + 1,
  );
}

function resourceLabel(id) {
  return gameConfig.resources[id]?.label || id;
}

function clampResources() {
  for (const key of Object.keys(gameConfig.resources)) {
    const max = key === "stamina" ? 12 : 99;
    state.resources[key] = Math.max(0, Math.min(max, state.resources[key] || 0));
  }
}

function addLog(message) {
  state.log = [message, ...state.log].slice(0, 12);
}

function changeResources(changes = {}) {
  Object.entries(changes).forEach(([key, value]) => {
    if (key in gameConfig.resources) {
      state.resources[key] = (state.resources[key] || 0) + value;
    }
  });
  clampResources();
}

function mergeFlags(flags = {}) {
  Object.entries(flags).forEach(([key, value]) => {
    state.flags[key] = value;
  });
}

function hasRequirements(requireAny) {
  if (!requireAny || requireAny.length === 0) return true;
  return requireAny.some((requirement) =>
    Object.entries(requirement).every(([key, value]) => {
      if (key.startsWith("has") || typeof value === "boolean") {
        return Boolean(state.flags[key]) === Boolean(value);
      }
      return (state.resources[key] || 0) >= value;
    }),
  );
}

function formatRequirement(requireAny) {
  if (!requireAny || requireAny.length === 0) return "";
  return requireAny
    .map((requirement) =>
      Object.entries(requirement)
        .map(([key, value]) => {
          if (key.startsWith("has")) return value ? "需要对应物品" : "";
          return `${resourceLabel(key)} ${value}`;
        })
        .filter(Boolean)
        .join("、"),
    )
    .join(" 或 ");
}

function formatTime() {
  return `第 ${state.gameDay} 个游戏日 ${String(state.gameHour).padStart(2, "0")}:00`;
}

function advanceTime(hours) {
  let total = state.gameHour + hours;
  while (total >= 24) {
    total -= 24;
    state.gameDay += 1;
    scheduleDailyEvent();
  }
  state.gameHour = total;
}

function getDailyEventForDay(day) {
  const index = (day - 2) % gameConfig.dailyEvents.length;
  return gameConfig.dailyEvents[index];
}

function scheduleDailyEvent() {
  const eventKey = `day-${state.gameDay}`;
  if (state.resolvedDailyEvents.includes(eventKey) || state.activeDailyEvent) return;
  state.activeDailyEvent = {
    key: eventKey,
    eventIndex: (state.gameDay - 2) % gameConfig.dailyEvents.length,
  };
  addLog(`新的游戏日开始：${getDailyEventForDay(state.gameDay).title}`);
}

function getActiveDailyEvent() {
  if (!state.activeDailyEvent) return null;
  return gameConfig.dailyEvents[state.activeDailyEvent.eventIndex];
}

function getNextStoryEvent() {
  const realChapter = getRealChapter();
  return gameConfig.storyEvents.find(
    (event) =>
      event.chapter <= realChapter && !state.eventHistory.includes(event.id),
  );
}

function canSpend(cost = {}) {
  return Object.entries(cost).every(
    ([key, value]) => (state.resources[key] || 0) >= value,
  );
}

function describeChanges(changes = {}, bonus = {}) {
  const merged = {};
  for (const [key, value] of Object.entries(changes)) merged[key] = value;
  for (const [key, value] of Object.entries(bonus)) {
    merged[key] = (merged[key] || 0) + value;
  }
  return Object.entries(merged)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => `${resourceLabel(key)} ${value > 0 ? "+" : ""}${value}`)
    .join("，");
}

function checkFailure() {
  if (
    !state.endingId &&
    (state.resources.water <= 0 ||
      state.resources.food <= 0 ||
      state.resources.stamina <= 0)
  ) {
    state.endingId = "failure";
    addLog("雾线合拢，生存失败。");
  }
}

function resolveEnding() {
  if (state.flags.finalChoice === "truth" && state.resources.clues >= 6) {
    state.endingId = "truth";
  } else if (state.flags.finalChoice === "rescue" && state.flags.radioSignal) {
    state.endingId = "rescue";
  } else if (state.flags.finalChoice === "rescue" && state.flags.hasSignalFire) {
    state.endingId = "rescue";
  } else if (state.flags.finalChoice === "solo" && state.flags.hasMap) {
    state.endingId = "solo";
  } else if (state.flags.finalChoice === "stay") {
    state.endingId = "stay";
  } else {
    state.endingId = "failure";
  }
  addLog(`结局达成：${gameConfig.endings[state.endingId].title}`);
}

function performAction(actionId) {
  if (state.endingId || state.activeDailyEvent) return;
  const action = gameConfig.actions.find((item) => item.id === actionId);
  if (!action) return;

  const bonus = action.bonus ? action.bonus(state) : {};
  changeResources(action.changes);
  changeResources(bonus);
  advanceTime(action.timeCost);
  addLog(`${action.label}。${describeChanges(action.changes, bonus) || "没有明显变化"}。`);
  checkFailure();
  saveAndRender();
}

function craftItem(recipeId) {
  if (state.endingId || state.activeDailyEvent) return;
  const recipe = gameConfig.recipes.find((item) => item.id === recipeId);
  if (!recipe || state.craftedItems.includes(recipe.id)) return;

  if (!canSpend(recipe.cost)) {
    showToast("材料不足，无法合成。");
    return;
  }

  const negativeCost = Object.fromEntries(
    Object.entries(recipe.cost).map(([key, value]) => [key, -value]),
  );
  changeResources(negativeCost);
  mergeFlags(recipe.flags);
  state.craftedItems.push(recipe.id);
  advanceTime(recipe.timeCost);
  addLog(`合成了${recipe.label}。`);
  checkFailure();
  saveAndRender();
}

function chooseStoryOption(eventId, optionIndex) {
  if (state.endingId) return;
  const event = gameConfig.storyEvents.find((item) => item.id === eventId);
  const option = event?.options[optionIndex];
  if (!event || !option || !hasRequirements(option.requireAny)) return;

  changeResources(option.changes);
  mergeFlags(option.flags);
  advanceTime(option.timeCost || 1);
  state.eventHistory.push(event.id);
  addLog(option.result);
  if (option.endingCheck) resolveEnding();
  checkFailure();
  saveAndRender();
}

function chooseDailyOption(optionIndex) {
  const event = getActiveDailyEvent();
  const option = event?.options[optionIndex];
  if (!event || !option || !hasRequirements(option.requireAny)) return;

  const eventKey = state.activeDailyEvent.key;
  state.activeDailyEvent = null;
  changeResources(option.changes);
  mergeFlags(option.flags);
  advanceTime(option.timeCost || 1);
  state.resolvedDailyEvents.push(eventKey);
  addLog(option.result);
  checkFailure();
  saveAndRender();
}

function showToast(message) {
  toast = message;
  render();
  window.setTimeout(() => {
    toast = "";
    render();
  }, 2200);
}

function saveAndRender() {
  saveGame();
  render();
}

function resetSave() {
  const confirmed = window.confirm("确定要清空当前存档吗？");
  if (!confirmed) return;
  state = createDefaultSave();
  saveAndRender();
}

function exportSave() {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function importSave(code) {
  try {
    const binary = atob(code.trim());
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object" || !parsed.resources) {
      throw new Error("Invalid save");
    }
    state = normalizeSave(parsed);
    addLog("存档导入成功。");
    saveAndRender();
  } catch {
    showToast("存档码无效，导入失败。");
  }
}

function setCheatResource(key, amount) {
  const value = Number.isFinite(amount) ? amount : 0;
  state.resources[key] = Math.max(0, value);
  saveGame();
  refreshResourceViews();
}

function refreshResourceViews() {
  document.querySelectorAll("[data-resource-list]").forEach((resourceList) => {
    resourceList.innerHTML = renderResourceList();
  });
}

function setRealChapter(chapter) {
  state.realChapterOverride = chapter;
  addLog(`调试：真实章节切换到第 ${chapter} 阶段。`);
  saveAndRender();
}

function jumpGameHours(hours) {
  advanceTime(hours);
  addLog(`调试：推进了 ${hours} 个游戏小时。`);
  saveAndRender();
}

function forceEnding(id) {
  state.endingId = id;
  addLog(`调试：直接进入结局「${gameConfig.endings[id].title}」。`);
  saveAndRender();
}

function restartAfterEnding() {
  state.endingId = null;
  state.flags.finalChoice = null;
  state.eventHistory = state.eventHistory.filter((id) => id !== "beacon");
  addLog("你把结局页合上，回到雾岭营地继续尝试。");
  saveAndRender();
}

function renderResourceList() {
  return Object.entries(gameConfig.resources)
    .map(([key, meta]) => {
      const value = state.resources[key] || 0;
      const level =
        key === "stamina" ? Math.round((value / 12) * 100) : Math.min(value * 12, 100);
      return `
        <li class="resource">
          <span>${meta.label}</span>
          <strong>${value}${meta.unit}</strong>
          <i style="--level: ${level}%"></i>
        </li>
      `;
    })
    .join("");
}

function renderTabs() {
  const tabs = [
    ["actions", "行动"],
    ["craft", "合成"],
    ["story", "剧情"],
    ["save", "存档"],
  ];

  return tabs
    .map(
      ([id, label]) => `
        <button class="tab ${activeTab === id ? "active" : ""}" data-tab="${id}">
          ${label}
        </button>
      `,
    )
    .join("");
}

function renderActions() {
  return `
    <div class="action-grid">
      ${gameConfig.actions
        .map((action) => {
          const bonus = action.bonus ? action.bonus(state) : {};
          return `
            <button class="action-card" data-action="${action.id}" ${state.activeDailyEvent ? "disabled" : ""}>
              <span class="action-title">${action.label}</span>
              <span>${action.description}</span>
              <small>耗时 ${action.timeCost} 小时 · ${describeChanges(action.changes, bonus)}</small>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCraft() {
  return `
    <div class="recipe-list">
      ${gameConfig.recipes
        .map((recipe) => {
          const owned = state.craftedItems.includes(recipe.id);
          const disabled = owned || !canSpend(recipe.cost) || state.activeDailyEvent;
          const cost = Object.entries(recipe.cost)
            .map(([key, value]) => `${resourceLabel(key)} ${value}`)
            .join("，");
          return `
            <article class="recipe ${owned ? "owned" : ""}">
              <div>
                <h3>${recipe.label}</h3>
                <p>${recipe.description}</p>
                <small>耗时 ${recipe.timeCost} 小时 · ${cost}</small>
              </div>
              <button data-craft="${recipe.id}" ${disabled ? "disabled" : ""}>
                ${owned ? "已拥有" : "合成"}
              </button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderStory() {
  const event = getNextStoryEvent();
  const realChapter = getRealChapter();
  const nextLocked = gameConfig.storyEvents.find(
    (item) => item.chapter > realChapter && !state.eventHistory.includes(item.id),
  );

  if (!event) {
    return `
      <div class="story-panel">
        <h3>当前没有新的主线事件</h3>
        <p>${
          nextLocked
            ? `下一段主线会在真实第 ${nextLocked.chapter} 天解锁。`
            : "所有主线已经处理完毕。"
        }</p>
      </div>
    `;
  }

  return `
    <div class="story-panel">
      <p class="eyebrow">真实阶段 ${event.chapter}</p>
      <h3>${event.title}</h3>
      <p>${event.text}</p>
      <div class="choice-list">
        ${event.options
          .map((option, index) => {
            const available = hasRequirements(option.requireAny);
            return `
              <button data-story="${event.id}" data-option="${index}" ${available ? "" : "disabled"}>
                <span>${option.label}</span>
                <small>${available ? option.result : `条件不足：${formatRequirement(option.requireAny)}`}</small>
              </button>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderDailyEvent() {
  const event = getActiveDailyEvent();
  if (!event) return "";

  return `
    <section class="urgent">
      <p class="eyebrow">游戏日事件</p>
      <h2>${event.title}</h2>
      <p>${event.text}</p>
      <div class="choice-list">
        ${event.options
          .map((option, index) => {
            const available = hasRequirements(option.requireAny);
            return `
              <button data-daily-option="${index}" ${available ? "" : "disabled"}>
                <span>${option.label}</span>
                <small>${available ? option.result : `条件不足：${formatRequirement(option.requireAny)}`}</small>
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderSaveTools() {
  return `
    <div class="save-tools">
      <label>
        导出存档
        <textarea readonly rows="5">${exportSave()}</textarea>
      </label>
      <label>
        导入存档
        <textarea id="import-code" rows="5" placeholder="粘贴存档码"></textarea>
      </label>
      <div class="button-row">
        <button data-import>导入</button>
        <button data-reset>重置存档</button>
      </div>
    </div>
  `;
}

function renderPanelContent() {
  if (activeTab === "craft") return renderCraft();
  if (activeTab === "story") return renderStory();
  if (activeTab === "save") return renderSaveTools();
  return renderActions();
}

function renderEnding() {
  if (!state.endingId) return "";
  const ending = gameConfig.endings[state.endingId];
  return `
    <section class="ending">
      <p class="eyebrow">结局</p>
      <h2>${ending.title}</h2>
      <p>${ending.text}</p>
      <div class="button-row">
        <button data-restart-ending>继续尝试</button>
        <button data-reset>新存档</button>
      </div>
    </section>
  `;
}

function renderCheatPanel() {
  if (!cheatVisible) return "";

  return `
    <aside class="cheat-panel">
      <div class="panel-title">
        <h2>调试面板</h2>
        <button data-hide-cheat>隐藏</button>
      </div>
      <div class="cheat-grid">
        ${Object.entries(gameConfig.resources)
          .map(
            ([key, meta]) => `
              <label>
                ${meta.label}
                <input type="number" min="0" value="${state.resources[key] || 0}" data-cheat-resource="${key}" />
              </label>
            `,
          )
          .join("")}
      </div>
      <div class="button-row">
        <button data-real-chapter="1">真实第1天</button>
        <button data-real-chapter="2">真实第2天</button>
        <button data-real-chapter="3">真实第3天</button>
        <button data-jump-hours="12">推进12小时</button>
        <button data-jump-hours="24">推进1游戏日</button>
      </div>
      <div class="button-row">
        ${Object.entries(gameConfig.endings)
          .map(([id, ending]) => `<button data-force-ending="${id}">${ending.title}</button>`)
          .join("")}
      </div>
    </aside>
  `;
}

function renderLog() {
  return `
    <ol class="log-list">
      ${state.log.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ol>
  `;
}

function render() {
  const realChapter = getRealChapter();
  app.innerHTML = `
    <main class="shell">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${gameConfig.subtitle}</p>
          <h1>${gameConfig.title}</h1>
          <p>雾岭的时间不按现实流动。每次行动都会推进数小时，而最终路线会在真实第 3 天开放。</p>
          <div class="status-line">
            <span>${formatTime()}</span>
            <span>真实阶段 ${realChapter}/${gameConfig.maxRealChapter}</span>
          </div>
        </div>
        <img src="${wildernessMark}" alt="雾岭营地插画" />
      </section>

      ${toast ? `<div class="toast">${toast}</div>` : ""}
      ${renderEnding()}
      ${renderDailyEvent()}

      <section class="dashboard">
        <aside class="sidebar">
          <div class="panel-title">
            <h2>状态</h2>
            <span>${state.endingId ? "已结局" : "求生中"}</span>
          </div>
          <ul class="resource-list" data-resource-list>
            ${renderResourceList()}
          </ul>
          <div class="inventory">
            <h2>物品</h2>
            <p>${
              state.craftedItems.length
                ? state.craftedItems
                    .map((id) => gameConfig.recipes.find((item) => item.id === id)?.label)
                    .join("、")
                : "尚未合成物品"
            }</p>
          </div>
        </aside>

        <section class="play-area">
          <nav class="tabs">${renderTabs()}</nav>
          ${renderPanelContent()}
        </section>
      </section>

      <section class="journal">
        <div class="panel-title">
          <h2>记录</h2>
          <span>${escapeHtml(state.startedAtDate)} 开始</span>
        </div>
        ${renderLog()}
      </section>

      ${renderCheatPanel()}
    </main>
  `;
}

function handleClick(event) {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.tab) {
    activeTab = target.dataset.tab;
    render();
  } else if (target.dataset.action) {
    performAction(target.dataset.action);
  } else if (target.dataset.craft) {
    craftItem(target.dataset.craft);
  } else if (target.dataset.story) {
    chooseStoryOption(target.dataset.story, Number(target.dataset.option));
  } else if (target.dataset.dailyOption) {
    chooseDailyOption(Number(target.dataset.dailyOption));
  } else if (target.dataset.import !== undefined) {
    const code = document.querySelector("#import-code")?.value || "";
    importSave(code);
  } else if (target.dataset.reset !== undefined) {
    resetSave();
  } else if (target.dataset.hideCheat !== undefined) {
    cheatVisible = false;
    render();
  } else if (target.dataset.realChapter) {
    setRealChapter(Number(target.dataset.realChapter));
  } else if (target.dataset.jumpHours) {
    jumpGameHours(Number(target.dataset.jumpHours));
  } else if (target.dataset.forceEnding) {
    forceEnding(target.dataset.forceEnding);
  } else if (target.dataset.restartEnding !== undefined) {
    restartAfterEnding();
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.dataset.cheatResource) {
    setCheatResource(target.dataset.cheatResource, Number(target.value || 0));
  }
}

function handleKeydown(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.matches("input, textarea")) return;

  cheatBuffer = `${cheatBuffer}${event.key.toLowerCase()}`.slice(
    -gameConfig.cheatCode.length,
  );
  if (cheatBuffer === gameConfig.cheatCode) {
    cheatVisible = true;
    showToast("调试面板已开启。");
  }
}

app.addEventListener("click", handleClick);
app.addEventListener("input", handleInput);
window.addEventListener("keydown", handleKeydown);

saveGame();
render();
