import React from "react";
import { Helmet } from "react-helmet";
import ServiceFormat from "services/format.service";

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
  const titleWithPrefixBrand = `${props.title} | ${ServiceFormat.toString(props.titleWithPrefixBrand)}`;

  return (
    <Helmet>
      {props.title && <title>{!props.titleWithPrefixBrand ? props.title : titleWithPrefixBrand}</title>}
      {props.description && <meta name="description" content={props.description} />}

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      {props.title && <meta property="og:title" content={!props.titleWithPrefixBrand ? props.title : titleWithPrefixBrand} />}
      {props.description && <meta property="og:description" content={props.description} />}
      {props.hubURL && <meta property="og:url" content={props.hubURL} />}
      {props.image && <meta property="og:image" content={props.image} />}

      {props.favicon && <link rel="icon" href={props.favicon} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DefiDolly" />
      {props.title && <meta name="twitter:title" content={!props.titleWithPrefixBrand ? props.title : titleWithPrefixBrand} />}
      {props.description && <meta name="twitter:description" content={props.description} />}
      {props.image && <meta name="twitter:image" content={props.image} />}
      {props.children}
    </Helmet >
  );
};

export default HeadTags;