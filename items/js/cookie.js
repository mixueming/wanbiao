function setCookie(key, value, expires) {
  if (expires === undefined) {
    document.cookie = key + '=' + value
    return
  }
  const time = new Date()
  time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
  document.cookie = key + '=' + value + ';expires=' + time
}

function getCookie(key) {
  const obj = {}
  const tmp = document.cookie.split('; ')
  for (let i = 0; i < tmp.length; i++) {
    const t = tmp[i].split('=')
    obj[t[0]] = t[1]
  }
  if (key === undefined) {
    return obj
  } else {
    return obj[key]
  }
}

function delCookie(key) {
  setCookie(key, '', -1)
}
