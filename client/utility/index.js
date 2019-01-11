export function getData (strPath) {
  const sendPath = strPath
  return this.axios.get(sendPath)
}
