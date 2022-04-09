import UIkit from 'uikit'
import type { ApiOptions } from "@utils/api"
import { apiOptions } from "@utils/store"
export const handleError = (err: any, mesg: string) => {
  console.error(err)
  console.error(mesg)
  UIkit.notification(`Error: ${mesg}`, "danger")
}

export const getPageQuery = () => {
  const options: ApiOptions = {
    page: undefined,
    pageSize: undefined,
    search: undefined,
    correctRate: {
      start: undefined,
      end: undefined,
    },
    tags: undefined,
    order: undefined,
    lastPlayed: {
      start: undefined,
      end: undefined,
    },
  }

  let params = new URLSearchParams(window.location.search);
  if (params.has("page")) options.page = Number(params.get("page"));
  else options.page = 1;
  if (params.has("page")) options.page = Number(params.get("page"));
  else options.pageSize = 30;
  if (params.has("page_size")) options.pageSize = Number(params.get("page_size"));
  if (params.has("search")) options.search = params.get("search");
  if (params.has("correct_rate_start")) options.correctRate.start = Number(params.get("correctRate"));
  if (params.has("correct_rate_end")) options.correctRate.end = Number(params.get("correct_rate_end"));
  if (params.has("tags")) {
    options.tags = []
    for (const tag of params.getAll("tags")) {
      options.tags.push(tag)
    }
  }
  if (params.has("order")) options.order = params.get("order");
  if (params.has("last_played_start")) options.lastPlayed.start = new Date(params.get("last_played_start"));
  if (params.has("last_played_end")) options.lastPlayed.end = new Date(params.get("last_played_end"));
  apiOptions.set(options);
}
