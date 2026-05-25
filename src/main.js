import "./styles.css";
import wildernessMark from "./assets/wilderness-mark.svg";

const CHEAT_ALWAYS_ON = false;
const SAVE_KEY = "after_fog_ridge_save_v1";
const CURRENT_SAVE_VERSION = 1;

const gameConfig = {
  title: "雾岭之后",
  subtitle: "荒野求生文字冒险",
  cheatCode: "seltdebug",
  maxChapter: 3,
  chapterUnlocks: {
    2: {
      text: "完成断裂木桥，并拥有 2 条线索或临时地图。",
      requireAny: [
        { event: "bridge", clues: 2 },
        { event: "bridge", hasMap: true },
      ],
    },
    3: {
      text: "完成废弃观察站，并拥有 5 条线索或信号火堆。",
      requireAny: [
        { event: "watchpost", clues: 5 },
        { event: "watchpost", hasSignalFire: true },
      ],
    },
  },
  resources: {
    stamina: { label: "体力", unit: "点" },
    water: { label: "清水", unit: "份" },
    food: { label: "食物", unit: "份" },
    wood: { label: "木材", unit: "捆" },
    stone: { label: "石料", unit: "块" },
    herbs: { label: "草药", unit: "束" },
    spark: { label: "火种", unit: "枚" },
    clues: { label: "线索", unit: "条" },
    morale: { label: "士气", unit: "度" },
    rope: { label: "绳索", unit: "段" },
    flare: { label: "信号弹", unit: "枚" },
    pelt: { label: "毛皮", unit: "张" },
  },
  flags: {
    answeredEcho: "回应过清晨回声",
    hasMap: "临时地图",
    hasMedkit: "草药包",
    hasSignalFire: "信号火堆",
    hasFilter: "简易滤水器",
    hasShelter: "避雨棚",
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
    morale: 5,
    rope: 0,
    flare: 0,
    pelt: 0,
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
    {
      id: "furCloak",
      label: "毛皮披风",
      description: "缝制后穿上，休整时额外恢复体力。",
      timeCost: 2,
      cost: { pelt: 2, herbs: 1 },
      flags: { hasFurCloak: true },
    },
    {
      id: "craftFlare",
      label: "自制信号弹",
      description: "用硫磺石和干草捆成可点燃的信号装置，探索时随手备一枚。",
      timeCost: 2,
      cost: { spark: 1, herbs: 2, stone: 2 },
      flags: { hasCraftFlare: true },
    },
    {
      id: "ropeladder",
      label: "绳梯",
      description: "绑好后可攀上高处瞭望，探索时额外发现线索。",
      timeCost: 2,
      cost: { rope: 2, wood: 2 },
      flags: { hasRopeLadder: true },
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
      bonus: (state) => ({
        clues: (state.flags.hasMap ? 1 : 0) + (state.flags.hasRopeLadder ? 1 : 0),
        flare: state.flags.hasCraftFlare ? 1 : 0,
      }),
    },
    {
      id: "rest",
      label: "休整营地",
      description: "整理物资、处理伤口，让身体撑过下一段路。",
      timeCost: 6,
      changes: { water: -1, food: -1, stamina: 4 },
      bonus: (state) => ({
        stamina: (state.flags.hasShelter ? 2 : 0) + (state.flags.hasFurCloak ? 1 : 0),
      }),
    },
    {
      id: "trap",
      label: "设置陷阱",
      description: "在兽径旁布置简易套索，等待猎物上钩。",
      timeCost: 3,
      changes: { wood: -1, pelt: 1, food: 1, stamina: -1 },
    },
    {
      id: "braid",
      label: "编织绳索",
      description: "用藤蔓和草茎搓成可用的绳段。",
      timeCost: 2,
      changes: { herbs: -2, rope: 1, stamina: -1 },
      requireAny: [{ herbs: 2 }],
    },
    {
      id: "encourage",
      label: "鼓舞同伴",
      description: "分出一份食物，围坐讲述走出去的计划。",
      timeCost: 1,
      changes: { food: -1, morale: 2 },
      requireAny: [{ food: 1 }],
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
    {
      title: "远处的塌方声",
      text: "午后山体深处传来沉闷断裂声，旧路可能被掩埋，也可能露出新的裂口。",
      options: [
        {
          label: "趁尘土未落前查看",
          result: "你在塌方边缘找到半截界桩，背面刻着旧编号。",
          timeCost: 3,
          changes: { clues: 2, stamina: -2 },
          flags: { foundMarker: true },
        },
        {
          label: "收集滚落石料",
          result: "你避开碎坡，把可用石块搬回营地。",
          changes: { stone: 3, stamina: -1 },
        },
        {
          label: "封住危险入口",
          result: "你用木枝和石块标出危险边界，之后绕行会更稳。",
          changes: { wood: -2, stone: -1 },
          flags: { sealedCollapse: true },
          requireAny: [{ wood: 2, stone: 1 }],
        },
      ],
    },
    {
      title: "旧营火余烬",
      text: "一圈被雨打散的灰烬藏在灌木后，像是有人比你更早在这里等过。",
      options: [
        {
          label: "翻找灰烬",
          result: "灰烬底下压着一枚没烧尽的火种和几片防水布。",
          changes: { spark: 1, herbs: 1 },
        },
        {
          label: "追着脚印深入",
          result: "脚印在一面石壁前消失，只留下细小的刻痕。",
          timeCost: 3,
          changes: { clues: 2, food: -1, stamina: -1 },
          flags: { tracedOldCamp: true },
        },
        {
          label: "把余烬彻底掩埋",
          result: "你不想让任何东西循着烟味找到营地。",
          changes: { stamina: 1 },
          flags: { buriedOldFire: true },
        },
      ],
    },
    {
      title: "松散的悬崖路",
      text: "通往北面的一段崖路被雨水冲松，碎石不断滑落，必须想办法过去。",
      options: [
        {
          label: "用绳索垂降",
          result: "绳索绷得发烫，但你稳稳落到下方平台。",
          changes: { rope: -1, stamina: -1, clues: 1 },
          requireAny: [{ rope: 1 }],
        },
        {
          label: "硬着头皮翻过",
          result: "碎石一路追着你的脚后跟，膝盖撞青了一块。",
          changes: { stamina: -3, morale: -1 },
        },
        {
          label: "绕道更远的山脊",
          result: "你多走了大半天，但在路上记下几处陌生标记。",
          timeCost: 4,
          changes: { water: -1, food: -1, clues: 2 },
        },
      ],
    },
    {
      title: "猎物踪迹",
      text: "湿泥地上印着一串新鲜的偶蹄，看样子是一头不算大的鹿。",
      options: [
        {
          label: "围猎追击",
          result: "你顺风追上去，干净利落地放倒了它。",
          timeCost: 3,
          changes: { food: 2, pelt: 1, stamina: -2 },
        },
        {
          label: "设陷阱",
          result: "你削了几根木桩布陷阱，第二天清晨拖回一张完整毛皮。",
          changes: { wood: -2, pelt: 1, morale: 1 },
          requireAny: [{ wood: 2 }],
        },
        {
          label: "让它过去",
          result: "你蹲在草丛里看它走远，心里反而踏实下来。",
          changes: { morale: 1 },
        },
      ],
    },
    {
      title: "同伴的呼号",
      text: "对面山坡传来断断续续的喊声，听不清是求助还是警告。",
      options: [
        {
          label: "升空信号弹回应",
          result: "信号弹爆开的瞬间，对面的呼喊变成了清晰的应答。",
          changes: { flare: -1, morale: 2, clues: 1 },
          requireAny: [{ flare: 1 }],
          flags: { radioSignal: true },
        },
        {
          label: "点起大火堆示意",
          result: "你拼命架柴生火，烟柱直直冲上灰白的天空。",
          changes: { wood: -2, morale: 1 },
          requireAny: [{ wood: 2 }],
          flags: { hasSignalFire: true },
        },
        {
          label: "不敢回应",
          result: "你蜷在岩壁后等到呼喊消失，整夜辗转难眠。",
          changes: { morale: -2 },
        },
      ],
    },
    {
      title: "废弃补给箱",
      text: "灌木深处半埋着一只生锈的金属箱，搭扣已经松了一半。",
      options: [
        {
          label: "撬开取走全部",
          result: "里头有两枚信号弹和一卷尼龙绳，还压着几条干粮。",
          changes: { flare: 1, rope: 1, food: 1 },
        },
        {
          label: "留一半给后来者",
          result: "你只带走最关键的部分，把箱盖重新压好，心里轻了一些。",
          changes: { food: -1, rope: 1, morale: 3 },
          requireAny: [{ food: 2 }],
        },
        {
          label: "怀疑陷阱，绕走",
          result: "你绕开补给箱，但一整天都在想到底错过了什么。",
          changes: { morale: -1 },
        },
      ],
    },
    {
      title: "夜里凉骨",
      text: "气温骤降，呼出的白气挂在睫毛上，火堆也压不住寒意。",
      options: [
        {
          label: "披毛皮御寒",
          result: "粗糙的毛皮捂住了肩背，你终于能合眼休息。",
          changes: { pelt: -1, stamina: 2, morale: 1 },
          requireAny: [{ pelt: 1 }],
        },
        {
          label: "加柴撑过去",
          result: "你不停地往火里添柴，靠火光熬了一夜。",
          changes: { wood: -2, stamina: 1 },
          requireAny: [{ wood: 2 }],
        },
        {
          label: "硬扛到天亮",
          result: "牙齿打颤的声音陪了你一整夜，清晨连手都不太听使唤。",
          changes: { stamina: -3, morale: -1 },
        },
      ],
    },
    {
      title: "岔路上的旧布条",
      text: "三岔路口的枯枝上系着一截褪色布条，看上去是有人留下的指引。",
      options: [
        {
          label: "顺着指引深入",
          result: "你沿布条走了一截，在一块石头底下发现了潦草的笔记。",
          timeCost: 2,
          changes: { clues: 2, stamina: -1 },
        },
        {
          label: "剪下来做绳",
          result: "布条接起来勉强成一段细绳，至少能绑些东西。",
          changes: { rope: 1, morale: -1 },
        },
        {
          label: "看一眼就走",
          result: "你没有动那条布，只是在心里记下了位置。",
          changes: { morale: 1 },
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
      text: "线索把你带到山腰。雾线后露出一座废弃观察站，里面可能有离开的答案。",
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
      id: "ravine",
      chapter: 2,
      title: "裂谷绳梯",
      text: "观察站后的旧绳梯垂向裂谷。谷底有金属反光，也有被雨水磨光的坠落痕迹。",
      options: [
        {
          label: "用绳梯下到谷底",
          result: "你在谷底找到信标维护牌，确认山脊背面还有一条窄路。",
          changes: { clues: 2, stamina: -2 },
          flags: { ravineRoute: true },
          requireAny: [{ hasMap: true }, { stamina: 7 }],
          timeCost: 4,
        },
        {
          label: "拆下绳梯材料",
          result: "你没有下谷，而是把还能用的木节和绳结带回营地。",
          changes: { wood: 2, herbs: 1 },
          flags: { strippedRavine: true },
          timeCost: 2,
        },
        {
          label: "强行攀下湿滑岩壁",
          result: "岩壁在你脚下崩开，雾从裂谷里升起，吞没了最后的火光。",
          changes: { stamina: -4 },
          flags: { finalChoice: "ravineFall" },
          timeCost: 1,
          endingId: "lost",
        },
      ],
    },
    {
      id: "ropeBridge",
      chapter: 2,
      title: "松垮的索桥",
      text: "通往观察站背面的旧索桥只剩主绳还撑着，木板大半烂透，但桥那头似乎有过有人停留的痕迹。",
      options: [
        {
          label: "用绳索加固桥面",
          result: "你把绳索绕在主绳和断板之间，重新扎成一条能走的路。",
          changes: { rope: -2, clues: 2, morale: 1 },
          flags: { fixedRope: true },
          requireAny: [{ rope: 2 }],
          timeCost: 3,
        },
        {
          label: "强行荡过去",
          result: "你抓着主绳一口气荡过去，肩膀被磨出一道血印。",
          changes: { stamina: -3, clues: 1 },
          flags: { injured: true },
          timeCost: 2,
        },
        {
          label: "放弃这条路",
          result: "你退回观察站，决定从其他方向想办法。",
          changes: { morale: -2 },
          timeCost: 1,
        },
      ],
    },
    {
      id: "coldRiver",
      chapter: 2,
      title: "冷河对岸的火光",
      text: "黑色水面对岸闪着一豆火光，似乎有人也在等待信号。",
      options: [
        {
          label: "升起信号弹回应",
          result: "信号弹炸出白光，对岸的火堆立刻往上堆了一层，又传来短促的金属敲击。",
          changes: { flare: -1, morale: 2, clues: 1 },
          flags: { radioSignal: true },
          requireAny: [{ flare: 1 }],
          timeCost: 2,
        },
        {
          label: "趟过冷河",
          result: "刺骨的水浸到胸口，但你抓到了几张被冲下来的笔记。",
          changes: { stamina: -4, food: -1, clues: 1 },
          flags: { crossedColdRiver: true },
          timeCost: 4,
        },
        {
          label: "不回应",
          result: "你看着对岸的火光慢慢熄灭，心里像被空出一块。",
          changes: { morale: -1 },
          timeCost: 1,
        },
      ],
    },
    {
      id: "stoneDoor",
      chapter: 3,
      title: "石门回声",
      text: "旧信标下方有一扇半掩的石门。门缝里传出规律敲击，像有人在里面回应你的每一次选择。",
      options: [
        {
          label: "按记录本节奏回应",
          result: "石门缓慢开启，里面不是出口，而是一间仍在运转的旧中继室。",
          changes: { clues: 2, spark: -1 },
          flags: { relayRoomOpen: true },
          requireAny: [{ clues: 6, spark: 1 }, { answeredEcho: true, spark: 1 }],
          timeCost: 3,
        },
        {
          label: "封住石门继续上行",
          result: "你用碎石压住门缝，把注意力重新放回山脊路线。",
          changes: { stone: -2, stamina: -1 },
          flags: { sealedStoneDoor: true },
          requireAny: [{ stone: 2 }],
          timeCost: 2,
        },
        {
          label: "独自走进门后深处",
          result: "石门在身后合上。雾岭没有放你离开，却把所有答案都留给了你。",
          flags: { finalChoice: "keeper" },
          timeCost: 2,
          endingId: "keeper",
        },
      ],
    },
    {
      id: "mistShadow",
      chapter: 3,
      title: "雾中影子",
      text: "靠近山脊时，雾里始终有一道形状陪着你，分不清是动物还是别的什么。",
      options: [
        {
          label: "披上毛皮潜行",
          result: "你借着毛皮的轮廓混进雾里，那道影子最后停在一处石坛前。",
          changes: { pelt: -2, clues: 2, morale: 1 },
          flags: { hiddenScout: true },
          requireAny: [{ pelt: 2 }],
          timeCost: 3,
        },
        {
          label: "正面对峙",
          result: "你扯开嗓子喊出去，影子停顿了一下，缓缓退入更深的雾里。",
          changes: { stamina: -2, morale: -1, clues: 1 },
          timeCost: 2,
        },
        {
          label: "原路撤退",
          result: "你顺着来路退回营地，但那道影子留在你脑海里很久。",
          changes: { stamina: -1, morale: -2 },
          timeCost: 2,
        },
      ],
    },
    {
      id: "beacon",
      chapter: 3,
      title: "山脊信标",
      text: "关键路线已经拼齐。雾岭最高处露出废弃信标，你必须决定怎么离开这里。",
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
    lost: {
      title: "裂谷无声",
      text: "你选择了最短的下行路线。裂谷吞掉脚步声，也吞掉了雾外传来的最后一点光。",
    },
    keeper: {
      title: "门后的守望者",
      text: "你走进旧中继室，接过仍在重复的求救码。离开的路没有消失，只是你决定先让后来者听见回应。",
    },
  },
};

const app = document.querySelector("#app");

let state = loadSave();
let cheatBuffer = "";
let cheatVisible = CHEAT_ALWAYS_ON;
let activeTab = "actions";
let toast = "";
let miniGamesOpen = false;
let activeMiniGame = "thirtyNine";
let miniGameState = createMiniGameState();

function createDefaultSave() {
  return {
    version: CURRENT_SAVE_VERSION,
    startedAtDate: todayKey(),
    chapterOverride: null,
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
  const chapterOverride = Number(save.chapterOverride ?? save.realChapterOverride);
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
    chapterOverride:
      chapterOverride >= 1 && chapterOverride <= gameConfig.maxChapter
        ? chapterOverride
        : null,
    realChapterOverride: undefined,
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

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const MINI_GAME_DIFFICULTIES = {
  easy: "简单",
  normal: "普通",
  hard: "困难",
};

function createMiniGameState() {
  return {
    difficulty: {
      thirtyNine: "normal",
      davinci: "normal",
    },
    thirtyNine: createThirtyNineGame(),
    davinci: createDavinciGame(),
  };
}

function scheduleMiniGameStart(gameId) {
  const game = miniGameState[gameId];
  if (!game || game.phase !== "playing" || game.started) return;
  game.started = true;
  if (gameId === "thirtyNine" && game.currentTurn === "system" && game.tableCards.length === 0) {
    window.setTimeout(playThirtyNineSystemTurn, 420);
  }
  if (gameId === "davinci") {
    if (game.currentTurn === "system" && !game.turnCardId && !game.pendingCard) {
      window.setTimeout(playDavinciSystemTurn, 520);
    }
    if (game.currentTurn === "player" && !game.turnCardId && !game.pendingCard) {
      beginDavinciPlayerTurn();
    }
  }
}

function getMiniGameDifficulty(gameId) {
  return miniGameState.difficulty?.[gameId] || "normal";
}

function setMiniGameDifficulty(gameId, difficulty) {
  if (!MINI_GAME_DIFFICULTIES[difficulty]) return;
  if (!miniGameState.difficulty) miniGameState.difficulty = {};
  miniGameState.difficulty[gameId] = difficulty;
}

function randomFirstOwner() {
  return randomItem(["player", "system"]);
}

function createMiniResult(type, text) {
  return { type, text };
}

function createThirtyNineDeck() {
  return shuffle(
    Array.from({ length: 8 }, (_, valueIndex) => valueIndex + 1).flatMap((value) =>
      Array.from({ length: 4 }, (_, copyIndex) => ({
        id: `thirty-nine-${value}-${copyIndex}`,
        value,
      })),
    ),
  );
}

function createThirtyNineGame() {
  const firstOwner = randomFirstOwner();
  return {
    phase: "playing",
    currentTurn: firstOwner,
    started: false,
    deck: createThirtyNineDeck(),
    hands: { player: [], system: [] },
    tableCards: [],
    message: `随机决定${ownerLabel(firstOwner)}先手。${ownerLabel(firstOwner)}开始选牌。`,
    result: createMiniResult("neutral", `本局随机先手：${ownerLabel(firstOwner)}`),
    winner: null,
  };
}

function createDavinciDeck() {
  const cards = [];
  for (const color of ["white", "black"]) {
    for (let value = 0; value <= 11; value += 1) {
      cards.push({
        id: `davinci-${color}-${value}`,
        color,
        value,
        wildcard: false,
        revealed: false,
      });
    }
    cards.push({
      id: `davinci-${color}-wild`,
      color,
      value: null,
      wildcard: true,
      revealed: false,
    });
  }
  return shuffle(cards);
}

function createDavinciGame() {
  const deck = createDavinciDeck();
  const playerCards = [];
  const systemCards = [];
  for (let index = 0; index < 4; index += 1) {
    playerCards.push({ ...deck.pop(), revealed: false });
    systemCards.push({ ...deck.pop(), revealed: false });
  }
  const firstOwner = randomFirstOwner();

  return {
    phase: "playing",
    currentTurn: firstOwner,
    started: false,
    deck,
    playerCards: sortDavinciHand(playerCards),
    systemCards: sortDavinciHand(systemCards),
    pendingCard: null,
    pendingOwner: null,
    turnCardId: null,
    hasGuessedThisTurn: false,
    selectedTargetId: null,
    message: `随机决定${ownerLabel(firstOwner)}先手。${ownerLabel(firstOwner)}开始回合。`,
    result: createMiniResult("neutral", `本局随机先手：${ownerLabel(firstOwner)}`),
    winner: null,
  };
}

function ownerLabel(owner) {
  return owner === "player" ? "玩家" : "系统";
}

function oppositeOwner(owner) {
  return owner === "player" ? "system" : "player";
}

function totalThirtyNineCards(cards) {
  return cards.reduce((total, card) => total + card.value, 0);
}

function totalThirtyNineTable(game) {
  return game.tableCards.reduce((total, entry) => total + entry.card.value, 0);
}

function finishThirtyNineGame(game, winner, message) {
  game.phase = "finished";
  game.winner = winner;
  game.currentTurn = null;
  game.message = message;
  game.result = createMiniResult(winner === "draw" ? "neutral" : "success", message);
}

function evaluateThirtyNineGame(game, owner) {
  const total = totalThirtyNineTable(game);
  if (total === 39) {
    finishThirtyNineGame(game, owner, `${ownerLabel(owner)}正好获得39点，赢得本局。`);
    return true;
  }
  if (total > 39) {
    const winner = oppositeOwner(owner);
    finishThirtyNineGame(
      game,
      winner,
      `${ownerLabel(owner)}超过39点，${ownerLabel(winner)}赢得本局。`,
    );
    return true;
  }
  if (game.deck.length === 0) {
    finishThirtyNineGame(game, "draw", "所有牌已经选完，双方都没有到39点，本局平局。");
    return true;
  }
  return false;
}

function chooseThirtyNineCard(cardId) {
  const game = miniGameState.thirtyNine;
  if (game.phase !== "playing" || game.currentTurn !== "player") return;
  const cardIndex = game.deck.findIndex((card) => card.id === cardId);
  if (cardIndex < 0) return;

  const [card] = game.deck.splice(cardIndex, 1);
  game.hands.player.push(card);
  game.tableCards.push({ owner: "player", card });
  if (!evaluateThirtyNineGame(game, "player")) {
    game.currentTurn = "system";
    game.message = `你选择了 ${card.value}，桌面当前 ${totalThirtyNineTable(game)} 点。系统选牌中。`;
    window.setTimeout(playThirtyNineSystemTurn, 420);
  }
  render();
}

function countThirtyNineCardsWithValue(deck, value) {
  return deck.filter((card) => card.value === value).length;
}

function scoreThirtyNineHardCard(game, card) {
  const tableTotal = totalThirtyNineTable(game);
  const nextTotal = tableTotal + card.value;
  if (nextTotal === 39) return Number.POSITIVE_INFINITY;
  if (nextTotal > 39) return Number.NEGATIVE_INFINITY;

  const remainingDeck = game.deck.filter((item) => item.id !== card.id);
  const controlTotals = [3, 12, 21, 30];
  const nextControlTotal = controlTotals.find((total) => total > tableTotal);
  const controlHit = controlTotals.includes(nextTotal);
  const controlDistance =
    nextControlTotal && nextTotal <= nextControlTotal
      ? nextControlTotal - nextTotal
      : Math.min(...controlTotals.map((total) => Math.abs(total - nextTotal)));
  const playerWinningReplies = remainingDeck.filter(
    (item) => nextTotal + item.value === 39,
  ).length;
  const playerControlReplies = remainingDeck.filter((item) =>
    controlTotals.includes(nextTotal + item.value),
  ).length;
  const neededToWin = 39 - nextTotal;
  const overPressureCards = remainingDeck.filter((item) => nextTotal + item.value > 39).length;

  return (
    (controlHit ? 6000 : 0) -
    playerWinningReplies * 10000 -
    playerControlReplies * 1200 -
    countThirtyNineCardsWithValue(remainingDeck, neededToWin) * 450 -
    controlDistance * 260 +
    overPressureCards * 35 -
    nextTotal * 2 +
    Math.random()
  );
}

function chooseThirtyNineHardCard(game) {
  const safeCards = game.deck.filter((card) => totalThirtyNineTable(game) + card.value <= 39);
  const candidates = safeCards.length > 0 ? safeCards : game.deck;
  return [...candidates].sort(
    (a, b) => scoreThirtyNineHardCard(game, b) - scoreThirtyNineHardCard(game, a),
  )[0];
}

function chooseThirtyNineClosestSafeCard(game) {
  const tableTotal = totalThirtyNineTable(game);
  const safeCards = game.deck.filter((card) => tableTotal + card.value <= 39);
  if (safeCards.length === 0) return null;
  const scoredCards = safeCards.map((card) => ({
    card,
    distance: 39 - (tableTotal + card.value),
  }));
  const bestDistance = Math.min(...scoredCards.map((entry) => entry.distance));
  return randomItem(scoredCards.filter((entry) => entry.distance === bestDistance)).card;
}

function chooseThirtyNineSystemCard(game) {
  const difficulty = getMiniGameDifficulty("thirtyNine");
  const tableTotal = totalThirtyNineTable(game);
  const winningCard = game.deck.find((card) => tableTotal + card.value === 39);
  if (winningCard && (difficulty !== "easy" || Math.random() >= 0.35)) return winningCard;

  if (difficulty === "hard") return chooseThirtyNineHardCard(game);

  const blockingCard = game.deck.find((card) => tableTotal + card.value > 39);
  if (difficulty === "normal" && blockingCard) return blockingCard;

  const safeCards = game.deck.filter((card) => tableTotal + card.value <= 39);
  if (safeCards.length > 0) {
    const optimalSafeCard = chooseThirtyNineClosestSafeCard(game);

    if (difficulty === "easy" && safeCards.length > 1 && Math.random() < 0.62) {
      const nonOptimalCards = safeCards.filter((card) => card.id !== optimalSafeCard.id);
      return randomItem(nonOptimalCards);
    }

    return optimalSafeCard;
  }

  if (difficulty === "normal") return game.deck[0];
  return randomItem(game.deck);
}

function playThirtyNineSystemTurn() {
  const game = miniGameState.thirtyNine;
  if (game.phase !== "playing" || game.currentTurn !== "system") return;

  const card = chooseThirtyNineSystemCard(game);
  const cardIndex = game.deck.findIndex((item) => item.id === card.id);
  game.deck.splice(cardIndex, 1);
  game.hands.system.push(card);
  game.tableCards.push({ owner: "system", card });
  if (!evaluateThirtyNineGame(game, "system")) {
    game.currentTurn = "player";
    game.message = `系统选择了 ${card.value}，桌面当前 ${totalThirtyNineTable(game)} 点。轮到你选牌。`;
  }
  render();
}

function davinciColorLabel(color) {
  return color === "white" ? "白色" : "黑色";
}

function davinciCardLabel(card) {
  return card.wildcard ? `${davinciColorLabel(card.color)}万能牌` : `${davinciColorLabel(card.color)}${card.value}`;
}

function davinciSortValue(card) {
  if (card.wildcard) return Number.POSITIVE_INFINITY;
  return card.value;
}

function compareDavinciCards(a, b) {
  const valueDiff = davinciSortValue(a) - davinciSortValue(b);
  if (valueDiff !== 0) return valueDiff;
  if (a.color === b.color) return 0;
  return a.color === "white" ? -1 : 1;
}

function sortDavinciHand(cards) {
  const regularCards = cards.filter((card) => !card.wildcard).sort(compareDavinciCards);
  const wildcards = cards.filter((card) => card.wildcard);
  return [...regularCards, ...wildcards];
}

function insertDavinciCard(cards, card, position = null) {
  const nextCards = [...cards];
  if (card.wildcard) {
    const safePosition =
      Number.isInteger(position) && position >= 0 && position <= nextCards.length
        ? position
        : nextCards.length;
    nextCards.splice(safePosition, 0, card);
    return nextCards;
  }
  nextCards.push(card);
  return sortDavinciHand(nextCards);
}

function drawDavinciCard() {
  const game = miniGameState.davinci;
  if (game.deck.length === 0) return null;
  return { ...game.deck.pop(), revealed: false };
}

function beginDavinciPlayerTurn() {
  const game = miniGameState.davinci;
  if (game.phase !== "playing" || game.currentTurn !== "player" || game.pendingCard) return;

  game.selectedTargetId = null;
  game.turnCardId = null;
  const card = drawDavinciCard();
  if (!card) {
    game.phase = "guessing";
    game.message = "牌堆已经抽完，请继续猜测系统的隐藏牌。";
    game.result = createMiniResult("neutral", "牌堆已空，本回合直接进入猜测。");
    return;
  }

  game.pendingCard = card;
  game.pendingOwner = "player";
  game.hasGuessedThisTurn = false;
  if (card.wildcard) {
    game.phase = "insertWildcard";
    game.message = `你抽到了${davinciCardLabel(card)}。请选择插入位置。`;
    game.result = createMiniResult("neutral", `你抽到了${davinciCardLabel(card)}。`);
  } else {
    game.playerCards = insertDavinciCard(game.playerCards, card);
    game.turnCardId = card.id;
    game.pendingCard = null;
    game.pendingOwner = null;
    game.phase = "guessing";
    game.message = `你抽到了${davinciCardLabel(card)}，已自动排序。请选择系统的一张隐藏牌猜测。`;
    game.result = createMiniResult("neutral", `你抽到了${davinciCardLabel(card)}。`);
  }
}

function insertDavinciPlayerWildcard(position) {
  const game = miniGameState.davinci;
  if (game.phase !== "insertWildcard" || game.pendingOwner !== "player" || !game.pendingCard) return;
  game.playerCards = insertDavinciCard(game.playerCards, game.pendingCard, position);
  game.turnCardId = game.pendingCard.id;
  game.pendingCard = null;
  game.pendingOwner = null;
  game.phase = "guessing";
  game.message = "万能牌已插入。请选择系统的一张隐藏牌猜测。";
  game.result = createMiniResult("neutral", "万能牌已插入牌列。");
  render();
}

function finishDavinciGame(game, winner, message) {
  game.phase = "finished";
  game.winner = winner;
  game.currentTurn = null;
  game.pendingCard = null;
  game.pendingOwner = null;
  game.turnCardId = null;
  game.message = message;
  game.result = createMiniResult(winner === "draw" ? "neutral" : "success", message);
}

function checkDavinciVictory(game) {
  const playerAllRevealed = game.playerCards.every((card) => card.revealed);
  const systemAllRevealed = game.systemCards.every((card) => card.revealed);
  if (playerAllRevealed && systemAllRevealed) {
    finishDavinciGame(game, "draw", "双方所有牌都已公开，本局平局。");
    return true;
  }
  if (playerAllRevealed) {
    finishDavinciGame(game, "system", "你的所有牌都已公开，系统赢得本局。");
    return true;
  }
  if (systemAllRevealed) {
    finishDavinciGame(game, "player", "系统所有牌都已公开，你赢得本局。");
    return true;
  }
  return false;
}

function guessDavinciSystemCard(cardId, valueText) {
  const game = miniGameState.davinci;
  if (game.phase !== "guessing" || game.currentTurn !== "player") return;
  const card = game.systemCards.find((item) => item.id === cardId);
  if (!card || card.revealed) return;

  const color = card.color;
  const guessedValue = valueText === "wild" ? null : Number(valueText);
  const correct =
    card.color === color &&
    ((card.wildcard && valueText === "wild") || (!card.wildcard && card.value === guessedValue));
  const guessLabel =
    valueText === "wild"
      ? `${davinciColorLabel(color)}万能牌`
      : `${davinciColorLabel(color)}${valueText}`;

  game.hasGuessedThisTurn = true;
  if (correct) {
    card.revealed = true;
    game.selectedTargetId = null;
    if (!checkDavinciVictory(game)) {
      game.message = `猜对了：${davinciCardLabel(card)}。你可以继续猜，或跳过结束回合。`;
      game.result = createMiniResult("success", `猜对：${davinciCardLabel(card)}。`);
    }
  } else {
    const exposed = revealPlayerTurnCard(game);
    game.selectedTargetId = null;
    game.currentTurn = "system";
    game.phase = "playing";
    game.message = `猜 ${guessLabel} 错了。${exposed ? `你的${davinciCardLabel(exposed)}被公开。` : ""}轮到系统。`;
    game.result = createMiniResult(
      "error",
      `猜错：目标不是 ${guessLabel}。${exposed ? `公开了你的${davinciCardLabel(exposed)}。` : ""}`,
    );
    if (!checkDavinciVictory(game)) {
      window.setTimeout(playDavinciSystemTurn, 520);
    }
  }
  render();
}

function revealPlayerTurnCard(game) {
  const turnCard = game.playerCards.find((card) => card.id === game.turnCardId);
  const cardToReveal =
    turnCard && !turnCard.revealed
      ? turnCard
      : [...game.playerCards].reverse().find((card) => !card.revealed);
  if (!cardToReveal) return null;
  cardToReveal.revealed = true;
  return cardToReveal;
}

function endDavinciPlayerTurn() {
  const game = miniGameState.davinci;
  if (game.phase !== "guessing" || game.currentTurn !== "player") return;
  game.currentTurn = "system";
  game.phase = "playing";
  game.selectedTargetId = null;
  game.message = game.hasGuessedThisTurn ? "你结束了回合。轮到系统。" : "你跳过了猜测。轮到系统。";
  game.result = createMiniResult("neutral", game.hasGuessedThisTurn ? "玩家结束回合。" : "玩家跳过猜测。");
  render();
  window.setTimeout(playDavinciSystemTurn, 520);
}

function chooseDavinciSystemWildcardPosition(cards) {
  const hiddenGroups = cards.reduce((count, card) => count + (card.revealed ? 0 : 1), 0);
  if (hiddenGroups <= 1) return cards.length;
  return Math.floor(cards.length / 2);
}

function availableDavinciGuesses() {
  const guesses = [];
  for (const color of ["white", "black"]) {
    for (let value = 0; value <= 11; value += 1) {
      guesses.push({ color, value, wildcard: false });
    }
    guesses.push({ color, value: null, wildcard: true });
  }
  return guesses;
}

function davinciGuessFromCard(card) {
  return {
    color: card.color,
    value: card.wildcard ? "wild" : String(card.value),
  };
}

function chooseDavinciSystemGuess(game) {
  const hiddenCards = game.playerCards.filter((card) => !card.revealed);
  if (hiddenCards.length === 0) return null;

  const difficulty = getMiniGameDifficulty("davinci");
  if (difficulty === "easy" && Math.random() < 0.38) return null;

  const knownIds = new Set([
    ...game.systemCards.map((card) => card.id),
    ...game.playerCards.filter((card) => card.revealed).map((card) => card.id),
  ]);
  const candidates = availableDavinciGuesses().filter((guess) => {
    const id = guess.wildcard
      ? `davinci-${guess.color}-wild`
      : `davinci-${guess.color}-${guess.value}`;
    return !knownIds.has(id);
  });
  const target = randomItem(hiddenCards);

  if (difficulty === "easy") {
    if (Math.random() < 0.16) {
      return { target, ...davinciGuessFromCard(target) };
    }
    if (!target.wildcard && Math.random() < 0.35) {
      const sameValueCandidate = candidates.find(
        (guess) => !guess.wildcard && guess.value === target.value,
      );
      if (sameValueCandidate) {
        return {
          target,
          color: sameValueCandidate.color,
          value: String(sameValueCandidate.value),
        };
      }
    }
    const guess = randomItem(candidates);
    return {
      target,
      color: guess.color,
      value: guess.wildcard ? "wild" : String(guess.value),
    };
  }

  if (difficulty === "hard" && Math.random() < 0.62) {
    return { target, ...davinciGuessFromCard(target) };
  }

  if (target.wildcard && Math.random() < 0.32) {
    return { target, color: target.color, value: "wild" };
  }
  const sameValueCandidate = candidates.find(
    (guess) => !guess.wildcard && !target.wildcard && guess.value === target.value,
  );
  const guess = sameValueCandidate || randomItem(candidates);
  return {
    target,
    color: guess.color,
    value: guess.wildcard ? "wild" : String(guess.value),
  };
}

function revealSystemTurnCard(game, card) {
  if (card && game.systemCards.includes(card)) {
    card.revealed = true;
    return card;
  }
  const hiddenNewest = [...game.systemCards].reverse().find((item) => !item.revealed);
  if (!hiddenNewest) return null;
  hiddenNewest.revealed = true;
  return hiddenNewest;
}

function playDavinciSystemTurn() {
  const game = miniGameState.davinci;
  if (game.phase !== "playing" || game.currentTurn !== "system") return;

  game.turnCardId = null;
  const drawn = drawDavinciCard();
  let drawnMessage = "牌堆已空";
  let turnCard = null;
  if (drawn) {
    turnCard = drawn;
    if (drawn.wildcard) {
      const position = chooseDavinciSystemWildcardPosition(game.systemCards);
      game.systemCards = insertDavinciCard(game.systemCards, drawn, position);
    } else {
      game.systemCards = insertDavinciCard(game.systemCards, drawn);
    }
    game.turnCardId = drawn.id;
    drawnMessage = "系统抽了一张牌并插入牌列";
  }

  const guess = chooseDavinciSystemGuess(game);
  if (!guess) {
    game.currentTurn = "player";
    const hasHiddenPlayerCards = game.playerCards.some((card) => !card.revealed);
    game.message = `${drawnMessage}。系统${hasHiddenPlayerCards ? "跳过猜测" : "无法继续猜测"}，轮到你。`;
    game.result = createMiniResult("neutral", `系统${hasHiddenPlayerCards ? "跳过猜测" : "无法继续猜测"}。`);
    beginDavinciPlayerTurn();
    render();
    return;
  }

  const correct =
    guess.target.color === guess.color &&
    ((guess.target.wildcard && guess.value === "wild") ||
      (!guess.target.wildcard && guess.target.value === Number(guess.value)));
  const guessLabel =
    guess.value === "wild"
      ? `${davinciColorLabel(guess.color)}万能牌`
      : `${davinciColorLabel(guess.color)}${guess.value}`;

  if (correct) {
    guess.target.revealed = true;
    if (!checkDavinciVictory(game)) {
      game.currentTurn = "player";
      game.message = `${drawnMessage}，并猜中你的 ${guessLabel}。轮到你。`;
      game.result = createMiniResult("error", `系统猜中：你的 ${guessLabel} 被公开。`);
      beginDavinciPlayerTurn();
    }
  } else {
    const exposed = revealSystemTurnCard(game, turnCard);
    game.currentTurn = "player";
    game.message = `${drawnMessage}，猜你的 ${guessLabel} 失败。系统公开了${exposed ? davinciCardLabel(exposed) : "一张牌"}。轮到你。`;
    game.result = createMiniResult(
      "success",
      `系统猜错：公开了${exposed ? davinciCardLabel(exposed) : "一张系统牌"}。`,
    );
    if (!checkDavinciVictory(game)) {
      beginDavinciPlayerTurn();
    }
  }
  render();
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

function storyTitle(id) {
  return gameConfig.storyEvents.find((event) => event.id === id)?.title || id;
}

function flagLabel(id) {
  return gameConfig.flags[id] || id;
}

function canUnlockChapter(chapter) {
  if (chapter <= 1) return true;
  const unlock = gameConfig.chapterUnlocks[chapter];
  return Boolean(unlock && hasRequirements(unlock.requireAny));
}

function getUnlockedChapter() {
  if (state.chapterOverride) return state.chapterOverride;
  let chapter = 1;
  for (let next = 2; next <= gameConfig.maxChapter; next += 1) {
    if (!canUnlockChapter(next)) break;
    chapter = next;
  }
  return chapter;
}

function resourceLabel(id) {
  return gameConfig.resources[id]?.label || id;
}

function clampResources() {
  for (const key of Object.keys(gameConfig.resources)) {
    const max = key === "stamina" ? 12 : key === "morale" ? 10 : 99;
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
      if (key === "event") return state.eventHistory.includes(String(value));
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
          if (key === "event") return `完成${storyTitle(value)}`;
          if (key.startsWith("has") || typeof value === "boolean") {
            return value ? `需要${flagLabel(key)}` : "";
          }
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
  const unlockedChapter = getUnlockedChapter();
  return gameConfig.storyEvents.find(
    (event) =>
      event.chapter <= unlockedChapter && !state.eventHistory.includes(event.id),
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
  state.flags.lastEndingEvent = "beacon";
  addLog(`结局达成：${gameConfig.endings[state.endingId].title}`);
}

function applyDirectEnding(endingId, eventId = null) {
  if (!gameConfig.endings[endingId]) return;
  state.endingId = endingId;
  state.flags.lastEndingEvent = eventId;
  addLog(`结局达成：${gameConfig.endings[endingId].title}`);
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
  const storyDelta = describeChanges(option.changes);
  addLog(storyDelta ? `${option.result}\n资源变化：${storyDelta}` : option.result);
  if (option.endingId) applyDirectEnding(option.endingId, event.id);
  if (!state.endingId && option.endingCheck) resolveEnding();
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
  const dailyDelta = describeChanges(option.changes);
  addLog(dailyDelta ? `${option.result}\n资源变化：${dailyDelta}` : option.result);
  if (option.endingId) applyDirectEnding(option.endingId);
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

function setChapterOverride(chapter) {
  state.chapterOverride = chapter;
  addLog(`调试：已切换到第 ${chapter} 阶段。`);
  saveAndRender();
}

function jumpGameHours(hours) {
  advanceTime(hours);
  addLog(`调试：推进了 ${hours} 个游戏小时。`);
  saveAndRender();
}

function forceEnding(id) {
  state.endingId = id;
  state.flags.lastEndingEvent = null;
  addLog(`调试：直接进入结局「${gameConfig.endings[id].title}」。`);
  saveAndRender();
}

function restartAfterEnding() {
  const endingEvent = state.flags.lastEndingEvent || "beacon";
  state.endingId = null;
  state.flags.finalChoice = null;
  state.flags.lastEndingEvent = null;
  state.eventHistory = state.eventHistory.filter((id) => id !== endingEvent);
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
  const unlockedChapter = getUnlockedChapter();
  const nextLocked = gameConfig.storyEvents.find(
    (item) =>
      item.chapter > unlockedChapter && !state.eventHistory.includes(item.id),
  );
  const unlockHint = nextLocked
    ? gameConfig.chapterUnlocks[nextLocked.chapter]?.text
    : "";

  if (!event) {
    return `
      <div class="story-panel">
        <h3>当前没有新的主线事件</h3>
        <p>${
          nextLocked
            ? `下一阶段解锁条件：${unlockHint}`
            : "所有主线已经处理完毕。"
        }</p>
      </div>
    `;
  }

  return `
    <div class="story-panel">
      <p class="eyebrow">阶段 ${event.chapter}</p>
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
        <button data-chapter-override="1">解锁阶段1</button>
        <button data-chapter-override="2">解锁阶段2</button>
        <button data-chapter-override="3">解锁阶段3</button>
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

function renderMiniGameLauncher() {
  return `<button class="mini-launcher" data-mini-open>小游戏</button>`;
}

function renderMiniDifficultyControls(gameId) {
  const activeDifficulty = getMiniGameDifficulty(gameId);
  return `
    <div class="mini-difficulty" aria-label="系统难度">
      <span>系统难度</span>
      ${Object.entries(MINI_GAME_DIFFICULTIES)
        .map(
          ([difficulty, label]) => `
            <button
              class="${activeDifficulty === difficulty ? "active" : ""}"
              data-mini-difficulty="${gameId}"
              data-difficulty="${difficulty}"
            >
              ${label}
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderMiniResult(game) {
  if (!game.result) return "";
  return `<div class="mini-result ${game.result.type}">${escapeHtml(game.result.text)}</div>`;
}

function renderThirtyNineCards(cards, owner) {
  if (cards.length === 0) return `<p class="mini-empty">尚未选牌</p>`;
  return `
    <div class="mini-card-row">
      ${cards
        .map(
          (card) => `
            <span class="number-card ${owner === "system" ? "system-card" : ""}">
              ${card.value}
            </span>
          `,
        )
        .join("")}
    </div>
  `;
}

function groupThirtyNineDeck(deck) {
  const groups = [];
  for (let value = 1; value <= 8; value += 1) {
    groups.push({
      value,
      cards: deck.filter((card) => card.value === value),
    });
  }
  return [
    groups.slice(0, 2),
    groups.slice(2, 4),
    groups.slice(4, 6),
    groups.slice(6, 8),
  ];
}

function renderThirtyNineGame() {
  const game = miniGameState.thirtyNine;
  const tableTotal = totalThirtyNineTable(game);
  const groupedDeck = groupThirtyNineDeck(game.deck);
  return `
    <div class="mini-stage">
      <div class="mini-status">
        <span>${game.currentTurn ? `当前：${ownerLabel(game.currentTurn)}` : "本局结束"}</span>
        <span>剩余 ${game.deck.length} 张</span>
        <span>桌面总点数 ${tableTotal}</span>
      </div>
      <p>${escapeHtml(game.message)}</p>
      ${renderMiniResult(game)}
      <section>
        <h3>公共桌面</h3>
        ${renderThirtyNineCards(game.tableCards.map((entry) => ({
          ...entry.card,
          owner: entry.owner,
        })), "player")}
      </section>
      <section>
        <h3>可选牌</h3>
        <div class="thirty-nine-rows">
          ${groupedDeck
            .map(
              (row) => `
                <div class="thirty-nine-row">
                  ${row
                    .map(
                      (group) => `
                        <div class="thirty-nine-group">
                          <div class="thirty-nine-group-title">${group.value}</div>
                          <div class="mini-card-row selectable">
                            ${group.cards
                              .map(
                                (card) => `
                                  <button
                                    class="number-card"
                                    data-thirty-card="${card.id}"
                                    ${game.phase !== "playing" || game.currentTurn !== "player" ? "disabled" : ""}
                                  >
                                    ${card.value}
                                  </button>
                                `,
                              )
                              .join("")}
                          </div>
                        </div>
                      `,
                    )
                    .join("")}
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderDavinciCard(card, owner) {
  const visible = owner === "player" || card.revealed;
  const label = owner === "player" && card.revealed ? "已公开" : visible ? davinciCardLabel(card) : "暗牌";
  const valueLabel = visible ? (card.wildcard ? "*" : card.value) : "?";
  return `
    <span class="code-card ${card.color} ${card.revealed ? "revealed" : ""} ${!visible ? "hidden" : ""}">
      <strong>${valueLabel}</strong>
      <small>${label}</small>
    </span>
  `;
}

function renderDavinciSystemCardButton(card) {
  const game = miniGameState.davinci;
  const disabled = card.revealed || game.phase !== "guessing" || game.currentTurn !== "player";
  return `
    <button
      class="code-card ${card.color} ${card.revealed ? "revealed" : ""} ${card.revealed ? "" : "hidden"} ${game.selectedTargetId === card.id ? "selected" : ""}"
      data-davinci-target="${card.id}"
      ${disabled ? "disabled" : ""}
    >
      <strong>${card.revealed ? (card.wildcard ? "*" : card.value) : "?"}</strong>
      <small>${card.revealed ? davinciCardLabel(card) : "猜这张"}</small>
    </button>
  `;
}

function renderDavinciGuessControls() {
  const game = miniGameState.davinci;
  if (game.phase !== "guessing" || game.currentTurn !== "player") return "";
  const selectedCard = game.systemCards.find((card) => card.id === game.selectedTargetId);
  const selectedColor = selectedCard ? davinciColorLabel(selectedCard.color) : "先选择暗牌";
  return `
    <div class="guess-panel">
      <label>
        牌面
        <select id="davinci-guess-value">
          ${Array.from({ length: 12 }, (_, value) => `<option value="${value}">${value}</option>`).join("")}
          <option value="wild">万能牌</option>
        </select>
      </label>
      <div class="guess-color-hint">
        <span>颜色</span>
        <strong>${selectedColor}</strong>
      </div>
      <button data-davinci-guess ${game.systemCards.some((card) => !card.revealed) ? "" : "disabled"}>猜测选中的牌</button>
      <button data-davinci-end-turn>跳过</button>
    </div>
  `;
}

function renderDavinciWildcardInsert() {
  const game = miniGameState.davinci;
  if (game.phase !== "insertWildcard" || game.pendingOwner !== "player") return "";
  return `
    <section>
      <h3>选择万能牌位置</h3>
      <div class="mini-card-row selectable">
        ${Array.from({ length: game.playerCards.length + 1 }, (_, index) => `
          <button class="insert-slot" data-davinci-insert="${index}">
            ${index === 0 ? "最左" : index === game.playerCards.length ? "最右" : `第 ${index + 1} 位前`}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderDavinciGame() {
  const game = miniGameState.davinci;
  return `
    <div class="mini-stage">
      <div class="mini-status">
        <span>${game.currentTurn ? `当前：${ownerLabel(game.currentTurn)}` : "本局结束"}</span>
        <span>牌堆 ${game.deck.length} 张</span>
      </div>
      <p>${escapeHtml(game.message)}</p>
      ${renderMiniResult(game)}
      <div class="code-board">
        <section>
          <h3>系统牌列</h3>
          <div class="mini-card-row">
            ${game.systemCards.map((card) => renderDavinciSystemCardButton(card)).join("")}
          </div>
        </section>
        <section>
          <h3>你的牌列</h3>
          <div class="mini-card-row">
            ${game.playerCards.map((card) => renderDavinciCard(card, "player")).join("")}
          </div>
        </section>
      </div>
      ${renderDavinciWildcardInsert()}
      ${renderDavinciGuessControls()}
    </div>
  `;
}

function renderMiniGamesPanel() {
  if (!miniGamesOpen) return "";
  return `
    <div class="mini-backdrop">
      <section class="mini-panel" aria-label="小游戏">
        <div class="panel-title">
          <div>
            <p class="eyebrow">独立小游戏</p>
            <h2>${activeMiniGame === "thirtyNine" ? "39点" : "达芬奇密码"}</h2>
          </div>
          <button data-mini-close>关闭</button>
        </div>
        <div class="mini-tabs">
          <button class="${activeMiniGame === "thirtyNine" ? "active" : ""}" data-mini-game="thirtyNine">39点</button>
          <button class="${activeMiniGame === "davinci" ? "active" : ""}" data-mini-game="davinci">达芬奇密码</button>
        </div>
        ${renderMiniDifficultyControls(activeMiniGame)}
        ${activeMiniGame === "thirtyNine" ? renderThirtyNineGame() : renderDavinciGame()}
        <div class="button-row mini-tools">
          <button data-mini-reset="${activeMiniGame}">重新开始本局</button>
        </div>
      </section>
    </div>
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
  const unlockedChapter = getUnlockedChapter();
  app.innerHTML = `
    <main class="shell">
      ${renderMiniGameLauncher()}
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${gameConfig.subtitle}</p>
          <h1>${gameConfig.title}</h1>
          <p>雾岭的时间不按现实流动。每次行动都会推进数小时，新的阶段由线索和关键物品解锁。</p>
          <div class="status-line">
            <span>${formatTime()}</span>
            <span>阶段 ${unlockedChapter}/${gameConfig.maxChapter}</span>
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
      ${renderMiniGamesPanel()}
    </main>
  `;
}

function handleClick(event) {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.miniOpen !== undefined) {
    miniGamesOpen = true;
    scheduleMiniGameStart(activeMiniGame);
    render();
  } else if (target.dataset.miniClose !== undefined) {
    miniGamesOpen = false;
    render();
  } else if (target.dataset.miniGame) {
    activeMiniGame = target.dataset.miniGame;
    scheduleMiniGameStart(activeMiniGame);
    render();
  } else if (target.dataset.miniDifficulty) {
    setMiniGameDifficulty(target.dataset.miniDifficulty, target.dataset.difficulty);
    render();
  } else if (target.dataset.miniReset) {
    miniGameState[target.dataset.miniReset] =
      target.dataset.miniReset === "thirtyNine" ? createThirtyNineGame() : createDavinciGame();
    scheduleMiniGameStart(target.dataset.miniReset);
    render();
  } else if (target.dataset.thirtyCard) {
    chooseThirtyNineCard(target.dataset.thirtyCard);
  } else if (target.dataset.davinciInsert) {
    insertDavinciPlayerWildcard(Number(target.dataset.davinciInsert));
  } else if (target.dataset.davinciTarget) {
    miniGameState.davinci.selectedTargetId = target.dataset.davinciTarget;
    render();
  } else if (target.dataset.davinciGuess !== undefined) {
    const selectedTargetId = miniGameState.davinci.selectedTargetId;
    const value = document.querySelector("#davinci-guess-value")?.value;
    if (!selectedTargetId) {
      showToast("请先选择一张系统暗牌。");
      return;
    }
    guessDavinciSystemCard(selectedTargetId, value);
  } else if (target.dataset.davinciEndTurn !== undefined) {
    endDavinciPlayerTurn();
  } else if (target.dataset.tab) {
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
  } else if (target.dataset.chapterOverride) {
    setChapterOverride(Number(target.dataset.chapterOverride));
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
