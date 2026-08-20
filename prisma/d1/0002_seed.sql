-- Demo accounts + 3 products (password: demo123)
INSERT INTO "User" ("id", "email", "password", "name", "role", "phone", "createdAt", "updatedAt") VALUES
  ('seller-demo', 'seller@demo.com', '$2b$10$PHEB71tv5uKE/5abdj9GY..tNML8C3R6Emav3/50vDTPvaXVY6HZK', '示範賣家', 'SELLER', '0912345678', '2026-08-20T00:00:00.000Z', '2026-08-20T00:00:00.000Z'),
  ('buyer-demo', 'buyer@demo.com', '$2b$10$PHEB71tv5uKE/5abdj9GY..tNML8C3R6Emav3/50vDTPvaXVY6HZK', '示範買家', 'BUYER', '0987654321', '2026-08-20T00:00:00.000Z', '2026-08-20T00:00:00.000Z');

INSERT INTO "Address" ("id", "userId", "label", "recipient", "phone", "city", "district", "street", "zipCode", "isDefault") VALUES
  ('addr-buyer-home', 'buyer-demo', '住家', '示範買家', '0987654321', '台北市', '信義區', '信義路五段7號', NULL, 1);

INSERT INTO "Product" ("id", "slug", "name", "description", "price", "stock", "status", "category", "sellerId", "createdAt", "updatedAt") VALUES
  ('prod-earbuds', 'wireless-earbuds-pro', '無線藍牙耳機 Pro', '主動降噪、30 小時續航、IPX5 防水。附充電盒與三組耳塞，適合通勤與運動。現貨供應，下單後 1–2 個工作日出貨。', 2490, 120, 'ACTIVE', '3C 配件', 'seller-demo', '2026-08-20T00:00:00.000Z', '2026-08-20T00:00:00.000Z'),
  ('prod-tee', 'organic-cotton-tee', '有機棉素色 T 恤', '100% 有機棉，透氣舒適。多色可選，版型略寬鬆。建議手洗或放入洗衣袋低溫烘乾。', 680, 200, 'ACTIVE', '服飾', 'seller-demo', '2026-08-20T00:00:00.000Z', '2026-08-20T00:00:00.000Z'),
  ('prod-bottle', 'stainless-water-bottle', '雙層不鏽鋼保溫瓶 500ml', '保冷 24 小時、保溫 12 小時。食品級不鏽鋼內膽，附防滑杯套。', 890, 85, 'ACTIVE', '居家生活', 'seller-demo', '2026-08-20T00:00:00.000Z', '2026-08-20T00:00:00.000Z');

INSERT INTO "ProductImage" ("id", "url", "alt", "sortOrder", "productId") VALUES
  ('img-earbuds-1', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', '無線藍牙耳機 Pro', 0, 'prod-earbuds'),
  ('img-earbuds-2', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800', '無線藍牙耳機 Pro', 1, 'prod-earbuds'),
  ('img-tee-1', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', '有機棉素色 T 恤', 0, 'prod-tee'),
  ('img-bottle-1', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', '雙層不鏽鋼保溫瓶 500ml', 0, 'prod-bottle');
