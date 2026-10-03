import type { Database, Destination, L10n, L10nList, Review, Trip } from "@/lib/types";
import { photo } from "@/lib/utils";
import { localize, localizeList } from "./phrases";

function text(en: string, ...legacy: string[]): L10n {
  void legacy;
  return localize(en);
}

function lines(en: string[], ...legacy: string[][]): L10nList {
  void legacy;
  return localizeList(en);
}

const images = {
  sigiriya: photo("Sigiriya Fortress, Sri Lanka.jpg"),
  kandy: photo("Relic Tooth Temple. Kandy, Sri Lanka.jpg"),
  ella: photo("Nine Arch Bridge Ella.jpg"),
  galle: photo("SL Galle Fort asv2020-01 img20.jpg"),
  mirissa: photo("Mirissa Beach.jpg"),
  yala: photo("Srilankan leopard in Yala National Park.jpg"),
  tea: photo("Tea plantation near Kandy, Sri Lanka.jpg"),
  trinco: photo("Nilaveli Beach.jpg"),
  jaffna: photo("Jaffna Fort.jpg"),
};

const destinations: Destination[] = [
  {
    id: "place-sigiriya",
    slug: "sigiriya",
    region: "cultural",
    order: 1,
    featured: true,
    image: images.sigiriya,
    name: text("Sigiriya", "සීගිරිය", "சிகிரியா"),
    summary: text(
      "A 5th-century palace on a rock column, with frescoes, a mirror wall, and a view that earns the climb.",
      "පස්වන සියවසේ මාලිගයක් තිබූ පර්වතයක්. බිතුසිතර, කැඩපත් බිත්තිය, සහ නැගීම වටිනා දසුන.",
      "ஐந்தாம் நூற்றாண்டின் அரண்மனைப் பாறை. ஓவியங்கள், கண்ணாடிச் சுவர், ஏறுதலுக்குத் தகுந்த காட்சி.",
    ),
    description: text(
      "Sigiriya rises out of dry-zone forest, a rock nearly 200 metres above the gardens at its foot. King Kashyapa built a palace on the summit in the 5th century. What you walk is the approach: water gardens, the mirror wall, the pocket of cloud-maiden frescoes, the lion-paw gate, and then the exposed stairs. Go at opening. By late morning the rock holds heat and the summit fills. If your legs agree, Pidurangala, the monastery rock nearby, is the quieter sunset.",
      "සීගිරිය වියළි කලාපයේ වනයෙන් ඉහළට නගී. පාමුල උද්‍යානවල සිට මීටර් 200කට ආසන්නය. පස්වන සියවසේ කාශ්‍යප රජු මුදුනේ මාලිගයක් කළේය. ඔබ යන්නේ ජල උද්‍යාන, කැඩපත් බිත්තිය, බිතුසිතර, සිංහ දොරටුව, පසුව විවෘත පඩිපෙළය. විවෘත වන වේලාවට යන්න. උදේ පසුව පර්වතය රත් වේ, මුදුන පිරේ. කකුල් ඉඩ දෙන්නේ නම් අසල පිදුරංගල සවසට නිහඬය.",
      "சிகிரியா வறண்ட வனத்திலிருந்து எழுகிறது. அடிவாரத் தோட்டத்திலிருந்து ஏறக்குறைய 200 மீட்டர். ஐந்தாம் நூற்றாண்டில் காசியபன் சிகரத்தில் அரண்மனை கட்டினான். நீர் தோட்டங்கள், கண்ணாடிச் சுவர், ஓவியப் பை, சிங்கப் பாத வாயில், பிறகு திறந்த படிக்கட்டு. திறக்குமிடத்துக்குச் செல்லுங்கள். காலை தாண்டினால் பாறை சூடாகும், சிகரம் நிரம்பும். கால்கள் இசைந்தால் அருகிலுள்ள பிதுரங்கலா அமைதியான சூரிய அஸ்தமனம்.",
    ),
    bestTime: text(
      "January to April, and again in July and August, when the dry zone is least muddy.",
      "ජනවාරි සිට අප්‍රේල් දක්වා, නැවත ජූලි සහ අගෝස්තු, වියළි කලාපය අඩු මඩ සහිත කාලය.",
      "ஜனவரி முதல் ஏப்ரல் வரை, பிறகு ஜூலை மற்றும் ஆகஸ்ட். வறண்ட மண்டலம் குறைந்த சேறுள்ள காலம்.",
    ),
    gettingThere: text(
      "About four to five hours by road from Colombo, or a short hop from Dambulla or Habarana. A Cultural Triangle ticket covers the site; confirm the current price before you go.",
      "කොළඹ සිට මාර්ගයෙන් පැය හතරේ සිට පහ දක්වා, නැතහොත් දඹුල්ල හෝ හබරණ සිට කෙටි ගමනක්. සංස්කෘතික ත්‍රිකෝණ ප්‍රවේශපත්‍රයෙන් මෙය ආවරණය වේ. යාමට පෙර වත්මන් මිල තහවුරු කරන්න.",
      "கொழும்பிலிருந்து சாலையில் நான்கு முதல் ஐந்து மணி, அல்லது தம்புள்ளையிலிருந்து குறுகிய தூரம். கலாச்சார முக்கோண நுழைவுச்சீட்டு இதை உள்ளடக்கும். செல்வதற்கு முன் தற்போதைய கட்டணத்தை உறுதி செய்யுங்கள்.",
    ),
    highlights: lines(
      ["Summit ruins at opening time", "Fresco pocket and mirror wall", "Water gardens", "Pidurangala for sunset"],
      ["විවෘත වේලාවට මුදුන් නටබුන්", "බිතුසිතර සහ කැඩපත් බිත්තිය", "ජල උද්‍යාන", "සවසට පිදුරංගල"],
      ["திறக்குமிடத்தில் சிகர இடிபாடுகள்", "ஓவியப் பையும் கண்ணாடிச் சுவரும்", "நீர் தோட்டங்கள்", "சூரிய அஸ்தமனத்துக்கு பிதுரங்கலா"],
    ),
  },
  {
    id: "place-kandy",
    slug: "kandy",
    region: "hills",
    order: 2,
    featured: true,
    image: images.kandy,
    name: text("Kandy", "මහනුවර", "கண்டி"),
    summary: text(
      "The lake city of the last kingdom, built around the Temple of the Tooth.",
      "අවසාන රාජධානියේ විල් නගරය. දළදා මාළිගාව වටේ ගොඩනැගුණු.",
      "கடைசி இராச்சியத்தின் ஏரி நகரம். புனிதப் பல் கோயிலைச் சுற்றி அமைந்தது.",
    ),
    description: text(
      "Kandy sits in a fold of hills around a rectangular lake the last kings built. The Temple of the Tooth is the island's most visited Buddhist shrine. Cover shoulders and knees, leave shoes where asked, and keep the lakeside for a slow evening circuit rather than a dash between sights. Peradeniya's botanical gardens are a short ride out. The Esala Perahera, usually in July or August, follows the lunar calendar and fills the streets. This is also where the famous hill-country train begins.",
      "මහනුවර කඳු අතරේ, අවසාන රජවරු සෑදූ සෘජුකෝණාස්‍ර විල වටේ පිහිටයි. දළදා මාළිගාව දිවයිනේ වැඩිම අය පැමිණෙන බෞද්ධ විහාරයයි. උරහිස් සහ දණහිස් වසන්න, සපත්තු ඉල්ලන තැන තබන්න, විල් ඉවුර සවස මන්දගාමී වටයකට තබා ගන්න. පේරාදෙණිය උද්භිද උද්‍යානය කෙටි ගමනකි. ඇසළ පෙරහැර සාමාන්‍යයෙන් ජූලි හෝ අගෝස්තු, සඳ දින දර්ශනය අනුවය. කඳුරටේ ප්‍රසිද්ධ දුම්රිය මෙතැනින් පටන් ගනී.",
      "கண்டி மலை மடிப்பில், கடைசி மன்னர்கள் கட்டிய செவ்வக ஏரியைச் சுற்றி அமர்ந்துள்ளது. புனிதப் பல் கோயில் தீவில் அதிகம் செல்லப்படும் பௌத்த ஆலயம். தோளும் முழங்காலும் மூடுங்கள், காலணி கேட்கும் இடத்தில் விடுங்கள், ஏரிக் கரையை மாலை மெதுவாகச் சுற்றுவதற்கு வையுங்கள். பேராதனை தாவரவியல் பூங்கா அருகில். எசல பெரஹெரா பொதுவாக ஜூலை அல்லது ஆகஸ்ட், சந்திர நாட்காட்டியைப் பின்பற்றும். மலை நாட்டு இரயில் இங்கிருந்து தொடங்குகிறது.",
    ),
    bestTime: text(
      "December to April for clearer hill weather. Perahera dates move with the moon.",
      "පැහැදිලි කඳුරට කාලගුණයට දෙසැම්බර් සිට අප්‍රේල් දක්වා. පෙරහැර දින සඳ සමඟ වෙනස් වේ.",
      "தெளிவான மலை வானிமைக்கு டிசம்பர் முதல் ஏப்ரல். பெரஹெரா தேதிகள் நிலவுடன் நகரும்.",
    ),
    gettingThere: text(
      "About three hours from Colombo by the expressway and then the hill road. The train is slower and more interesting.",
      "කොළඹ සිට අධිවේගී මාර්ගයෙන් පසු කඳු පාරෙන් පැය තුනක් පමණ. දුම්රිය මන්දගාමීය, වඩාත් රසවත්.",
      "கொழும்பிலிருந்து விரைவுச் சாலை, பிறகு மலைப் பாதை, ஏறக்குறைய மூன்று மணி. இரயில் மெதுவானது, சுவாரசியமானது.",
    ),
    highlights: lines(
      ["Temple of the Tooth", "Lake circuit at dusk", "Peradeniya gardens", "Esala Perahera in season"],
      ["දළදා මාළිගාව", "සවස විල් වටය", "පේරාදෙණිය උද්‍යාන", "ඍතුවේ ඇසළ පෙරහැර"],
      ["புனிதப் பல் கோயில்", "மாலை ஏரிச் சுற்று", "பேராதனை பூங்கா", "பருவத்தில் எசல பெரஹெரா"],
    ),
  },
  {
    id: "place-ella",
    slug: "ella",
    region: "hills",
    order: 3,
    featured: true,
    image: images.ella,
    name: text("Ella", "ඇල්ල", "எல்ல"),
    summary: text(
      "A small hill town of viewpoints, tea slopes, and the island's most loved railway bridge.",
      "දර්ශන, තේ බෑවුම්, සහ දිවයිනේ ජනප්‍රියම දුම්රිය පාලම ඇති කුඩා කඳු නගරයක්.",
      "காட்சிகள், தேயிலைச் சரிவுகள், தீவின் மிகவும் நேசிக்கப்படும் இரயில் பாலம் உள்ள சிறிய மலை நகரம்.",
    ),
    description: text(
      "Ella is the pause on the Kandy line that many travellers never leave on schedule. The Nine Arches Bridge is best early, before the day-trip vans. Little Adam's Peak is a short ridge above tea. Ella Rock is longer and hotter. The main street is busier than the landscape suggests, so sleep a road back if you want a quiet night. The train from Kandy or Nanu Oya is the point of coming: book a reserved seat when booking opens, or accept the open doorway and the wind.",
      "ඇල්ල යනු මහනුවර මාර්ගයේ නැවතීමයි. බොහෝ අය සැලසුම් කළ දිනට නොයයි. ආරුක්කු නවයේ පාලම උදේ හොඳය, දිවා ගමන් වෑන් එන්නට පෙර. කුඩා ආදම්ගේ කඳු මුදුන තේ ඉහළ කෙටි වැටියකි. ඇල්ල පර්වතය දිගය, උණුසුම්. ප්‍රධාන වීදිය දසුනට වඩා කලබලය. නිහඬ රාත්‍රියකට එක් පාරක් පිටුපස නවාතැන් ගන්න. මහනුවර හෝ නානුඔය සිට දුම්රිය මෙහි එන හේතුවයි. වෙන් කළ ආසනයක් විවෘත වූ විට වෙන් කරන්න, නැතහොත් විවෘත දොරටුව පිළිගන්න.",
      "எல்ல கண்டி வழித்தடத்தின் நிறுத்தம். பலர் திட்டமிட்ட நாளில் புறப்படுவதில்லை. ஒன்பது வளைவுப் பாலம் அதிகாலை சிறந்தது, பகல் சுற்று வண்டிகளுக்கு முன். சிறிய ஆதாம் சிகரம் தேயிலைக்கு மேல் குறுகிய முகடு. எல்ல பாறை நீளமானது, வெப்பமானது. பிரதான தெரு நிலப்பரப்பை விட பரபரப்பு. அமைதியான இரவுக்கு ஒரு தெரு பின்னால் தங்குங்கள். கண்டி அல்லது நானு ஓயா இரயிலே வருவதற்கான காரணம். இடஒதுக்கீடு திறந்ததும் பதிவு செய்யுங்கள், இல்லையேல் திறந்த வாசலையும் காற்றையும் ஏற்றுக்கொள்ளுங்கள்.",
    ),
    bestTime: text(
      "December to March. Mist in the monsoon months is part of the place, not a failure of the trip.",
      "දෙසැම්බර් සිට මාර්තු දක්වා. මෝසම් මාසවල මීදුම ස්ථානයේ කොටසකි, ගමනේ අසාර්ථකත්වයක් නොවේ.",
      "டிசம்பர் முதல் மார்ச். பருவமழை மாதங்களின் மூடுபனி இடத்தின் பகுதி, பயணத்தின் தோல்வி அல்ல.",
    ),
    gettingThere: text(
      "Train from Kandy takes most of a day. From Nanu Oya, near Nuwara Eliya, the ride is shorter. A road transfer is faster and less romantic.",
      "මහනුවර සිට දුම්රියට දවසේ වැඩි කොටසක් යයි. නුවරඑළිය අසල නානුඔය සිට ගමන කෙටිය. මාර්ගය වේගවත්, අඩු රසවත්.",
      "கண்டியிலிருந்து இரயிலுக்கு ஒரு நாளின் பெரும்பாலான நேரம். நுவரெலியா அருகே நானு ஓயாவிலிருந்து பயணம் குறுகியது. சாலை வேகமானது, குறைந்த கவிதை.",
    ),
    highlights: lines(
      ["Nine Arches at dawn", "Little Adam's Peak", "Kandy–Ella railway", "A working tea factory"],
      ["අරුණෝදයේ ආරුක්කු නවය", "කුඩා ආදම්ගේ කඳු මුදුන", "මහනුවර–ඇල්ල දුම්රිය", "ක්‍රියාත්මක තේ කම්හලක්"],
      ["விடியலில் ஒன்பது வளைவு", "சிறிய ஆதாம் சிகரம்", "கண்டி–எல்ல இரயில்", "இயங்கும் தேயிலை ஆலை"],
    ),
  },
  {
    id: "place-galle",
    slug: "galle",
    region: "south",
    order: 4,
    featured: true,
    image: images.galle,
    name: text("Galle Fort", "ගාලු කොටුව", "காலிக் கோட்டை"),
    summary: text(
      "A Dutch fort still lived in: ramparts, courts, and a lighthouse at the end of the wall.",
      "තවම ජීවත් වන ලන්දේසි කොටුවක්. ප්‍රාකාර, ක්‍රීඩා පිටි, බිත්තිය අග ලයිට්හවුස්.",
      "இன்னும் வாழும் டச்சுக் கோட்டை. மதில்கள், மைதானம், சுவர் முனையில் கலங்கரை விளக்கம்.",
    ),
    description: text(
      "Galle Fort is not a museum you exit. People live inside the ramparts the Dutch rebuilt. Walk the walls in the late afternoon, when the cricket ground below fills and the lighthouse turns gold. The streets inside are short: courtyards, thick-walled houses, and shops that can wait until tomorrow. The new town outside the gates is ordinary and useful. Sleep inside the fort if the trip is about walking. Sleep just outside if you want a pool and the beach at Unawatuna, about ten minutes away.",
      "ගාලු කොටුව පිටවන කෞතුකාගාරයක් නොවේ. ලන්දේසීන් යළි සෑදූ ප්‍රාකාර ඇතුළේ මිනිස්සු ජීවත් වේ. හවස පසුව බිත්ති ඔස්සේ යන්න. පහළ ක්‍රිකට් පිටිය පිරේ, ලයිට්හවුස් රන් පාට වේ. ඇතුළේ වීදි කෙටිය. දොරටුවෙන් පිටත නගරය සාමාන්‍යය, ප්‍රයෝජනවත්. ඇවිදීම ගමන නම් කොටුව ඇතුළේ නවාතැන් ගන්න. පිහිනුම් තටාකයක් සහ උණවටුන අවශ්‍ය නම් පිටත. උණවටුන මිනිත්තු දහයක් පමණ.",
      "காலிக் கோட்டை வெளியேறும் அருங்காட்சியகம் அல்ல. டச்சுக்காரர் மீண்டும் கட்டிய மதில்களுக்குள் மக்கள் வாழ்கிறார்கள். பிற்பகலில் சுவர்களில் நடங்கள். கீழே மைதானம் நிரம்பும், கலங்கரை விளக்கம் பொன்னாகும். உள்ளே தெருக்கள் குறுகியவை. வாயிலுக்கு வெளியே நகரம் சாதாரணம், பயனுள்ளது. நடப்பதே பயணமென்றால் கோட்டைக்குள் தங்குங்கள். குளமும் உணவட்டுனா கடலும் வேண்டுமென்றால் வெளியே. உணவட்டுனா ஏறக்குறைய பத்து நிமிடம்.",
    ),
    bestTime: text(
      "December to April, the dry window on the southwest coast.",
      "දෙසැම්බර් සිට අප්‍රේල් දක්වා, නිරිතදිග වෙරළේ වියළි කවුළුව.",
      "டிசம்பர் முதல் ஏப்ரல், தென்மேற்கு கடற்கரையின் வறண்ட சாளரம்.",
    ),
    gettingThere: text(
      "About two hours from Colombo on the Southern Expressway. The coastal train is slower and stays close to the sea.",
      "දක්ෂිණ අධිවේගී මාර්ගයෙන් කොළඹ සිට පැය දෙකක් පමණ. වෙරළ දුම්රිය මන්දගාමීය, මුහුද ළඟ රැඳේ.",
      "தெற்கு விரைவுச் சாலையில் கொழும்பிலிருந்து ஏறக்குறைய இரண்டு மணி. கடற்கரை இரயில் மெதுவானது, கடலுக்கு அருகில் செல்லும்.",
    ),
    highlights: lines(
      ["Rampart circuit", "Lighthouse at the point", "Courtyards inside the walls", "Unawatuna nearby"],
      ["ප්‍රාකාර වටය", "කෙළවරේ ලයිට්හවුස්", "බිත්ති ඇතුළේ මිදුල්", "අසල උණවටුන"],
      ["மதில் சுற்று", "முனையில் கலங்கரை விளக்கம்", "சுவர்களுக்குள் முற்றங்கள்", "அருகே உணவட்டுனா"],
    ),
  },
  {
    id: "place-mirissa",
    slug: "mirissa",
    region: "south",
    order: 5,
    featured: false,
    image: images.mirissa,
    name: text("Mirissa", "මිරිස්ස", "மிரிஸ்ஸ"),
    summary: text(
      "A fishing cove that became the south's easy beach, with whales offshore in season.",
      "දකුණේ පහසු වෙරළ බවට පත් මසුන් ඇල්ලක්. ඍතුවේ කොරල් ඉවුරෙන් එහා තල්මසුන්.",
      "தெற்கின் எளிய கடற்கரையாக மாறிய மீனவர் குடா. பருவத்தில் கரைக்கு அப்பால் திமிங்கலங்கள்.",
    ),
    description: text(
      "Mirissa is a curve of sand, a coconut hill, and a harbour that sends boats out before dawn. From November to April, blue whales move through the water south of the island, and half-day boats leave from the harbour. Choose operators who limit numbers and keep a distance. The beach itself is for slow mornings. It is not a secret. If you want quieter water, sleep toward Weligama or Hiriketiya and keep Mirissa for the boat.",
      "මිරිස්ස වැලි වක්‍රයක්, පොල් කන්දක්, සහ අරුණට පෙර බෝට්ටු යවන වරායකි. නොවැම්බර් සිට අප්‍රේල් දක්වා නිල් තල්මසුන් දිවයිනට දකුණින් ගමන් කරයි. වරායෙන් අර්ධ දින බෝට්ටු පිටත් වේ. සංඛ්‍යාව සීමා කර දුර පවත්වන ක්‍රියාකරුවන් තෝරන්න. වෙරළ මන්දගාමී උදෑසන සඳහා. මෙය රහසක් නොවේ. නිහඬ ජලය අවශ්‍ය නම් වැලිගම හෝ හිරිකැටිය දෙස නවාතැන් ගෙන, බෝට්ටුවට මිරිස්ස තබා ගන්න.",
      "மிரிஸ்ஸ மணல் வளைவு, தென்னை மலை, விடியலுக்கு முன் படகுகளை அனுப்பும் துறைமுகம். நவம்பர் முதல் ஏப்ரல் வரை நீலத் திமிங்கலங்கள் தீவுக்குத் தெற்கே நகரும். துறைமுகத்திலிருந்து அரை நாள் படகுகள் புறப்படும். எண்ணிக்கையைக் கட்டுப்படுத்தி தூரம் காக்கும் இயக்குநர்களைத் தேர்ந்தெடுங்கள். கடற்கரை மெதுவான காலைகளுக்கு. இது இரகசியம் அல்ல. அமைதியான நீர் வேண்டுமென்றால் வெலிகம அல்லது ஹிரிகெட்டியா பக்கம் தங்கி, படகுக்கு மிரிஸ்ஸவை வையுங்கள்.",
    ),
    bestTime: text(
      "November to April for dry weather and the whale season together.",
      "වියළි කාලගුණය සහ තල්මසුන් ඍතුව එකට, නොවැම්බර් සිට අප්‍රේල් දක්වා.",
      "வறண்ட வானிமையும் திமிங்கலப் பருவமும் சேர்ந்து, நவம்பர் முதல் ஏப்ரல்.",
    ),
    gettingThere: text(
      "About two and a half to three hours from Colombo, past Galle. Tuk-tuks cover the beach and the harbour.",
      "ගාල්ල පසුකර කොළඹ සිට පැය දෙකහමාරේ සිට තුන දක්වා. වෙරළ සහ වරාය ත්‍රීවීල් රථවලින්.",
      "காலியைத் தாண்டி கொழும்பிலிருந்து இரண்டரை முதல் மூன்று மணி. கடற்கரையையும் துறைமுகத்தையும் துக்-துக் இணைக்கும்.",
    ),
    highlights: lines(
      ["Whale boat in season", "Coconut Hill at sunset", "Harbour before dawn", "Easy beach days"],
      ["ඍතුවේ තල්මසුන් බෝට්ටුව", "සවස පොල් කන්ද", "අරුණට පෙර වරාය", "පහසු වෙරළ දින"],
      ["பருவத்தில் திமிங்கலப் படகு", "மாலை தென்னை மலை", "விடியலுக்கு முன் துறைமுகம்", "எளிய கடற்கரை நாட்கள்"],
    ),
  },
  {
    id: "place-yala",
    slug: "yala",
    region: "south",
    order: 6,
    featured: false,
    image: images.yala,
    name: text("Yala", "යාල", "யால"),
    summary: text(
      "Dry-zone scrub where leopards are seen more often than anywhere else on the island.",
      "දිවයිනේ වෙනත් තැනකට වඩා දිවියන් දකින වියළි කලාපයේ පඳුරු බිම.",
      "தீவில் வேறு எங்கும் இல்லாத அளவு சிறுத்தைகள் காணப்படும் வறண்ட புதர் நிலம்.",
    ),
    description: text(
      "Yala's Block 1 is known for leopard sightings, which also makes it busy. Jeeps gather when a cat is found. A driver who will also stop for a painted stork or a quiet waterhole is worth more than a promise nobody can keep. Sleep in Tissamaharama, just outside the park, and take the dawn drive. February to July is the usual dry window, when animals come to water. November to January can be wet. Bundala, nearby, is the calmer alternative if you care more about birds than about the crowd.",
      "යාල බ්ලොක් 1 දිවියන් නිසා ප්‍රසිද්ධය. ඒ නිසාම කලබලය. දිවියෙක් පෙනුණු විට ජීප් රැස් වේ. ලකඩ කොකාට හෝ නිහඬ ජල තටාකයකට නවතින රියදුරෙක්, කිසිවෙකුට දිය නොහැකි පොරොන්දුවකට වඩා වටී. උද්‍යානය ඉදිරිපිට තිස්සමහාරාමයේ නවාතැන් ගෙන අරුණෝදයේ යන්න. පෙබරවාරි සිට ජූලි දක්වා සාමාන්‍ය වියළි කවුළුවයි. නොවැම්බර් සිට ජනවාරි තෙත් විය හැක. අසල බුන්දල, පක්ෂීන්ට කැමති නම් නිහඬ විකල්පයයි.",
      "யாலா பிளாக் 1 சிறுத்தைக் காட்சிகளுக்குப் பெயர் பெற்றது. அதனால் பரபரப்பும் உண்டு. பூனை கண்டதும் ஜீப்புகள் கூடும். வர்ண நாரைக்கோ அமைதியான நீர்நிலைக்கோ நிற்கும் ஓட்டுநர், யாரும் தர முடியாத வாக்குறுதியை விட மதிப்புள்ளவர். பூங்காவுக்கு வெளியே திஸ்ஸமஹாராமையில் தங்கி விடியல் சுற்றுக்குச் செல்லுங்கள். பிப்ரவரி முதல் ஜூலை வறண்ட சாளரம். நவம்பர் முதல் ஜனவரி ஈரமாகலாம். அருகிலுள்ள பண்டாலா, பறவைகளே முக்கியமென்றால் அமைதியான மாற்று.",
    ),
    bestTime: text(
      "February to July. Sightings are a chance, not a booking.",
      "පෙබරවාරි සිට ජූලි දක්වා. දැකීම අවස්ථාවකි, වෙන්කිරීමක් නොවේ.",
      "பிப்ரவரி முதல் ஜூலை. காட்சி ஒரு வாய்ப்பு, முன்பதிவு அல்ல.",
    ),
    gettingThere: text(
      "About five to six hours from Colombo. It pairs better with the south coast than with a one-day dash from the city.",
      "කොළඹ සිට පැය පහේ සිට හය දක්වා. නගරයෙන් එක් දින දිවීමකට වඩා දකුණු වෙරළ සමඟ ගැලපේ.",
      "கொழும்பிலிருந்து ஐந்து முதல் ஆறு மணி. நகரிலிருந்து ஒரு நாள் ஓட்டத்தை விட தென் கடற்கரையுடன் சேர்த்தால் பொருந்தும்.",
    ),
    highlights: lines(
      ["Dawn jeep drive", "Leopard country, without a guarantee", "Tissamaharama lakes", "Bundala for birds"],
      ["අරුණෝදයේ ජීප් ගමන", "සහතිකයක් නැති දිවි රට", "තිස්ස විල්", "පක්ෂීන්ට බුන්දල"],
      ["விடியல் ஜீப் சுற்று", "உறுதியில்லாத சிறுத்தை நாடு", "திஸ்ஸ ஏரிகள்", "பறவைகளுக்கு பண்டாலா"],
    ),
  },
  {
    id: "place-nuwara",
    slug: "nuwara-eliya",
    region: "hills",
    order: 7,
    featured: false,
    image: images.tea,
    name: text("Nuwara Eliya", "නුවරඑළිය", "நுவரெலியா"),
    summary: text(
      "The old hill station: tea estates, a cool lake, and weather that asks for a light jacket.",
      "පැරණි කඳු නගරය. තේ වතු, සිසිල් විලක්, සැහැල්ලු ජැකට් එකක් ඉල්ලන කාලගුණය.",
      "பழைய மலை நிலையம். தேயிலைத் தோட்டங்கள், குளிர்ந்த ஏரி, மெல்லிய ஜாக்கெட் கேட்கும் வானிலை.",
    ),
    description: text(
      "Nuwara Eliya was built as a retreat from the Colombo heat, and the evenings still feel like one. Tea estates ring the town. A factory visit is worth it when someone will show you withering and rolling, not only a shop. Gregory Lake is a flat walk. Horton Plains and World's End are a pre-dawn start from here; the escarpment clouds in by mid-morning, so the early jeep is the whole point. The town centre is cluttered. Sleep on an estate road.",
      "නුවරඑළිය කොළඹ රස්නයෙන් ඈත් වීමට සෑදුණු නගරයකි. සවස තවම එසේ දැනේ. තේ වතු නගරය වට කරයි. වියළීම සහ රෝල් කිරීම පෙන්වන්නේ නම් කම්හල් ගමන වටී, කඩය පමණක් නොවේ. ග්‍රෙගරි විල සමතල ඇවිදීමකි. හෝර්ටන් තැන්න සහ ලෝක අන්තය මෙතැනින් අරුණට පෙර පටන් ගනී. දහවලට පෙර කඳු මුදුන වළාකුළු වැසේ. නගර මධ්‍යය අවුල්ය. වත්ත පාරක නවාතැන් ගන්න.",
      "நுவரெலியா கொழும்பு வெப்பத்திலிருந்து விலகக் கட்டப்பட்டது. மாலை இன்னும் அப்படித்தான். தேயிலைத் தோட்டங்கள் நகரைச் சூழும். வாடல் மற்றும் உருட்டல் காட்டினால் ஆலை பயணம் மதிப்புள்ளது, கடை மட்டும் அல்ல. கிரிகோரி ஏரி சமதள நடை. ஹோர்ட்டன் சமவெளியும் உலக முடிவும் இங்கிருந்து விடியலுக்கு முன் தொடங்கும். நடு காலைக்குள் மேடு மேகமாகும். நகர மையம் நெரிசல். தோட்டச் சாலையில் தங்குங்கள்.",
    ),
    bestTime: text(
      "January to March for the clearest World's End views. Evenings are cool year-round.",
      "ලෝක අන්තයේ පැහැදිලිම දසුන් සඳහා ජනවාරි සිට මාර්තු දක්වා. සවස අවුරුද්ද පුරා සිසිල්.",
      "உலக முடிவின் தெளிவான காட்சிக்கு ஜனவரி முதல் மார்ச். மாலை ஆண்டு முழுவதும் குளிர்.",
    ),
    gettingThere: text(
      "Train to Nanu Oya, then a short taxi up to town, or about three hours by road from Kandy.",
      "නානුඔය දක්වා දුම්රිය, පසුව නගරයට කෙටි ටැක්සියක්. නැතහොත් මහනුවර සිට මාර්ගයෙන් පැය තුනක් පමණ.",
      "நானு ஓயா வரை இரயில், பிறகு நகருக்கு குறுகிய வாடகை. அல்லது கண்டியிலிருந்து சாலையில் ஏறக்குறைய மூன்று மணி.",
    ),
    highlights: lines(
      ["Tea estate morning", "Gregory Lake", "Horton Plains at dawn", "Cool nights"],
      ["උදෑසන තේ වත්ත", "ග්‍රෙගරි විල", "අරුණෝදයේ හෝර්ටන් තැන්න", "සිසිල් රාත්‍රීන්"],
      ["காலை தேயிலைத் தோட்டம்", "கிரிகோரி ஏரி", "விடியலில் ஹோர்ட்டன்", "குளிர் இரவுகள்"],
    ),
  },
  {
    id: "place-trinco",
    slug: "trincomalee",
    region: "east",
    order: 8,
    featured: false,
    image: images.trinco,
    name: text("Trincomalee", "ත්‍රිකුණාමලය", "திருகோணமலை"),
    summary: text(
      "A deep natural harbour, a temple on a cliff, and swimming season when the south is wet.",
      "ගැඹුරු ස්වාභාවික වරායක්, කන්ද මුදුනේ කෝවිලක්, දකුණ තෙත් විට පිහිනන ඍතුව.",
      "ஆழமான இயற்கைத் துறைமுகம், பாறை மீது கோயில், தெற்கு ஈரமாக இருக்கும்போது நீச்சல் பருவம்.",
    ),
    description: text(
      "Trincomalee faces the other monsoon, so its season is the opposite of Galle's. From about May to September the east is dry, and the sea at Uppuveli and Nilaveli is the reason to come. Koneswaram sits on Swami Rock above a harbour that empires wanted for the depth of the water. It is a long drive from Colombo, and that distance is why the beaches stay quieter than the south. Pigeon Island, off Nilaveli, is a snorkel when the sea is calm. Whale boats here have their own season, roughly March to August, different from Mirissa.",
      "ත්‍රිකුණාමලය අනෙක් මෝසම දෙස බලයි. එබැවින් ඍතුව ගාල්ලට විරුද්ධය. මැයි සිට සැප්තැම්බර් පමණ නැගෙනහිර වියළිය. උප්පුවෙලි සහ නිලාවැලි මුහුද එන හේතුවයි. කෝණේශ්වරම් ස්වාමි පර්වතය මත, ජලයේ ගැඹුර නිසා අධිරාජ්‍යයන් කැමති වූ වරාය ඉහළය. කොළඹ සිට දිගු ගමනකි. ඒ දුර නිසා වෙරළ දකුණට වඩා නිහඬය. නිලාවැලි ඉදිරිපිට පරාවි දූපත, මුහුද සන්සුන් නම් ස්නෝකල් කිරීමකි. මෙහි තල්මසුන් බෝට්ටුවල ඍතුව දළ වශයෙන් මාර්තු සිට අගෝස්තු දක්වා, මිරිස්සට වෙනස්.",
      "திருகோணமலை மறுபருவமழையை நோக்குகிறது. அதனால் காலம் காலிக்கு எதிர். மே முதல் செப்டம்பர் வரை கிழக்கு வறண்டது. உப்புவெளி மற்றும் நிலாவெளியின் கடலே வருவதற்கான காரணம். கோணேஸ்வரம் சுவாமி பாறையில், நீரின் ஆழம் கருதி பேரரசுகள் விரும்பிய துறைமுகத்துக்கு மேல். கொழும்பிலிருந்து நீண்ட பயணம். அந்த தூரத்தால் கடற்கரைகள் தெற்கை விட அமைதி. நிலாவெளிக்கு அப்பால் புறாத் தீவு, கடல் அமைதியாக இருக்கும்போது மூழ்குதளம். இங்கு திமிங்கலப் படகுகளின் பருவம் தோராயமாக மார்ச் முதல் ஆகஸ்ட், மிரிஸ்ஸவிலிருந்து வேறு.",
    ),
    bestTime: text(
      "May to September, when the southwest coast is in its rains.",
      "මැයි සිට සැප්තැම්බර් දක්වා, නිරිතදිග වෙරළ වැසි සහිත කාලය.",
      "மே முதல் செப்டம்பர், தென்மேற்கு கடற்கரை மழையில் இருக்கும்போது.",
    ),
    gettingThere: text(
      "About five to six hours by road from Colombo. A domestic flight sometimes runs; check it close to your dates.",
      "කොළඹ සිට මාර්ගයෙන් පැය පහේ සිට හය දක්වා. සමහර විට දේශීය ගුවන් ගමනක් ඇත. දිනයන් ළඟදී පරීක්ෂා කරන්න.",
      "கொழும்பிலிருந்து சாலையில் ஐந்து முதல் ஆறு மணி. சில நேரம் உள்நாட்டு விமானம் இயங்கும். தேதிகளுக்கு அருகில் சரிபாருங்கள்.",
    ),
    highlights: lines(
      ["Koneswaram on Swami Rock", "Nilaveli and Uppuveli", "Pigeon Island when calm", "The opposite monsoon"],
      ["ස්වාමි පර්වතයේ කෝණේශ්වරම්", "නිලාවැලි සහ උප්පුවෙලි", "සන්සුන් විට පරාවි දූපත", "අනෙක් මෝසම"],
      ["சுவாமி பாறையில் கோணேஸ்வரம்", "நிலாவெளியும் உப்புவெளியும்", "அமைதியில் புறாத் தீவு", "எதிர் பருவமழை"],
    ),
  },
  {
    id: "place-jaffna",
    slug: "jaffna",
    region: "north",
    order: 9,
    featured: false,
    image: images.jaffna,
    name: text("Jaffna", "යාපනය", "யாழ்ப்பாணம்"),
    summary: text(
      "Temples, islands, and a Tamil city with a voice of its own.",
      "කෝවිල්, දූපත්, සහ තමන්ගේම හඬක් ඇති දෙමළ නගරයක්.",
      "கோயில்கள், தீவுகள், தனக்கே உரிய குரலுள்ள தமிழ் நகரம்.",
    ),
    description: text(
      "Jaffna is not a beach added to a south-coast trip. It is a flat palmyrah peninsula, a large Tamil city, a Dutch fort, and causeways to islands: Kayts, Karainagar, and Nainativu, where a short ferry reaches a Buddhist shrine and a Hindu temple on the same small island. Nallur Kandaswamy is the centre of festival life. The festival, usually in August, is the one to plan around if you want drums and long nights. Eat crab, dosai, and palmyrah sweets. Read the recent history before you arrive, and let the city be more than a photograph.",
      "යාපනය දකුණු වෙරළ ගමනකට එකතු කළ වෙරළක් නොවේ. තල් සහිත සමතල අර්ධද්වීපයක්, විශාල දෙමළ නගරයක්, ලන්දේසි කොටුවක්, සහ දූපත් වෙත පාලම්: කායිට්ස්, කාරෙයිනගර්, සහ නාගදීපය. කෙටි පාරුවකින් එකම කුඩා දූපතේ බෞද්ධ විහාරයක් සහ හින්දු කෝවිලක්. නල්ලූර් කන්දසාමි උත්සව ජීවිතයේ මධ්‍යයයි. උත්සවය සාමාන්‍යයෙන් අගෝස්තු. බෙර සහ දිගු රාත්‍රීන් අවශ්‍ය නම් ඒ වටේ සැලසුම් කරන්න. කකුළුවන්, දෝසයි, තල් මිරිස් කන්න. එන්නට පෙර මෑත ඉතිහාසය කියවන්න. නගරය ඡායාරූපයකට වඩා වැඩිය.",
      "யாழ்ப்பாணம் தென் கடற்கரைப் பயணத்தில் சேர்க்கப்பட்ட கடற்கரை அல்ல. பனை நிறைந்த சமதளத் தீபகற்பம், பெரிய தமிழ் நகரம், டச்சுக் கோட்டை, தீவுகளுக்குப் பாலங்கள்: ஊர்காவற்றுறை, காரைநகர், நயினாதீவு. குறுகிய படகில் ஒரே சிறு தீவில் பௌத்த ஆலயமும் இந்துக் கோயிலும். நல்லூர் கந்தசாமி திருவிழா வாழ்வின் மையம். திருவிழா பொதுவாக ஆகஸ்ட். மேளமும் நீண்ட இரவுகளும் வேண்டுமென்றால் அதைச் சுற்றித் திட்டமிடுங்கள். நண்டு, தோசை, பனங்கிழங்கு இனிப்பு சாப்பிடுங்கள். வருவதற்கு முன் அண்மை வரலாற்றைப் படியுங்கள். நகரம் புகைப்படத்தை விட பெரியது.",
    ),
    bestTime: text(
      "February to September, outside the heaviest northeast rains. The Nallur festival is usually in August.",
      "බරපතලම ඊසාන මෝසමෙන් පිටත, පෙබරවාරි සිට සැප්තැම්බර් දක්වා. නල්ලූර් උත්සවය සාමාන්‍යයෙන් අගෝස්තු.",
      "கனமான வடகிழக்கு மழைக்கு வெளியே, பிப்ரவரி முதல் செப்டம்பர். நல்லூர் திருவிழா பொதுவாக ஆகஸ்ட்.",
    ),
    gettingThere: text(
      "About seven to eight hours by road from Colombo, a short flight, or the northern railway. The journey is part of the trip.",
      "කොළඹ සිට මාර්ගයෙන් පැය හතේ සිට අට දක්වා, කෙටි ගුවන් ගමනක්, හෝ උතුරු දුම්රිය. ගමන සංචාරයේ කොටසකි.",
      "கொழும்பிலிருந்து சாலையில் ஏழு முதல் எட்டு மணி, குறுகிய விமானம், அல்லது வடக்கு இரயில். பயணமே பயணத்தின் பகுதி.",
    ),
    highlights: lines(
      ["Nallur Kandaswamy", "Jaffna fort", "Island causeways and Nainativu", "Palmyrah country and crab"],
      ["නල්ලූර් කන්දසාමි", "යාපනය කොටුව", "දූපත් පාලම් සහ නාගදීපය", "තල් රට සහ කකුළුවන්"],
      ["நல்லூர் கந்தசாமி", "யாழ்ப்பாணக் கோட்டை", "தீவுப் பாலங்களும் நயினாதீவும்", "பனை நாடும் நண்டும்"],
    ),
  },
];

const privateCar = lines(
  ["Private car and English-speaking driver", "Twin-share stays named in the plan", "Breakfasts", "Listed site tickets"],
  ["පෞද්ගලික වාහනය සහ ඉංග්‍රීසි කතා කරන රියදුරු", "සැලසුමේ සඳහන් දෙදෙනෙකුගේ නවාතැන්", "උදේ ආහාර", "ලැයිස්තුගත ප්‍රවේශපත්"],
  ["தனியார் வண்டியும் ஆங்கிலம் பேசும் ஓட்டுநரும்", "திட்டத்தில் சொல்லப்பட்ட இரட்டைப் பகிர்வு தங்கல்கள்", "காலை உணவு", "பட்டியலிட்ட நுழைவுச்சீட்டுகள்"],
);

const notIncluded = lines(
  ["International flights", "Lunches and dinners", "Tips and travel insurance", "Optional boats and extra park blocks"],
  ["ජාත්‍යන්තර ගුවන් ගමන්", "දිවා ආහාර සහ රාත්‍රී ආහාර", "ටිප් සහ ගමන් රක්ෂණය", "අමතර බෝට්ටු සහ අමතර උද්‍යාන බ්ලොක්"],
  ["சர்வதேச விமானங்கள்", "மதிய மற்றும் இரவு உணவு", "நன்றிக்கொடையும் பயணக் காப்பீடும்", "விருப்பப் படகுகளும் கூடுதல் பூங்காப் பகுதிகளும்"],
);

const trips: Trip[] = [
  {
    id: "trip-cultural",
    slug: "cultural-triangle",
    order: 1,
    featured: true,
    image: images.sigiriya,
    durationDays: 5,
    priceFromUsd: 780,
    pace: "moderate",
    destinationSlugs: ["sigiriya", "kandy"],
    title: text("Rock, lake, and tooth", "පර්වතය, විල, දළදාව", "பாறை, ஏரி, புனிதப் பல்"),
    summary: text(
      "Five days from the lion rock to Kandy, with Polonnaruwa and the cave temple in between.",
      "සීගිරියේ සිට මහනුවර දක්වා දින පහක්. අතරේ පොළොන්නරුව සහ ගල් විහාරය.",
      "சிங்கப் பாறையிலிருந்து கண்டி வரை ஐந்து நாட்கள். இடையே பொலன்னறுவையும் குகைக் கோயிலும்.",
    ),
    description: text(
      "A first Sri Lanka week that does not try to see the whole island. You sleep twice by Sigiriya, walk the ancient city of Polonnaruwa, and end in Kandy in time for an evening puja. Elephants at Minneriya or Kaudulla are included only as a seasonal chance, not a promise.",
      "මුළු දිවයිනම දකින්න උත්සාහ නොකරන පළමු සතිය. සීගිරිය ළඟ රාත්‍රී දෙකක්, පොළොන්නරුව, අවසානය මහනුවර සවස් පූජාවට. මින්නේරිය හෝ කවුඩුල්ල ඇත් රැස්වීම ඍතුවේ අවස්ථාවක් මිස පොරොන්දුවක් නොවේ.",
      "தீவு முழுவதையும் காண முயலாத முதல் வாரம். சிகிரியா அருகே இரண்டு இரவுகள், பொலன்னறுவை, முடிவில் கண்டியில் மாலை பூஜைக்கு. மின்னேரியா அல்லது கவடுல்ல யானைகள் பருவ வாய்ப்பு, வாக்குறுதி அல்ல.",
    ),
    bestMonths: text(
      "January to April, and July to August.",
      "ජනවාරි සිට අප්‍රේල්, සහ ජූලි සිට අගෝස්තු.",
      "ஜனவரி முதல் ஏப்ரல், மற்றும் ஜூலை முதல் ஆகஸ்ட்.",
    ),
    groupSize: text("2–6 travellers", "සංචාරකයන් 2–6", "2–6 பயணிகள்"),
    includes: privateCar,
    excludes: notIncluded,
    itinerary: [
      {
        title: text("Colombo to the rock", "කොළඹ සිට පර්වතයට", "கொழும்பிலிருந்து பாறைக்கு"),
        detail: text(
          "Leave Colombo after breakfast. A village stop breaks the drive. You arrive in Sigiriya with enough light to walk the water gardens if the gate is still open, or simply to watch the rock change colour.",
          "උදේ ආහාරයෙන් පසු කොළඹින් පිටත් වන්න. ගම් නැවතීමක් ගමන බිඳියි. දොරටුව විවෘත නම් ජල උද්‍යානය, නැතහොත් පර්වතයේ පාට වෙනස් වීම බලා සිටීමට ආලෝකය ඇත.",
          "காலை உணவுக்குப் பின் கொழும்பை விடுங்கள். ஒரு கிராம நிறுத்தம் பயணத்தைப் பிரிக்கும். வாயில் திறந்திருந்தால் நீர் தோட்டம், இல்லையேல் பாறையின் நிறம் மாறுவதைப் பார்க்க வெளிச்சம் இருக்கும்.",
        ),
        stay: text("Sigiriya", "සීගිරිය", "சிகிரியா"),
      },
      {
        title: text("Summit, then a quieter rock", "මුදුන, පසුව නිහඬ පර්වතය", "சிகரம், பிறகு அமைதியான பாறை"),
        detail: text(
          "Climb Sigiriya at opening, before the heat and the groups. The afternoon is idle on purpose. Pidurangala is the sunset walk if you still want a view without the ticketed summit.",
          "රස්නයට සහ කණ්ඩායම්වලට පෙර, විවෘත වේලාවට සීගිරිය නගින්න. හවස හිතාමතා නිස්කලංකය. ටිකට් මුදුනෙන් තොර දසුනක් අවශ්‍ය නම් පිදුරංගල සවස.",
          "வெப்பத்துக்கும் குழுக்களுக்கும் முன், திறக்குமிடத்தில் சிகிரியா ஏறுங்கள். பிற்பகல் வேண்டுமென்றே வெறுமை. சீட்டு சிகரமின்றி காட்சி வேண்டுமென்றால் பிதுரங்கலா சூரிய அஸ்தமனம்.",
        ),
        stay: text("Sigiriya", "සීගිරිය", "சிகிரியா"),
      },
      {
        title: text("Polonnaruwa by bicycle", "බයිසිකලයෙන් පොළොන්නරුව", "மிதிவண்டியில் பொலன்னறுவை"),
        detail: text(
          "The ancient city is kinder on a bicycle than from a car window. Gal Vihara's statues need unhurried time. If the gathering is on, a late drive looks for elephants at Minneriya or Kaudulla.",
          "පුරාණ නගරය කාර් ජනේලයකට වඩා බයිසිකලයකින් කාරුණිකය. ගල් විහාරයේ පිළිමවලට ඉක්මනක් නැති වේලාවක් ඕන. රැස්වීම ඇත්නම් හවස මින්නේරිය හෝ කවුඩුල්ල දෙස ඇතුන්.",
          "பழங்கால நகரம் கார் சன்னலை விட மிதிவண்டியில் இனிது. கல் விகாரையின் சிலைகளுக்கு அவசரமில்லா நேரம் வேண்டும். கூட்டம் இருந்தால் மாலை மின்னேரியா அல்லது கவடுல்ல யானைகள்.",
        ),
        stay: text("Sigiriya", "සීගිරිය", "சிகிரியா"),
      },
      {
        title: text("Caves, then Kandy", "ලෙන්, පසුව මහනුවර", "குகைகள், பிறகு கண்டி"),
        detail: text(
          "Dambulla's cave temple in the morning, while the stone is still cool. The drive to Kandy climbs into the hills. The evening puja at the Temple of the Tooth is the reason not to arrive after dark and rush.",
          "උදෑසන දඹුල්ල ගල් විහාරය, ගල තවම සිසිල් අතරේ. මහනුවර ගමන කඳු නගී. දළදා මාළිගාවේ සවස් පූජාව, අඳුරෙන් පසු ඉක්මනින් එන්න එපා කියන හේතුවයි.",
          "காலையில் தம்புள்ளை குகைக் கோயில், கல் இன்னும் குளிராக இருக்கும்போது. கண்டி பயணம் மலை ஏறும். புனிதப் பல் கோயிலின் மாலை பூஜை, இருட்டுக்குப் பின் அவசரமாக வராமல் இருக்கும் காரணம்.",
        ),
        stay: text("Kandy", "මහනුවර", "கண்டி"),
      },
      {
        title: text("Gardens, lake, departure", "උද්‍යාන, විල, පිටත් වීම", "பூங்கா, ஏரி, புறப்பாடு"),
        detail: text(
          "Peradeniya in the morning, a last loop of the lake, then the road or train toward Colombo or the airport. If the hill railway is next, this is the day you stay on instead of leaving.",
          "උදෑසන පේරාදෙණිය, විලේ අවසන් වටයක්, පසුව කොළඹ හෝ ගුවන් තොට දෙස මාර්ගය හෝ දුම්රිය. කඳුරට දුම්රිය ඊළඟ නම්, පිටත් වීම වෙනුවට රැඳෙන දිනය මෙයයි.",
          "காலையில் பேராதனை, ஏரியின் கடைசி சுற்று, பிறகு கொழும்பு அல்லது விமான நிலையம் நோக்கி சாலை அல்லது இரயில். மலை இரயில் அடுத்ததாக இருந்தால், புறப்படுவதற்குப் பதில் தங்கும் நாள் இது.",
        ),
        stay: text("Departure, or stay to continue", "පිටත් වීම, හෝ ඉදිරියට රැඳීම", "புறப்பாடு, அல்லது தொடர தங்கல்"),
      },
    ],
  },
  {
    id: "trip-tea",
    slug: "tea-train",
    order: 2,
    featured: true,
    image: images.ella,
    durationDays: 6,
    priceFromUsd: 960,
    pace: "relaxed",
    destinationSlugs: ["kandy", "ella", "nuwara-eliya"],
    title: text("The tea train", "තේ දුම්රිය", "தேயிலை இரயில்"),
    summary: text(
      "Kandy, a reserved seat into Ella, and a cold night above the tea.",
      "මහනුවර, ඇල්ල දක්වා වෙන් කළ ආසනයක්, තේ ඉහළ සිසිල් රාත්‍රියක්.",
      "கண்டி, எல்லாவுக்கு ஒதுக்கப்பட்ட இருக்கை, தேயிலைக்கு மேல் குளிர்ந்த இரவு.",
    ),
    description: text(
      "This plan is built around one train. Reserved seats are requested as soon as the railway opens them; if the seat does not come through, the same route can be driven and the disappointment is named in advance. Horton Plains is optional and early, not a casual add-on.",
      "මෙම සැලසුම එක් දුම්රියක් වටේ ගොඩනැගේ. දුම්රිය සේවය ආසන විවෘත කළ විගස ඉල්ලනු ලැබේ. ආසනය නොලැබුණොත් එම මඟ මාර්ගයෙන් යා හැක. ඒ බලාපොරොත්තු සුන්වීම කලින් කියනු ලැබේ. හෝර්ටන් තැන්න අමතරය, ඉක්මන්, සැහැල්ලු එකතුවක් නොවේ.",
      "இந்தத் திட்டம் ஒரு இரயிலைச் சுற்றிக் கட்டப்பட்டது. இரயில்வே திறந்ததும் இருக்கை கோரப்படும். இருக்கை கிடைக்காவிட்டால் அதே வழி சாலையில் செல்லலாம். ஏமாற்றம் முன்கூட்டியே சொல்லப்படும். ஹோர்ட்டன் சமவெளி விருப்பம், அதிகாலை, சாதாரண சேர்க்கை அல்ல.",
    ),
    bestMonths: text("December to March.", "දෙසැම්බර් සිට මාර්තු දක්වා.", "டிசம்பர் முதல் மார்ச்."),
    groupSize: text("2–6 travellers", "සංචාරකයන් 2–6", "2–6 பயணிகள்"),
    includes: lines([...privateCar.en, "Reserved train seats when the railway releases them"]),
    excludes: notIncluded,
    itinerary: [
      {
        title: text("Into Kandy", "මහනුවරට", "கண்டிக்குள்"),
        detail: text(
          "A midday arrival leaves the lake and the Temple of the Tooth for the late afternoon, which is when the city is at its best.",
          "දහවල් පැමිණීම විල සහ දළදා මාළිගාව හවසට තබයි. නගරය හොඳම වේලාව එයයි.",
          "மதிய வருகை ஏரியையும் புனிதப் பல் கோயிலையும் பிற்பகலுக்கு விடும். நகரம் சிறப்பாக இருக்கும் நேரம் அது.",
        ),
        stay: text("Kandy", "මහනුවර", "கண்டி"),
      },
      {
        title: text("Gardens, then nothing scheduled", "උද්‍යාන, පසුව සැලසුමක් නැත", "பூங்கா, பிறகு அட்டவணை இல்லை"),
        detail: text(
          "Peradeniya in the morning. The rest of the day is for the market, a cup of tea, or the walk you did not finish yesterday.",
          "උදෑසන පේරාදෙණිය. ඉතිරි දවස වෙළඳපොළ, තේ කෝප්පයක්, හෝ ඊයේ නිම නොකළ ඇවිදීම.",
          "காலையில் பேராதனை. மீதி நாள் சந்தை, ஒரு கோப்பை தேநீர், அல்லது நேற்று முடிக்காத நடை.",
        ),
        stay: text("Kandy", "මහනුවර", "கண்டி"),
      },
      {
        title: text("The train", "දුම්රිය", "இரயில்"),
        detail: text(
          "Reserved seats toward Ella. The famous stretch is after the line has already been beautiful for an hour. Nine Arches at the end of the day if the light and your knees hold.",
          "ඇල්ල දෙස වෙන් කළ ආසන. ප්‍රසිද්ධ කොටසට පෙර පැයක් තිස්සේ මාර්ගය ලස්සනය. ආලෝකය සහ දණහිස් ඉඩ දෙන්නේ නම් දවස අග ආරුක්කු නවය.",
          "எல்லா நோக்கி ஒதுக்கப்பட்ட இருக்கைகள். புகழ்பெற்ற பகுதிக்கு முன் ஒரு மணி நேரம் வழி ஏற்கெனவே அழகு. வெளிச்சமும் முழங்காலும் இருந்தால் நாள் முடிவில் ஒன்பது வளைவு.",
        ),
        stay: text("Ella", "ඇල්ල", "எல்ல"),
      },
      {
        title: text("Ridge and tea", "වැටිය සහ තේ", "முகடும் தேயிலையும்"),
        detail: text(
          "Little Adam's Peak before the path is crowded. A factory visit after, when you can still tell the difference between a tour and a cup.",
          "මඟ පිරෙන්නට පෙර කුඩා ආදම්ගේ කඳු මුදුන. පසුව කම්හලක්, සංචාරයක් සහ කෝප්පයක් අතර වෙනස තවම දැනෙන විට.",
          "பாதை நெரிசலாகும் முன் சிறிய ஆதாம் சிகரம். பிறகு ஆலை, சுற்றுலாவுக்கும் கோப்பைக்கும் உள்ள வேறுபாடு இன்னும் தெரியும்போது.",
        ),
        stay: text("Ella", "ඇල්ල", "எல்ல"),
      },
      {
        title: text("Up to the estates", "වතු දක්වා", "தோட்டங்களுக்கு"),
        detail: text(
          "Road to Nuwara Eliya. The night is genuinely cool. Sleep outside the cluttered centre.",
          "නුවරඑළියට මාර්ගය. රාත්‍රිය ඇත්තටම සිසිල්. අවුල් මධ්‍යයෙන් පිටත නවාතැන්.",
          "நுவரெலியாவுக்குச் சாலை. இரவு உண்மையிலேயே குளிர். நெரிசலான மையத்துக்கு வெளியே தங்குங்கள்.",
        ),
        stay: text("Nuwara Eliya", "නුවරඑළිය", "நுவரெலியா"),
      },
      {
        title: text("World's End, or the road down", "ලෝක අන්තය, හෝ පහළ මඟ", "உலக முடிவு, அல்லது கீழ் பாதை"),
        detail: text(
          "Optional pre-dawn Horton Plains. If the cloud is already sitting on the escarpment, skip it without guilt and take the road down to Colombo or the airport.",
          "අමතර අරුණට පෙර හෝර්ටන් තැන්න. වළාකුළු දැනටමත් කඳු මුදුනේ නම්, වරදක් නැතිව එය මඟ හැර කොළඹ හෝ ගුවන් තොට දෙස යන්න.",
          "விருப்ப விடியல் ஹோர்ட்டன். மேட்டில் மேகம் ஏற்கெனவே அமர்ந்திருந்தால் குற்றமில்லாமல் தவிர்த்து கொழும்பு அல்லது விமான நிலையம் நோக்கி இறங்குங்கள்.",
        ),
        stay: text("Departure", "පිටත් වීම", "புறப்பாடு"),
      },
    ],
  },
  {
    id: "trip-south",
    slug: "south-coast",
    order: 3,
    featured: true,
    image: images.galle,
    durationDays: 7,
    priceFromUsd: 1120,
    pace: "relaxed",
    destinationSlugs: ["galle", "mirissa", "yala"],
    title: text("South coast, slowly", "දකුණු වෙරළ, සෙමින්", "தென் கடற்கரை, மெதுவாக"),
    summary: text(
      "Fort walls, a whale boat if the season agrees, and one dawn in Yala.",
      "කොටු බිත්ති, ඍතුව ගැලපේ නම් තල්මසුන් බෝට්ටුවක්, යාලේ එක් අරුණෝදයක්.",
      "கோட்டைச் சுவர்கள், பருவம் இசைந்தால் திமிங்கலப் படகு, யாலாவில் ஒரு விடியல்.",
    ),
    description: text(
      "Seven days that refuse to do the south in a weekend. Two nights in Galle, two on the beach, two by the park. The whale boat runs only in season and is booked with an operator who keeps a distance. The leopard is not on the invoice.",
      "සති අන්තයක දකුණ කරන්න එපා කියන දින හතක්. ගාල්ලේ රාත්‍රී දෙකක්, වෙරළේ දෙකක්, උද්‍යානය ළඟ දෙකක්. තල්මසුන් බෝට්ටුව ඍතුවේ පමණක්, දුර පවත්වන ක්‍රියාකරුවෙකු සමඟ. දිවියා බිල්පතේ නැත.",
      "தெற்கை வார இறுதியில் முடிக்க மறுக்கும் ஏழு நாட்கள். காலியில் இரண்டு இரவு, கடற்கரையில் இரண்டு, பூங்கா அருகே இரண்டு. திமிங்கலப் படகு பருவத்தில் மட்டும், தூரம் காக்கும் இயக்குநருடன். சிறுத்தை இரசீதில் இல்லை.",
    ),
    bestMonths: text(
      "December to April. Yala is still workable into June if you do not mind leaving the beach season.",
      "දෙසැම්බර් සිට අප්‍රේල් දක්වා. වෙරළ ඍතුව හැර යාම ගැටළුවක් නැත්නම් යාල ජූනි දක්වා යා හැක.",
      "டிசம்பர் முதல் ஏப்ரல். கடற்கரைப் பருவத்தை விட்டுச் செல்வது பரவாயில்லையென்றால் யாலா ஜூன் வரை செல்லும்.",
    ),
    groupSize: text("2–6 travellers", "සංචාරකයන් 2–6", "2–6 பயணிகள்"),
    includes: privateCar,
    excludes: notIncluded,
    itinerary: [
      {
        title: text("Expressway to the fort", "අධිවේගී මාර්ගයෙන් කොටුවට", "விரைவுச் சாலையில் கோட்டைக்கு"),
        detail: text(
          "Two hours from Colombo if the traffic agrees. The first job is the rampart, late in the day, with no museum list.",
          "වාහන තදබදය ඉඩ දෙන්නේ නම් කොළඹ සිට පැය දෙකක්. පළමු වැඩය හවස ප්‍රාකාරයයි. කෞතුකාගාර ලැයිස්තුවක් නැත.",
          "போக்குவரத்து இசைந்தால் கொழும்பிலிருந்து இரண்டு மணி. முதல் வேலை நாள் முடிவில் மதில். அருங்காட்சியகப் பட்டியல் இல்லை.",
        ),
        stay: text("Galle Fort", "ගාලු කොටුව", "காலிக் கோட்டை"),
      },
      {
        title: text("The fort on foot", "කොටුව පයින්", "கோட்டை நடந்து"),
        detail: text(
          "A full day inside the walls, and a swim at Unawatuna if the afternoon is hot. Dinner is a short walk, not a transfer.",
          "බිත්ති ඇතුළේ පූර්ණ දිනයක්. හවස උණුසුම් නම් උණවටුනේ පිහිනීමක්. රාත්‍රී ආහාරය කෙටි ඇවිදීමකි, වාහන ගමනක් නොවේ.",
          "சுவர்களுக்குள் முழு நாள். பிற்பகல் வெப்பமென்றால் உணவட்டுனாவில் நீச்சல். இரவு உணவு குறுகிய நடை, வண்டி மாற்றம் அல்ல.",
        ),
        stay: text("Galle Fort", "ගාලු කොටුව", "காலிக் கோட்டை"),
      },
      {
        title: text("Along the coast to Mirissa", "වෙරළ ඔස්සේ මිරිස්සට", "கடற்கரையோரம் மிரிஸ்ஸ"),
        detail: text(
          "A short drive. The afternoon is the beach and nothing else, so the next dawn can be a boat without anyone being tired of the itinerary.",
          "කෙටි ගමනක්. හවස වෙරළ පමණයි. ඊළඟ අරුණෝදය බෝට්ටුවක් විය හැක, කිසිවෙකු සැලසුමෙන් වෙහෙසී නැතිව.",
          "குறுகிய பயணம். பிற்பகல் கடற்கரை மட்டும். அடுத்த விடியல் படகாக இருக்கலாம், யாரும் திட்டத்தால் சோர்வில்லை.",
        ),
        stay: text("Mirissa", "මිරිස්ස", "மிரிஸ்ஸ"),
      },
      {
        title: text("Boat, or a quieter cove", "බෝට්ටුව, හෝ නිහඬ ඇල්ලක්", "படகு, அல்லது அமைதியான குடா"),
        detail: text(
          "In season, a morning whale boat with a small operator. Out of season, a cove toward Hiriketiya or Weligama and no pretence that whales are waiting.",
          "ඍතුවේ නම් කුඩා ක්‍රියාකරුවෙකු සමඟ උදෑසන තල්මසුන් බෝට්ටුවක්. ඍතුවෙන් පිටත නම් හිරිකැටිය හෝ වැලිගම දෙස ඇල්ලක්. තල්මසුන් බලා සිටින බව නොකියයි.",
          "பருவத்தில் சிறிய இயக்குநருடன் காலை திமிங்கலப் படகு. பருவத்துக்கு வெளியே ஹிரிகெட்டியா அல்லது வெலிகம குடா. திமிங்கலங்கள் காத்திருப்பதாக நடிப்பு இல்லை.",
        ),
        stay: text("Mirissa", "මිරිස්ස", "மிரிஸ்ஸ"),
      },
      {
        title: text("To Tissamaharama", "තිස්සමහාරාමයට", "திஸ்ஸமஹாராமைக்கு"),
        detail: text(
          "The drive leaves the coconut coast for scrub and tanks. The evening is quiet on purpose, because the jeep leaves before dawn.",
          "ගමන පොල් වෙරළ හැර පඳුරු සහ වැව් දෙස යයි. සවස හිතාමතා නිහඬය. ජීප් රථය අරුණට පෙර පිටත් වේ.",
          "பயணம் தென்னைக் கரையை விட்டு புதருக்கும் குளங்களுக்கும் செல்லும். மாலை வேண்டுமென்றே அமைதி. ஜீப் விடியலுக்கு முன் புறப்படும்.",
        ),
        stay: text("Tissamaharama", "තිස්සමහාරාමය", "திஸ்ஸமஹாராமை"),
      },
      {
        title: text("Yala at dawn", "අරුණෝදයේ යාල", "விடியலில் யாலா"),
        detail: text(
          "One game drive at opening. The afternoon is not a second drive unless you ask for it. Sightings are luck.",
          "විවෘත වේලාවට එක් ජීප් ගමනක්. ඔබ ඉල්ලන්නේ නැත්නම් හවස දෙවන ගමනක් නැත. දැකීම වාසනාවයි.",
          "திறக்குமிடத்தில் ஒரு வன சுற்று. நீங்கள் கேட்காவிட்டால் பிற்பகல் இரண்டாம் சுற்று இல்லை. காட்சி அதிர்ஷ்டம்.",
        ),
        stay: text("Tissamaharama", "තිස්සමහාරාමය", "திஸ்ஸமஹாராமை"),
      },
      {
        title: text("Back along the coast", "වෙරළ ඔස්සේ ආපසු", "கடற்கரையோரம் திரும்பு"),
        detail: text(
          "Return toward Colombo with a stop in Galle or at a beach for lunch. Airport drop-offs can be arranged on this day.",
          "ගාල්ලේ හෝ වෙරළේ දිවා ආහාර නැවතීමක් සමඟ කොළඹ දෙස ආපසු. ගුවන් තොට බැසීම මෙදින සැලසිය හැක.",
          "காலி அல்லது கடற்கரை மதிய உணவு நிறுத்தத்துடன் கொழும்பு நோக்கித் திரும்பு. விமான நிலைய இறக்கம் இந்த நாளில் அமைக்கலாம்.",
        ),
        stay: text("Departure", "පිටත් වීම", "புறப்பாடு"),
      },
    ],
  },
  {
    id: "trip-long",
    slug: "long-way-round",
    order: 4,
    featured: true,
    image: images.tea,
    durationDays: 12,
    priceFromUsd: 1860,
    pace: "moderate",
    destinationSlugs: ["sigiriya", "kandy", "nuwara-eliya", "ella", "galle", "mirissa"],
    title: text("The long way round", "දිගු මඟ", "நீண்ட வழி"),
    summary: text(
      "Culture, the hill railway, and the south coast in twelve days, without a new hotel every night.",
      "සංස්කෘතිය, කඳුරට දුම්රිය, දකුණු වෙරළ දින දොළහකින්. සෑම රාත්‍රියකම අලුත් හෝටලයක් නැත.",
      "கலாச்சாரம், மலை இரயில், தென் கடற்கரை பன்னிரண்டு நாட்களில். ஒவ்வொரு இரவும் புதிய விடுதி இல்லை.",
    ),
    description: text(
      "The island's greatest hits, slowed down. You do not see Jaffna or the east on this route; those need their own dry season. Yala can replace the last Mirissa night if wildlife matters more than another beach morning. Tell the desk when you write.",
      "දිවයිනේ ප්‍රසිද්ධම දේ, වේගය අඩු කර. මෙම මඟේ යාපනය හෝ නැගෙනහිර නැත. ඒවාට තමන්ගේ වියළි ඍතුව ඕන. වනජීවීන් අනෙක් වෙරළ උදෑසනට වඩා වැදගත් නම් අවසන් මිරිස්ස රාත්‍රිය යාලට මාරු කළ හැක. ලියන විට මේසයට කියන්න.",
      "தீவின் பிரபலங்கள், வேகம் குறைத்து. இந்த வழியில் யாழ்ப்பாணமோ கிழக்கோ இல்லை. அவற்றுக்குத் தனி வறண்ட பருவம் வேண்டும். இன்னொரு கடற்கரைக் காலையை விட வனவிலங்கு முக்கியமென்றால் கடைசி மிரிஸ்ஸ இரவை யாலாவாக மாற்றலாம். எழுதும்போது மேசைக்குச் சொல்லுங்கள்.",
    ),
    bestMonths: text("December to March.", "දෙසැම්බර් සිට මාර්තු දක්වා.", "டிசம்பர் முதல் மார்ச்."),
    groupSize: text("2–6 travellers", "සංචාරකයන් 2–6", "2–6 பயணிகள்"),
    includes: lines([...privateCar.en, "Reserved train seats when released"]),
    excludes: notIncluded,
    itinerary: [
      {
        title: text("To Sigiriya", "සීගිරියට", "சிகிரியாவுக்கு"),
        detail: text("Settle by the rock. The climb is tomorrow, not tonight.", "පර්වතය ළඟ පදිංචි වන්න. නැගීම හෙටයි, අද රාත්‍රිය නොවේ.", "பாறை அருகே தங்குங்கள். ஏறுதல் நாளை, இன்றிரவு அல்ல."),
        stay: text("Sigiriya", "සීගිරිය", "சிகிரியா"),
      },
      {
        title: text("The rock at opening", "විවෘත වේලාවට පර්වතය", "திறக்குமிடத்தில் பாறை"),
        detail: text("Sigiriya early. Pidurangala if sunset still appeals.", "උදේ සීගිරිය. සවස තවම කැමති නම් පිදුරංගල.", "அதிகாலை சிகிரியா. சூரிய அஸ்தமனம் இன்னும் பிடித்தால் பிதுரங்கலா."),
        stay: text("Sigiriya", "සීගිරිය", "சிகிரியா"),
      },
      {
        title: text("Polonnaruwa", "පොළොන්නරුව", "பொலன்னறுவை"),
        detail: text("Bicycles in the ancient city. A seasonal elephant gathering only if it is actually gathering.", "පුරාණ නගරයේ බයිසිකල්. ඇත් රැස්වීම ඇත්තටම ඇත්නම් පමණි.", "பழங்கால நகரத்தில் மிதிவண்டி. யானைக் கூட்டம் உண்மையில் இருந்தால் மட்டும்."),
        stay: text("Sigiriya", "සීගිරිය", "சிகிரியா"),
      },
      {
        title: text("Dambulla to Kandy", "දඹුල්ල සිට මහනුවර", "தம்புள்ளையிலிருந்து கண்டி"),
        detail: text("Cave temple in the cool morning, hills after lunch, puja in the evening.", "සිසිල් උදෑසන ගල් විහාරය, දිවා ආහාරයෙන් පසු කඳු, සවස පූජාව.", "குளிர் காலையில் குகைக் கோயில், மதியத்துக்குப் பின் மலை, மாலை பூஜை."),
        stay: text("Kandy", "මහනුවර", "கண்டி"),
      },
      {
        title: text("A day that does not move hotels", "හෝටලය මාරු නොවන දිනය", "விடுதி மாறாத நாள்"),
        detail: text("Peradeniya and the lake. Bags stay put.", "පේරාදෙණිය සහ විල. බෑග් එතැනම.", "பேராதனையும் ஏரியும். பைகள் அங்கேயே."),
        stay: text("Kandy", "මහනුවර", "கண்டி"),
      },
      {
        title: text("Railway to Ella", "ඇල්ලට දුම්රිය", "எல்லாவுக்கு இரயில்"),
        detail: text("The long scenic ride. Walk to Nine Arches only if you arrive with daylight.", "දිගු දර්ශනීය ගමන. දිවා ආලෝකය සමඟ ළඟා වුණොත් පමණක් ආරුක්කු නවය.", "நீண்ட காட்சிப் பயணம். பகல் வெளிச்சத்துடன் சேர்ந்தால் மட்டும் ஒன்பது வளைவு."),
        stay: text("Ella", "ඇල්ල", "எல்ல"),
      },
      {
        title: text("Ella on foot", "ඇල්ල පයින්", "எல்ல நடந்து"),
        detail: text("Little Adam's Peak and a tea factory. Ella Rock only if you like a hot climb.", "කුඩා ආදම්ගේ කඳු මුදුන සහ තේ කම්හලක්. උණුසුම් නැගීමක් කැමති නම් පමණක් ඇල්ල පර්වතය.", "சிறிய ஆதாம் சிகரமும் தேயிலை ஆலையும். வெப்ப ஏற்றம் பிடித்தால் மட்டும் எல்ல பாறை."),
        stay: text("Ella", "ඇල්ල", "எல்ல"),
      },
      {
        title: text("Tea country night", "තේ රටේ රාත්‍රිය", "தேயிலை நாட்டு இரவு"),
        detail: text("To Nuwara Eliya. Jacket weather after dark.", "නුවරඑළියට. අඳුරෙන් පසු ජැකට් කාලගුණය.", "நுவரெலியாவுக்கு. இருட்டுக்குப் பின் ஜாக்கெட் வானிலை."),
        stay: text("Nuwara Eliya", "නුවරඑළිය", "நுவரெலியா"),
      },
      {
        title: text("Down to the fort", "කොටුව දක්වා පහළට", "கோட்டைக்குக் கீழே"),
        detail: text("A long but beautiful descent to Galle. The ramparts are the evening plan, not another sight on the way.", "ගාල්ලට දිගු නමුත් ලස්සන බැසීමක්. සවස් සැලසුම ප්‍රාකාරයයි, අතරමග තව නැරඹුමක් නොවේ.", "காலிக்கு நீண்ட ஆனால் அழகான இறக்கம். மாலைத் திட்டம் மதில்கள், வழியில் இன்னொரு காட்சி அல்ல."),
        stay: text("Galle Fort", "ගාලු කොටුව", "காலிக் கோட்டை"),
      },
      {
        title: text("Walls and a swim", "බිත්ති සහ පිහිනීම", "சுவர்களும் நீச்சலும்"),
        detail: text("The fort without a schedule. Unawatuna if you want salt water.", "සැලසුමක් නැති කොටුව. ලුණු වතුර අවශ්‍ය නම් උණවටුන.", "அட்டவணையில்லாக் கோட்டை. உப்பு நீர் வேண்டுமென்றால் உணவட்டுனா."),
        stay: text("Galle Fort", "ගාලු කොටුව", "காலிக் கோட்டை"),
      },
      {
        title: text("Mirissa", "මිරිස්ස", "மிரிஸ்ஸ"),
        detail: text("Beach time. A whale boat the next morning only if the month is right and you want it.", "වෙරළ වේලාව. ඊළඟ උදෑසන තල්මසුන් බෝට්ටුව මාසය නිවැරදි නම් සහ ඔබට ඕන නම් පමණි.", "கடற்கரை நேரம். அடுத்த காலை திமிங்கலப் படகு மாதம் சரியாகவும் உங்களுக்கு வேண்டியும் இருந்தால் மட்டும்."),
        stay: text("Mirissa", "මිරිස්ස", "மிரிஸ்ஸ"),
      },
      {
        title: text("Return to Colombo", "කොළඹට ආපසු", "கொழும்புக்குத் திரும்பு"),
        detail: text("Coast road or expressway, with time for a flight the same evening if the plane is after 7.", "වෙරළ පාර හෝ අධිවේගී මාර්ගය. ගුවන් යානය 7න් පසු නම් එදින සවස ගුවන් ගමනකට වේලාව ඇත.", "கடற்கரைச் சாலை அல்லது விரைவுச் சாலை. விமானம் 7க்குப் பின் என்றால் அதே மாலை விமானத்துக்கு நேரம் உண்டு."),
        stay: text("Departure", "පිටත් වීම", "புறப்பாடு"),
      },
    ],
  },
  {
    id: "trip-northeast",
    slug: "north-and-east",
    order: 5,
    featured: false,
    image: images.trinco,
    durationDays: 8,
    priceFromUsd: 1280,
    pace: "moderate",
    destinationSlugs: ["trincomalee", "jaffna"],
    title: text("The other monsoon", "අනෙක් මෝසම", "மறுபருவமழை"),
    summary: text(
      "Trincomalee while the south is wet, then Jaffna: fort, temple, and the islands.",
      "දකුණ තෙත් අතරේ ත්‍රිකුණාමලය, පසුව යාපනය: කොටුව, කෝවිල, දූපත්.",
      "தெற்கு ஈரமாக இருக்கும்போது திருகோணமலை, பிறகு யாழ்ப்பாணம்: கோட்டை, கோயில், தீவுகள்.",
    ),
    description: text(
      "Eight days for the season the usual south-coast plan cannot use. Three nights by the eastern beaches, then the long road to Jaffna. The drive between them is a real day, not a hop. Flights into or out of Jaffna can replace one of the road legs if seats exist.",
      "සාමාන්‍ය දකුණු වෙරළ සැලසුමට භාවිත කළ නොහැකි ඍතුව සඳහා දින අටක්. නැගෙනහිර වෙරළේ රාත්‍රී තුනක්, පසුව යාපනයට දිගු මාර්ගය. අතර ගමන සැබෑ දිනයකි, පැනීමක් නොවේ. ආසන ඇත්නම් යාපනයට හෝ යාපනයෙන් ගුවන් ගමනක් මාර්ග කකුලක් වෙනුවට යා හැක.",
      "வழக்கமான தென் கடற்கரைத் திட்டம் பயன்படுத்த முடியாத பருவத்துக்கு எட்டு நாட்கள். கிழக்கு கடற்கரையில் மூன்று இரவு, பிறகு யாழ்ப்பாணத்துக்கு நீண்ட சாலை. இடையிலான பயணம் உண்மையான நாள், தாவல் அல்ல. இருக்கை இருந்தால் யாழ்ப்பாண விமானம் ஒரு சாலைப் பகுதியை மாற்றும்.",
    ),
    bestMonths: text(
      "May to September. August is festival time in Jaffna and busier.",
      "මැයි සිට සැප්තැම්බර් දක්වා. අගෝස්තු යාපනයේ උත්සව කාලයයි, වැඩි කලබලය.",
      "மே முதல் செப்டம்பர். ஆகஸ்ட் யாழ்ப்பாணத் திருவிழாக் காலம், கூடுதல் பரபரப்பு.",
    ),
    groupSize: text("2–6 travellers", "සංචාරකයන් 2–6", "2–6 பயணிகள்"),
    includes: privateCar,
    excludes: notIncluded,
    itinerary: [
      {
        title: text("Across to the east", "නැගෙනහිරට", "கிழக்கே"),
        detail: text("A long first day to Trincomalee. The harbour viewpoint is enough for the evening.", "ත්‍රිකුණාමලයට දිගු පළමු දිනය. සවසට වරාය දසුන ඇත.", "திருகோணமலைக்கு நீண்ட முதல் நாள். மாலைக்குத் துறைமுகக் காட்சி போதும்."),
        stay: text("Uppuveli or Nilaveli", "උප්පුවෙලි හෝ නිලාවැලි", "உப்புவெளி அல்லது நிலாவெளி"),
      },
      {
        title: text("Temple and sea", "කෝවිල සහ මුහුද", "கோயிலும் கடலும்"),
        detail: text("Koneswaram in the morning, then the beach you came for. No second town on this day.", "උදෑසන කෝණේශ්වරම්, පසුව ඔබ පැමිණි වෙරළ. මෙදින දෙවන නගරයක් නැත.", "காலையில் கோணேஸ்வரம், பிறகு நீங்கள் வந்த கடற்கரை. இந்த நாளில் இரண்டாம் நகரம் இல்லை."),
        stay: text("Uppuveli or Nilaveli", "උප්පුවෙලි හෝ නිලාවැලි", "உப்புவெளி அல்லது நிலாவெளி"),
      },
      {
        title: text("Pigeon Island, if the sea allows", "මුහුද ඉඩ දෙන්නේ නම් පරාවි දූපත", "கடல் அனுமதித்தால் புறாத் தீவு"),
        detail: text("A snorkel when the crossing is calm. If it is not, the day stays on the beach without apology.", "තරණය සන්සුන් නම් ස්නෝකල්. නැත්නම් දිනය වෙරළේ, සමාවක් ඉල්ලන්නේ නැත.", "கடத்தல் அமைதியாக இருந்தால் மூழ்குதளம். இல்லையென்றால் நாள் கடற்கரையில், மன்னிப்பு இல்லை."),
        stay: text("Uppuveli or Nilaveli", "උප්පුවෙලි හෝ නිලාවැලි", "உப்புவெளி அல்லது நிலாவெளி"),
      },
      {
        title: text("The long road north", "උතුරට දිගු මඟ", "வடக்கே நீண்ட சாலை"),
        detail: text("Jaffna via the northern plains. This is a travel day. Arrive, eat, sleep.", "උතුරු තැනිතලාව හරහා යාපනය. මෙය ගමන් දිනයකි. ළඟා වී, කා, නිදාගන්න.", "வடக்குச் சமவெளி வழியாக யாழ்ப்பாணம். இது பயண நாள். சேருங்கள், சாப்பிடுங்கள், உறங்குங்கள்."),
        stay: text("Jaffna", "යාපනය", "யாழ்ப்பாணம்"),
      },
      {
        title: text("Fort and Nallur", "කොටුව සහ නල්ලූර්", "கோட்டையும் நல்லூரும்"),
        detail: text("The Dutch fort, the market, and Nallur Kandaswamy. Dress modestly for the temple.", "ලන්දේසි කොටුව, වෙළඳපොළ, නල්ලූර් කන්දසාමි. කෝවිලට සරලව ඇඳුම් ගන්න.", "டச்சுக் கோட்டை, சந்தை, நல்லூர் கந்தசாமி. கோயிலுக்கு அடக்கமாக உடுத்துங்கள்."),
        stay: text("Jaffna", "යාපනය", "யாழ்ப்பாணம்"),
      },
      {
        title: text("The islands", "දූපත්", "தீவுகள்"),
        detail: text("Causeways to Kayts and the ferry to Nainativu. One island done properly beats three done from the window.", "කායිට්ස් වෙත පාලම් සහ නාගදීපයට පාරුව. ජනේලයෙන් තුනකට වඩා එක දූපතක් හරිහැටි.", "ஊர்காவற்றுறைக்குப் பாலங்கள், நயினாதீவுக்குப் படகு. சன்னலில் மூன்றை விட ஒரு தீவு சரியாக."),
        stay: text("Jaffna", "යාපනය", "யாழ்ப்பாணம்"),
      },
      {
        title: text("Palmyrah and crab", "තල් සහ කකුළුවන්", "பனையும் நண்டும்"),
        detail: text("A slower city day: food, a village road, and time to read the place you are in.", "මන්දගාමී නගර දිනයක්: කෑම, ගම් පාරක්, ඔබ සිටින තැන කියවීමට වේලාව.", "மெதுவான நகர நாள்: உணவு, ஒரு கிராமச் சாலை, இருக்கும் இடத்தைப் படிக்க நேரம்."),
        stay: text("Jaffna", "යාපනය", "யாழ்ப்பாணம்"),
      },
      {
        title: text("Flight or the long road home", "ගුවන් යානය හෝ දිගු ගෙදර මඟ", "விமானம் அல்லது நீண்ட வீட்டுச் சாலை"),
        detail: text("Fly if there is a seat. Otherwise the road south is a full day back to Colombo.", "ආසනයක් ඇත්නම් පියාසර කරන්න. නැත්නම් දකුණු මාර්ගය කොළඹට පූර්ණ දිනයකි.", "இருக்கை இருந்தால் பறங்கள். இல்லையென்றால் தெற்குச் சாலை கொழும்புக்கு முழு நாள்."),
        stay: text("Departure", "පිටත් වීම", "புறப்பாடு"),
      },
    ],
  },
];

const reviews: Review[] = [
  {
    id: "note-amaya",
    name: "Amaya Fernando",
    rating: 5,
    locale: "en",
    targetType: "destination",
    targetSlug: "kandy",
    createdAt: "2026-02-14T08:00:00.000Z",
    comment:
      "We walked the lake after the puja instead of adding another stop. That was the right evening. Shoulders covered, no rush at the temple door.",
  },
  {
    id: "note-lukas",
    name: "Lukas Berger",
    rating: 5,
    locale: "en",
    targetType: "trip",
    targetSlug: "tea-train",
    createdAt: "2026-03-02T08:00:00.000Z",
    comment:
      "The reserved seats were the whole trip. Nine Arches was crowded by ten. Go when you get off the train, not the next afternoon.",
  },
  {
    id: "note-farah",
    name: "Farah Rahman",
    rating: 4,
    locale: "en",
    targetType: "destination",
    targetSlug: "galle",
    createdAt: "2026-01-20T08:00:00.000Z",
    comment:
      "Sleeping inside the fort meant every walk home was along the wall. The new town is fine for a pharmacy and dull for a night.",
  },
  {
    id: "note-nimal",
    name: "Nimal Jayawardena",
    rating: 5,
    locale: "fr",
    targetType: "destination",
    targetSlug: "sigiriya",
    createdAt: "2026-04-08T08:00:00.000Z",
    comment:
      "Nous sommes arrivés à l'ouverture. Le sommet avant dix heures. Ensuite l'escalier brûle. Pidurangala au coucher du soleil est excellent, sans le billet de Sigiriya.",
  },
  {
    id: "note-divya",
    name: "Divya Selvan",
    rating: 5,
    locale: "ja",
    targetType: "destination",
    targetSlug: "jaffna",
    createdAt: "2026-08-18T08:00:00.000Z",
    comment:
      "ナッルール祭の週、街は別世界です。島々には丸一日ください。ジャフナを二時間の立ち寄りにしないでください。",
  },
  {
    id: "note-helen",
    name: "Helen Crowe",
    rating: 4,
    locale: "en",
    targetType: "destination",
    targetSlug: "yala",
    createdAt: "2026-06-11T08:00:00.000Z",
    comment:
      "We saw a leopard. So did twelve other jeeps. Ask the driver to leave the cluster once you have had a proper look. Bundala the next morning was the better hour.",
  },
];

export const content = {
  settings: {
    siteName: text("Ceylon Trails", "ලංකා මඟ", "இலங்கை பாதை"),
    tagline: text("Sri Lanka, without the rush", "ඉක්මනින් තොරව ශ්‍රී ලංකාව", "அவசரமின்றி இலங்கை"),
    heroKicker: text("Island routes", "දිවයිනේ මං", "தீவின் பாதைகள்"),
    heroTitle: text(
      "Trains, tide, and tea country — planned like a local would walk it.",
      "දුම්රිය, වෙරළ, තේ වගාව — මෙහි ජීවත් වෙන කෙනෙක් යන වේගයෙන්.",
      "இரயில், அலை, தேயிலை நாடு — இங்கே வாழ்பவர் நடந்து செல்லும் வேகத்தில்.",
    ),
    heroSubtitle: text(
      "Day-by-day routes for the Cultural Triangle, the hill railway, and both coasts, with the seasons written in.",
      "සංස්කෘතික ත්‍රිකෝණය, කඳුරට දුම්රිය, වෙරළ දෙක සඳහා දිනපතා මං. ඍතුත් ලියා ඇත.",
      "கலாச்சார முக்கோணம், மலை இரயில், இரண்டு கடற்கரைகளுக்கும் நாளுக்கு நாள் பாதைகள். பருவமும் எழுதப்பட்டுள்ளது.",
    ),
    about: text(
      "Ceylon Trails is a planning desk for people who would rather walk a fort wall at dusk than collect a checklist. The places and routes here are written so you can follow them yourself. If you would rather have them shaped around your dates, write to the desk.",
      "ලංකා මඟ යනු සවස කොටු බිත්තියක් දිගේ ඇවිදින්න කැමති අය සඳහා සැලසුම් මේසයකි. මෙහි ස්ථාන සහ මං ඔබටම අනුගමනය කළ හැකි ලෙස ලියා ඇත. ඔබේ දිනයන්ට ගැලපෙන ලෙස සකස් කර ගැනීමට අවශ්‍ය නම් මේසයට ලියන්න.",
      "இலங்கை பாதை என்பது மாலையில் கோட்டைச் சுவரை நடக்க விரும்புபவர்களுக்கான திட்ட மேசை. இங்கே உள்ள இடங்களும் பாதைகளும் நீங்களே பின்பற்றும்படி எழுதப்பட்டவை. உங்கள் தேதிகளுக்கு ஏற்ப அமைக்க வேண்டுமென்றால் மேசைக்கு எழுதுங்கள்.",
    ),
    heroImage: images.sigiriya,
    email: "",
    phone: "+94 77 000 0000",
    whatsapp: "",
    address: text("Colombo, Sri Lanka", "කොළඹ, ශ්‍රී ලංකාව", "கொழும்பு, இலங்கை"),
    hours: text(
      "Monday to Saturday, 9:00–17:00",
      "සඳුදා සිට සෙනසුරාදා, 9:00–17:00",
      "திங்கள் முதல் சனி, 9:00–17:00",
    ),
    mapQuery: "Colombo, Sri Lanka",
    instagram: "",
    facebook: "",
    web3formsKey: "",
    firebase: {
      apiKey: "AIzaSyCFXs9NJGY-FMTPmhZNItYAXMivFsoNd3M",
      authDomain: "travel-srilanka-c3206.firebaseapp.com",
      projectId: "travel-srilanka-c3206",
      appId: "1:330063701552:web:16196e240cf10935736ff5",
    },
  },
  destinations,
  trips,
  reviews,
} satisfies Database;
