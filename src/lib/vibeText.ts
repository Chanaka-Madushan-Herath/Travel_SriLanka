import type { Locale } from "./types";

export type ThemeId = "heritage" | "wildlife" | "beach" | "mountains";
export const themeIds: ThemeId[] = ["heritage", "wildlife", "beach", "mountains"];

type Theme = { label: string; title: string; tagline: string };

export type VibeText = {
  themes: Record<ThemeId, Theme>;
  mosaicKicker: string;
  mosaicTitle: string;
  mosaicLead: string;
  explore: string;
  statUnesco: string;
  statCoast: string;
  statPeak: string;
  statPlaces: string;
  statRoutes: string;
  bandTitle: string;
  bandBody: string;
  scroll: string;
  admin: {
    title: string;
    help: string;
    slides: string;
    tiles: string;
    backgrounds: string;
    pages: string;
    stats: string;
    band: string;
    useDefault: string;
    builtIn: string;
    badLink: string;
    broken: string;
  };
};

const en: VibeText = {
  themes: {
    heritage: { label: "Heritage", title: "Kingdoms carved in rock", tagline: "Lion rock fortresses, cave temples and stupas over 2,000 years old." },
    wildlife: { label: "Wildlife", title: "Leopards, elephants, whales", tagline: "Jeep safaris at dawn and the biggest elephant gathering in Asia." },
    beach: { label: "Beaches", title: "Turquoise bays & surf", tagline: "Palm-lined coves, sea turtles and sunsets you will talk about for years." },
    mountains: { label: "Mountains", title: "Misty tea country", tagline: "The hill-country train through the clouds, waterfalls and cool green hills." },
  },
  mosaicKicker: "Choose your Sri Lanka",
  mosaicTitle: "One island. Four moods.",
  mosaicLead: "In a single week you can stand on a 5th-century fortress, track a leopard, and swim in a warm bay.",
  explore: "Explore",
  statUnesco: "UNESCO World Heritage Sites",
  statCoast: "km of coastline",
  statPeak: "m — the highest peak",
  statPlaces: "places we plan around",
  statRoutes: "ready-made routes",
  bandTitle: "Leopards at dawn. Surf by sunset.",
  bandBody: "Tea country in between. Tell us what you love and we will fit it into one trip.",
  scroll: "Scroll",
  admin: {
    title: "Images",
    help: "Paste an image link (https://…) for each spot. Leave a field empty to use the built-in photo. Wide landscape photos of at least 1600 px look best.",
    slides: "Home slideshow",
    tiles: "Home mood tiles",
    backgrounds: "Home backgrounds",
    pages: "Page headers",
    stats: "Number strip",
    band: "Wildlife band",
    useDefault: "Use built-in photo",
    builtIn: "Built-in photo",
    badLink: "This does not look like an image link. It should start with https:// or /.",
    broken: "This image did not load. Check the link.",
  },
};

const fr: VibeText = {
  themes: {
    heritage: { label: "Patrimoine", title: "Des royaumes taillés dans la roche", tagline: "Forteresses du rocher du Lion, temples troglodytes et stupas de plus de 2 000 ans." },
    wildlife: { label: "Faune", title: "Léopards, éléphants, baleines", tagline: "Safaris en jeep à l'aube et le plus grand rassemblement d'éléphants d'Asie." },
    beach: { label: "Plages", title: "Baies turquoise et surf", tagline: "Criques bordées de palmiers, tortues marines et couchers de soleil inoubliables." },
    mountains: { label: "Montagnes", title: "Le pays du thé dans la brume", tagline: "Le train des collines dans les nuages, cascades et collines fraîches." },
  },
  mosaicKicker: "Choisissez votre Sri Lanka",
  mosaicTitle: "Une île. Quatre ambiances.",
  mosaicLead: "En une semaine : une forteresse du Ve siècle, un léopard sur la piste et une baignade dans une baie chaude.",
  explore: "Découvrir",
  statUnesco: "sites du patrimoine mondial de l'UNESCO",
  statCoast: "km de côtes",
  statPeak: "m — le plus haut sommet",
  statPlaces: "lieux au cœur de nos circuits",
  statRoutes: "circuits prêts à partir",
  bandTitle: "Léopards à l'aube. Surf au couchant.",
  bandBody: "Le pays du thé entre les deux. Dites-nous ce que vous aimez, nous le réunirons en un seul voyage.",
  scroll: "Défiler",
  admin: {
    title: "Images",
    help: "Collez un lien d'image (https://…) pour chaque emplacement. Laissez vide pour garder la photo d'origine. Les photos paysage d'au moins 1600 px rendent le mieux.",
    slides: "Diaporama d'accueil",
    tiles: "Tuiles d'ambiance",
    backgrounds: "Fonds de l'accueil",
    pages: "En-têtes de page",
    stats: "Bandeau des chiffres",
    band: "Bandeau faune",
    useDefault: "Photo d'origine",
    builtIn: "Photo d'origine",
    badLink: "Ce n'est pas un lien d'image. Il doit commencer par https:// ou /.",
    broken: "Cette image ne s'est pas chargée. Vérifiez le lien.",
  },
};

const es: VibeText = {
  themes: {
    heritage: { label: "Patrimonio", title: "Reinos tallados en la roca", tagline: "Fortalezas sobre la roca del León, templos en cuevas y estupas de más de 2.000 años." },
    wildlife: { label: "Fauna", title: "Leopardos, elefantes, ballenas", tagline: "Safaris en jeep al amanecer y la mayor reunión de elefantes de Asia." },
    beach: { label: "Playas", title: "Bahías turquesa y surf", tagline: "Calas con palmeras, tortugas marinas y atardeceres que no olvidará." },
    mountains: { label: "Montañas", title: "La tierra del té entre la niebla", tagline: "El tren de montaña entre nubes, cascadas y colinas verdes y frescas." },
  },
  mosaicKicker: "Elija su Sri Lanka",
  mosaicTitle: "Una isla. Cuatro ambientes.",
  mosaicLead: "En una sola semana: una fortaleza del siglo V, un leopardo en la pista y un baño en una bahía cálida.",
  explore: "Explorar",
  statUnesco: "sitios Patrimonio de la Humanidad",
  statCoast: "km de costa",
  statPeak: "m — la cima más alta",
  statPlaces: "lugares en nuestras rutas",
  statRoutes: "rutas listas",
  bandTitle: "Leopardos al amanecer. Surf al atardecer.",
  bandBody: "La tierra del té en medio. Cuéntenos lo que le gusta y lo uniremos en un solo viaje.",
  scroll: "Desplazar",
  admin: {
    title: "Imágenes",
    help: "Pegue un enlace de imagen (https://…) para cada espacio. Déjelo vacío para usar la foto incluida. Lo mejor son fotos horizontales de al menos 1600 px.",
    slides: "Carrusel de inicio",
    tiles: "Mosaicos de ambiente",
    backgrounds: "Fondos del inicio",
    pages: "Cabeceras de página",
    stats: "Franja de cifras",
    band: "Franja de fauna",
    useDefault: "Usar foto incluida",
    builtIn: "Foto incluida",
    badLink: "No parece un enlace de imagen. Debe empezar por https:// o /.",
    broken: "La imagen no se cargó. Revise el enlace.",
  },
};

const de: VibeText = {
  themes: {
    heritage: { label: "Kultur", title: "Königreiche aus Fels", tagline: "Felsenfestungen, Höhlentempel und über 2.000 Jahre alte Stupas." },
    wildlife: { label: "Tierwelt", title: "Leoparden, Elefanten, Wale", tagline: "Jeep-Safaris im Morgengrauen und die größte Elefantenversammlung Asiens." },
    beach: { label: "Strände", title: "Türkise Buchten & Surf", tagline: "Palmenbuchten, Meeresschildkröten und Sonnenuntergänge, die bleiben." },
    mountains: { label: "Berge", title: "Teeland im Nebel", tagline: "Der Bergzug durch die Wolken, Wasserfälle und kühle grüne Hügel." },
  },
  mosaicKicker: "Ihr Sri Lanka",
  mosaicTitle: "Eine Insel. Vier Stimmungen.",
  mosaicLead: "In einer Woche: eine Festung aus dem 5. Jahrhundert, ein Leopard auf der Piste und ein Bad in warmer Bucht.",
  explore: "Entdecken",
  statUnesco: "UNESCO-Welterbestätten",
  statCoast: "km Küste",
  statPeak: "m — der höchste Gipfel",
  statPlaces: "Orte in unseren Routen",
  statRoutes: "fertige Routen",
  bandTitle: "Leoparden im Morgengrauen. Surfen bei Sonnenuntergang.",
  bandBody: "Dazwischen das Teeland. Sagen Sie uns, was Sie lieben, wir packen es in eine Reise.",
  scroll: "Scrollen",
  admin: {
    title: "Bilder",
    help: "Fügen Sie für jede Stelle einen Bildlink (https://…) ein. Leer lassen für das eingebaute Foto. Querformat ab 1600 px wirkt am besten.",
    slides: "Startseiten-Diashow",
    tiles: "Stimmungskacheln",
    backgrounds: "Hintergründe der Startseite",
    pages: "Seitenköpfe",
    stats: "Zahlenleiste",
    band: "Tierwelt-Band",
    useDefault: "Eingebautes Foto",
    builtIn: "Eingebautes Foto",
    badLink: "Das ist kein Bildlink. Er sollte mit https:// oder / beginnen.",
    broken: "Das Bild wurde nicht geladen. Bitte Link prüfen.",
  },
};

const ru: VibeText = {
  themes: {
    heritage: { label: "Наследие", title: "Царства, высеченные в скале", tagline: "Крепость на Львиной скале, пещерные храмы и ступы старше 2000 лет." },
    wildlife: { label: "Природа", title: "Леопарды, слоны, киты", tagline: "Сафари на джипах на рассвете и крупнейшее скопление слонов в Азии." },
    beach: { label: "Пляжи", title: "Бирюзовые бухты и сёрфинг", tagline: "Пальмовые бухты, морские черепахи и закаты, которые не забыть." },
    mountains: { label: "Горы", title: "Чайные холмы в тумане", tagline: "Горный поезд сквозь облака, водопады и прохладные зелёные холмы." },
  },
  mosaicKicker: "Ваша Шри-Ланка",
  mosaicTitle: "Один остров. Четыре настроения.",
  mosaicLead: "За одну неделю: крепость V века, леопард на тропе и купание в тёплой бухте.",
  explore: "Смотреть",
  statUnesco: "объектов Всемирного наследия ЮНЕСКО",
  statCoast: "км побережья",
  statPeak: "м — высочайшая вершина",
  statPlaces: "мест в наших маршрутах",
  statRoutes: "готовых маршрутов",
  bandTitle: "Леопарды на рассвете. Сёрфинг на закате.",
  bandBody: "А между ними — чайные холмы. Расскажите, что любите, и мы соберём это в одну поездку.",
  scroll: "Листайте",
  admin: {
    title: "Изображения",
    help: "Вставьте ссылку на изображение (https://…) для каждого места. Оставьте поле пустым, чтобы использовать встроенное фото. Лучше всего смотрятся горизонтальные фото от 1600 px.",
    slides: "Слайд-шоу на главной",
    tiles: "Плитки настроений",
    backgrounds: "Фоны на главной",
    pages: "Шапки страниц",
    stats: "Полоса с цифрами",
    band: "Полоса о природе",
    useDefault: "Встроенное фото",
    builtIn: "Встроенное фото",
    badLink: "Это не похоже на ссылку на изображение. Она должна начинаться с https:// или /.",
    broken: "Изображение не загрузилось. Проверьте ссылку.",
  },
};

const zh: VibeText = {
  themes: {
    heritage: { label: "古迹", title: "刻在岩石上的王国", tagline: "狮子岩要塞、石窟寺庙和两千多年的佛塔。" },
    wildlife: { label: "野生动物", title: "豹、大象、鲸鱼", tagline: "清晨吉普车游猎，还有亚洲最大规模的大象聚集。" },
    beach: { label: "海滩", title: "碧蓝海湾与冲浪", tagline: "椰林海湾、海龟和让人难忘的日落。" },
    mountains: { label: "山区", title: "云雾中的茶乡", tagline: "穿过云端的高山火车、瀑布与清凉的绿色山丘。" },
  },
  mosaicKicker: "选择您的斯里兰卡",
  mosaicTitle: "一座岛，四种风情。",
  mosaicLead: "一周之内，登上五世纪的要塞，追寻豹的踪迹，再在温暖的海湾游泳。",
  explore: "探索",
  statUnesco: "处联合国教科文组织世界遗产",
  statCoast: "公里海岸线",
  statPeak: "米——最高峰",
  statPlaces: "个精选目的地",
  statRoutes: "条现成路线",
  bandTitle: "清晨看豹，日落冲浪。",
  bandBody: "中间是茶乡。告诉我们您喜欢什么，我们把它们安排进一次旅行。",
  scroll: "向下滑动",
  admin: {
    title: "图片",
    help: "为每个位置粘贴图片链接（https://…）。留空则使用内置照片。宽度至少 1600 像素的横向照片效果最好。",
    slides: "首页轮播",
    tiles: "首页风情卡片",
    backgrounds: "首页背景",
    pages: "页面顶部",
    stats: "数字条",
    band: "野生动物横幅",
    useDefault: "使用内置照片",
    builtIn: "内置照片",
    badLink: "这不像图片链接，应以 https:// 或 / 开头。",
    broken: "图片无法加载，请检查链接。",
  },
};

const ja: VibeText = {
  themes: {
    heritage: { label: "遺跡", title: "岩に刻まれた王国", tagline: "獅子岩の要塞、石窟寺院、そして2000年以上前の仏塔。" },
    wildlife: { label: "野生動物", title: "ヒョウ、ゾウ、クジラ", tagline: "夜明けのジープサファリと、アジア最大のゾウの集まり。" },
    beach: { label: "ビーチ", title: "ターコイズの湾とサーフィン", tagline: "ヤシの入り江、ウミガメ、忘れられない夕日。" },
    mountains: { label: "山", title: "霧の紅茶の里", tagline: "雲の中を走る高原列車、滝、涼しい緑の丘。" },
  },
  mosaicKicker: "あなたのスリランカを選ぶ",
  mosaicTitle: "ひとつの島、四つの表情。",
  mosaicLead: "一週間で、5世紀の要塞に立ち、ヒョウを追い、温かい湾で泳げます。",
  explore: "見てみる",
  statUnesco: "のユネスコ世界遺産",
  statCoast: "km の海岸線",
  statPeak: "m ─ 最高峰",
  statPlaces: "か所の厳選スポット",
  statRoutes: "本のモデルルート",
  bandTitle: "夜明けにヒョウ、夕暮れにサーフィン。",
  bandBody: "その間に紅茶の丘。好きなことを教えてください。ひとつの旅にまとめます。",
  scroll: "スクロール",
  admin: {
    title: "画像",
    help: "各場所に画像リンク（https://…）を貼り付けてください。空欄なら内蔵の写真を使います。幅 1600 px 以上の横長写真がおすすめです。",
    slides: "ホームのスライドショー",
    tiles: "ホームの4つのタイル",
    backgrounds: "ホームの背景",
    pages: "ページの見出し画像",
    stats: "数字の帯",
    band: "野生動物の帯",
    useDefault: "内蔵の写真を使う",
    builtIn: "内蔵の写真",
    badLink: "画像リンクではないようです。https:// または / で始めてください。",
    broken: "画像を読み込めませんでした。リンクを確認してください。",
  },
};

export const vibeText: Record<Locale, VibeText> = { en, fr, es, de, ru, zh, ja };
