// string hashcode 
// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0

export const hashCode = function(s:string) {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  };


export  const omit = (obj:any, uselessKeys:any) =>
uselessKeys.reduce((acc:any, key:any) => {
  return {...acc, [key]: undefined}
}, obj)


// 判断设备来源
