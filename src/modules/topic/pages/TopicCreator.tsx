import React from 'react'
import { css, cx } from '@emotion/css';

import Layout from 'layouts/Layout';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import useInnerHeight from 'hooks/useInnerHeight';
import HeadTags from 'components/HeadTags';
import { PAGE_TITLE } from 'routes/constants';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import TopicModeComplete from 'modules/topic/components/TopicModeComplete';
import TopicModeCombined from 'modules/topic/components/TopicModeCombined';
import useTopicMode from 'modules/topic/context/TopicMode/useTopicMode';

const TopicCreator: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { topicMode } = useTopicMode();

  const topicCreator: Record<EnumTopicMode, React.ReactNode> = {
    [EnumTopicMode.Complete]: <TopicModeComplete className='topic-mode' />,
    [EnumTopicMode.Combined]: <TopicModeCombined className='topic-mode' />
  }

  return <Layout title={PAGE_TITLE.topicCreator} mainClassName={cx('DT-TopicCreator', style(innerHeight))}>
    <HeadTags title={PAGE_TITLE.topicCreator} description='「瓦力2號」，又名「瓦力二號」、「瓦力2號2011」，是哲耀學長發明的紙牌遊戲，用於辯論的鍛鍊。玩家可以在隨機配對的辯題中，大量練習不同的辯題。' />
    {topicCreator[topicMode]}
  </Layout>;
}

export default TopicCreator;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.primary};

  .topic-mode {
    padding: 20px 0;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;