import UIkit from 'uikit'
export const handleError = (err: any, mesg: string) => {
  console.error(err)
  console.error(mesg)
  UIkit.notification(`Error: ${mesg}`, "danger")
}

export const getPageQuery = () : [number, number] => {
  let urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get("page");
  if (!page) {
    page = "1";
  }
  let pageSize = urlParams.get("page_size");
  if (!pageSize) {
    pageSize = "30";
  }
  return [Number(page), Number(pageSize)]
}
