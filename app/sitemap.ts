import type {MetadataRoute} from "next";
const routes=["","/shop","/product","/men","/women","/kids","/accessories","/sauna","/nutrition","/feral-code","/policies/order-payment"];
export default function sitemap():MetadataRoute.Sitemap{const lastModified=new Date();return routes.map(path=>({url:`https://www.feralwearsports.com${path}`,lastModified,changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:.7}))}
