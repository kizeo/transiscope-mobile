const getIcon = (config) => {
  try {
    const faName = config.icon.match(/fa-[a-z]*/g)[0]
    const icon = faName.replace('fa-', '')
    return icon
  } catch (error) {
    return undefined
  }
}
export default getIcon
