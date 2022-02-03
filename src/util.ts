import UIkit from 'uikit'
export const handleError = (err: any, mesg: string) => {
  console.error(err)
  console.error(mesg)
  UIkit.notification(`Error: ${mesg}`, "danger")
}
