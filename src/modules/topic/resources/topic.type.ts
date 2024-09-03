import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';

export type Topic = {
  id: string;
  name: string;
  category: string;
}

export type TopicSetting = {
  topicMode: EnumTopicMode;
  topicMiddleItemMode: EnumTopicMiddleItemMode;
  topicDisabled: string[];
};
