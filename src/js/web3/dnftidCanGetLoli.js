function dnftidCanGetLoli(dnftid) {
  const dnftidsHaveLoli = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; //暂定5-14号dnft可以获取loli
  return dnftidsHaveLoli.some((id) => id == dnftid);
}
