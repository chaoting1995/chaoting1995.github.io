

import { ErrorCreateObjectByColumn } from "api/errors/errorCreateObjectByColumn.class";
import { ErrorCreateObjectByEmpty } from "api/errors/errorCreateObjectByEmpty.class";
import ServiceFormat from "services/format.service";

// 呼叫成功
export interface Response {
  success : true;
  data: any; // 回傳資訊
}

// 呼叫失敗
export interface Error {
  success: false;
  msg: string;
}

export type ResourceMeta = {
  currentPage: number;
  pageCount: number;
  pageTotal: number;
  total: number;
};

export type ResourcesWithMeta<ResourceType> = {
  data: Array<ResourceType>;
  meta: ResourceMeta;
};

export const DEFAULT_RESOURCE_META: ResourceMeta = {
  currentPage: 0,
  pageCount: 0,
  pageTotal: 0,
  total: 0
};

const createResourceMetaFromAPI = (apiResponse: any): ResourceMeta => {
  let objectName = "ResourceMeta";

  if (!apiResponse) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  let currentPage = ServiceFormat.toNumber(apiResponse["current_page"]);
  let pageCount = ServiceFormat.toNumber(apiResponse["per_page"]);
  let pageTotal = 0;
  let total = ServiceFormat.toNumber(apiResponse["total"]);

  if (total > 0) {
    pageTotal = Math.ceil(total / pageCount);
  }

  return {
    currentPage,
    pageCount,
    pageTotal,
    total
  };
};

const createResourcesWithMetaFromAPI = <ResourceType>(apiResponse: any, parser: (input: any) => ResourceType): ResourcesWithMeta<ResourceType> => {
  const objectName = "ResourcesWithMeta";

  if (!apiResponse) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  if (!apiResponse.data) {
    throw new ErrorCreateObjectByColumn(objectName, "data");
  }

  if (!apiResponse.meta) {
    throw new ErrorCreateObjectByColumn(objectName, "meta");
  }

  return {
    data: ServiceFormat.toObjectArray<ResourceType>(apiResponse.data, response => parser(response)),
    meta: createResourceMetaFromAPI(apiResponse.meta)
  };
};

export const FactoryAPI = {
  createResourceMetaFromAPI,
  createResourcesWithMetaFromAPI
};
