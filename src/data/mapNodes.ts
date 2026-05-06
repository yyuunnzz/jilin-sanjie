// 吉林三杰文旅行迹节点数据
// 坐标基于地图背景的百分比 (x%, y%)
export interface MapNode {
  id: string;
  name: string;
  subtitle: string;
  person: '宋小濂' | '成多禄' | '徐鼐霖' | '三杰共事';
  x: number; // 百分比 0-100
  y: number; // 百分比 0-100
  color: string;
  tags: string[];
  description: string;
  detail: string;
  vrContent: {
    title: string;
    scene: string;
    poem?: string;
  };
}

export const mapNodes: MapNode[] = [
  {
    id: 'shuangyang',
    name: '双阳齐家镇',
    subtitle: '宋小濂出生地',
    person: '宋小濂',
    x: 15,
    y: 35,
    color: '#C25E3A',
    tags: ['AR导览'],
    description: '宋小濂（1860-1926），字铁梅，号止园，吉林双阳人。清末民初杰出的边务专家、政治家、书法家。',
    detail: '此地乃宋小濂诞生之所，后其墓位于吉林市铁合金厂西山。宋小濂一生致力于东北边务，曾任黑龙江都督兼民政长，著有《北徼纪游》等。',
    vrContent: {
      title: '双阳·故里寻踪',
      scene: '故居庭院',
      poem: '边声摇白草，塞月照黄沙。'
    }
  },
  {
    id: 'jiutai',
    name: '九台其塔木',
    subtitle: '成多禄出生地',
    person: '成多禄',
    x: 22,
    y: 30,
    color: '#2E8B78',
    tags: [],
    description: '成多禄（1864-1928），字竹山，号澹堪，吉林九台人。近代东北著名诗人、书法家，被誉为"东北诗豪"。',
    detail: '成多禄诞生于此塔木镇，一生诗作千首，书法精妙，晚年寓居北京砖塔胡同澹园。与宋小濂、徐鼐霖并称"吉林三杰"。',
    vrContent: {
      title: '其塔木·诗魂故里',
      scene: '田园风光',
      poem: '一官如赘世，万事等浮沤。'
    }
  },
  {
    id: 'yongji',
    name: '永吉二道沟',
    subtitle: '徐鼐霖出生地',
    person: '徐鼐霖',
    x: 28,
    y: 38,
    color: '#4A6FA5',
    tags: [],
    description: '徐鼐霖（1865-1940），字立岑，号憩园，吉林永吉人。近代著名方志学家、教育家、史学家。',
    detail: '徐鼐霖出生于永吉二道沟，曾任呼兰知府，晚年寓居北京花枝胡同。著有《吉林通志》等，为东北地方文献做出巨大贡献。',
    vrContent: {
      title: '二道沟·方志之源',
      scene: '村落水畔',
      poem: '男儿生世间，那得不远征。'
    }
  },
  {
    id: 'qiqihaer',
    name: '齐齐哈尔',
    subtitle: '程德全幕府·三杰共事',
    person: '三杰共事',
    x: 30,
    y: 20,
    color: '#8B6B4A',
    tags: ['数字展馆'],
    description: '黑龙江将军程德全幕府所在地，"吉林三杰"曾在此共事。',
    detail: '1905年前后，宋小濂、成多禄、徐鼐霖先后入黑龙江将军程德全幕府，襄助治理边疆。三人在此缔结深厚友谊，开启了一段传奇的文人共治佳话。',
    vrContent: {
      title: '齐齐哈尔·幕府风云',
      scene: '将军府衙',
      poem: '三杰同幕府，一城共文章。'
    }
  },
  {
    id: 'mohe',
    name: '漠河·塞鸿诗社',
    subtitle: '边务生涯·塞鸿诗社',
    person: '宋小濂',
    x: 55,
    y: 15,
    color: '#C25E3A',
    tags: ['VR展厅'],
    description: '宋小濂曾督办漠河金矿，创办"塞鸿诗社"。',
    detail: '1888-1890年间，宋小濂随李金镛督办漠河金矿，在冰天雪地中与同仁创办"塞鸿诗社"，以诗会友，留下了大量边塞诗篇。《北徼纪游》即记述此行。',
    vrContent: {
      title: '漠河·塞鸿诗社',
      scene: '雪原金窟',
      poem: '极北寒威重，冰天万里长。'
    }
  },
  {
    id: 'hulunbeier',
    name: '呼伦贝尔',
    subtitle: '宋小濂任副都统',
    person: '宋小濂',
    x: 60,
    y: 22,
    color: '#C25E3A',
    tags: [],
    description: '宋小濂曾任呼伦贝尔副都统，主持边疆事务。',
    detail: '宋小濂任呼伦贝尔副都统期间，致力于维护边疆稳定，处理外交事务，为东北边疆治理做出重要贡献。',
    vrContent: {
      title: '呼伦贝尔·草原边城',
      scene: '草原穹庐',
      poem: '天似穹庐盖，野茫万里沙。'
    }
  },
  {
    id: 'suihua',
    name: '绥化·海伦',
    subtitle: '成多禄任职地',
    person: '成多禄',
    x: 35,
    y: 18,
    color: '#2E8B78',
    tags: [],
    description: '成多禄曾任绥化、海伦等地学官。',
    detail: '成多禄在绥化、海伦等地任教谕等职，培养人才，传播文化。期间创作了大量反映东北风土人情的诗篇。',
    vrContent: {
      title: '绥化·学官诗路',
      scene: '学堂书斋',
      poem: '春风化雨润，桃李满关东。'
    }
  },
  {
    id: 'dalai',
    name: '大赉',
    subtitle: '成多禄知县任',
    person: '成多禄',
    x: 38,
    y: 28,
    color: '#2E8B78',
    tags: [],
    description: '成多禄曾任大赉县（今大安）知县。',
    detail: '成多禄在大赉任知县期间，勤政爱民，颇有政声。然而宦途坎坷，最终选择辞官归隐，专心诗酒。',
    vrContent: {
      title: '大赉·宦海一瞥',
      scene: '县衙书房',
      poem: '一官如赘世，万事等浮沤。'
    }
  },
  {
    id: 'haerbin',
    name: '哈尔滨',
    subtitle: '宋小濂任都督',
    person: '宋小濂',
    x: 48,
    y: 20,
    color: '#C25E3A',
    tags: [],
    description: '宋小濂曾任黑龙江省都督兼民政长。',
    detail: '1912-1913年，宋小濂任黑龙江省都督兼民政长，主政哈尔滨及全省，推行新政，整顿吏治，是其在政治生涯的顶峰。',
    vrContent: {
      title: '哈尔滨·都督府邸',
      scene: '都督衙门',
      poem: '龙江风雨急，独撑一柱天。'
    }
  },
  {
    id: 'jilin',
    name: '吉林市',
    subtitle: '宋小濂墓·铁合金厂西山',
    person: '宋小濂',
    x: 25,
    y: 42,
    color: '#C25E3A',
    tags: ['AR导览'],
    description: '宋小濂归葬于吉林市铁合金厂西山，今为爱国主义教育基地。',
    detail: '宋小濂病逝后归葬吉林故里，墓位于吉林市铁合金厂附近西山。墓碑刻有"吉林宋公之墓"，现为重要的历史文化遗产地。',
    vrContent: {
      title: '吉林·宋公遗冢',
      scene: '墓地松岗',
      poem: '青山埋骨处，犹照塞鸿飞。'
    }
  },
  {
    id: 'zhiyuan',
    name: '北京止园',
    subtitle: '宋小濂晚年居所',
    person: '宋小濂',
    x: 72,
    y: 50,
    color: '#C25E3A',
    tags: ['VR全景'],
    description: '宋小濂晚年寓居北京止园，与徐鼐霖、成多禄比邻而居。',
    detail: '宋小濂晚年在北京置宅止园，与徐鼐霖的憩园（花枝胡同）、成多禄的澹园（砖塔胡同）相距不远，三人诗酒往来，"吉林三杰"以北京为中心形成了新的文化圈。',
    vrContent: {
      title: '止园·塞北遗老',
      scene: '园林水榭',
      poem: '止园春草绿，犹忆塞鸿声。'
    }
  },
  {
    id: 'danyuan',
    name: '北京澹园',
    subtitle: '成多禄晚年居所·砖塔胡同',
    person: '成多禄',
    x: 75,
    y: 55,
    color: '#2E8B78',
    tags: ['扫码听诗'],
    description: '成多禄晚年寓居北京砖塔胡同澹园，"东北诗豪"在此度过最后岁月。',
    detail: '成多禄晚年在北京砖塔胡同筑"澹园"自居，诗酒自娱，与宋小濂止园、徐鼐霖憩园诗酒唱和不断。"吉林三杰"齐聚北京，成为民国时期东北文化人的独特现象。',
    vrContent: {
      title: '澹园·诗豪归处',
      scene: '胡同庭院',
      poem: '澹园竹影静，独坐对黄昏。'
    }
  },
  {
    id: 'qiyuan',
    name: '北京憩园',
    subtitle: '徐鼐霖晚年居所·花枝胡同',
    person: '徐鼐霖',
    x: 78,
    y: 52,
    color: '#4A6FA5',
    tags: ['AI对话'],
    description: '徐鼐霖晚年寓居北京花枝胡同憩园，潜心著述。',
    detail: '徐鼐霖晚年在北京花枝胡同筑"憩园"，与止园、澹园比邻，三老诗酒唱和，共度晚年。徐鼐霖在此完成大量方志与学术著作。',
    vrContent: {
      title: '憩园·方志晚年',
      scene: '书房翰墨',
      poem: '憩园花事好，著述老来勤。'
    }
  },
  {
    id: 'suzhou',
    name: '苏州网师园',
    subtitle: '成多禄江南游历',
    person: '成多禄',
    x: 88,
    y: 75,
    color: '#2E8B78',
    tags: ['扫码导览'],
    description: '成多禄曾游历苏州网师园、寒山寺，题壁留诗。',
    detail: '成多禄中年南游，遍访江南名胜。在苏州网师园、寒山寺等地留下诗作，将东北诗风带到江南，促进了南北文化交流。',
    vrContent: {
      title: '网师园·江南邂逅',
      scene: '姑苏园林',
      poem: '江南烟雨好，何必念关东。'
    }
  },
  {
    id: 'hanshansi',
    name: '寒山寺',
    subtitle: '题壁留诗',
    person: '成多禄',
    x: 90,
    y: 72,
    color: '#2E8B78',
    tags: [],
    description: '成多禄在寒山寺题壁留诗，传为佳话。',
    detail: '成多禄游至苏州寒山寺，感张继《枫桥夜泊》之韵，题诗于壁，留下"东北诗人过寒山寺"的文化佳话。',
    vrContent: {
      title: '寒山寺·钟声千古',
      scene: '古寺钟亭',
      poem: '夜半钟声到客船，关东过客亦留篇。'
    }
  }
];
