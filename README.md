# RoomPlanned page examples

**▶ Open the preview: https://thomas-bailey-9.github.io/roomplanned-pages/**

The preview opens on the landing page (`index.html`). From there every page is one click away, and all pages link to each other.

Design examples for new pages on roomplanned.com. Each one matches the live site's style so it follows on from the homepage.

| Page | File | What it shows |
| --- | --- | --- |
| Home (landing) | [`index.html`](index.html) | The front door, matching the live homepage hero, with Discover furniture, a three-step How it works, cards for every page and a Roo section. |
| Plan with Roo | [`roo.html`](roo.html) | Opened from "Plan with Roo" on the landing page. Roo asks five questions (room, size, pieces, budget, style) while a floor plan builds live beside the chat, then lays out the room, keeps it on budget and checks gaps, the door and walkways. Finish by opening it in the planner, saving the pieces to My Home or rendering it. |
| Shop furniture | [`shop.html`](shop.html) | Search, category chips, filters (retailer, price, colour, room), sorting, product pages, Roo's "Will it fit?" check and a basket that splits checkout by retailer. |
| Plan a room | [`plan.html`](plan.html) | Top-down floor plan with real cm measurements. Drag, rotate and add pieces, set the room size, and Roo checks clashes, the door swing, walkway widths and free floor space. Includes a shopping list for the room. |
| Inspiration | [`inspiration.html`](inspiration.html) | A bolder page: animated hero, six styles that retint the page, a featured room with tappable "shop the look" hotspots and colour palette, a before/after slider, a masonry gallery with likes and a pop-up room view, a scrolling style banner and a community call to action. Rooms are drawn in code so every one can be restyled. |
| Community preview | [`community.html`](community.html) | A coming-soon preview of the community: waitlist sign-up, a feed of room posts with real sizes and costs, likes, saves, comments and follows, topic filters (Small spaces, Under £1,000, Rentals…), a "Share your room" composer that previews your post, a weekly challenge with a live countdown, a top-planners board and community Q&A with Roo's answers. |
| My Home | [`my-home.html`](my-home.html) | Brings together what you save on the other pages: your room plans as mini floor plans with Roo's checks, a budget tracker split by room, saved furniture and basket, rooms you liked and posts you saved, people you follow, and a suggested next step. Sections show example data, marked "Example", until you save something. |
| My Renders | [`my-renders.html`](my-renders.html) | A render studio for your planned rooms: pick a room, one of six styles, the light (morning, golden hour, evening) and a format, see a live preview, then create a render with a progress animation. Renders use the colours of the pieces in your plan and are saved to a gallery with favourites, filters, delete and a pop-up that switches between the render and its floor plan. |
| Account | [`account.html`](account.html) | Profile with a live preview of how you appear in Community, home details (home type, rent or own, UK postcode check, narrowest doorway and floor, with Roo listing pieces that won't fit through), preferences (cm or inches, budget and default style shared with the other pages), notification switches, and a privacy section listing everything saved in the browser with per-item and clear-all controls. |

Products, prices and some retailers are sample data. Product images are simple drawings standing in for retailer photos.

Open any file in a browser to view it. No build step needed.

The pages link to each other: "Add to room" in the shop opens `plan.html` with that piece placed in the right room. Everything you save (shop bookmarks, basket, room plans, liked rooms, community saves and follows) is stored in your browser and shows up on `my-home.html`.

## Pages

Home → Shop → Plan a room → Inspiration → Community preview → My Home → My Renders → Account. Every page's menu links to the others.

## Products and photos

All products, product photos and product drawings live in one file, [`catalogue.js`](catalogue.js). Every page that shows furniture reads from it, so a change there appears everywhere.

To add a photo, add a line to `PHOTOS` in `catalogue.js`:

```js
'rhianna-sofa':'https://link-to-the-photo.jpg',
```

That piece then shows the photo instead of its drawing. If a photo link stops working, the drawing comes back automatically. Never change an existing product `id`: ids are stored in visitors' browsers for saved pieces, baskets and room plans. Only use photos you have permission to show, such as images supplied through a retailer's affiliate or product feed.
