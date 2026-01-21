# PlumberPro Plumbing - Complete Website

Modern, colorful plumbing services website with dark/light theme toggle, RTL support, and multiple pages.

## Features

✅ **Multiple Pages**: 11 complete pages
✅ **2 Home Pages**: Different designs (Home1 & Home2)  
✅ **Dark/Light Theme**: Toggle anywhere on site
✅ **RTL Support**: Right-to-left layout toggle
✅ **Fully Responsive**: All screen sizes (mobile & desktop)
✅ **Modern UI**: Colorful gradients and animations
✅ **Dropdown Navigation**: Home & Dashboard dropdowns

## File Structure

```
Root/
├── index.html              # Home Page 1
├── home2.html              # Home Page 2 (Different Design)
├── about.html              # About Us
├── services.html           # Services Page
├── contact.html            # Contact Page
├── user-dashboard.html     # User Dashboard
├── admin-dashboard.html    # Admin Dashboard
├── login.html              # Login/Register Page
├── 404.html                # 404 Error Page
├── style.css               # All styles
├── main.js                 # Main JavaScript
├── rtltoggle.js            # RTL toggle logic
└── assets/                 # Images folder
```

## Quick Start

**Open any HTML file in browser:**
```cmd
start index.html
```

Or double-click any `.html` file.

## Pages Overview

| Page | Description |
|------|-------------|
| **index.html** | Home page with orange/yellow theme |
| **home2.html** | Alternative home with purple theme |
| **about.html** | Company story, team, values |
| **services.html** | All plumbing services |
| **contact.html** | Contact form & info |
| **user-dashboard.html** | Customer dashboard |
| **admin-dashboard.html** | Business admin panel |
| **login.html** | Login & register forms |
| **404.html** | Error page |

## Key Features

### Navigation
- **Home dropdown**: Home 1, Home 2
- **Dashboard dropdown**: User Dashboard, Admin Dashboard
- Works on mobile with hamburger menu

### Theme Toggle
- Click moon/sun icon to switch dark/light
- Preference saved in browser
- Works across all pages

### RTL Toggle
- Click RTL button to switch text direction
- Supports right-to-left languages
- Preference saved in browser

### Responsive Design
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- All layouts adapt perfectly

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, animations
- **JavaScript** - ES6+, no frameworks
- **Font Awesome 6.4** - Icons
- **Google Fonts** - Inter, Poppins

## Color Themes

**Home 1 (index.html):**
- Primary: Orange (#FF6B35)
- Secondary: Indigo (#6366f1)
- Accent: Yellow (#FFB627)

**Home 2 (home2.html):**
- Primary: Purple (#667eea)
- Secondary: Violet (#764ba2)

## Browser Support

✅ Chrome, Firefox, Safari, Edge
✅ Mobile browsers (iOS, Android)

## Customization

### Change Colors
Edit `style.css` at `:root`:
```css
:root {
  --primary: #FF6B35;
  --secondary: #6366f1;
  /* ... */
}
```

### Add Images
Place JPG images in `assets/` folder and reference in HTML:
```html
<img src="assets/image.jpg" alt="Description">
```

---

**Built with HTML5, CSS3, JavaScript**
