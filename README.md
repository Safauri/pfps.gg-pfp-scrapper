# pfps.gg Pfp Scraper

This Node.js script automates the process of downloading profile pictures from [pfps.gg](https://pfps.gg)
---

## Features

- Scrapes images from multiple paginated pages.
- Filters common image formats: PNG, JPEG, GIF, and WebP.
- Organizes images into folders based on file type.
- Prevents redundant downloads.
- Logs progress and errors cleanly.


Each folder contains the downloaded images based on detected file extension.

---

## Usage

1. **Install dependencies:**

   ```bash
   npm install axios cheerio
   ```

2. **Run the script:**

   ```bash
   node scrape.js
   ```

3. **Images will be saved in the `downloads_by_type/` directory.**

---

## How It Works

- Iteratively loads pages from `pfps.gg`.
- Scrapes `img` tags and filters for valid image URLs.
- Determines file type from extension and saves to matching folder.
- Uses streaming for efficient downloads.

---

## Credits

Original code authored by [Yuki](https://github.com/simplyangelic)

---
