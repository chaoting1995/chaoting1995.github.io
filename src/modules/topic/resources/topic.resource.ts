import { DEFAULT_TOPIC_SETTING, DT_LOCALSTORAGE_KEY_TOPIC_SETTING } from 'modules/topic/resources/topic.constant';
import { FactoryTopic } from 'modules/topic';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';
import { TopicSetting } from 'modules/topic/resources/topic.type';

const getTopiSetting = (): TopicSetting => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_TOPIC_SETTING);
  if (!jsonString) return DEFAULT_TOPIC_SETTING;
  return FactoryTopic.createTopiSetting(JSON.parse(jsonString));
};

const updateTopicSettingTopicMode = (topicMode: EnumTopicMode) => {
  const topiSetting = getTopiSetting();
  const jsonString = JSON.stringify({
    ...topiSetting,
    topicMode
  });
  localStorage.setItem(DT_LOCALSTORAGE_KEY_TOPIC_SETTING, jsonString);
};

const updateTopicSettingTopicMiddleItemMode = (topicMiddleItemMode: EnumTopicMiddleItemMode) => {
  const topiSetting = getTopiSetting();
  const jsonString = JSON.stringify({
    ...topiSetting,
    topicMiddleItemMode
  });
  localStorage.setItem(DT_LOCALSTORAGE_KEY_TOPIC_SETTING, jsonString);
};

const updateTopicSettingTopicDisabled = (topicID: string, disabled: boolean): string[] => {
  const topiSetting = getTopiSetting();
  const newTopicDisabled = [...topiSetting.topicDisabled];
  const index = newTopicDisabled.indexOf(topicID);
  const isExist = index > -1;

  if (disabled && !isExist) {
    newTopicDisabled.push(topicID);
  }

  if (!disabled && isExist) {
    newTopicDisabled.splice(index, 1);
  }
  
  const jsonString = JSON.stringify({
    ...topiSetting,
    topicDisabled: newTopicDisabled
  });
  localStorage.setItem(DT_LOCALSTORAGE_KEY_TOPIC_SETTING, jsonString);

  return newTopicDisabled;
};

const ResourceTopic = {
  getTopiSetting,
  updateTopicSettingTopicMode,
  updateTopicSettingTopicMiddleItemMode,
  updateTopicSettingTopicDisabled
};

export default ResourceTopic;