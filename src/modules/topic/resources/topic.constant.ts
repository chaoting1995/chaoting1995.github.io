import { Topic, TopicSetting } from 'modules/topic/resources/topic.type';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';

export const DT_LOCALSTORAGE_KEY_TOPIC_SETTING = 'DT_LOCALSTORAGE_KEY_TOPIC_SETTING';

export const DEFAULT_TOPIC_SETTING : TopicSetting = {
  topicMode: EnumTopicMode.Combined,
  topicMiddleItemMode: EnumTopicMiddleItemMode.Causal,
  topicDisabled: []
};

export const DEFAULT_TOPIC_COMPLETE: Topic[] = [
  {
    id: 'topic-complete-001',
    name: '順境/逆境更有利於人成長',
    category: '人生觀',
  },
  {
    id: 'topic-complete-002',
    name: '行萬里路勝過讀萬卷書/讀萬卷書勝過行萬里路',
    category: '人生觀',
  },
  {
    id: 'topic-complete-003',
    name: '忍讓是/不是一種智慧',
    category: '人生觀',
  },
  {
    id: 'topic-complete-004',
    name: '虛偽是/不是好事',
    category: '人生觀',
  },
  {
    id: 'topic-complete-005',
    name: '死要面子活受罪/不要面子才受罪',
    category: '人生觀',
  },
  {
    id: 'topic-complete-006',
    name: '物質能/不能決定幸福',
    category: '人生觀',
  },
  {
    id: 'topic-complete-007',
    name: '知足是/不是更好的處世態度',
    category: '人生觀',
  },
  {
    id: 'topic-complete-008',
    name: '去向哪裡/與誰同行更重要',
    category: '人生觀',
  },
  {
    id: 'topic-complete-009',
    name: '人生路上應該乘勝追擊/見好就收',
    category: '人生觀',
  },
  {
    id: 'topic-complete-010',
    name: '人生因成功而快樂/因快樂而成功',
    category: '人生觀',
  },
  {
    id: 'topic-complete-011',
    name: '人生機遇/奮鬥更重要',
    category: '人生觀',
  },
  {
    id: 'topic-complete-012',
    name: '環境保護/經濟發展更重要',
    category: '有關社會',
  },
  {
    id: 'topic-complete-013',
    name: '懶惰使人類更進步/退步',
    category: '有關社會',
  },
  {
    id: 'topic-complete-014',
    name: '保護弱者讓社會更進步/退步',
    category: '有關社會',
  },
  {
    id: 'topic-complete-015',
    name: '企業用人應以才/以德為先',
    category: '有關社會',
  },
  {
    id: 'topic-complete-016',
    name: '當今社會，合作/競爭更重要',
    category: '有關社會',
  },
  {
    id: 'topic-complete-017',
    name: '現代社會更需要通才/專才',
    category: '有關社會',
  },
  {
    id: 'topic-complete-018',
    name: '高中國文教育應以白話文/文言文為主',
    category: '有關高中生',
  },
  {
    id: 'topic-complete-019',
    name: '中學生談戀愛利大於弊/弊大於利',
    category: '有關高中生',
  },
  {
    id: 'topic-complete-020',
    name: '大學升學應以選校/選系為主',
    category: '有關高中生',
  },
  {
    id: 'topic-complete-021',
    name: '高中生升學應以興趣為主/未來出路為主',
    category: '有關高中生',
  },
  {
    id: 'topic-complete-022',
    name: '課業補習對高中生利大於弊/弊大於利',
    category: '有關高中生',
  },
  {
    id: 'topic-complete-023',
    name: '營救式刑求是/不是可取的手段',
    category: '道德難題',
  },
  {
    id: 'topic-complete-024',
    name: '反恐中，利用無辜家屬逼迫恐怖分子',
    category: '道德難題',
  },
  {
    id: 'topic-complete-025',
    name: '就範可/不可接受',
    category: '道德難題',
  },
  {
    id: 'topic-complete-026',
    name: '犧牲少數保護多數是正義的/不正義的',
    category: '道德難題',
  },
  {
    id: 'topic-complete-027',
    name: '謊言因/不因善意而良善',
    category: '道德難題',
  },
  {
    id: 'topic-complete-028',
    name: '明星有/沒有義務成為大眾的道德楷模',
    category: '道德難題',
  },
  {
    id: 'topic-complete-029',
    name: '行善宜高調/低調',
    category: '道德難題',
  },
  {
    id: 'topic-complete-030',
    name: '以德報怨是/不是可取的',
    category: '道德難題',
  },
  {
    id: 'topic-complete-031',
    name: '政治人物可以/不可以說謊',
    category: '道德難題',
  },
  {
    id: 'topic-complete-032',
    name: '高薪/重罰更能打擊貪腐',
    category: '道德難題',
  },
  {
    id: 'topic-complete-033',
    name: '女性專屬停車位是/不是歧視',
    category: '道德難題',
  },
  {
    id: 'topic-complete-034',
    name: '愛是自私的/無私的',
    category: '情愛議題',
  },
  {
    id: 'topic-complete-035',
    name: '情侶是/不是工作上的好搭檔',
    category: '情愛議題',
  },
  {
    id: 'topic-complete-036',
    name: '橫刀奪愛沒錯/有錯',
    category: '情愛議題',
  },
  {
    id: 'topic-complete-037',
    name: '愛人/被愛更幸福',
    category: '情愛議題',
  },
  {
    id: 'topic-complete-038',
    name: '情侶分手後應維持友誼/斷絕往來',
    category: '情愛議題',
  },
  {
    id: 'topic-complete-039',
    name: '愛情關係中，第三者應/不應被譴責',
    category: '情愛議題',
  },
  {
    id: 'topic-complete-040',
    name: '網際網路使人際關係更緊密/更疏遠',
    category: '人際關係',
  },
  {
    id: 'topic-complete-041',
    name: '人際交往中，隱忍/坦率更能消除矛盾',
    category: '人際關係',
  },
  {
    id: 'topic-complete-042',
    name: '超能力是人類的福音/災難',
    category: '科幻奇想',
  },
  {
    id: 'topic-complete-043',
    name: '預知未來是快樂的/痛苦的',
    category: '科幻奇想',
  },
  {
    id: 'topic-complete-044',
    name: '時光機對人類利大於弊/弊大於利',
    category: '科幻奇想',
  },
  {
    id: 'topic-complete-045',
    name: '長生不老對人類利大於弊/弊大於利',
    category: '科幻奇想',
  },
  {
    id: 'topic-complete-046',
    name: '網路匿名性發言對台灣利大於弊/弊大於利',
    category: '科技議題',
  },
  {
    id: 'topic-complete-047',
    name: '人工智能對人類利大於弊/弊大於利',
    category: '科技議題',
  },
  {
    id: 'topic-complete-048',
    name: '哆啦A夢是大雄的益友/損友',
    category: '經典故事',
  },
  {
    id: 'topic-complete-049',
    name: '變成泡沫前人魚公主應/不應該刺死王子',
    category: '經典故事',
  },
  {
    id: 'topic-complete-050',
    name: '高譚市需/不需要蝙蝠俠',
    category: '經典故事',
  },
  {
    id: 'topic-complete-051',
    name: '超級英雄註冊法案利大於弊/弊大於利',
    category: '經典故事',
  },
  {
    id: 'topic-complete-052',
    name: '兩津勘吉是/不是好警察',
    category: '經典故事',
  },
  {
    id: 'topic-complete-053',
    name: '文化傳承更重要/文化創新更重要',
    category: '文化議題',
  },
  {
    id: 'topic-complete-054',
    name: '傳統文化商業化有助於/無助於文化傳承',
    category: '文化議題',
  },
  {
    id: 'topic-complete-055',
    name: '項羽應該東山再起/烏江自刎',
    category: '歷史假想',
  },
];

export const DEFAULT_TOPIC_COMBINED: Topic[] = [
  {
    id: 'topic-combined-001',
    name: '查資料',
    category: '有關辯論',
  },
  {
    id: 'topic-combined-002',
    name: '灌論點',
    category: '有關辯論',
  },
  {
    id: 'topic-combined-003',
    name: '寫一辯稿',
    category: '有關辯論',
  },
  {
    id: 'topic-combined-004',
    name: '打練習賽',
    category: '有關辯論',
  },
  {
    id: 'topic-combined-005',
    name: '棄賽',
    category: '有關辯論',
  },
  
  {
    id: 'topic-combined-006',
    name: '課業補習',
    category: '考古題',
  },
  {
    id: 'topic-combined-007',
    name: '政論節目',
    category: '考古題',
  },
  {
    id: 'topic-combined-008',
    name: '談戀愛',
    category: '考古題',
  },
  {
    id: 'topic-combined-009',
    name: '性別刻板印象',
    category: '考古題',
  },
  {
    id: 'topic-combined-010',
    name: '山寨機文化',
    category: '考古題',
  },
  {
    id: 'topic-combined-011',
    name: '說謊',
    category: '其他',
  },
  {
    id: 'topic-combined-012',
    name: '作弊',
    category: '其他',
  },
  {
    id: 'topic-combined-013',
    name: '失業',
    category: '其他',
  },
  {
    id: 'topic-combined-014',
    name: '一夜情',
    category: '其他',
  },
  {
    id: 'topic-combined-015',
    name: '墮胎',
    category: '其他',
  },
  {
    id: 'topic-combined-016',
    name: '熬夜',
    category: '其他',
  },
  {
    id: 'topic-combined-017',
    name: '酒駕',
    category: '其他',
  },
  {
    id: 'topic-combined-018',
    name: '垃圾食物',
    category: '其他',
  },
  {
    id: 'topic-combined-019',
    name: '人口老化',
    category: '其他',
  },
  {
    id: 'topic-combined-020',
    name: '全球暖化',
    category: '其他',
  },
];

export const EMPTY_TOPIC: Topic = {
  id: '',
  name: '',
  category: '',
};