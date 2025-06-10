# 🛍️ Labubu Auto-Purchase Bot

## 📖 Overview
This project is a **Puppeteer-based automation bot** designed to monitor, detect, and auto-interact with product pages (specifically Pop Mart Labubu products). The goal is to eventually build a full auto-checkout bot that:

- Detects when a product is **in stock**
- Clicks "Accept Terms"
- Clicks "Add to Bag"
- Prepares for **checkout**
- Optionally performs **automatic checkout**

All interactions are logged and stored in a local **SQLite database** for debugging and historical tracking.

---

## 🎯 Primary Goal
> Automatically detect and click through "Accept Terms" and "Add to Bag" for Labubu Pop Mart product drops — and prepare for checkout instantly.

---

## ✅ Features Implemented
- [x] Puppeteer bot to load product page
- [x] Click "Accept Terms" if present
- [x] Click "Add to Bag" (using full class selector)
- [x] Store logs in SQLite (`stock_logs` table)
- [x] Retry logic and status updates every X seconds
- [x] Accepts configuration via `.env`
- [x] Error handling with screenshots and HTML dumps

---

## 🧠 Planned Features
- [ ] Auto-select product options (e.g. quantity or size)
- [ ] Automatically proceed to checkout screen
- [ ] Auto-login with cookies/session
- [ ] Full checkout with saved credentials
- [ ] Notification system (email/discord/SMS on in-stock)
- [ ] Browser preview toggle (headless/headful)

---

## 🐛 Bugs & Issues Encountered
| Issue                             | Resolution                                         |
|----------------------------------|----------------------------------------------------|
| `page.$x is not a function`      | Rewrote selectors using `page.$` and CSS only     |
| Puppeteer timeout on page.goto   | Increased timeout & set `waitUntil: 'domcontentloaded'` |
| Button click fails silently      | Switched from innerText matching to full class selector |
| Database column errors (`checked_at`) | Added conditional column check & migration logic |
| SQLiteStudio panel missing       | Restored using `View > Panels` menu               |

---

## 🗃️ Database: `dev.sqlite3`
Table: `stock_logs`

| Column      | Type       | Description                     |
|-------------|------------|---------------------------------|
| id          | INTEGER PK | Auto-increment primary key      |
| status      | STRING     | `in_stock`, `sold_out`, `error` |
| message     | TEXT       | Description of bot action       |
| http_status | INTEGER    | HTTP response code              |
| checked_at  | TIMESTAMP  | Time of interaction             |

---

## 📁 Project Structure
```bash
.
├── actions/
│   ├── acceptTerms.js
│   └── addToBag.js
├── db/
│   ├── db.js
│   └── initDb.js
├── .env
├── dev.sqlite3
├── index.js
├── README.md
