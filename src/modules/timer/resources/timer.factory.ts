import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import { ErrorCreateObjectByColumnEnum } from 'api/errors/errorCreateObjectByColumnEnum.class';
import ServiceFormat from 'services/format.service';
import { Timer } from 'modules/timer/resources/timer.type';
import { EnumTimerMode, IsEnumTimerMode } from 'modules/timer/enums/enumTimerMode';

const createTimer = (response: Timer): Timer => {
  const objectName = 'Timer';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  if (!IsEnumTimerMode(response['mode'])) {
    throw new ErrorCreateObjectByColumnEnum(
      objectName,
      'mode',
      response['mode'],
      Object.values(EnumTimerMode),
    );
  }

  return {
    id: ServiceFormat.toString(response['id']),
    mode: response['mode'],
    name: ServiceFormat.toString(response['name']),
    ring: ServiceFormat.toArray<number>(response['ring'])
  };
};

const createTimers = (response: Timer[]): Timer[] => {
  return ServiceFormat.toObjectArray<Timer>(response, createTimer);
};

const FactoryTimer = {
  createTimer,
  createTimers
};

export default FactoryTimer;
