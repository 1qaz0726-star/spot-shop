/** 手機版品牌頁：不顯示底部 Tab、右上角「我」 */
export function isMobileBrandPage(pathname: string) {
  return pathname === "/m" || pathname === "/m/about";
}
