# RoomPlanned page examples

Design examples for new pages on roomplanned.com. Each one matches the live site's style so it follows on from the homepage.

| Page | File | What it shows |
| --- | --- | --- |
| Shop furniture | [`shop.html`](shop.html) | Search, category chips, filters (retailer, price, colour, room), sorting, product pages, Roo's "Will it fit?" check and a basket that splits checkout by retailer. |
| Plan a room | [`plan.html`](plan.html) | Top-down floor plan with real cm measurements. Drag, rotate and add pieces, set the room size, and Roo checks clashes, the door swing, walkway widths and free floor space. Includes a shopping list for the room. |
| Inspiration | [`inspiration.html`](inspiration.html) | A bolder page: animated hero, six styles that retint the page, a featured room with tappable "shop the look" hotspots and colour palette, a before/after slider, a masonry gallery with likes and a pop-up room view, a scrolling style banner and a community call to action. Rooms are drawn in code so every one can be restyled. |
| Community preview | [`community.html`](community.html) | A coming-soon preview of the community: waitlist sign-up, a feed of room posts with real sizes and costs, likes, saves, comments and follows, topic filters (Small spaces, Under £1,000, Rentals…), a "Share your room" composer that previews your post, a weekly challenge with a live countdown, a top-planners board and community Q&A with Roo's answers. |
| My Home | [`my-home.html`](my-home.html) | Brings together what you save on the other pages: your room plans as mini floor plans with Roo's checks, a budget tracker split by room, saved furniture and basket, rooms you liked and posts you saved, people you follow, and a suggested next step. Sections show example data, marked "Example", until you save something. |

Products, prices and some retailers are sample data. Product images are simple drawings standing in for retailer photos.

Open any file in a browser to view it. No build step needed.

The pages link to each other: "Add to room" in the shop opens `plan.html` with that piece placed in the right room. Everything you save (shop bookmarks, basket, room plans, liked rooms, community saves and follows) is stored in your browser and shows up on `my-home.html`.
