# FERAL Wear — Competitive Commerce Case Study

Research date: 18 July 2026. This document records the durable product principles used in the FERAL Wear build; it is not a visual copying brief.

## Stores reviewed

- [Gymshark — Men's Gym & Workout Clothes](https://www.gymshark.com/pages/shop-men?page=1)
- [Gymshark — Men's Best Sellers](https://eu.gymshark.com/collections/must-have/mens)
- [Nike — Men's Training & Gym Bottoms](https://www.nike.com/gb/w/mens-training-gym-bottoms-58jtoz5hnnkznik1)
- [Under Armour — Men's Training Shorts](https://www.underarmour.com/en-us/c/mens/training-clothing-shorts/)
- [Under Armour — Men's Training Pants](https://www.underarmour.com/en-us/c/mens/training-clothing-pants/)
- [Myprotein — Nutrition Range](https://us.myprotein.com/c/nutrition/)
- [Myprotein — Nutrition Guides](https://us.myprotein.com/thezone/nutrition/)
- [HOTSUIT — Sauna Suit Collection](https://www.hotsuit.com/collections/all-saunasuit)

## Recurring hierarchy

1. A narrow promotional strip establishes delivery or campaign urgency.
2. The primary navigation starts with audience/category, then activity or collection.
3. The first commercial viewport contains a strong campaign plus one decisive action.
4. Category landing pages expose best sellers and clear activity-based entry points.
5. Product listings keep cards quiet while filters do the heavy discovery work.
6. Product pages prioritise image, product name, price, option selection, add-to-bag, fit/material, delivery, and returns.
7. Education and editorial content reconnect to relevant products instead of living in a detached blog.
8. Trust information appears near decision points rather than only in the footer.

## Useful patterns adopted

- Gymshark: filters for size, feature, fit and activity; clear shorts/joggers/top hierarchy.
- Nike: sport/activity-led discovery and concise technical product language.
- Under Armour: practical feature filters such as moisture-wicking, fast-drying, water resistance and inseam length.
- Myprotein: goal-based nutrition education, label literacy and content-to-product pathways.
- HOTSUIT: a dedicated sauna system, category education and use-case grouping.

## Deliberately not adopted

- Constant sale pressure, false scarcity or pre-selected paid add-ons.
- Unsupported calorie-burn, fat-loss or medical claims.
- Proprietary supplement blends without transparent labels.
- Dark patterns that hide delivery cost or make basket removal difficult.
- Visual imitation of competitor logos, colours or campaign layouts.

## FERAL implementation decisions

- Original FERAL logo remains unchanged in headers, footers and icons.
- Supporting type is condensed, tall and angular to echo—not redraw—the logo lettering.
- Black, bone white and acid lime remain the core palette.
- Global routes: Home, Shop, Sauna, Nutrition, Product, Bag and Checkout.
- Shop discovery: search, category, activity and price sorting.
- Product decisions: size/format selection, material/features, returns and responsible-use guidance.
- Local persistent bag across routes, quantity controls and transparent delivery threshold.
- Checkout deliberately avoids card data until a real hosted payment provider is approved.
- Nutrition remains food-first, label-aware and clearly separated from medical advice.
- Sauna content explicitly distinguishes sweating/fluid loss from permanent fat loss and includes hydration/stop-use warnings.

## Production prerequisites still required

- Approved SKU catalogue, inventory, size charts and original product photography.
- Approved ingredient panels, allergen disclosures, batch/testing records and local regulatory review.
- Final shipping, tax, returns, privacy, terms and cookie policies.
- Payment-provider merchant account and hosted checkout credentials.
- Courier/fulfilment integration and transactional email provider.
- Qualified reviewer for nutrition and heat-training content.
- Fraud controls, rate limiting, monitoring, backups and incident-response ownership.
