"use strict";(self.webpackChunk_coderbyheart_coderbyheart_com=self.webpackChunk_coderbyheart_coderbyheart_com||[]).push([[277,888],{1423:function(e,t,r){r.r(t);var a=r(7492),n=r(7294),i=r(3011),l=r(1039),c=r(9863);const s=e=>{let{tweets:t}=e;return n.createElement(c.Ul,null,t.map((e=>{let{id:t,created_at:r,full_text:i}=e;return n.createElement(c.Li,{key:t},n.createElement(c.Link,{href:"/twitter/status/"+t,title:"Twitter status "+t+" from "+(0,a.Z)(new Date(r),"d. MMMM yyyy")},i))})))};t.default=e=>{let{data:t,pageContext:r}=e;const c=(0,a.Z)(new Date(r.month+"-02T00:00:00Z"),"MMMM yyyy"),m=r.month.slice(0,4),o="My Twitter archive of "+c,u="In "+c+" I've tweeted "+r.status.length+" times";return n.createElement(l.Z,{siteMetadata:t.site.siteMetadata,Footer:r.Footer,description:u,lang:"en",title:o,mainClass:"twitter-archive"},n.createElement("article",null,n.createElement(i.D,{title:o,subtitle:u,date:"2022-10-28T00:00:00Z"}),n.createElement("p",null,"In October 2022 ",n.createElement("a",{href:"/leaving-twitter"},"I left Twitter"),". This is my tweet archive for ",c,"."),n.createElement("h2",null,"Tweets"),n.createElement(s,{tweets:r.status}),n.createElement("nav",null,n.createElement("a",{href:"/twitter/archive"},"Twitter Archive")," ·"," ",n.createElement("a",{href:"/twitter/archive/"+m},m))))}},9863:function(e,t,r){r.r(t),r.d(t,{Li:function(){return m},Link:function(){return h},Ul:function(){return s}});var a=r(7492),n=r(7294),i=r(6726),l=r(3011),c=r(1039);const s=i.default.ul.withConfig({displayName:"twitter-archive__Ul",componentId:"sc-usyyb-0"})(["padding-left:1rem;"]),m=i.default.li.withConfig({displayName:"twitter-archive__Li",componentId:"sc-usyyb-1"})(["margin-bottom:0.25rem;display:flex;align-items:center;svg{height:16px;width:16px;margin-right:0.5rem;flex-shrink:0;}"]),o=(0,i.default)(m).withConfig({displayName:"twitter-archive__Star",componentId:"sc-usyyb-2"})(["list-style-type:none;&:before{content:'⭐';padding-right:0.25rem;}"]),u=i.default.span.withConfig({displayName:"twitter-archive__RetweetCount",componentId:"sc-usyyb-3"})(["margin-right:0.5rem;"]),h=i.default.a.withConfig({displayName:"twitter-archive__Link",componentId:"sc-usyyb-4"})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]),w=e=>{let{tweets:t,minStars:r}=e;return n.createElement(n.Fragment,null,n.createElement("h2",null,"The ",t.length," most popular Tweets"),n.createElement("p",null,"These tweets have received ",r," or more likes."),n.createElement(s,null,t.map((e=>{let{id:t,favorite_count:r,created_at:i,full_text:l}=e;return n.createElement(o,{key:t},n.createElement(u,null,r),n.createElement(h,{href:"/twitter/status/"+t,title:"Twitter status "+t+" from "+(0,a.Z)(new Date(i),"d. MMMM yyyy")},l))}))))},d=e=>{let{years:t}=e;return n.createElement(s,null,Object.entries(t).map((e=>{let[t,r]=e;return n.createElement(m,{key:t},n.createElement("a",{href:"/twitter/archive/"+t,title:"Tweets in the year "+t},t,": ",r," Tweets"))})))};t.default=e=>{let{data:t,pageContext:r}=e;const a="My entire Twitter timeline of "+r.numTweets+" tweets, archived";return n.createElement(c.Z,{siteMetadata:t.site.siteMetadata,Footer:r.Footer,description:a,lang:"en",title:"Twitter archive",mainClass:"twitter-archive"},n.createElement("article",null,n.createElement(l.D,{title:"Twitter archive",subtitle:a,date:"2022-10-28T00:00:00Z"}),n.createElement("p",null,"In October 2022 ",n.createElement("a",{href:"/leaving-twitter"},"I left Twitter"),". This is my entire tweet archive (excluding retweets)."),n.createElement(w,{tweets:r.popularTweets,minStars:r.minStars}),n.createElement("h2",null,"Tweets by year"),n.createElement(d,{years:r.years})))}}}]);
//# sourceMappingURL=component---src-page-twitter-archive-year-month-tsx-66933804ada4360d5f7b.js.map