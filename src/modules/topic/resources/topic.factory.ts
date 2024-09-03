import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import { ErrorCreateObjectByColumnEnum } from 'api/errors/errorCreateObjectByColumnEnum.class';
import ServiceFormat from 'services/format.service';
import { TopicSetting } from 'modules/topic/resources/topic.type';
import { EnumTopicMode, IsEnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode, IsEnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';

const createTopiSetting = (response: TopicSetting): TopicSetting => {
  const objectName = 'TopicSetting';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  if (!IsEnumTopicMode(response['topicMode'])) {
    throw new ErrorCreateObjectByColumnEnum(
      objectName,
      'topicMode',
      response['topicMode'],
      Object.values(EnumTopicMode),
    );
  }

  if (!IsEnumTopicMiddleItemMode(response['topicMiddleItemMode'])) {
    throw new ErrorCreateObjectByColumnEnum(
      objectName,
      'topicMiddleItemMode',
      response['topicMiddleItemMode'],
      Object.values(EnumTopicMiddleItemMode),
    );
  }

  return {
    topicMode: response['topicMode'],
    topicMiddleItemMode: response['topicMiddleItemMode'],
    topicDisabled: ServiceFormat.toArray<string>(response['topicDisabled'])
  };
};

const FactoryTopic = {
  createTopiSetting,
};

export default FactoryTopic;
