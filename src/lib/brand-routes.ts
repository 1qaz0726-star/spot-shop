/** 品牌官網頁（非商城），頂部不顯示購物車／訂單／登入名稱 */
export function isDesktopBrandPage(pathname: string) {
  return pathname === "/" || pathname === "/about";
}

export function isMobileBrandPage(pathname: string) {
  return pathname === "/m" || pathname === "/m/about";
}
