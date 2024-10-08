const axios = require('axios');
const papa = require('papaparse');
const fs = require('fs');

const filePath = 'src/modules/topic/resources/topic.generate.ts';

const CSV_FILE = 'https://docs.google.com/spreadsheets/d/19Kq4FNRxRojCDajOtSCdS38d_cSB_MZnXRY0Od-tDig/pub?gid=0&single=true&output=csv';

axios.get(CSV_FILE).then(res => {
  const csvInfo = papa.parse(res.data);

  const tableHaed = csvInfo.data[0]; // [ '編號(id)', '辯題(name)', '類別(category)', '備註' ]
  const idIndex = tableHaed.findIndex(key => key.includes('id'));
  const nameIndex = tableHaed.findIndex(key => key.includes('name'));
  const categoryIndex = tableHaed.findIndex(key => key.includes('category'));

  // 移除表頭、空白資料
  const tableBody = csvInfo.data.filter((item, index) => index !== 0 && item[idIndex] !== '');
  
  // 找出 'topic-complete' 和 'topic-combined' 的 index
  const topicCompleteIndex = tableBody.findIndex(row => row[idIndex] === 'topic-complete');
  const topicCombinedIndex = tableBody.findIndex(row => row[idIndex] === 'topic-combined');

  const createTopicItem = (item) => ({
    id: item[idIndex],
    name: item[nameIndex],
    category: item[categoryIndex],
  });

  // 截取内容
  const topicComplete = tableBody.slice(topicCompleteIndex + 1, topicCombinedIndex).map(createTopicItem);
  const topicCombined = tableBody.slice(topicCombinedIndex + 1).map(createTopicItem);


  fs.writeFileSync(
    filePath,
    `// Code generated by create-topic.cjs, DO NOT EDIT.
// You can use 'pnpm create-topic'.

export const DEFAULT_TOPIC_COMPLETE_FROM_CSV = ${JSON.stringify(topicComplete, null, '  ')};

export const DEFAULT_TOPIC_COMBINED_FROM_CSV = ${JSON.stringify(topicCombined, null, '  ')};

`,
    'utf8',
  );
});
