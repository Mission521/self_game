(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Se="data:image/svg+xml,%3csvg%20width='960'%20height='420'%20viewBox='0%200%20960%20420'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20role='img'%20aria-label='雾岭营地'%3e%3crect%20width='960'%20height='420'%20fill='%23e7e1d1'/%3e%3cpath%20d='M0%20295L116%20156L205%20256L312%20103L429%20263L526%20166L626%20279L721%20129L960%20308V420H0V295Z'%20fill='%23687b66'/%3e%3cpath%20d='M0%20331L137%20215L250%20327L382%20167L508%20326L652%20213L786%20330L960%20224V420H0V331Z'%20fill='%233f5149'/%3e%3cpath%20d='M0%20352C138%20316%20250%20334%20351%20362C475%20397%20596%20396%20740%20354C827%20329%20895%20326%20960%20336V420H0V352Z'%20fill='%2325332f'/%3e%3cpath%20d='M626%20296L663%20247L700%20296H626Z'%20fill='%23d9c8a7'/%3e%3cpath%20d='M640%20296L663%20265L687%20296H640Z'%20fill='%238f4c37'/%3e%3crect%20x='659'%20y='294'%20width='9'%20height='38'%20fill='%234a3028'/%3e%3cpath%20d='M468%20307C483%20276%20519%20267%20543%20288C565%20307%20548%20340%20512%20340C476%20340%20454%20336%20468%20307Z'%20fill='%239f6e39'/%3e%3cpath%20d='M506%20288C502%20268%20517%20252%20536%20253C559%20255%20573%20283%20556%20301C541%20317%20511%20312%20506%20288Z'%20fill='%23c4823d'/%3e%3cpath%20d='M176%20299C206%20273%20239%20276%20266%20306C227%20316%20196%20314%20176%20299Z'%20fill='%23c6b07d'/%3e%3cpath%20d='M188%20296L222%20254L256%20298'%20stroke='%235b4634'%20stroke-width='8'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M0%2080C76%2047%20160%2045%20241%2070C334%2099%20407%2096%20489%2061C580%2022%20686%2031%20759%2070C829%20107%20896%20107%20960%2087V0H0V80Z'%20fill='%23f5f1e7'%20fill-opacity='0.78'/%3e%3c/svg%3e",De=!1,re="after_fog_ridge_save_v1",ae=1,c={title:"雾岭之后",subtitle:"荒野求生文字冒险",cheatCode:"seltdebug",maxChapter:3,chapterUnlocks:{2:{text:"完成断裂木桥，并拥有 2 条线索或临时地图。",requireAny:[{event:"bridge",clues:2},{event:"bridge",hasMap:!0}]},3:{text:"完成废弃观察站，并拥有 5 条线索或信号火堆。",requireAny:[{event:"watchpost",clues:5},{event:"watchpost",hasSignalFire:!0}]}},resources:{stamina:{label:"体力",unit:"点"},water:{label:"清水",unit:"份"},food:{label:"食物",unit:"份"},wood:{label:"木材",unit:"捆"},stone:{label:"石料",unit:"块"},herbs:{label:"草药",unit:"束"},spark:{label:"火种",unit:"枚"},clues:{label:"线索",unit:"条"},morale:{label:"士气",unit:"度"},rope:{label:"绳索",unit:"段"},flare:{label:"信号弹",unit:"枚"},pelt:{label:"毛皮",unit:"张"}},flags:{answeredEcho:"回应过清晨回声",hasMap:"临时地图",hasMedkit:"草药包",hasSignalFire:"信号火堆",hasFilter:"简易滤水器",hasShelter:"避雨棚"},initialResources:{water:3,food:3,wood:1,stone:0,herbs:0,spark:1,clues:0,stamina:8,morale:5,rope:0,flare:0,pelt:0},recipes:[{id:"filter",label:"简易滤水器",description:"溪水行动额外获得清水，并降低夜间缺水风险。",timeCost:1,cost:{wood:1,stone:2,herbs:1},flags:{hasFilter:!0}},{id:"shelter",label:"避雨棚",description:"休整恢复更多体力，暴雨事件中减少损失。",timeCost:2,cost:{wood:4,herbs:1},flags:{hasShelter:!0}},{id:"medkit",label:"草药包",description:"解除伤势，并在危险选择中提供额外选项。",timeCost:1,cost:{herbs:3},flags:{hasMedkit:!0,injured:!1}},{id:"map",label:"临时地图",description:"探索更稳定获得线索，并开启山脊捷径。",timeCost:2,cost:{stone:1,wood:1,clues:2},flags:{hasMap:!0}},{id:"signalFire",label:"信号火堆",description:"最终章节可尝试救援结局。",timeCost:2,cost:{wood:5,spark:1,herbs:1},flags:{hasSignalFire:!0}},{id:"furCloak",label:"毛皮披风",description:"缝制后穿上，休整时额外恢复体力。",timeCost:2,cost:{pelt:2,herbs:1},flags:{hasFurCloak:!0}},{id:"craftFlare",label:"自制信号弹",description:"用硫磺石和干草捆成可点燃的信号装置，探索时随手备一枚。",timeCost:2,cost:{spark:1,herbs:2,stone:2},flags:{hasCraftFlare:!0}},{id:"ropeladder",label:"绳梯",description:"绑好后可攀上高处瞭望，探索时额外发现线索。",timeCost:2,cost:{rope:2,wood:2},flags:{hasRopeLadder:!0}}],actions:[{id:"water",label:"搜寻水源",description:"沿低地寻找溪流和可饮用积水。",timeCost:2,changes:{water:2,stamina:-1},bonus:e=>e.flags.hasFilter?{water:1}:{}},{id:"forage",label:"翻找食物",description:"在林缘寻找野果、根茎和还能入口的补给。",timeCost:3,changes:{food:2,herbs:1,stamina:-2}},{id:"wood",label:"收集木石",description:"带回可用的枯枝、碎石和搭建材料。",timeCost:2,changes:{wood:2,stone:1,stamina:-1}},{id:"scout",label:"向雾岭探索",description:"离开营地寻找路标、遗留物和离开的方向。",timeCost:4,changes:{water:-1,food:-1,clues:1,stamina:-2},bonus:e=>({clues:(e.flags.hasMap?1:0)+(e.flags.hasRopeLadder?1:0),flare:e.flags.hasCraftFlare?1:0})},{id:"rest",label:"休整营地",description:"整理物资、处理伤口，让身体撑过下一段路。",timeCost:6,changes:{water:-1,food:-1,stamina:4},bonus:e=>({stamina:(e.flags.hasShelter?2:0)+(e.flags.hasFurCloak?1:0)})},{id:"trap",label:"设置陷阱",description:"在兽径旁布置简易套索，等待猎物上钩。",timeCost:3,changes:{wood:-1,pelt:1,food:1,stamina:-1}},{id:"braid",label:"编织绳索",description:"用藤蔓和草茎搓成可用的绳段。",timeCost:2,changes:{herbs:-2,rope:1,stamina:-1},requireAny:[{herbs:2}]},{id:"encourage",label:"鼓舞同伴",description:"分出一份食物，围坐讲述走出去的计划。",timeCost:1,changes:{food:-1,morale:2},requireAny:[{food:1}]}],dailyEvents:[{title:"夜里有冷雨",text:"雨水顺着坡面流进营地，火星几乎熄灭。你必须决定先护住什么。",options:[{label:"护住火种",result:"你用身体挡住风口，火种保住了，但一夜没睡好。",changes:{stamina:-2}},{label:"抢修营地",result:"你把枝条压成挡雨边，物资少损失了一些。",changes:{wood:-1},requireAny:[{wood:1}]},{label:"躲到岩壁下",result:"你丢下了一些木材，但清晨身体还算暖。",changes:{wood:-2,stamina:1}}]},{title:"陌生脚印",text:"潮湿泥地上出现一串新脚印，方向通往你没探索过的窄谷。",options:[{label:"跟过去",result:"你在窄谷找到折断的布条和旧刻痕。",timeCost:2,changes:{clues:1,stamina:-1},flags:{followedTracks:!0}},{label:"遮掩营地",result:"你把营地入口伪装起来，心里安稳了一些。",changes:{wood:-1},flags:{hiddenCamp:!0},requireAny:[{wood:1}]},{label:"无视脚印",result:"你没有冒险离营，但那串脚印一直留在脑子里。",changes:{stamina:1}}]},{title:"灰色鸟群掠过山口",text:"一大群鸟突然从北面的山口飞起，像是被什么惊动。",options:[{label:"记录方向",result:"你把山口位置记在临时地图边缘。",changes:{clues:1}},{label:"立刻调查",result:"你绕到山口下方，看见远处有一段裸露的石阶。",timeCost:3,changes:{clues:2,water:-1,stamina:-2}},{label:"加固营地",result:"如果山里真有什么在移动，至少营地还能撑住。",changes:{wood:-2,stone:-1},flags:{reinforcedCamp:!0},requireAny:[{wood:2,stone:1}]}]},{title:"伤口发热",text:"旧擦伤在潮湿空气里发红，继续拖下去会影响行动。",options:[{label:"用草药处理",result:"苦涩的药汁压住了发热，伤口开始收口。",changes:{herbs:-2,stamina:1},flags:{injured:!1},requireAny:[{herbs:2},{hasMedkit:!0}]},{label:"咬牙继续",result:"你没有停下，但每一步都变重了。",changes:{stamina:-3},flags:{injured:!0}},{label:"长时间休息",result:"你耗掉半天时间，状态稍微稳定。",timeCost:6,changes:{water:-1,food:-1,stamina:2}}]},{title:"清晨的回声",text:"雾里传来三声短促回响，不像自然声音，也不像风。",options:[{label:"回应三声",result:"远处沉默了很久，随后传来一声更低的回响。",changes:{clues:1,spark:-1},flags:{answeredEcho:!0},requireAny:[{spark:1}]},{label:"保持安静",result:"你等到雾散，只在树干上发现一道新鲜刻痕。",changes:{clues:1}},{label:"转移营地",result:"你搬到更高的位置，水和体力都消耗不少。",timeCost:4,changes:{water:-1,food:-1,stamina:-2},flags:{movedCamp:!0}}]},{title:"远处的塌方声",text:"午后山体深处传来沉闷断裂声，旧路可能被掩埋，也可能露出新的裂口。",options:[{label:"趁尘土未落前查看",result:"你在塌方边缘找到半截界桩，背面刻着旧编号。",timeCost:3,changes:{clues:2,stamina:-2},flags:{foundMarker:!0}},{label:"收集滚落石料",result:"你避开碎坡，把可用石块搬回营地。",changes:{stone:3,stamina:-1}},{label:"封住危险入口",result:"你用木枝和石块标出危险边界，之后绕行会更稳。",changes:{wood:-2,stone:-1},flags:{sealedCollapse:!0},requireAny:[{wood:2,stone:1}]}]},{title:"旧营火余烬",text:"一圈被雨打散的灰烬藏在灌木后，像是有人比你更早在这里等过。",options:[{label:"翻找灰烬",result:"灰烬底下压着一枚没烧尽的火种和几片防水布。",changes:{spark:1,herbs:1}},{label:"追着脚印深入",result:"脚印在一面石壁前消失，只留下细小的刻痕。",timeCost:3,changes:{clues:2,food:-1,stamina:-1},flags:{tracedOldCamp:!0}},{label:"把余烬彻底掩埋",result:"你不想让任何东西循着烟味找到营地。",changes:{stamina:1},flags:{buriedOldFire:!0}}]},{title:"松散的悬崖路",text:"通往北面的一段崖路被雨水冲松，碎石不断滑落，必须想办法过去。",options:[{label:"用绳索垂降",result:"绳索绷得发烫，但你稳稳落到下方平台。",changes:{rope:-1,stamina:-1,clues:1},requireAny:[{rope:1}]},{label:"硬着头皮翻过",result:"碎石一路追着你的脚后跟，膝盖撞青了一块。",changes:{stamina:-3,morale:-1}},{label:"绕道更远的山脊",result:"你多走了大半天，但在路上记下几处陌生标记。",timeCost:4,changes:{water:-1,food:-1,clues:2}}]},{title:"猎物踪迹",text:"湿泥地上印着一串新鲜的偶蹄，看样子是一头不算大的鹿。",options:[{label:"围猎追击",result:"你顺风追上去，干净利落地放倒了它。",timeCost:3,changes:{food:2,pelt:1,stamina:-2}},{label:"设陷阱",result:"你削了几根木桩布陷阱，第二天清晨拖回一张完整毛皮。",changes:{wood:-2,pelt:1,morale:1},requireAny:[{wood:2}]},{label:"让它过去",result:"你蹲在草丛里看它走远，心里反而踏实下来。",changes:{morale:1}}]},{title:"同伴的呼号",text:"对面山坡传来断断续续的喊声，听不清是求助还是警告。",options:[{label:"升空信号弹回应",result:"信号弹爆开的瞬间，对面的呼喊变成了清晰的应答。",changes:{flare:-1,morale:2,clues:1},requireAny:[{flare:1}],flags:{radioSignal:!0}},{label:"点起大火堆示意",result:"你拼命架柴生火，烟柱直直冲上灰白的天空。",changes:{wood:-2,morale:1},requireAny:[{wood:2}],flags:{hasSignalFire:!0}},{label:"不敢回应",result:"你蜷在岩壁后等到呼喊消失，整夜辗转难眠。",changes:{morale:-2}}]},{title:"废弃补给箱",text:"灌木深处半埋着一只生锈的金属箱，搭扣已经松了一半。",options:[{label:"撬开取走全部",result:"里头有两枚信号弹和一卷尼龙绳，还压着几条干粮。",changes:{flare:1,rope:1,food:1}},{label:"留一半给后来者",result:"你只带走最关键的部分，把箱盖重新压好，心里轻了一些。",changes:{food:-1,rope:1,morale:3},requireAny:[{food:2}]},{label:"怀疑陷阱，绕走",result:"你绕开补给箱，但一整天都在想到底错过了什么。",changes:{morale:-1}}]},{title:"夜里凉骨",text:"气温骤降，呼出的白气挂在睫毛上，火堆也压不住寒意。",options:[{label:"披毛皮御寒",result:"粗糙的毛皮捂住了肩背，你终于能合眼休息。",changes:{pelt:-1,stamina:2,morale:1},requireAny:[{pelt:1}]},{label:"加柴撑过去",result:"你不停地往火里添柴，靠火光熬了一夜。",changes:{wood:-2,stamina:1},requireAny:[{wood:2}]},{label:"硬扛到天亮",result:"牙齿打颤的声音陪了你一整夜，清晨连手都不太听使唤。",changes:{stamina:-3,morale:-1}}]},{title:"岔路上的旧布条",text:"三岔路口的枯枝上系着一截褪色布条，看上去是有人留下的指引。",options:[{label:"顺着指引深入",result:"你沿布条走了一截，在一块石头底下发现了潦草的笔记。",timeCost:2,changes:{clues:2,stamina:-1}},{label:"剪下来做绳",result:"布条接起来勉强成一段细绳，至少能绑些东西。",changes:{rope:1,morale:-1}},{label:"看一眼就走",result:"你没有动那条布，只是在心里记下了位置。",changes:{morale:1}}]}],storyEvents:[{id:"bridge",chapter:1,title:"断裂木桥",text:"通往南坡的旧木桥只剩一半，桥下是被雾吞没的深沟。你需要决定第一条路线。",options:[{label:"修补桥面",result:"你用木材和石块压住桥头，南坡路线暂时可走。",changes:{wood:-2,stone:-1,clues:1},flags:{southRoute:!0},requireAny:[{wood:2,stone:1}],timeCost:3},{label:"沿沟底绕行",result:"你找到一段更隐蔽的溪谷，水源变得可靠。",changes:{water:2,stamina:-2},flags:{creekRoute:!0},timeCost:4},{label:"冒险跃过断口",result:"你越过了断口，却在落地时扭伤脚踝。",changes:{stamina:-3,clues:1},flags:{injured:!0,southRoute:!0},timeCost:1}]},{id:"watchpost",chapter:2,title:"废弃观察站",text:"线索把你带到山腰。雾线后露出一座废弃观察站，里面可能有离开的答案。",options:[{label:"修好旧电台",result:"电台只响了几秒，但你听见了断续的坐标回应。",changes:{spark:-1,wood:-1,clues:2},flags:{radioSignal:!0},requireAny:[{spark:1,wood:1}],timeCost:3},{label:"翻找记录本",result:"记录本提到山脊背面还有一个旧信标。",changes:{clues:2},flags:{beaconKnown:!0},timeCost:2},{label:"拆走可用材料",result:"你带走了木板、镜片和一小包干粮。",changes:{wood:2,stone:1,food:1},flags:{strippedWatchpost:!0},timeCost:2}]},{id:"ravine",chapter:2,title:"裂谷绳梯",text:"观察站后的旧绳梯垂向裂谷。谷底有金属反光，也有被雨水磨光的坠落痕迹。",options:[{label:"用绳梯下到谷底",result:"你在谷底找到信标维护牌，确认山脊背面还有一条窄路。",changes:{clues:2,stamina:-2},flags:{ravineRoute:!0},requireAny:[{hasMap:!0},{stamina:7}],timeCost:4},{label:"拆下绳梯材料",result:"你没有下谷，而是把还能用的木节和绳结带回营地。",changes:{wood:2,herbs:1},flags:{strippedRavine:!0},timeCost:2},{label:"强行攀下湿滑岩壁",result:"岩壁在你脚下崩开，雾从裂谷里升起，吞没了最后的火光。",changes:{stamina:-4},flags:{finalChoice:"ravineFall"},timeCost:1,endingId:"lost"}]},{id:"ropeBridge",chapter:2,title:"松垮的索桥",text:"通往观察站背面的旧索桥只剩主绳还撑着，木板大半烂透，但桥那头似乎有过有人停留的痕迹。",options:[{label:"用绳索加固桥面",result:"你把绳索绕在主绳和断板之间，重新扎成一条能走的路。",changes:{rope:-2,clues:2,morale:1},flags:{fixedRope:!0},requireAny:[{rope:2}],timeCost:3},{label:"强行荡过去",result:"你抓着主绳一口气荡过去，肩膀被磨出一道血印。",changes:{stamina:-3,clues:1},flags:{injured:!0},timeCost:2},{label:"放弃这条路",result:"你退回观察站，决定从其他方向想办法。",changes:{morale:-2},timeCost:1}]},{id:"coldRiver",chapter:2,title:"冷河对岸的火光",text:"黑色水面对岸闪着一豆火光，似乎有人也在等待信号。",options:[{label:"升起信号弹回应",result:"信号弹炸出白光，对岸的火堆立刻往上堆了一层，又传来短促的金属敲击。",changes:{flare:-1,morale:2,clues:1},flags:{radioSignal:!0},requireAny:[{flare:1}],timeCost:2},{label:"趟过冷河",result:"刺骨的水浸到胸口，但你抓到了几张被冲下来的笔记。",changes:{stamina:-4,food:-1,clues:1},flags:{crossedColdRiver:!0},timeCost:4},{label:"不回应",result:"你看着对岸的火光慢慢熄灭，心里像被空出一块。",changes:{morale:-1},timeCost:1}]},{id:"stoneDoor",chapter:3,title:"石门回声",text:"旧信标下方有一扇半掩的石门。门缝里传出规律敲击，像有人在里面回应你的每一次选择。",options:[{label:"按记录本节奏回应",result:"石门缓慢开启，里面不是出口，而是一间仍在运转的旧中继室。",changes:{clues:2,spark:-1},flags:{relayRoomOpen:!0},requireAny:[{clues:6,spark:1},{answeredEcho:!0,spark:1}],timeCost:3},{label:"封住石门继续上行",result:"你用碎石压住门缝，把注意力重新放回山脊路线。",changes:{stone:-2,stamina:-1},flags:{sealedStoneDoor:!0},requireAny:[{stone:2}],timeCost:2},{label:"独自走进门后深处",result:"石门在身后合上。雾岭没有放你离开，却把所有答案都留给了你。",flags:{finalChoice:"keeper"},timeCost:2,endingId:"keeper"}]},{id:"mistShadow",chapter:3,title:"雾中影子",text:"靠近山脊时，雾里始终有一道形状陪着你，分不清是动物还是别的什么。",options:[{label:"披上毛皮潜行",result:"你借着毛皮的轮廓混进雾里，那道影子最后停在一处石坛前。",changes:{pelt:-2,clues:2,morale:1},flags:{hiddenScout:!0},requireAny:[{pelt:2}],timeCost:3},{label:"正面对峙",result:"你扯开嗓子喊出去，影子停顿了一下，缓缓退入更深的雾里。",changes:{stamina:-2,morale:-1,clues:1},timeCost:2},{label:"原路撤退",result:"你顺着来路退回营地，但那道影子留在你脑海里很久。",changes:{stamina:-1,morale:-2},timeCost:2}]},{id:"beacon",chapter:3,title:"山脊信标",text:"关键路线已经拼齐。雾岭最高处露出废弃信标，你必须决定怎么离开这里。",options:[{label:"点燃信号火堆",result:"浓烟穿出雾顶，远处传来发动机的声音。",flags:{finalChoice:"rescue"},requireAny:[{hasSignalFire:!0}],timeCost:2,endingCheck:!0},{label:"按地图独自下山",result:"你收紧背包，沿着自己标出的路线离开营地。",flags:{finalChoice:"solo"},requireAny:[{hasMap:!0}],timeCost:4,endingCheck:!0},{label:"追查雾岭真相",result:"你走向信标背后的石阶，那里有所有回声的源头。",flags:{finalChoice:"truth"},requireAny:[{clues:6}],timeCost:5,endingCheck:!0},{label:"留在营地等待",result:"你没有再进入雾里，而是把营地整理成能长期撑下去的地方。",flags:{finalChoice:"stay"},timeCost:3,endingCheck:!0}]}],endings:{rescue:{title:"烟柱之上",text:"你点燃信号火堆，救援队沿着断续坐标找到雾岭。你带着湿透的记录本离开，知道自己不是第一个困在这里的人。"},solo:{title:"独行出岭",text:"临时地图上的每一处记号都派上了用场。你在第三个清晨之后走出山口，再回头时，雾岭已经像从未存在过。"},truth:{title:"雾后的旧信标",text:"你没有选择最快的路。石阶尽头的信标仍在发送旧时代的求救码，而你终于明白那些回声从何而来。"},stay:{title:"留守营地",text:"你把营地扩成一个能抵御雨和雾的据点。离开的路还在，但你决定等下一位迷路者出现。"},failure:{title:"雾线合拢",text:"水和食物见底，体力也被山路耗尽。雾线从营地外合拢，你只能记下最后一条模糊的方向。"},lost:{title:"裂谷无声",text:"你选择了最短的下行路线。裂谷吞掉脚步声，也吞掉了雾外传来的最后一点光。"},keeper:{title:"门后的守望者",text:"你走进旧中继室，接过仍在重复的求救码。离开的路没有消失，只是你决定先让后来者听见回应。"}}},B=document.querySelector("#app");let s=Ee(),P="",Z=De,D="actions",L="",Y=!1,$="thirtyNine",p=xe();function q(){return{version:ae,startedAtDate:Ze(),chapterOverride:null,gameDay:1,gameHour:8,resources:{...c.initialResources},craftedItems:[],flags:{},eventHistory:[],resolvedDailyEvents:[],activeDailyEvent:null,endingId:null,log:["你在雾岭边缘醒来。背包还在，指南针失灵，山下的路被白雾吞没。"]}}function Ee(){const e=localStorage.getItem(re);if(!e)return q();try{const t=JSON.parse(e);return se(t)}catch{return q()}}function se(e){var o;const t={...c.initialResources};for(const l of Object.keys(c.resources)){const u=Number((o=e.resources)==null?void 0:o[l]);Number.isFinite(u)&&(t[l]=Math.max(0,u))}const n=q(),r=Number(e.chapterOverride??e.realChapterOverride),a=c.recipes.map(l=>l.id),i=c.storyEvents.map(l=>l.id),d=e.activeDailyEvent&&Number.isInteger(Number(e.activeDailyEvent.eventIndex))&&Number(e.activeDailyEvent.eventIndex)>=0&&Number(e.activeDailyEvent.eventIndex)<c.dailyEvents.length?{key:String(e.activeDailyEvent.key||""),eventIndex:Number(e.activeDailyEvent.eventIndex)}:null;return{...n,...e,version:ae,startedAtDate:/^\d{4}-\d{2}-\d{2}$/.test(e.startedAtDate||"")?e.startedAtDate:n.startedAtDate,chapterOverride:r>=1&&r<=c.maxChapter?r:null,realChapterOverride:void 0,gameDay:Math.max(1,Number(e.gameDay)||1),gameHour:Math.max(0,Math.min(23,Number(e.gameHour)||8)),resources:t,craftedItems:Array.isArray(e.craftedItems)?e.craftedItems.filter(l=>a.includes(l)):[],flags:e.flags||{},eventHistory:Array.isArray(e.eventHistory)?e.eventHistory.filter(l=>i.includes(l)):[],resolvedDailyEvents:Array.isArray(e.resolvedDailyEvents)?e.resolvedDailyEvents.map(String):[],activeDailyEvent:d,endingId:c.endings[e.endingId]?e.endingId:null,log:Array.isArray(e.log)?e.log.map(String).slice(-12):[]}}function x(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ie(e){const t=[...e];for(let n=t.length-1;n>0;n-=1){const r=Math.floor(Math.random()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t}function y(e){return e[Math.floor(Math.random()*e.length)]}const le={easy:"简单",normal:"普通",hard:"困难"};function xe(){return{difficulty:{thirtyNine:"normal",davinci:"normal"},thirtyNine:ce(),davinci:de()}}function O(e){const t=p[e];!t||t.phase!=="playing"||t.started||(t.started=!0,e==="thirtyNine"&&t.currentTurn==="system"&&t.tableCards.length===0&&window.setTimeout(he,420),e==="davinci"&&(t.currentTurn==="system"&&!t.turnCardId&&!t.pendingCard&&window.setTimeout(J,520),t.currentTurn==="player"&&!t.turnCardId&&!t.pendingCard&&j()))}function U(e){var t;return((t=p.difficulty)==null?void 0:t[e])||"normal"}function ke(e,t){le[t]&&(p.difficulty||(p.difficulty={}),p.difficulty[e]=t)}function oe(){return y(["player","system"])}function g(e,t){return{type:e,text:t}}function Me(){return ie(Array.from({length:8},(e,t)=>t+1).flatMap(e=>Array.from({length:4},(t,n)=>({id:`thirty-nine-${e}-${n}`,value:e}))))}function ce(){const e=oe();return{phase:"playing",currentTurn:e,started:!1,deck:Me(),hands:{player:[],system:[]},tableCards:[],message:`随机决定${b(e)}先手。${b(e)}开始选牌。`,result:g("neutral",`本局随机先手：${b(e)}`),winner:null}}function Ae(){const e=[];for(const t of["white","black"]){for(let n=0;n<=11;n+=1)e.push({id:`davinci-${t}-${n}`,color:t,value:n,wildcard:!1,revealed:!1});e.push({id:`davinci-${t}-wild`,color:t,value:null,wildcard:!0,revealed:!1})}return ie(e)}function de(){const e=Ae(),t=[],n=[];for(let i=0;i<4;i+=1)t.push({...e.pop(),revealed:!1}),n.push({...e.pop(),revealed:!1});const r=t.filter(i=>i.wildcard),a={phase:"playing",currentTurn:null,started:!1,deck:e,playerCards:te(t.filter(i=>!i.wildcard)),systemCards:te(n),pendingCard:null,pendingOwner:null,openingWildcards:r,turnCardId:null,hasGuessedThisTurn:!1,selectedTargetId:null,message:"",result:null,winner:null};return a.openingWildcards.length>0?(me(a),a):(ge(a),a)}function b(e){return e==="player"?"玩家":"系统"}function Ne(e){return e==="player"?"system":"player"}function C(e){return e.tableCards.reduce((t,n)=>t+n.card.value,0)}function _(e,t,n){e.phase="finished",e.winner=t,e.currentTurn=null,e.message=n,e.result=g(t==="draw"?"neutral":"success",n)}function ue(e,t){const n=C(e);if(n===39)return _(e,t,`${b(t)}正好获得39点，赢得本局。`),!0;if(n>39){const r=Ne(t);return _(e,r,`${b(t)}超过39点，${b(r)}赢得本局。`),!0}return e.deck.length===0?(_(e,"draw","所有牌已经选完，双方都没有到39点，本局平局。"),!0):!1}function Oe(e){const t=p.thirtyNine;if(t.phase!=="playing"||t.currentTurn!=="player")return;const n=t.deck.findIndex(a=>a.id===e);if(n<0)return;const[r]=t.deck.splice(n,1);t.hands.player.push(r),t.tableCards.push({owner:"player",card:r}),ue(t,"player")||(t.currentTurn="system",t.message=`你选择了 ${r.value}，桌面当前 ${C(t)} 点。系统选牌中。`,window.setTimeout(he,420)),h()}function je(e,t){return e.filter(n=>n.value===t).length}function fe(e,t){const n=C(e),r=n+t.value;if(r===39)return Number.POSITIVE_INFINITY;if(r>39)return Number.NEGATIVE_INFINITY;const a=e.deck.filter(f=>f.id!==t.id),i=[3,12,21,30],d=i.find(f=>f>n),o=i.includes(r),l=d&&r<=d?d-r:Math.min(...i.map(f=>Math.abs(f-r))),u=a.filter(f=>r+f.value===39).length,w=a.filter(f=>i.includes(r+f.value)).length,N=39-r,V=a.filter(f=>r+f.value>39).length;return(o?6e3:0)-u*1e4-w*1200-je(a,N)*450-l*260+V*35-r*2+Math.random()}function Le(e){var o;const t=e.deck.filter(l=>C(e)+l.value<=39),r=(t.length>0?t:e.deck).map(l=>({card:l,score:fe(e,l)})).sort((l,u)=>u.score-l.score),a=((o=r[0])==null?void 0:o.score)??0,i=C(e)<=10,d=r.filter((l,u)=>{const w=i?900:160;return u<(i?3:2)&&a-l.score<=w});return y(d.length>0?d:r).card}function qe(e){const t=C(e),n=e.deck.filter(i=>t+i.value<=39);if(n.length===0)return null;const r=n.map(i=>({card:i,distance:39-(t+i.value)})),a=Math.min(...r.map(i=>i.distance));return y(r.filter(i=>i.distance===a)).card}function Re(e,t){var l;const n=C(e);if(n>10)return null;const r=e.deck.filter(u=>n+u.value<=39);if(r.length===0)return null;const a={easy:[2,8],normal:[5,8],hard:[6,8]},[i,d]=a[t]||a.normal,o=r.filter(u=>u.value>=i&&u.value<=d);if(o.length===0)return null;if(t==="hard"){const u=[...new Set(o.map(f=>f.value))].map(f=>{const S=o.find(Ie=>Ie.value===f);return{value:f,score:fe(e,S)}}).sort((f,S)=>S.score-f.score),w=((l=u[0])==null?void 0:l.score)??0,N=u.filter((f,S)=>S<3&&w-f.score<=1800),V=y(N.length>0?N:u.slice(0,1)).value;return y(o.filter(f=>f.value===V))}return y(o)}function He(e){const t=U("thirtyNine"),n=C(e),r=e.deck.find(o=>n+o.value===39);if(r&&(t!=="easy"||Math.random()>=.35))return r;const a=Re(e,t);if(a&&(t!=="easy"||Math.random()>=.22))return a;if(t==="hard")return Le(e);const i=e.deck.find(o=>n+o.value>39);if(t==="normal"&&i)return i;const d=e.deck.filter(o=>n+o.value<=39);if(d.length>0){const o=qe(e);if(t==="easy"&&d.length>1&&Math.random()<.62){const l=d.filter(u=>u.id!==o.id);return y(l)}return o}return t==="normal"?e.deck[0]:y(e.deck)}function he(){const e=p.thirtyNine;if(e.phase!=="playing"||e.currentTurn!=="system")return;const t=He(e),n=e.deck.findIndex(r=>r.id===t.id);e.deck.splice(n,1),e.hands.system.push(t),e.tableCards.push({owner:"system",card:t}),ue(e,"system")||(e.currentTurn="player",e.message=`系统选择了 ${t.value}，桌面当前 ${C(e)} 点。轮到你选牌。`),h()}function I(e){return e==="white"?"白色":"黑色"}function m(e){return e.wildcard?`${I(e.color)}万能牌`:`${I(e.color)}${e.value}`}function ee(e){return e.wildcard?Number.POSITIVE_INFINITY:e.value}function pe(e,t){const n=ee(e)-ee(t);return n!==0?n:e.color===t.color?0:e.color==="white"?-1:1}function te(e){const t=e.filter(r=>!r.wildcard).sort(pe),n=e.filter(r=>r.wildcard);return[...t,...n]}function Ge(e){const t=e.filter(r=>!r.wildcard).sort(pe);let n=0;return e.map(r=>r.wildcard?r:t[n++])}function R(e,t,n=null){const r=[...e];if(t.wildcard){const a=Number.isInteger(n)&&n>=0&&n<=r.length?n:r.length;return r.splice(a,0,t),r}return r.push(t),Ge(r)}function ge(e){const t=oe();e.phase="playing",e.currentTurn=t,e.started=!1,e.message=`随机决定${b(t)}先手。${b(t)}开始回合。`,e.result=g("neutral",`本局随机先手：${b(t)}`)}function me(e){e.phase="openingWildcard",e.currentTurn=null,e.started=!1,e.pendingCard=e.openingWildcards.shift()||null,e.pendingOwner="player",e.turnCardId=null,e.hasGuessedThisTurn=!1,e.selectedTargetId=null;const t=e.openingWildcards.length>0?`，放置后还剩 ${e.openingWildcards.length} 张万能牌`:"";e.message=`开局抽到了${m(e.pendingCard)}。请先选择插入位置${t}。`,e.result=g("neutral","开局万能牌需要先放置，完成后再随机先后手。")}function ve(){const e=p.davinci;return e.deck.length===0?null:{...e.deck.pop(),revealed:!1}}function j(){const e=p.davinci;if(e.phase!=="playing"||e.currentTurn!=="player"||e.pendingCard)return;e.selectedTargetId=null,e.turnCardId=null;const t=ve();if(!t){e.phase="guessing",e.message="牌堆已经抽完，请继续猜测系统的隐藏牌。",e.result=g("neutral","牌堆已空，本回合直接进入猜测。");return}e.pendingCard=t,e.pendingOwner="player",e.hasGuessedThisTurn=!1,t.wildcard?(e.phase="insertWildcard",e.message=`你抽到了${m(t)}。请选择插入位置。`,e.result=g("neutral",`你抽到了${m(t)}。`)):(e.playerCards=R(e.playerCards,t),e.turnCardId=t.id,e.pendingCard=null,e.pendingOwner=null,e.phase="guessing",e.message=`你抽到了${m(t)}，已自动排序。请选择系统的一张隐藏牌猜测。`,e.result=g("neutral",`你抽到了${m(t)}。`))}function We(e){const t=p.davinci,n=t.phase==="openingWildcard";if(!(t.phase!=="insertWildcard"&&!n||t.pendingOwner!=="player"||!t.pendingCard)){if(t.playerCards=R(t.playerCards,t.pendingCard,e),t.turnCardId=n?null:t.pendingCard.id,t.pendingCard=null,t.pendingOwner=null,n){t.openingWildcards.length>0?me(t):(ge(t),O("davinci")),h();return}t.phase="guessing",t.message="万能牌已插入。请选择系统的一张隐藏牌猜测。",t.result=g("neutral","万能牌已插入牌列。"),h()}}function K(e,t,n){e.phase="finished",e.winner=t,e.currentTurn=null,e.pendingCard=null,e.pendingOwner=null,e.turnCardId=null,e.message=n,e.result=g(t==="draw"?"neutral":"success",n)}function H(e){const t=e.playerCards.every(r=>r.revealed),n=e.systemCards.every(r=>r.revealed);return t&&n?(K(e,"draw","双方所有牌都已公开，本局平局。"),!0):t?(K(e,"system","你的所有牌都已公开，系统赢得本局。"),!0):n?(K(e,"player","系统所有牌都已公开，你赢得本局。"),!0):!1}function Fe(e,t){const n=p.davinci;if(n.phase!=="guessing"||n.currentTurn!=="player")return;const r=n.systemCards.find(l=>l.id===e);if(!r||r.revealed)return;const a=r.color,i=t==="wild"?null:Number(t),d=r.color===a&&(r.wildcard&&t==="wild"||!r.wildcard&&r.value===i),o=t==="wild"?`${I(a)}万能牌`:`${I(a)}${t}`;if(n.hasGuessedThisTurn=!0,d)r.revealed=!0,n.selectedTargetId=null,H(n)||(n.message=`猜对了：${m(r)}。你可以继续猜，或跳过结束回合。`,n.result=g("success",`猜对：${m(r)}。`));else{const l=Ve(n);n.selectedTargetId=null,n.currentTurn="system",n.phase="playing",n.message=`猜 ${o} 错了。${l?`你的${m(l)}被公开。`:""}轮到系统。`,n.result=g("error",`猜错：目标不是 ${o}。${l?`公开了你的${m(l)}。`:""}`),H(n)||window.setTimeout(J,520)}h()}function Ve(e){const t=e.playerCards.find(r=>r.id===e.turnCardId),n=t&&!t.revealed?t:[...e.playerCards].reverse().find(r=>!r.revealed);return n?(n.revealed=!0,n):null}function Pe(){const e=p.davinci;e.phase!=="guessing"||e.currentTurn!=="player"||(e.currentTurn="system",e.phase="playing",e.selectedTargetId=null,e.message=e.hasGuessedThisTurn?"你结束了回合。轮到系统。":"你跳过了猜测。轮到系统。",e.result=g("neutral",e.hasGuessedThisTurn?"玩家结束回合。":"玩家跳过猜测。"),h(),window.setTimeout(J,520))}function _e(e){return e.reduce((n,r)=>n+(r.revealed?0:1),0)<=1?e.length:Math.floor(e.length/2)}function Ke(){const e=[];for(const t of["white","black"]){for(let n=0;n<=11;n+=1)e.push({color:t,value:n,wildcard:!1});e.push({color:t,value:null,wildcard:!0})}return e}function ne(e){return{color:e.color,value:e.wildcard?"wild":String(e.value)}}function Ye(e){const t=e.playerCards.filter(l=>!l.revealed);if(t.length===0)return null;const n=U("davinci");if(n==="easy"&&Math.random()<.38)return null;const r=new Set([...e.systemCards.map(l=>l.id),...e.playerCards.filter(l=>l.revealed).map(l=>l.id)]),a=Ke().filter(l=>{const u=l.wildcard?`davinci-${l.color}-wild`:`davinci-${l.color}-${l.value}`;return!r.has(u)}),i=y(t);if(n==="easy"){if(Math.random()<.16)return{target:i,...ne(i)};if(!i.wildcard&&Math.random()<.35){const u=a.find(w=>!w.wildcard&&w.value===i.value);if(u)return{target:i,color:u.color,value:String(u.value)}}const l=y(a);return{target:i,color:l.color,value:l.wildcard?"wild":String(l.value)}}if(n==="hard"&&Math.random()<.62)return{target:i,...ne(i)};if(i.wildcard&&Math.random()<.32)return{target:i,color:i.color,value:"wild"};const o=a.find(l=>!l.wildcard&&!i.wildcard&&l.value===i.value)||y(a);return{target:i,color:o.color,value:o.wildcard?"wild":String(o.value)}}function Be(e,t){if(t&&e.systemCards.includes(t))return t.revealed=!0,t;const n=[...e.systemCards].reverse().find(r=>!r.revealed);return n?(n.revealed=!0,n):null}function J(){const e=p.davinci;if(e.phase!=="playing"||e.currentTurn!=="system")return;e.turnCardId=null;const t=ve();let n="牌堆已空",r=null;if(t){if(r=t,t.wildcard){const o=_e(e.systemCards);e.systemCards=R(e.systemCards,t,o)}else e.systemCards=R(e.systemCards,t);e.turnCardId=t.id,n="系统抽了一张牌并插入牌列"}const a=Ye(e);if(!a){e.currentTurn="player";const o=e.playerCards.some(l=>!l.revealed);e.message=`${n}。系统${o?"跳过猜测":"无法继续猜测"}，轮到你。`,e.result=g("neutral",`系统${o?"跳过猜测":"无法继续猜测"}。`),j(),h();return}const i=a.target.color===a.color&&(a.target.wildcard&&a.value==="wild"||!a.target.wildcard&&a.target.value===Number(a.value)),d=a.value==="wild"?`${I(a.color)}万能牌`:`${I(a.color)}${a.value}`;if(i)a.target.revealed=!0,H(e)||(e.currentTurn="player",e.message=`${n}，并猜中你的 ${d}。轮到你。`,e.result=g("error",`系统猜中：你的 ${d} 被公开。`),j());else{const o=Be(e,r);e.currentTurn="player",e.message=`${n}，猜你的 ${d} 失败。系统公开了${o?m(o):"一张牌"}。轮到你。`,e.result=g("success",`系统猜错：公开了${o?m(o):"一张系统牌"}。`),H(e)||j()}h()}function k(){localStorage.setItem(re,JSON.stringify(s))}function Ze(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${r}`}function Ue(e){var t;return((t=c.storyEvents.find(n=>n.id===e))==null?void 0:t.title)||e}function Je(e){return c.flags[e]||e}function Xe(e){if(e<=1)return!0;const t=c.chapterUnlocks[e];return!!(t&&M(t.requireAny))}function X(){if(s.chapterOverride)return s.chapterOverride;let e=1;for(let t=2;t<=c.maxChapter&&Xe(t);t+=1)e=t;return e}function z(e){var t;return((t=c.resources[e])==null?void 0:t.label)||e}function ze(){for(const e of Object.keys(c.resources)){const t=e==="stamina"?12:e==="morale"?10:99;s.resources[e]=Math.max(0,Math.min(t,s.resources[e]||0))}}function v(e){s.log=[e,...s.log].slice(0,12)}function E(e={}){Object.entries(e).forEach(([t,n])=>{t in c.resources&&(s.resources[t]=(s.resources[t]||0)+n)}),ze()}function Q(e={}){Object.entries(e).forEach(([t,n])=>{s.flags[t]=n})}function M(e){return!e||e.length===0?!0:e.some(t=>Object.entries(t).every(([n,r])=>n==="event"?s.eventHistory.includes(String(r)):n.startsWith("has")||typeof r=="boolean"?!!s.flags[n]==!!r:(s.resources[n]||0)>=r))}function ye(e){return!e||e.length===0?"":e.map(t=>Object.entries(t).map(([n,r])=>n==="event"?`完成${Ue(r)}`:n.startsWith("has")||typeof r=="boolean"?r?`需要${Je(n)}`:"":`${z(n)} ${r}`).filter(Boolean).join("、")).join(" 或 ")}function Qe(){return`第 ${s.gameDay} 个游戏日 ${String(s.gameHour).padStart(2,"0")}:00`}function A(e){let t=s.gameHour+e;for(;t>=24;)t-=24,s.gameDay+=1,tt();s.gameHour=t}function et(e){const t=(e-2)%c.dailyEvents.length;return c.dailyEvents[t]}function tt(){const e=`day-${s.gameDay}`;s.resolvedDailyEvents.includes(e)||s.activeDailyEvent||(s.activeDailyEvent={key:e,eventIndex:(s.gameDay-2)%c.dailyEvents.length},v(`新的游戏日开始：${et(s.gameDay).title}`))}function be(){return s.activeDailyEvent?c.dailyEvents[s.activeDailyEvent.eventIndex]:null}function nt(){const e=X();return c.storyEvents.find(t=>t.chapter<=e&&!s.eventHistory.includes(t.id))}function Ce(e={}){return Object.entries(e).every(([t,n])=>(s.resources[t]||0)>=n)}function G(e={},t={}){const n={};for(const[r,a]of Object.entries(e))n[r]=a;for(const[r,a]of Object.entries(t))n[r]=(n[r]||0)+a;return Object.entries(n).filter(([,r])=>r!==0).map(([r,a])=>`${z(r)} ${a>0?"+":""}${a}`).join("，")}function W(){!s.endingId&&(s.resources.water<=0||s.resources.food<=0||s.resources.stamina<=0)&&(s.endingId="failure",v("雾线合拢，生存失败。"))}function rt(){s.flags.finalChoice==="truth"&&s.resources.clues>=6?s.endingId="truth":s.flags.finalChoice==="rescue"&&s.flags.radioSignal||s.flags.finalChoice==="rescue"&&s.flags.hasSignalFire?s.endingId="rescue":s.flags.finalChoice==="solo"&&s.flags.hasMap?s.endingId="solo":s.flags.finalChoice==="stay"?s.endingId="stay":s.endingId="failure",s.flags.lastEndingEvent="beacon",v(`结局达成：${c.endings[s.endingId].title}`)}function $e(e,t=null){c.endings[e]&&(s.endingId=e,s.flags.lastEndingEvent=t,v(`结局达成：${c.endings[e].title}`))}function at(e){if(s.endingId||s.activeDailyEvent)return;const t=c.actions.find(r=>r.id===e);if(!t)return;const n=t.bonus?t.bonus(s):{};E(t.changes),E(n),A(t.timeCost),v(`${t.label}。${G(t.changes,n)||"没有明显变化"}。`),W(),T()}function st(e){if(s.endingId||s.activeDailyEvent)return;const t=c.recipes.find(r=>r.id===e);if(!t||s.craftedItems.includes(t.id))return;if(!Ce(t.cost)){F("材料不足，无法合成。");return}const n=Object.fromEntries(Object.entries(t.cost).map(([r,a])=>[r,-a]));E(n),Q(t.flags),s.craftedItems.push(t.id),A(t.timeCost),v(`合成了${t.label}。`),W(),T()}function it(e,t){if(s.endingId)return;const n=c.storyEvents.find(i=>i.id===e),r=n==null?void 0:n.options[t];if(!n||!r||!M(r.requireAny))return;E(r.changes),Q(r.flags),A(r.timeCost||1),s.eventHistory.push(n.id);const a=G(r.changes);v(a?`${r.result}
资源变化：${a}`:r.result),r.endingId&&$e(r.endingId,n.id),!s.endingId&&r.endingCheck&&rt(),W(),T()}function lt(e){const t=be(),n=t==null?void 0:t.options[e];if(!t||!n||!M(n.requireAny))return;const r=s.activeDailyEvent.key;s.activeDailyEvent=null,E(n.changes),Q(n.flags),A(n.timeCost||1),s.resolvedDailyEvents.push(r);const a=G(n.changes);v(a?`${n.result}
资源变化：${a}`:n.result),n.endingId&&$e(n.endingId),W(),T()}function F(e){L=e,h(),window.setTimeout(()=>{L="",h()},2200)}function T(){k(),h()}function ot(){return{windowX:window.scrollX,windowY:window.scrollY,containers:[".mini-panel",".cheat-panel"].map(e=>{const t=document.querySelector(e);return t?{selector:e,left:t.scrollLeft,top:t.scrollTop}:null}).filter(Boolean)}}function ct(e){if(!e)return;const t=()=>{const n=Math.max(0,document.documentElement.scrollWidth-window.innerWidth),r=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);window.scrollTo(Math.min(e.windowX,n),Math.min(e.windowY,r)),e.containers.forEach(({selector:a,left:i,top:d})=>{const o=document.querySelector(a);o&&(o.scrollLeft=Math.min(i,Math.max(0,o.scrollWidth-o.clientWidth)),o.scrollTop=Math.min(d,Math.max(0,o.scrollHeight-o.clientHeight)))})};window.requestAnimationFrame(t)}function dt(){window.confirm("确定要清空当前存档吗？")&&(s=q(),k(),h({preserveScroll:!1}))}function ut(){const e=JSON.stringify(s),t=new TextEncoder().encode(e);let n="";return t.forEach(r=>{n+=String.fromCharCode(r)}),btoa(n)}function ft(e){try{const t=atob(e.trim()),n=Uint8Array.from(t,i=>i.charCodeAt(0)),r=new TextDecoder().decode(n),a=JSON.parse(r);if(!a||typeof a!="object"||!a.resources)throw new Error("Invalid save");s=se(a),v("存档导入成功。"),k(),h({preserveScroll:!1})}catch{F("存档码无效，导入失败。")}}function ht(e,t){const n=Number.isFinite(t)?t:0;s.resources[e]=Math.max(0,n),k(),pt()}function pt(){document.querySelectorAll("[data-resource-list]").forEach(e=>{e.innerHTML=we()})}function gt(e){s.chapterOverride=e,v(`调试：已切换到第 ${e} 阶段。`),T()}function mt(e){A(e),v(`调试：推进了 ${e} 个游戏小时。`),T()}function vt(e){s.endingId=e,s.flags.lastEndingEvent=null,v(`调试：直接进入结局「${c.endings[e].title}」。`),T()}function yt(){const e=s.flags.lastEndingEvent||"beacon";s.endingId=null,s.flags.finalChoice=null,s.flags.lastEndingEvent=null,s.eventHistory=s.eventHistory.filter(t=>t!==e),v("你把结局页合上，回到雾岭营地继续尝试。"),T()}function we(){return Object.entries(c.resources).map(([e,t])=>{const n=s.resources[e]||0,r=e==="stamina"?Math.round(n/12*100):Math.min(n*12,100);return`
        <li class="resource">
          <span>${t.label}</span>
          <strong>${n}${t.unit}</strong>
          <i style="--level: ${r}%"></i>
        </li>
      `}).join("")}function bt(){return[["actions","行动"],["craft","合成"],["story","剧情"],["save","存档"]].map(([t,n])=>`
        <button class="tab ${D===t?"active":""}" data-tab="${t}">
          ${n}
        </button>
      `).join("")}function Ct(){return`
    <div class="action-grid">
      ${c.actions.map(e=>{const t=e.bonus?e.bonus(s):{};return`
            <button class="action-card" data-action="${e.id}" ${s.activeDailyEvent?"disabled":""}>
              <span class="action-title">${e.label}</span>
              <span>${e.description}</span>
              <small>耗时 ${e.timeCost} 小时 · ${G(e.changes,t)}</small>
            </button>
          `}).join("")}
    </div>
  `}function $t(){return`
    <div class="recipe-list">
      ${c.recipes.map(e=>{const t=s.craftedItems.includes(e.id),n=t||!Ce(e.cost)||s.activeDailyEvent,r=Object.entries(e.cost).map(([a,i])=>`${z(a)} ${i}`).join("，");return`
            <article class="recipe ${t?"owned":""}">
              <div>
                <h3>${e.label}</h3>
                <p>${e.description}</p>
                <small>耗时 ${e.timeCost} 小时 · ${r}</small>
              </div>
              <button data-craft="${e.id}" ${n?"disabled":""}>
                ${t?"已拥有":"合成"}
              </button>
            </article>
          `}).join("")}
    </div>
  `}function wt(){var a;const e=nt(),t=X(),n=c.storyEvents.find(i=>i.chapter>t&&!s.eventHistory.includes(i.id)),r=n?(a=c.chapterUnlocks[n.chapter])==null?void 0:a.text:"";return e?`
    <div class="story-panel">
      <p class="eyebrow">阶段 ${e.chapter}</p>
      <h3>${e.title}</h3>
      <p>${e.text}</p>
      <div class="choice-list">
        ${e.options.map((i,d)=>{const o=M(i.requireAny);return`
              <button data-story="${e.id}" data-option="${d}" ${o?"":"disabled"}>
                <span>${i.label}</span>
                <small>${o?i.result:`条件不足：${ye(i.requireAny)}`}</small>
              </button>
            `}).join("")}
      </div>
    </div>
  `:`
      <div class="story-panel">
        <h3>当前没有新的主线事件</h3>
        <p>${n?`下一阶段解锁条件：${r}`:"所有主线已经处理完毕。"}</p>
      </div>
    `}function Tt(){const e=be();return e?`
    <section class="urgent">
      <p class="eyebrow">游戏日事件</p>
      <h2>${e.title}</h2>
      <p>${e.text}</p>
      <div class="choice-list">
        ${e.options.map((t,n)=>{const r=M(t.requireAny);return`
              <button data-daily-option="${n}" ${r?"":"disabled"}>
                <span>${t.label}</span>
                <small>${r?t.result:`条件不足：${ye(t.requireAny)}`}</small>
              </button>
            `}).join("")}
      </div>
    </section>
  `:""}function It(){return`
    <div class="save-tools">
      <label>
        导出存档
        <textarea readonly rows="5">${ut()}</textarea>
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
  `}function St(){return D==="craft"?$t():D==="story"?wt():D==="save"?It():Ct()}function Dt(){if(!s.endingId)return"";const e=c.endings[s.endingId];return`
    <section class="ending">
      <p class="eyebrow">结局</p>
      <h2>${e.title}</h2>
      <p>${e.text}</p>
      <div class="button-row">
        <button data-restart-ending>继续尝试</button>
        <button data-reset>新存档</button>
      </div>
    </section>
  `}function Et(){return Z?`
    <aside class="cheat-panel">
      <div class="panel-title">
        <h2>调试面板</h2>
        <button data-hide-cheat>隐藏</button>
      </div>
      <div class="cheat-grid">
        ${Object.entries(c.resources).map(([e,t])=>`
              <label>
                ${t.label}
                <input type="number" min="0" value="${s.resources[e]||0}" data-cheat-resource="${e}" />
              </label>
            `).join("")}
      </div>
      <div class="button-row">
        <button data-chapter-override="1">解锁阶段1</button>
        <button data-chapter-override="2">解锁阶段2</button>
        <button data-chapter-override="3">解锁阶段3</button>
        <button data-jump-hours="12">推进12小时</button>
        <button data-jump-hours="24">推进1游戏日</button>
      </div>
      <div class="button-row">
        ${Object.entries(c.endings).map(([e,t])=>`<button data-force-ending="${e}">${t.title}</button>`).join("")}
      </div>
    </aside>
  `:""}function xt(){return'<button class="mini-launcher" data-mini-open>小游戏</button>'}function kt(e){const t=U(e);return`
    <div class="mini-difficulty" aria-label="系统难度">
      <span>系统难度</span>
      ${Object.entries(le).map(([n,r])=>`
            <button
              class="${t===n?"active":""}"
              data-mini-difficulty="${e}"
              data-difficulty="${n}"
            >
              ${r}
            </button>
          `).join("")}
    </div>
  `}function Te(e){return e.result?`<div class="mini-result ${e.result.type}">${x(e.result.text)}</div>`:""}function Mt(e,t){return e.length===0?'<p class="mini-empty">尚未选牌</p>':`
    <div class="mini-card-row">
      ${e.map(n=>`
            <span class="number-card ">
              ${n.value}
            </span>
          `).join("")}
    </div>
  `}function At(e){const t=[];for(let n=1;n<=8;n+=1)t.push({value:n,cards:e.filter(r=>r.value===n)});return[t.slice(0,2),t.slice(2,4),t.slice(4,6),t.slice(6,8)]}function Nt(){const e=p.thirtyNine,t=C(e),n=At(e.deck);return`
    <div class="mini-stage">
      <div class="mini-status">
        <span>${e.currentTurn?`当前：${b(e.currentTurn)}`:"本局结束"}</span>
        <span>剩余 ${e.deck.length} 张</span>
        <span>桌面总点数 ${t}</span>
      </div>
      <p>${x(e.message)}</p>
      ${Te(e)}
      <section>
        <h3>公共桌面</h3>
        ${Mt(e.tableCards.map(r=>({...r.card,owner:r.owner})))}
      </section>
      <section>
        <h3>可选牌</h3>
        <div class="thirty-nine-rows">
          ${n.map(r=>`
                <div class="thirty-nine-row">
                  ${r.map(a=>`
                        <div class="thirty-nine-group">
                          <div class="thirty-nine-group-title">${a.value}</div>
                          <div class="mini-card-row selectable">
                            ${a.cards.map(i=>`
                                  <button
                                    class="number-card"
                                    data-thirty-card="${i.id}"
                                    ${e.phase!=="playing"||e.currentTurn!=="player"?"disabled":""}
                                  >
                                    ${i.value}
                                  </button>
                                `).join("")}
                          </div>
                        </div>
                      `).join("")}
                </div>
              `).join("")}
        </div>
      </section>
    </div>
  `}function Ot(e,t){const n=e.revealed?"已公开":m(e),r=e.wildcard?"*":e.value,a=e.revealed?"player-revealed":"";return`
    <span class="code-card ${e.color} ${e.revealed?"revealed":""} ${a} ">
      <strong>${r}</strong>
      <small>${n}</small>
    </span>
  `}function jt(e){const t=p.davinci,n=e.revealed||t.phase!=="guessing"||t.currentTurn!=="player";return`
    <button
      class="code-card ${e.color} ${e.revealed?"revealed":""} ${e.revealed?"":"hidden"} ${t.selectedTargetId===e.id?"selected":""}"
      data-davinci-target="${e.id}"
      ${n?"disabled":""}
    >
      <strong>${e.revealed?e.wildcard?"*":e.value:"?"}</strong>
      <small>${e.revealed?m(e):"猜这张"}</small>
    </button>
  `}function Lt(){const e=p.davinci;if(e.phase!=="guessing"||e.currentTurn!=="player")return"";const t=e.systemCards.find(r=>r.id===e.selectedTargetId),n=t?I(t.color):"先选择暗牌";return`
    <div class="guess-panel">
      <label>
        牌面
        <select id="davinci-guess-value">
          ${Array.from({length:12},(r,a)=>`<option value="${a}">${a}</option>`).join("")}
          <option value="wild">万能牌</option>
        </select>
      </label>
      <div class="guess-color-hint">
        <span>颜色</span>
        <strong>${n}</strong>
      </div>
      <button data-davinci-guess ${e.systemCards.some(r=>!r.revealed)?"":"disabled"}>猜测选中的牌</button>
      <button data-davinci-end-turn>跳过</button>
    </div>
  `}function qt(){const e=p.davinci;if(e.phase!=="insertWildcard"&&e.phase!=="openingWildcard"||e.pendingOwner!=="player")return"";const t=e.phase==="openingWildcard"?"放置开局万能牌":"选择万能牌位置",n=e.phase==="openingWildcard"&&e.openingWildcards.length>0?`<p class="mini-hint">放置后还剩 ${e.openingWildcards.length} 张开局万能牌。</p>`:"";return`
    <section>
      <h3>${t}</h3>
      ${n}
      <div class="mini-card-row selectable">
        ${Array.from({length:e.playerCards.length+1},(r,a)=>`
          <button class="insert-slot" data-davinci-insert="${a}">
            ${a===0?"最左":a===e.playerCards.length?"最右":`第 ${a+1} 位前`}
          </button>
        `).join("")}
      </div>
    </section>
  `}function Rt(){const e=p.davinci;return`
    <div class="mini-stage">
      <div class="mini-status">
        <span>${e.phase==="openingWildcard"?"准备：放置万能牌":e.currentTurn?`当前：${b(e.currentTurn)}`:"本局结束"}</span>
        <span>牌堆 ${e.deck.length} 张</span>
      </div>
      <p>${x(e.message)}</p>
      ${Te(e)}
      <div class="code-board">
        <section>
          <h3>系统牌列</h3>
          <div class="mini-card-row">
            ${e.systemCards.map(n=>jt(n)).join("")}
          </div>
        </section>
        <section>
          <h3>你的牌列</h3>
          <div class="mini-card-row">
            ${e.playerCards.map(n=>Ot(n)).join("")}
          </div>
        </section>
      </div>
      ${qt()}
      ${Lt()}
    </div>
  `}function Ht(){return Y?`
    <div class="mini-backdrop">
      <section class="mini-panel" aria-label="小游戏">
        <div class="panel-title">
          <div>
            <p class="eyebrow">独立小游戏</p>
            <h2>${$==="thirtyNine"?"39点":"达芬奇密码"}</h2>
          </div>
          <button data-mini-close>关闭</button>
        </div>
        <div class="mini-tabs">
          <button class="${$==="thirtyNine"?"active":""}" data-mini-game="thirtyNine">39点</button>
          <button class="${$==="davinci"?"active":""}" data-mini-game="davinci">达芬奇密码</button>
        </div>
        ${kt($)}
        ${$==="thirtyNine"?Nt():Rt()}
        <div class="button-row mini-tools">
          <button data-mini-reset="${$}">重新开始本局</button>
        </div>
      </section>
    </div>
  `:""}function Gt(){return`
    <ol class="log-list">
      ${s.log.map(e=>`<li>${x(e)}</li>`).join("")}
    </ol>
  `}function h({preserveScroll:e=!0}={}){const t=e?ot():null,n=X();B.innerHTML=`
    <main class="shell">
      ${xt()}
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${c.subtitle}</p>
          <h1>${c.title}</h1>
          <p>雾岭的时间不按现实流动。每次行动都会推进数小时，新的阶段由线索和关键物品解锁。</p>
          <div class="status-line">
            <span>${Qe()}</span>
            <span>阶段 ${n}/${c.maxChapter}</span>
          </div>
        </div>
        <img src="${Se}" alt="雾岭营地插画" />
      </section>

      ${L?`<div class="toast">${L}</div>`:""}
      ${Dt()}
      ${Tt()}

      <section class="dashboard">
        <aside class="sidebar">
          <div class="panel-title">
            <h2>状态</h2>
            <span>${s.endingId?"已结局":"求生中"}</span>
          </div>
          <ul class="resource-list" data-resource-list>
            ${we()}
          </ul>
          <div class="inventory">
            <h2>物品</h2>
            <p>${s.craftedItems.length?s.craftedItems.map(r=>{var a;return(a=c.recipes.find(i=>i.id===r))==null?void 0:a.label}).join("、"):"尚未合成物品"}</p>
          </div>
        </aside>

        <section class="play-area">
          <nav class="tabs">${bt()}</nav>
          ${St()}
        </section>
      </section>

      <section class="journal">
        <div class="panel-title">
          <h2>记录</h2>
          <span>${x(s.startedAtDate)} 开始</span>
        </div>
        ${Gt()}
      </section>

      ${Et()}
      ${Ht()}
    </main>
  `,ct(t)}function Wt(e){var n,r;const t=e.target.closest("button");if(t)if(t.dataset.miniOpen!==void 0)Y=!0,O($),h({preserveScroll:!1});else if(t.dataset.miniClose!==void 0)Y=!1,h();else if(t.dataset.miniGame)$=t.dataset.miniGame,O($),h();else if(t.dataset.miniDifficulty)ke(t.dataset.miniDifficulty,t.dataset.difficulty),h();else if(t.dataset.miniReset)p[t.dataset.miniReset]=t.dataset.miniReset==="thirtyNine"?ce():de(),O(t.dataset.miniReset),h();else if(t.dataset.thirtyCard)Oe(t.dataset.thirtyCard);else if(t.dataset.davinciInsert)We(Number(t.dataset.davinciInsert));else if(t.dataset.davinciTarget)p.davinci.selectedTargetId=t.dataset.davinciTarget,h();else if(t.dataset.davinciGuess!==void 0){const a=p.davinci.selectedTargetId,i=(n=document.querySelector("#davinci-guess-value"))==null?void 0:n.value;if(!a){F("请先选择一张系统暗牌。");return}Fe(a,i)}else if(t.dataset.davinciEndTurn!==void 0)Pe();else if(t.dataset.tab)D=t.dataset.tab,h();else if(t.dataset.action)at(t.dataset.action);else if(t.dataset.craft)st(t.dataset.craft);else if(t.dataset.story)it(t.dataset.story,Number(t.dataset.option));else if(t.dataset.dailyOption)lt(Number(t.dataset.dailyOption));else if(t.dataset.import!==void 0){const a=((r=document.querySelector("#import-code"))==null?void 0:r.value)||"";ft(a)}else t.dataset.reset!==void 0?dt():t.dataset.hideCheat!==void 0?(Z=!1,h()):t.dataset.chapterOverride?gt(Number(t.dataset.chapterOverride)):t.dataset.jumpHours?mt(Number(t.dataset.jumpHours)):t.dataset.forceEnding?vt(t.dataset.forceEnding):t.dataset.restartEnding!==void 0&&yt()}function Ft(e){const t=e.target;t.dataset.cheatResource&&ht(t.dataset.cheatResource,Number(t.value||0))}function Vt(e){e.metaKey||e.ctrlKey||e.altKey||e.target.matches("input, textarea")||(P=`${P}${e.key.toLowerCase()}`.slice(-c.cheatCode.length),P===c.cheatCode&&(Z=!0,F("调试面板已开启。")))}B.addEventListener("click",Wt);B.addEventListener("input",Ft);window.addEventListener("keydown",Vt);k();h({preserveScroll:!1});
