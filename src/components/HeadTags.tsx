import React from 'react';
import { Helmet } from 'react-helmet-async';

export type Props = {
  children?: JSX.Element;
  title?: string;
  titleWithPrefixBrand?: string;
  description?: string;
  favicon?: string;
  hubURL?: string;
  image?: string;
};

const HeadTags = (props: Props) => {

  return (
    <Helmet prioritizeSeoTags>
      <title>{props.title}</title>
      {props.description && <meta name='description' content={props.description} />}
      <meta property='og:type' content='website' />
      {props.title && <meta property='og:title' content={props.title} />}
      {props.description && <meta property='og:description' content={props.description} />}
      {props.hubURL && <meta property='og:url' content={props.hubURL} />}
      {props.image && <meta property='og:image' content={props.image} />}
      {props.favicon && <link rel='icon' href={props.favicon} />}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@DefiDolly' />
      {props.title && <meta name='twitter:title' content={props.title} />}
      {props.description && <meta name='twitter:description' content={props.description} />}
      {props.image && <meta name='twitter:image' content={props.image} />}
      {props.children}
    </Helmet >
  );
};

export default HeadTags;