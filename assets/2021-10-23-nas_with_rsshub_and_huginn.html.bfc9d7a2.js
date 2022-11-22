import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as p,a as n,b as s,d as t,e as a,r}from"./app.72faf35a.js";const i={},c=a('<p>作为重度 RSS 用户，90% 的讯息来自 rss。RSSHub 生成主流媒体 rss，Huginn 定制个性化 rss，TinyTinyRSS 过滤 rss，这帮我<strong>从 3 小时的阅读时间节省到只需 1 小时</strong>。</p><p>这些服务原本托管在 1 核 1G 的低配服务器上，不过配置过低，频繁重启，维护成本持续上升。接着尝试了国外 2 核 4G 的低端服务器，超售严重，性能极度不稳定。买国外的低端服务器 (特别是<strong>俄罗斯服务器</strong>)，就是把钱丢水里了。</p><p>比起花钱升级和不靠谱的国外 VPS，NAS 成为一个高性价比的选择。当然，面临的问题并不少，我们一步步去解决。</p><h2 id="事前准备" tabindex="-1"><a class="header-anchor" href="#事前准备" aria-hidden="true">#</a> 事前准备</h2><ul><li>NAS</li><li>域名 (子域名既可)</li><li>带动态 DNS 的路由器 (推荐 openwrt 软路由)</li></ul><h2 id="docker-镜像安装" tabindex="-1"><a class="header-anchor" href="#docker-镜像安装" aria-hidden="true">#</a> Docker 镜像安装</h2><ol><li><p>NAS 管理后台－套件中心－搜索并安装「Docker」，然后在 Docker 容器中安装所需服务。</p></li><li><p>Docker－注册表，搜索对应镜像，选中最高星的项目，点击下载。</p><p><img src="http://tc.seoipo.com/2022-05-05-14-40-43.png" alt="" loading="lazy"></p></li><li><p>镜像下载完成后，进入「映像」，选中刚下载好的镜像，点击启动。</p><p><img src="http://tc.seoipo.com/2022-05-05-14-41-01.png" alt="" loading="lazy"></p></li><li><p>高级设置－端口设置，将本地端口从自动改为一个固定的端口，方便后期做端口映射。避免 NAS 重启后，本地端口发生变化。</p><p><img src="http://tc.seoipo.com/2022-05-05-14-41-15.png" alt="" loading="lazy"></p></li></ol><h2 id="域名绑定" tabindex="-1"><a class="header-anchor" href="#域名绑定" aria-hidden="true">#</a> 域名绑定</h2>',8),u=n("li",null,[n("p",null,[n("strong",null,"关闭光猫路由"),s("：电话联系宽带运营商，要求关闭光猫的路由功能。少数运营商默认不提供公网 IP，也可以在这环节，让运营商给你分配公网 IP。碰到死板的客服，会找你开通理由，不要正面回答。")])],-1),d=n("li",null,[n("p",null,"家用宽带多为动态 ip，且无对外 80 接口。使用动态 DNS 插件，可让域名时刻绑定家用宽带 ip，达到固定链接打开 NAS 服务。")],-1),h=n("p",null,[n("strong",null,"动态 DNS(DDNS) 设置"),s("，以下以 openwrt+cloudflare 为例。")],-1),_={href:"https://p3terx.com/archives/openwrt-cloudflare-ddns.html",target:"_blank",rel:"noopener noreferrer"},S={href:"https://dash.cloudflare.com/profile/api-tokens",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,[n("img",{src:"http://tc.seoipo.com/2022-05-05-14-41-31.png",alt:"",loading:"lazy"})],-1),k=n("li",null,[n("p",null,"如果没有宽带为内网，不能提供公网 ip，可借助花生壳等内网穿透工具达到类似效果。")],-1),m=a(`<h2 id="rss-转码" tabindex="-1"><a class="header-anchor" href="#rss-转码" aria-hidden="true">#</a> RSS 转码</h2><p>运营商禁用了家用宽带的 80 和 443 端口。这导致 NAS 的服务链接无法隐藏端口，如 <code>home.xxx.com:34567</code>。同时，主流 RSS 阅读器大多不支持配置端口链接，这导致在<strong>NAS 上部署的 rss 源无法直接被读取</strong>。特别是我常用的 Tiny Tiny RSS，订阅 NAS rss 源的 bug 超多，无法获取带端口的 rss 链接，也无法获取使用 https 的 rss 源。</p><p>为了顺利获取 NAS 的 rss 源，我用 php 做了条转录链接，参考样例：<code>http://xxx.com/rss.php?type=yyy</code>。这个 php 文件聚合了所有的 rss 源，用链接参数作区分。虽然 php 转录需要部署在另一台服务器，但比起节省高配服务器的费用，还是值得的。对了，php 转录链接不吃配置，如果你已经有了一台，可以像我一样直接部署在工作服务器上。</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>## 网站目录新建 rss.php 文件，然后放入如下代码
## yyy 为链接参数，方便区分不同 rss 源，qqq 为内部 rss 源路径
## 注意：如果链接参数 yyy 中有中文，可用 UrlEncode 编码，避免 rss 阅读器报错。
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token punctuation">]</span><span class="token operator">==</span><span class="token string double-quoted-string">&quot;yyy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;http://home.xxx.com:34567/qqq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">elseif</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token punctuation">]</span><span class="token operator">==</span><span class="token string double-quoted-string">&quot;zzz&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;http://home.xxx.com:34567/wwww&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有服务器，也不愿继续折腾，可以试试其他阅读器。测试 theoldreader 直接获取带端口的 rss 源。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>NAS 替代服务器后，Huginn 不再定期崩溃，抓取也不再卡壳，也不需要总惦记给服务器续费。硬件配置也从 1 核 1G 跃升到 4 核 8G，这套流程跑了一年，基本没 bug，可以放心使用。</p><p>这篇也是 RSS 系列的完结篇，从 2017 年 4 月的《RSS 入门篇：FEED43&amp;FeedEx-为静态网页定制 RSS 源》开始，零零散散地写了 4 年半，终于把坑都填起来了。</p><p>RSS 系列的初衷是，2017 年算法推送的愈加泛滥，定制化 rss 变成刚需，想着把定制化 rss 过程中的所得记录下来。没想到文章发布后收到很多人的支持，发觉并不是 rss 在没落，而是缺少 rss 的布道者。如果你也对 rss 感兴趣，希望也可以记录自己平常的疑问和所得。这会帮助你更好的整理知识，也能帮助越来越多的人了解 rss，掌握这项高效的信息获取方式。</p><p>我坚信<strong>rss 是最适合普通人的信息获取方式</strong>，这可能有些反潮流，但这就是我内心的想法。</p><h2 id="rss-合集" tabindex="-1"><a class="header-anchor" href="#rss-合集" aria-hidden="true">#</a> RSS 合集</h2><p>汇总的 RSS 永久订阅 feeds，均通过 RSSHub 和 Huginn 制作。如果有兴趣自制 RSS，可参考以下教程。</p>`,12),b={href:"https://newzone.top/_posts/2017-04-22-rss_feed43_feedex.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://newzone.top/_posts/2018-10-07-huginn_scraping_any_website.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://newzone.top/_posts/2019-04-01-rsshub_noob.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://newzone.top/_posts/2020-03-25-rsshub_on_vps.html",target:"_blank",rel:"noopener noreferrer"},x={href:"https://newzone.top/_posts/2021-10-23-nas_with_rsshub_and_huginn.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://newzone.top/_posts/2022-03-17-rss_persistent_link_collection.html",target:"_blank",rel:"noopener noreferrer"};function N(w,q){const e=r("ExternalLinkIcon");return l(),p("div",null,[c,n("ol",null,[u,d,n("li",null,[h,n("ul",null,[n("li",null,[n("p",null,[s("cloudflare 动态 DNS 配置 ("),n("a",_,[s("教程"),t(e)]),s(")：系统－软件包，搜索「cloudflare」，安装 ddns-scripts_cloudflare.com-v4，然后重启路由器。")])]),n("li",null,[n("p",null,[s("服务－动态 DNS，cloudflare 登录密码为 "),n("a",S,[s("cloudflare API"),t(e)]),s(" 中的 Glodbal API Key。阿里云用户可在 RAM 访问控制中创建专门的 AccessKey。")]),g])])]),k]),m,n("ul",null,[n("li",null,[n("p",null,[n("a",b,[s("RSS 入门篇：FEED43&FeedEx-为静态网页定制 RSS 源"),t(e)])])]),n("li",null,[n("p",null,[n("a",f,[s("RSS 进阶篇：Huginn - 真·为任意网页定制 RSS 源（PhantomJs 抓取）"),t(e)])])]),n("li",null,[n("p",null,[n("a",v,[s("RSS 速成篇：RSSHub 捡现成的轮子"),t(e)])])]),n("li",null,[n("p",null,[n("a",y,[s("RSS 速成篇 2：RSSHub 自部署"),t(e)])])]),n("li",null,[n("p",null,[n("a",x,[s("RSS 完结篇：节省千元服务费，RSSHub、Huginn 转移 NAS"),t(e)])])]),n("li",null,[n("p",null,[n("a",R,[s("RSS 汇总篇：RSS 永久链接合集，拒绝 RSS 失效"),t(e)])])])])])}const D=o(i,[["render",N],["__file","2021-10-23-nas_with_rsshub_and_huginn.html.vue"]]);export{D as default};
